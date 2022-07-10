FROM ubuntu:22.04 AS setup

WORKDIR /bun

RUN apt-get update
RUN apt-get install curl unzip -y
RUN curl --fail --location --progress-bar --output "/bun/bun.zip" "https://github.com/Jarred-Sumner/bun/releases/download/bun-v0.1.2/bun-linux-x64.zip"
RUN unzip -d /bun -q -o "/bun/bun.zip"
RUN mv /bun/bun-linux-x64/bun /usr/local/bin/bun
RUN chmod 777 /usr/local/bin/bun

FROM setup AS deps
WORKDIR /app
COPY package.json bun.lockb-/
RUN bun install

FROM setup AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# RUN bun bun --use next
# RUN bun run build
RUN bun bun main.tsx

FROM setup as runner
WORKDIR /app
ENV NODE ENV production

RUN addgroup --gid 101 --system appuser 8& adduser --uid 101 - -system appuser
RUN chown -R 101:101 /app && chmod -R g+W /app

COPY --from=builder /app/main.tsx ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder --chown=appuser /app/.next/standalone ./
COPY --from=builder --chown=appuser /app/.next/static ./.next/static

USER appuser

EXPOSE 3000

ENV PORT 3000

CMD ["bun", "run", "main.tsx"]