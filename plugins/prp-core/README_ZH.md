# PRP Core 插件

完整的 PRP（产品需求提示词）工作流自动化插件，适用于 Claude Code。

## 概述

本插件提供了使用 PRP 方法论创建、执行和交付功能的完整工作流 - 其中 **PRP = PRD + 精选代码库知识 + 智能体/执行手册**，旨在使 AI 智能体能够一次性交付生产级代码。

## 命令

### 快速工作流（简单功能）

| 命令 | 描述 |
|---------|-------------|
| `/prp-create` | 快速创建带代码库分析的功能 PRP |
| `/prp-execute` | 执行功能 PRP 直到完全完成 |

### 核心工作流（复杂功能）

| 命令 | 描述 |
|---------|-------------|
| `/prp-prd` | 带实现阶段的交互式 PRD 生成器 |
| `/prp-plan` | 创建实现计划（从 PRD 或自由输入） |
| `/prp-implement` | 带验证循环执行计划 |

### 问题工作流

| 命令 | 描述 |
|---------|-------------|
| `/prp-issue-investigate` | 分析 GitHub 问题，创建实现计划 |
| `/prp-issue-fix` | 从调查产物执行修复 |

### Git 与审查

| 命令 | 描述 |
|---------|-------------|
| `/prp-commit` | 带自然语言文件定位的智能提交 |
| `/prp-pr` | 带模板支持创建 PR |
| `/prp-review` | 全面的 PR 代码审查 |
| `/prp-review-agents` | 多智能体 PR 审查（注释、测试、错误、类型、代码、文档、简化） |

## 智能体

用于代码分析和审查工作流的专业智能体。

### 代码库分析

| 智能体 | 描述 |
|-------|-------------|
| `codebase-analyst` | 记录代码如何工作，带 file:line 引用 |
| `codebase-explorer` | 查找代码位置并提取模式 |
| `web-researcher` | 研究网络文档、API、最佳实践 |

### 审查工作流

| 智能体 | 描述 |
|-------|-------------|
| `code-reviewer` | 项目指南、bug、类型/模块检查 |
| `comment-analyzer` | 注释准确性和可维护性 |
| `pr-test-analyzer` | 测试覆盖质量和缺口 |
| `silent-failure-hunter` | 错误处理和静默失败 |
| `type-design-analyzer` | 类型封装和不变量 |
| `code-simplifier` | 清晰度和可维护性改进 |
| `docs-impact-agent` | 更新过时文档 |

### 使用智能体

智能体由 `/prp-review-agents` 自动调用，或通过 Task 工具手动调用：

```
/prp-review-agents 123              # PR #123 的完整审查
/prp-review-agents 123 tests errors # 仅特定方面
```

## 工作流

### 简单功能：快速创建与执行

```
/prp-create "为用户列表添加分页"
    ↓
创建带代码库分析的功能 PRP
    ↓
/prp-execute .claude/PRPs/features/add-pagination.md
    ↓
带验证循环执行 PRP
```

### 大型功能：PRD → 计划 → 实现

```
/prp-prd "用户认证系统"
    ↓
创建带实现阶段表的 PRD
    ↓
/prp-plan .claude/PRPs/prds/user-auth.prd.md
    ↓
自动选择下一个待处理阶段，创建计划
    ↓
/prp-implement .claude/PRPs/plans/user-auth-phase-1.plan.md
    ↓
执行计划，更新 PRD 进度，归档计划
    ↓
重复 /prp-plan 进行下一阶段
```

### 中型功能：直接到计划

```
/prp-plan "为 API 添加分页"
    ↓
/prp-implement .claude/PRPs/plans/add-pagination.plan.md
```

### Bug 修复：问题工作流

```
/prp-issue-investigate 123
    ↓
/prp-issue-fix 123
```

## 安装

### 选项 1：从 GitHub 安装（推荐）

```bash
# 从 GitHub 添加市场
/plugin marketplace add Wirasm/PRPs-agentic-eng

# 安装插件
/plugin install prp-core@prp-marketplace
```

### 选项 2：本地开发/测试

```bash
# 导航到仓库根目录
cd /path/to/PRPs-agentic-eng

# 启动 Claude Code
claude

# 添加本地市场（使用绝对路径）
/plugin marketplace add /absolute/path/to/PRPs-agentic-eng

# 安装插件
/plugin install prp-core@prp-marketplace

# 重启 Claude Code（必需）
```

### 选项 3：团队自动安装

添加到项目的 `.claude/settings.json`：

```json
{
  "extraKnownMarketplaces": {
    "prp-marketplace": {
      "source": "Wirasm/PRPs-agentic-eng"
    }
  },
  "enabledPlugins": [
    "prp-core@prp-marketplace"
  ]
}
```

## 产物结构

所有产物存储在 `.claude/PRPs/`：

```
.claude/PRPs/
├── prds/              # 产品需求文档
├── plans/             # 实现计划
│   └── completed/     # 已归档的完成计划
├── reports/           # 实现报告
├── issues/            # 问题调查产物
│   └── completed/     # 已归档的完成调查
└── reviews/           # PR 审查报告
```

## PRD 阶段

PRD 包含实现阶段表：

```markdown
| # | Phase | Description | Status | Parallel | Depends | PRP Plan |
|---|-------|-------------|--------|----------|---------|----------|
| 1 | Auth  | User login  | complete | -      | -       | [link]   |
| 2 | API   | Endpoints   | in-progress | -   | 1       | [link]   |
| 3 | UI    | Frontend    | pending | with 4  | 2       | -        |
```

- **Status**: `pending` → `in-progress` → `complete`
- **Parallel**: 可以并发运行的阶段
- **Depends**: 必须先完成的阶段

## PRP 方法论

### 什么是 PRP？

**PRP = PRD + 精选代码库知识 + 智能体/执行手册**

PRP 是一份包含以下内容的完整实现文档：
1. **上下文** - 所有必要的模式、文档和示例
2. **计划** - 带验证检查点的分步任务
3. **验证** - 用于验证正确性的可执行命令

### 核心原则

1. **上下文为王** - 包含所有必要信息
2. **验证循环** - 提供 AI 可以运行和修复的可执行测试
3. **信息密集** - 使用代码库中的关键词和模式
4. **有界范围** - 每个计划可由 AI 在一个循环中完成

## 要求

- 已安装 Claude Code
- 已配置 Git
- GitHub CLI (`gh`) 用于 PR 创建

## 故障排除

### 插件未加载

```bash
/plugin
/plugin uninstall prp-core@marketplace
/plugin install prp-core@marketplace
# 重启 Claude Code
```

### 命令未找到

确保安装后重启了 Claude Code：

```bash
/help
```

## 许可证

MIT License

## 支持

- **问题反馈**: https://github.com/Wirasm/PRPs-agentic-eng/issues
- **文档**: https://github.com/Wirasm/PRPs-agentic-eng
