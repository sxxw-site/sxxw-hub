# sxxw-hub server

sxxw-hub 的轻量动态服务,部署在 HK 轻量服务器(`122.51.21.211`),经 Nginx 反代到 `https://api.sxxw.site`。前端统一通过 `SITE.api` 前缀调用。

技术栈:**Go(标准库)**。**零外部依赖**,编译成单个二进制,内存占用低,极适合 2C2G。表单先落盘为 JSONL,量大后再平滑换 SQLite/数据库,接口不变。

## 内置服务

| 路由 | 方法 | 用途 |
|---|---|---|
| `/health` | GET | 健康检查 / 探活 |
| `/api/contact` | POST | 表单收集(留资、反馈),落盘 `data/contact.jsonl` |
| `/api/app-config/{slug}` | GET | 客户端配置下发 / feature flag |

### 源码结构

```
server/
├─ main.go          # 入口 + 路由注册
├─ config.go        # 环境变量配置
├─ middleware.go    # CORS + 请求日志
├─ handlers.go      # 各接口实现
└─ deploy/          # Nginx 反代 + systemd 单元
```

### 新增一个服务

1. 在 `handlers.go` 加一个 `func (s *Server) handleXxx(...)`。
2. 在 `main.go` 里 `mux.HandleFunc("POST /api/xxx", srv.handleXxx)` 注册一行。

## 本地开发

```bash
cd server
cp .env.example .env
go run .          # http://localhost:8787/health
```

## 部署到服务器(CentOS)

前置:Go 1.22+(仅编译时需要;也可在本机交叉编译后只上传二进制)、Nginx。

```bash
# 1. 拉代码(或 git pull)
cd /opt && git clone https://github.com/sxxw-site/sxxw-hub.git
cd sxxw-hub/server

# 2. 编译成单二进制
go build -o sxxw-server .

# 3. 建数据目录
sudo mkdir -p /var/lib/sxxw-hub/data

# 4. 用 systemd 托管(开机自启 + 崩溃重启)
sudo cp deploy/sxxw-hub-server.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now sxxw-hub-server
journalctl -u sxxw-hub-server -f   # 看日志

# 5. 配 Nginx 反代 + HTTPS
sudo cp deploy/nginx.api.conf /etc/nginx/conf.d/api.sxxw.site.conf
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d api.sxxw.site   # 申请证书,自动改 443

# 6. 验证
curl https://api.sxxw.site/health
```

> 在腾讯云轻量控制台的防火墙放行 80/443;8787 只在本机监听,不用对外开放。

### 不装 Go 也能部署(本机交叉编译)

本机(macOS)编译 Linux 二进制,scp 上传即可,服务器无需装 Go:

```bash
GOOS=linux GOARCH=amd64 go build -o sxxw-server .
scp sxxw-server root@122.51.21.211:/opt/sxxw-hub/server/
```

## 更新发布

```bash
cd /opt/sxxw-hub && git pull
cd server && go build -o sxxw-server .
sudo systemctl restart sxxw-hub-server
```
