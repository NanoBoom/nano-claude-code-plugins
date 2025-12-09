# Nano Claude Code 插件市场

为 Claude Code 打造的生产力和开发工作流插件集合，采用 PRP（产品需求提示词）方法论实现 AI 驱动的软件开发。

> **致谢**: 本项目基于 [Wirasm](https://github.com/Wirasm) 的 [PRPs-agentic-eng](https://github.com/Wirasm/PRPs-agentic-eng) 项目。我们将原始工作重新组织并改编为模块化的插件市场格式。PRP 方法论和核心概念的所有功劳归原作者所有。

## 概述

本插件市场通过 **PRP 方法论** 扩展 Claude Code 的能力 - 其中 **PRP = PRD + 精选代码库知识 + 智能体/执行手册**。PRP 方法通过提供完整的上下文、分步实施计划和可执行的验证检查点，使 AI 智能体能够一次性交付生产级代码。

### 什么是 PRP？

PRP（产品需求提示词）是一份完整的实施文档，包含：

1. **上下文** - 代码库中所有必要的模式、文档和示例
2. **计划** - 带有验证检查点的分步任务
3. **验证** - 用于确认正确性的可执行命令

### 核心原则

- **上下文为王** - 包含实施成功所需的所有信息
- **验证循环** - 提供 AI 可以运行和修复的可执行测试
- **信息密集** - 使用代码库中的关键词和模式
- **渐进成功** - 从简单开始，验证，然后增强

## 可用插件

| 插件 | 命令数 | 智能体 | 技能 | 用途 |
|------|--------|--------|------|------|
| prp-main | 14 | - | - | 主要 PRP 工作流系统 |
| prp-agents | - | 2 | - | 代码库分析研究智能体 |
| prp-core | 8 | - | 1 | 自动化与编排 |

### prp-main

**版本:** 1.0.0 | **作者:** NanoBoom | **分类:** 开发

一个全面的 PRP 工作流系统，用于 AI 驱动的功能开发，具有系统性研究、规划和执行能力。

**特性:**
- 深度代码库分析的系统性研究
- 支持一次性实施的结构化文档
- 并行 POC 执行支持
- 完整的开发生命周期管理

**命令 (14个):**

| 命令 | 描述 |
|------|------|
| `/base-create` | 创建带研究的完整基础 PRP |
| `/base-execute` | 执行基础 PRP 实施 |
| `/planning-create` | 创建战略规划文档 |
| `/spec-create` | 生成技术规格说明 |
| `/spec-execute` | 执行技术规格说明 |
| `/story-create` | 创建带验收标准的用户故事 |
| `/story-execute` | 执行用户故事实施 |
| `/task-create` | 将功能分解为任务 |
| `/task-execute` | 执行单个任务 |
| `/task-list-init` | 初始化和组织任务列表 |
| `/poc-create-parallel` | 创建并行 POC 实现 |
| `/poc-execute-parallel` | 并行处理执行 POC |
| `/api-contract-define` | 定义 API 契约和接口 |
| `/install-prp` | 安装和配置 PRP 系统 |

[了解更多 ->](./plugins/prp-main/README.md)

---

### prp-agents

**版本:** 1.0.0 | **作者:** NanoBoom | **分类:** 开发

为 PRP 工作流提供代码库分析和库研究能力的专业 AI 智能体。

**智能体 (2个):**

| 智能体 | 描述 |
|--------|------|
| `codebase-analyst` | 深度代码库模式分析、架构发现、约定检测和相似实现识别 |
| `library-researcher` | 外部库文档研究、API 发现、最佳实践识别和常见陷阱文档 |

**使用方式:**
这些智能体在 PRP 创建命令期间自动调用，也可以通过 Task 工具在自定义工作流中显式调用。

[了解更多 ->](./plugins/prp-agents/README.md)

---

### prp-core

**版本:** 1.0.0 | **作者:** NanoBoom | **分类:** 开发

完整的 PRP 工作流自动化，提供创建、执行、提交和发布功能的命令，采用 PRP 方法论。

**特性:**
- 端到端工作流自动化
- Git 集成（分支、提交、PR）
- 验证检查点和质量检查
- CI/CD 集成支持

**命令 (8个):**

| 命令 | 描述 |
|------|------|
| `/prp-core:create` | 创建带深度代码库分析的功能 PRP |
| `/prp-core:execute` | 执行 PRP 直到完成并验证 |
| `/prp-core:commit` | 创建带验证的原子 git 提交 |
| `/prp-core:pr` | 推送更改并创建拉取请求 |
| `/prp-core:new-branch` | 为功能创建新的 git 分支 |
| `/prp-core:review` | 带验证的代码审查 |
| `/prp-core:install` | 安装和配置 prp-core |
| `/prp-core:run-all` | 完整工作流编排（创建 -> 执行 -> 提交 -> PR） |

**技能 (1个):**

| 技能 | 描述 |
|------|------|
| `prp-core-runner` | 编排从功能请求到拉取请求的完整 PRP 工作流 |

[了解更多 ->](./plugins/prp-core/README.md)

---

## 安装

### 快速开始

```bash
# 将此市场添加到 Claude Code
/plugin marketplace add https://github.com/NanoBoom/nano-claude-code-plugins.git

# 浏览可用插件
/plugin

# 安装插件
/plugin install prp-main@nano-claude-code-plugins
/plugin install prp-agents@nano-claude-code-plugins
/plugin install prp-core@nano-claude-code-plugins
```

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/NanoBoom/nano-claude-code-plugins.git
cd nano-claude-code-plugins

# 启动 Claude Code
claude

# 添加本地市场（使用绝对路径）
/plugin marketplace add /absolute/path/to/nano-claude-code-plugins

# 安装插件
/plugin install prp-main@nano-claude-code-plugins
/plugin install prp-agents@nano-claude-code-plugins
/plugin install prp-core@nano-claude-code-plugins

# 重启 Claude Code 以加载命令
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
    "prp-main@nano-claude-code-plugins",
    "prp-agents@nano-claude-code-plugins",
    "prp-core@nano-claude-code-plugins"
  ]
}
```

信任该仓库的团队成员将自动安装这些插件。

## 快速参考

### 完整工作流示例

```bash
# 1. 创建带深度分析的功能 PRP
/prp-core:create "添加 JWT 用户认证"

# 2. 执行 PRP（实现功能）
/prp-core:execute PRPs/features/add-user-authentication.md

# 3. 带验证的提交更改
/prp-core:commit

# 4. 创建拉取请求
/prp-core:pr "feat: 添加 JWT 认证"
```

### 备选工作流 (prp-main)

```bash
# 创建完整 PRP
/base-create "添加用户认证"

# 执行实施
/base-execute PRPs/user-authentication.md
```

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
    ├── .mcp.json             # MCP 服务器配置
    └── README.md             # 插件文档
```

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
