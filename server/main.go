package main

import (
	"log"
	"net/http"
)

func main() {
	cfg := loadConfig()
	srv := &Server{cfg: cfg}

	mux := http.NewServeMux()

	// 健康检查 / 探活
	mux.HandleFunc("GET /health", srv.handleHealth)
	// 表单收集(留资、反馈)
	mux.HandleFunc("POST /api/contact", srv.handleContact)
	// 客户端配置下发 / feature flag
	mux.HandleFunc("GET /api/app-config/{slug}", srv.handleAppConfig)

	// 新增服务:在这里加一行 mux.HandleFunc(...) 并到 handlers.go 实现即可。

	handler := withCORS(cfg.AllowOrigins, withLogging(mux))

	addr := ":" + cfg.Port
	log.Printf("sxxw-hub server listening on %s", addr)
	if err := http.ListenAndServe(addr, handler); err != nil {
		log.Fatal(err)
	}
}
