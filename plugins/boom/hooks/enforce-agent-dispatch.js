#!/usr/bin/env node
'use strict'

// PreToolUse gate for Agent, Workflow, and SendMessage.
// Every dispatch must name an explicit model inside its role's allowed set, or it is denied.
// Model inheritance is the failure mode this hook exists to prevent: an omitted model
// silently runs the worker on the main-session model, which is usually the most expensive tier.

const fs = require('fs')
const os = require('os')
const path = require('path')

const PLUGIN_PREFIX = 'boom:'

// Role -> allowed model aliases. Mirrors the table in the dispatch-policy skill.
// `explore` is not a boom role; the entry holds the built-in `Explore` agent to the same
// cheap-discovery set as `explorer`.
const ROLE_MODELS = {
  explore: ['haiku', 'sonnet'],
  explorer: ['haiku', 'sonnet'],
  viewer: ['sonnet', 'opus'],
  planner: ['sonnet', 'opus'],
  coder: ['opus', 'sonnet'],
  verifier: ['sonnet', 'opus'],
  reviewer: ['sonnet', 'opus'],
  'root-cause-analyzer': ['sonnet', 'opus'],
  'mid-reviewer': ['fable'],
  'critical-coder': ['fable'],
  'critical-reviewer': ['fable'],
}

// Roles whose definition pins a non-fable model, so a workflow agent() may name the role
// instead of a model.
const WORKFLOW_ROLES = [
  'explorer',
  'viewer',
  'planner',
  'coder',
  'verifier',
  'reviewer',
  'root-cause-analyzer',
]
const WORKFLOW_MODELS = ['haiku', 'sonnet', 'opus']

function decide(decision, reason) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: decision,
        permissionDecisionReason: reason,
      },
    })
  )
  process.exit(0)
}

function allow() {
  process.exit(0)
}

function failClosed(message) {
  process.stderr.write(message + '\n')
  process.exit(2)
}

function isBlank(value) {
  return typeof value !== 'string' || value.trim() === ''
}

// Strips this plugin's namespace so `boom:coder` and `coder` resolve
// to the same policy. The built-in `Explore` folds into the `explore` entry. Other namespaces
// (`codex:`, another plugin) are left intact so they stay unknown roles.
function normalizeRole(agentType) {
  const trimmed = agentType.trim()
  const bare = trimmed.startsWith(PLUGIN_PREFIX) ? trimmed.slice(PLUGIN_PREFIX.length) : trimmed
  return bare.toLowerCase()
}

function readWorkflowScript(input) {
  if (!isBlank(input.script)) return input.script

  let scriptPath = isBlank(input.scriptPath) ? '' : input.scriptPath
  if (isBlank(scriptPath) && !isBlank(input.name)) {
    const candidates = [
      path.join(process.cwd(), '.claude', 'workflows', input.name + '.js'),
      path.join(os.homedir(), '.claude', 'workflows', input.name + '.js'),
    ]
    scriptPath = candidates.find((candidate) => fs.existsSync(candidate)) || ''
  }
  if (isBlank(scriptPath) || !fs.existsSync(scriptPath)) return ''

  return fs.readFileSync(scriptPath, 'utf8')
}

