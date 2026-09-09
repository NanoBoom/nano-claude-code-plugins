# Nano Claude Code 插件市场

[English Documentation](./README.md)

为 Claude Code 打造的插件市场，把成本和委派纪律置于显式管控之下。

## 概述

Claude Code 的默认行为在设计上是宽松的：子智能体不指定模型就会静默继承主会话模型——通常是最贵的档位；工作流可以一直扇出，直到账单送到面前。这里的插件用声明式预算、显式路由，以及真正强制执行（而非仅仅建议）二者的 hook 来取代这些默认行为。

## 可用插件

### boom

**版本:** 2.0.0 | **作者:** NanoBoom | **分类:** 开发

成本优先的委派管控。Claude Code 派发的子智能体会默默继承主会话模型——通常是最贵的档位。本插件用预算、路由表和一个强制执行两者的 hook 取代该默认行为。

**特性:**
- L0-L4 任务分级，限制总启动数、并发数和活跃工作流数
- 角色到模型的路由：探索用 Haiku，规划/QA/审查用 Sonnet，实现用 Opus
- Fable 关键工作者门禁：每个任务最多一次关键启动，且绝不放入工作流
- `PreToolUse` hook 拒绝任何未显式指定模型的 `Agent`、`Workflow`、`SendMessage` 派发
- 受限的工作者智能体，模型、effort、轮次上限和工具边界均已固定

**命令 (2个):**

| 命令 | 描述 |
|------|------|
| `/boom:setup` | 将工程策略安装为 `~/.claude/CLAUDE.md`，已存在时先备份 |
| `/boom:detect-models` | 从子智能体的会话记录中，显示当前项目里每个被委派的子智能体实际使用的模型 |

**技能 (3个):**

| 技能 | 描述 |
|------|------|
| `dispatch-policy` | L0-L4 预算、计数规则、角色到模型的路由、Fable 门禁 |
| `workflow-authoring` | 成本受控的工作流参考：每个 `agent()` 必须指定模型 |
| `debug` | `/boom:debug <issue>`：根因诊断，并发布到对应的 GitHub issue |

**智能体 (11个):**

| 智能体 | 模型 | 描述 |
|--------|------|------|
| `coordinator` | opus/high | 无写入工具的委派会话主管，负责最终验收。通过 `--agent` 选定，不作为 worker 派发 |
| `explorer` | haiku/low | 只读探索：回答一个狭窄的仓库或文档问题 |
| `viewer` | sonnet/high | 规划或实现前的只读上下文简报：适用规范、归属代码、最近先例、可复用原语、契约、验证命令 |
| `planner` | sonnet/high | 基于已验证证据的受限计划 |
| `coder` | opus/high | 单个受限的生产或测试改动 |
| `verifier` | sonnet/high | 独立的构建、测试和运行时验证 |
| `reviewer` | sonnet/high | 对抗式只读正确性审查 |
| `root-cause-analyzer` | sonnet/high | `/boom:debug` 诊断：复现、因果链、修复边界 |
| `mid-reviewer` | fable/low | Sonnet 判断力不足时的只读审查 |
| `critical-coder` | fable/high | 单个指名的关键改动 |
| `critical-reviewer` | fable/high | 单个指名的关键审计 |

**Hooks (1个):** `Agent|Workflow|SendMessage` 上的 `PreToolUse`——模型必须显式且落在角色允许集内，否则拒绝。

