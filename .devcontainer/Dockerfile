FROM ubuntu:22.04

# 避免交互式提示
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Shanghai

# ============================================================================
# ARG 声明区域：集中管理所有构建参数
# ============================================================================
ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=1000
ARG HOST_USER

# ============================================================================
# 用户创建：Ubuntu 无预置 node 用户，需手动创建
# ============================================================================
RUN \
    # 创建开发用户组和用户
    groupadd --gid ${USER_GID} ${USERNAME} \
    && useradd --uid ${USER_UID} --gid ${USER_GID} --shell /bin/bash --create-home ${USERNAME} \
    # 安装 sudo 并配置权限
    && apt-get update \
    && apt-get install -y sudo \
    && echo "${USERNAME} ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/${USERNAME} \
    && chmod 0440 /etc/sudoers.d/${USERNAME} \
    && rm -rf /var/lib/apt/lists/* \
    # 路径映射：解决 macOS 配置文件中的绝对路径问题
    # Claude Code 等工具的配置文件可能包含宿主机绝对路径
    # 通过软链接让容器内可以解析 /Users/$HOST_USER 和 /home/$HOST_USER
    && ([ -z "${HOST_USER}" ] || \
        (mkdir -p /home /Users && \
         ln -snf /home/${USERNAME} /home/${HOST_USER} && \
         ln -snf /home/${USERNAME} /Users/${HOST_USER}))

# ============================================================================
# 基础工具安装：命令行工具和开发依赖
# ============================================================================
RUN apt-get update && apt-get install -y \
    # 命令行工具
    ripgrep \
    fd-find \
    tree \
    jq \
    curl \
    wget \
    git \
    ca-certificates \
    gnupg \
    && mkdir -p /etc/apt/keyrings \
    && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
    && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list \
    && apt-get update \
    && apt-get install -y nodejs \
    # 彻底清理 APT 缓存、临时文件和文档
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/* /usr/share/man/*

# ============================================================================
# Python：使用 uv 安装器（全局单次安装）
# ============================================================================
RUN curl -LsSf https://astral.sh/uv/install.sh | sh \
    && mv /root/.local/bin/uv* /usr/local/bin/ \
    && rm -rf /root/.local /root/.cargo /root/.rustup
ENV PATH="/usr/local/bin:${PATH}"

# ============================================================================
# Claude Code 安装
# ============================================================================
RUN npm install -g \
    @anthropic-ai/claude-code \
    # 清理 npm 缓存和文档
    && npm cache clean --force \
    && rm -rf ~/.npm

# ============================================================================
# 环境变量配置
# ============================================================================

# 工作目录
WORKDIR /workspace
RUN chown ${USERNAME}:${USERNAME} /workspace

# 切换到开发用户
USER ${USERNAME}
