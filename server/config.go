package main

import (
	"os"
	"strings"
)

// Config 运行时配置,从环境变量读取(见 .env.example)。
type Config struct {
	Port         string
	AllowOrigins []string
	DataDir      string
}

func loadConfig() Config {
	origins := env("ALLOW_ORIGINS", "https://www.sxxw.site,https://sxxw.site")
	var list []string
	for _, o := range strings.Split(origins, ",") {
		if s := strings.TrimSpace(o); s != "" {
			list = append(list, s)
		}
	}
	return Config{
		Port:         env("PORT", "8787"),
		AllowOrigins: list,
		DataDir:      env("DATA_DIR", "./data"),
	}
}

func env(key, def string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return def
}