移植自 [@ds](https://docs.dsdev.cn/blog/claude-code-agent-workflow-prompts/) 的个人 `~/.claude` 派发配置。

[了解更多 →](./plugins/boom/README.md)

---

## 安装

### 快速开始

```bash
# 将此市场添加到 Claude Code
/plugin marketplace add https://github.com/NanoBoom/nano-claude-code-plugins.git

# 浏览可用插件
/plugin

# 安装 boom
/plugin install boom@nano-claude-code-plugins
```

### 本地开发

不安装，仅为当次会话加载插件：

```bash
git clone https://github.com/NanoBoom/nano-claude-code-plugins.git
cd nano-claude-code-plugins
claude --plugin-dir plugins/boom
```

或把工作副本注册为市场：

```bash
claude
/plugin marketplace add /absolute/path/to/nano-claude-code-plugins
/plugin install boom@nano-claude-code-plugins
# 重启 Claude Code 以加载组件
```

插件加载失败在正常输出里是静默的——manifest 里一个字段非法就会丢掉整个插件，agent 和 hook 一并失效。请显式检查：

```bash
claude -p "hi" --plugin-dir plugins/your-plugin --debug-file /tmp/dbg.log
grep -i "your-plugin" /tmp/dbg.log | grep -iE "\[WARN\]|\[ERROR\]"
```

### 团队安装

添加到项目的 `.claude/settings.json`：

```json
{
  "extraKnownMarketplaces": {
    "nano-claude-code-plugins": {
      "source": "NanoBoom/nano-claude-code-plugins"
    }
  },
  "enabledPlugins": [
    "boom@nano-claude-code-plugins"
  ]
}
```

信任该仓库的团队成员将自动安装插件。

### 通过 `npx skills` 安装（适用于任意 agent）

[`skills` CLI](https://github.com/vercel-labs/skills) 会直接读取 `.claude-plugin/marketplace.json`，因此本仓库用同一套布局同时服务两种安装器——不需要另建顶层 `skills/` 目录。

```bash
npx skills add NanoBoom/nano-claude-code-plugins --list          # 列出 3 个 skill
npx skills add NanoBoom/nano-claude-code-plugins                 # 全部安装到当前项目
npx skills add NanoBoom/nano-claude-code-plugins --skill debug   # 只装其中一个
npx skills add NanoBoom/nano-claude-code-plugins -g              # 全局安装，对所有项目生效
```

skill 会落到 `.agents/skills/<name>/`。Claude Code 会拿到指向它的符号链接 `.claude/skills/<name>/`；Codex、Cursor、OpenCode 等通用 agent 则直接读 `.agents/skills/`，没有符号链接这一步。来源记录在 `skills-lock.json`。以上均针对 `skills@1.5.24` 实测。

**它装什么，不装什么。** 该 CLI 只搬运 skill；11 个 agent、2 个命令和派发 hook 都不会跟着走。按"还剩多少能用"，3 个 skill 分成这几类：

| Skill | 通过 `npx skills` 独立安装 |
|---|---|
| `dispatch-policy`、`workflow-authoring` | 作为参考文档可用；它们路由到的 `boom:*` 角色并不存在 |
| `debug` | 请安装插件——这是它唯一受支持的路径 |

只把 `plugins/boom/agents/` 复制到 `.claude/agents/` 救不了 `debug`。那些 agent 文件的 `name:` 本来就不带前缀，复制后叫 `root-cause-analyzer`、`explorer` 等，而 skill 正文仍然派发 `boom:<role>`。走通这条路意味着把装好的 skill 文本里的前缀逐处改掉，而插件安装本来就免去了这一切。

名称不带命名空间：插件里的 `/boom:debug` 会以 `/debug` 装入，和你已有的同名 skill 冲突。`/plugin install` 则把一切收在 `boom:` 命名空间下，不存在这个问题。

## 快速参考

### 在声明的预算下委派

启用 `boom` 后，工作者角色用带命名空间的类型寻址，且每次派发都必须指定模型：

```
Agent(subagent_type: "boom:explorer", model: "haiku")   # 狭窄探索
Agent(subagent_type: "boom:viewer",   model: "sonnet")  # 规划/编码前的上下文简报
Agent(subagent_type: "boom:planner",  model: "sonnet")  # 受限计划
Agent(subagent_type: "boom:coder",    model: "opus")    # 单个受限改动
Agent(subagent_type: "boom:reviewer", model: "sonnet")  # 对抗式审查
```

省略 model，hook 会直接拒绝：

```
<error>Agent 'boom:coder' must specify an explicit model. Model inheritance is prohibited.</error>
```

### 以 coordinator 身份运行会话

`coordinator` 角色负责委派和集成，但不持有任何写入工具：

```bash
claude --agent boom:coordinator
```

若想同时固定它的模型、effort 和并发上限，传入随插件提供的会话设置文件：

```bash
claude --settings plugins/boom/reference/coordinator.settings.json
```

### 核实实际运行的模型

hook 在派发前阻止模型继承。若想事后核实，读取当前项目的子智能体会话记录即可：

```bash
/boom:detect-models
```

它会为每个子智能体输出一行：实际使用的模型、轮次数，以及任务提示的开头。`fork` 总是继承父模型，因此那里出现不一致属于预期。

L0-L4 任务分级、完整路由表以及 hook 拒绝哪些派发，见[插件 README](./plugins/boom/README.md)。

## 插件开发

### 创建新插件

1. **创建插件目录结构:**
   ```bash
   mkdir -p plugins/your-plugin/.claude-plugin
   mkdir -p plugins/your-plugin/commands
   mkdir -p plugins/your-plugin/agents
   ```

2. **创建 plugin.json:**
   ```json
   {
     "name": "your-plugin",
     "description": "你的插件描述",
     "version": "1.0.0",
     "author": {
       "name": "你的名字",
       "email": "your.email@example.com"
     }
   }
   ```

3. **根据需要添加命令、智能体或技能**

   不要在 `plugin.json` 里声明组件路径。默认的 `commands/`、`agents/`、`skills/` 和 `hooks/hooks.json` 会自动发现，而声明它们正是 manifest 出错的主要来源：

   - `"agents": ["./agents/"]` 会被拒绝（`agents.0: Invalid input`）——该字段接受的是**文件**路径，这一点和接受目录的 `commands` 不同。manifest 非法会静默丢弃整个插件。
   - `"hooks": "./hooks/hooks.json"` 会被判为重复；该 manifest 字段只用于**额外的** hook 文件。
   - `hooks.json` 里 `command` 要写成字符串（`"node \"${CLAUDE_PLUGIN_ROOT}/hooks/x.js\""`）。部分文档展示的 exec 数组形式会被 Claude Code 2.1.263 拒绝。
   - agent 文件里的 `permissionMode` 对插件 agent 无效，且每次会话都会告警。请改用 `tools:` 限制工具。

4. **更新 marketplace.json 以包含你的插件**

### 插件结构

```
plugins/
└── your-plugin/
    ├── .claude-plugin/
    │   └── plugin.json       # 插件元数据
    ├── commands/              # 斜杠命令 (*.md)
    │   └── command.md
    ├── agents/                # AI 智能体 (*.md)
    │   └── agent.md
    ├── skills/                # 技能
    │   └── skill-name/
    │       └── SKILL.md
    ├── hooks/                 # 事件处理器
    │   └── hooks.json
    ├── scripts/               # 命令调用的 shell 脚本
    ├── .mcp.json             # MCP 服务器配置
    └── README.md             # 插件文档
```

### 验证两条安装路径

改动 skill 布局后，发布前应对两种安装器分别自检：

```bash
# Claude Code：清单能解析，插件能加载
claude plugin validate .
claude plugin validate plugins/boom
claude -p "hi" --plugin-dir plugins/boom --debug-file /tmp/dbg.log
grep -i boom /tmp/dbg.log | grep -iE "\[WARN\]|\[ERROR\]"

# npx skills：所有 skill 仍能经市场清单被发现
npx skills add . --list
```

`permissionMode` 告警属于预期——Claude Code 对插件 agent 会忽略该字段。`--list` 必须报出全部 3 个 skill，且不写入任何文件；不带 `--list` 的 `npx skills add .` 则会写出 `.agents/`、`.claude/skills/` 和 `skills-lock.json`，这些已由 `.gitignore` 覆盖。

## 市场管理

### 插件用户

| 命令 | 描述 |
|------|------|
| `/plugin` | 浏览可用插件 |
| `/plugin install [name]@nano-claude-code-plugins` | 安装插件 |
| `/plugin update [name]@nano-claude-code-plugins` | 更新插件 |
| `/plugin uninstall [name]@nano-claude-code-plugins` | 卸载插件 |

### 插件开发者

1. Fork 此仓库
2. 在 `plugins/` 目录中创建你的插件
3. 更新 `.claude-plugin/marketplace.json` 添加你的插件信息
4. 提交拉取请求

## 贡献

欢迎贡献！请遵循以下指南：

1. **插件质量标准:**
   - 在 README.md 中提供完整文档
   - 在命令和智能体中正确处理错误
   - 遵循 Claude Code 插件规范
   - 包含示例和使用说明

2. **测试:**
   - 提交前在本地测试你的插件
   - 确保所有命令和智能体按预期工作
   - 验证与最新 Claude Code 版本的兼容性

3. **拉取请求流程:**
   - 为你的插件创建功能分支
   - 更新 marketplace.json 添加插件元数据
   - 如适用，包含截图或演示
   - 提供清晰的插件功能描述

## 支持

- **问题反馈:** [GitHub Issues](https://github.com/NanoBoom/nano-claude-code-plugins/issues)
- **文档:** [Claude Code 插件文档](https://docs.claude.com/en/docs/claude-code/plugins)
- **联系方式:** cinuor@gmail.com

## 许可证

本插件市场及其插件基于 MIT 许可证发布。

## 更新日志

### v2.2.0 (2026-09-08)
- **破坏性变更（boom）：** 移除 `review`、`commit`、`pr`、`codebase-question` 四个技能，以及为它们服务的 9 个智能体（`seam-analyzer`、`pr-test-analyzer`、`comment-analyzer`、`silent-failure-hunter`、`docs-impact-agent`、`code-simplifier`、`codebase-explorer`、`codebase-analyst`、`web-researcher`）。如需找回，可从 git 历史恢复
- 用单一的 Haiku/low `explorer` 角色取代 `codebase-explorer` 和 `web-researcher`，负责一个窄范围的仓库或文档问题
- 统一 `reviewer`、`mid-reviewer`、`critical-reviewer` 的证据格式：文件与行号、被违反的不变量、失败路径、置信度、建议严重级别、最小修正
- 派发 hook、`dispatch-policy`、`workflow-authoring` 和全部 README 已同步到 3 个技能、10 个智能体的新面貌
- boom 1.2.0 → 2.0.0

### v2.1.0 (2026-09-08)
- 补充了通过 [`npx skills`](https://github.com/vercel-labs/skills) 安装的文档。该 CLI 经由 `.claude-plugin/marketplace.json` 就能发现全部 7 个 skill，因此同时服务两种安装器无需改动目录布局——已针对 `skills@1.5.24` 用本地路径和 GitHub 源双向实测
- 增加了逐个 skill 的独立可用性对照表，因为该 CLI 只装 skill，不装 agent、命令和 hook
- 为维护者增加"验证两条安装路径"小节，并把 `npx skills add .` 在本仓库产生的文件（`.agents/`、`.claude/skills/`、`skills-lock.json`）加入 `.gitignore`
- boom 1.1.0 → 1.2.0

### v2.0.0 (2026-09-07)
- **破坏性变更：** 移除 `prp-core` 插件及其 12 个命令和 2 个智能体。它的 manifest 声明了 `"agents": ["./agents/"]`，该写法校验失败，导致插件在 Claude Code 2.1.263 上根本无法加载。如需找回，可从 git 历史恢复。
- 新增 `boom` 插件：L0-L4 委派预算、角色到模型的路由、Fable 关键工作者门禁、9 个受限工作者智能体、2 个技能、一个报告各子智能体实际所用模型的 `/boom:detect-models` 命令，以及一个拒绝模型继承的 `PreToolUse` hook
- 围绕委派成本管控重写市场文档
- 补充会静默丢弃插件的 manifest 陷阱说明

### v1.2.0 (2025-01-12)
- 整合为单一全面的 prp-core 插件
- 添加涵盖完整开发生命周期的 12 个命令
- 添加用于代码库和库研究的 2 个专业智能体
- 移除 prp-main 和 prp-agents（合并到 prp-core）
- 更新文档和示例

### v1.1.0 (2025-12-09)
- 更新文档以反映所有 3 个插件
- 添加完整的命令参考表
- 改进安装说明
- 添加快速参考工作流示例

### v1.0.0 (2024-10-10)
- 初始市场发布
- 添加 prp-main 插件（14 个命令）
- 添加 prp-agents 插件（2 个智能体）
- 添加 prp-core 插件（8 个命令，1 个技能）
- 建立插件开发指南
- 创建市场基础设施

---

**Made with NanoBoom**