function checkWorkflow(input) {
  const script = readWorkflowScript(input)
  if (isBlank(script)) {
    decide(
      'deny',
      'Workflow script could not be read by the dispatch policy hook, so its agent models cannot be verified. Pass the script inline or a readable scriptPath.'
    )
  }

  // Checked before the per-call loop so a fable call reports the fable reason rather than
  // the generic "names neither model nor role" one.
  if (/model\s*:\s*['"]?fable/.test(script)) {
    decide(
      'deny',
      'Workflow scripts may not use fable. Run a Fable critical role serially through the Agent tool after the workflow has consolidated evidence.'
    )
  }

  // Checked separately from the per-call loop because naming a model alongside the coordinator
  // agentType would otherwise satisfy modelPattern and pass.
  const coordinatorPattern = new RegExp("agentType\\s*:\\s*['\"](?:" + PLUGIN_PREFIX + ")?coordinator['\"]", 'i')
  if (coordinatorPattern.test(script)) {
    decide(
      'deny',
      'Workflow scripts may not run the coordinator role. It holds the Agent tool, so an agent() running it would delegate again from inside the workflow. Name a worker role or an explicit model instead.'
    )
  }

  const modelPattern = new RegExp("model\\s*:\\s*['\"]?(" + WORKFLOW_MODELS.join('|') + ")['\"]?")
  const rolePattern = new RegExp(
    "agentType\\s*:\\s*['\"](?:" + PLUGIN_PREFIX + ')?(' + WORKFLOW_ROLES.join('|') + ")['\"]",
    'i'
  )

  const segments = script.split(/agent\s*\(/)
  for (let i = 1; i < segments.length; i++) {
    const segment = segments[i]
    if (!modelPattern.test(segment) && !rolePattern.test(segment)) {
      decide(
        'deny',
        'Workflow agent() call #' +
          i +
          ' names neither model (' +
          WORKFLOW_MODELS.join(', ') +
          ') nor a defined agentType (' +
          WORKFLOW_ROLES.join(', ') +
          '). A missing model inherits the main-session model.'
      )
    }
  }

  decide(
    'ask',
    'Workflow execution can fan out. Every agent() names its model. Confirm the declared task level, total starts, peak concurrency, and rerun policy before launch.'
  )
}

function checkSendMessage(input) {
  const target = isBlank(input.to) ? '' : input.to.trim()
  if (target === 'main') allow()

  if (/critical-|mid-reviewer|fable/i.test(target)) {
    decide(
      'deny',
      "SendMessage to '" +
        target +
        "' would resume a Fable role. Fable workers are never resumed; start a new explicitly approved task instead."
    )
  }

  decide(
    'ask',
    "SendMessage to '" + target + "' resumes that agent and counts as a new worker start. Confirm the task budget still allows it."
  )
}

function checkAgent(input) {
  const agentType = isBlank(input.subagent_type) ? '' : input.subagent_type.trim()
  const model = isBlank(input.model) ? '' : input.model.trim().toLowerCase()

  if (agentType === '') {
    decide('deny', 'Every Agent dispatch must specify subagent_type.')
  }

  if (agentType === 'fork') {
    decide(
      'deny',
      'A fork ignores the model parameter and runs on the main-session model. Dispatch an explicit worker role with a model alias instead; if the full conversation context is truly required, the user must run the fork after removing this rule for the session.'
    )
  }

  // The coordinator holds the Agent tool, so dispatching it as a subagent nests a second
  // delegating layer inside a task that is already spending the budget. It is a session lead
  // selected with --agent or a settings file, never a worker, and so has no allowed model set.
  if (normalizeRole(agentType) === 'coordinator') {
    decide(
      'deny',
      "'" +
        agentType +
        "' is a session lead, not a worker: it holds the Agent tool, so dispatching it as a subagent nests a second delegating layer under the current task budget. Run it as the session agent instead (claude --agent boom:coordinator) and dispatch a worker role here."
    )
  }

  if (model === '') {
    decide('deny', "Agent '" + agentType + "' must specify an explicit model. Model inheritance is prohibited.")
  }

  const role = normalizeRole(agentType)
  const allowed = ROLE_MODELS[role]
  if (allowed) {
    if (!allowed.includes(model)) {
      decide(
        'deny',
        "Agent '" + agentType + "' must use model '" + allowed.join("' or '") + "', not '" + model + "'."
      )
    }
    allow()
  }

  if (model === 'fable') {
    decide(
      'deny',
      "Fable is restricted to mid-reviewer, critical-coder, and critical-reviewer; agent type '" +
        agentType +
        "' is not approved."
    )
  }

  if (!WORKFLOW_MODELS.includes(model)) {
    decide(
      'deny',
      "Unknown agent type '" + agentType + "' must use an explicit " + WORKFLOW_MODELS.join(', ') + ' model alias.'
    )
  }

  if (agentType.startsWith('codex:')) allow()

  decide(
    'ask',
    "Agent type '" +
      agentType +
      "' has no role definition, so it inherits the main-session effort level. Confirm, or use a defined role (" +
      Object.keys(ROLE_MODELS).join(', ') +
      ') that pins its own effort.'
  )
}

function main(raw) {
  if (isBlank(raw)) {
    failClosed('Agent dispatch policy received empty hook input.')
  }

  let call
  try {
    call = JSON.parse(raw)
  } catch (error) {
    failClosed('Agent dispatch policy could not parse the hook input.')
  }

  if (!call || isBlank(call.tool_name)) {
    failClosed('Agent dispatch policy received hook input without tool_name.')
  }

  const input = call.tool_input || {}

  if (call.tool_name === 'Workflow') checkWorkflow(input)
  if (call.tool_name === 'SendMessage') checkSendMessage(input)
  if (call.tool_name !== 'Agent') allow()

  checkAgent(input)
}

let raw = ''
process.stdin.setEncoding('utf8')
process.stdin.on('data', (chunk) => {
  raw += chunk
})
process.stdin.on('end', () => main(raw))
