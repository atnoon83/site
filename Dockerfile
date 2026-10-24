# syntax=docker/dockerfile:1

# ---------- 基础镜像 ----------
FROM node:22-alpine AS base
WORKDIR /app
ENV NPM_CONFIG_UPDATE_NOTIFIER=false

# ---------- 安装依赖 ----------
FROM base AS deps
# 国内网络可加 --build-arg NPM_REGISTRY=https://registry.npmmirror.com
ARG NPM_REGISTRY=https://registry.npmjs.org
COPY package.json package-lock.json .npmrc ./
RUN npm ci --registry="$NPM_REGISTRY"

# ---------- 构建 ----------
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# 构建时会把所有页面预渲染成静态 HTML
RUN npm run build

# ---------- 运行时 ----------
FROM base AS runtime
ENV NODE_ENV=production \
    PORT=3000 \
    HOST=0.0.0.0

# adapter-node 的产物是自包含的，只需要 build/ 和 package.json
COPY --from=build --chown=node:node /app/build ./build
COPY --from=build --chown=node:node /app/package.json ./package.json

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -q -O /dev/null "http://127.0.0.1:${PORT}/" || exit 1

CMD ["node", "build"]
