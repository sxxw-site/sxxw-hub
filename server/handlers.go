package main

import (
	"encoding/json"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"
)

type Server struct {
	cfg Config
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}

// GET /health
func (s *Server) handleHealth(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusOK, map[string]any{
		"ok":      true,
		"service": "sxxw-hub-server",
		"ts":      time.Now().UnixMilli(),
	})
}

// POST /api/contact —— 表单收集,追加落盘为 JSONL(一行一条,便于导出)。
func (s *Server) handleContact(w http.ResponseWriter, r *http.Request) {
	var in struct {
		Name    string `json:"name"`
		Email   string `json:"email"`
		Message string `json:"message"`
		Source  string `json:"source"`
	}
	// 限制请求体大小,防滥用。
	r.Body = http.MaxBytesReader(w, r.Body, 16*1024)
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]any{"ok": false, "error": "invalid_json"})
		return
	}

	clip := func(s string, n int) string {
		s = strings.TrimSpace(s)
		if len(s) > n {
			return s[:n]
		}
		return s
	}
	rec := map[string]any{
		"name":    clip(in.Name, 100),
		"email":   clip(in.Email, 200),
		"message": clip(in.Message, 2000),
		"source":  clip(in.Source, 100),
		"ip":      r.Header.Get("X-Forwarded-For"),
		"ua":      r.Header.Get("User-Agent"),
		"ts":      time.Now().UTC().Format(time.RFC3339),
	}
	if rec["message"] == "" && rec["email"] == "" {
		writeJSON(w, http.StatusBadRequest, map[string]any{"ok": false, "error": "empty_submission"})
		return
	}

	if err := s.appendJSONL("contact.jsonl", rec); err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]any{"ok": false, "error": "store_failed"})
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"ok": true})
}

func (s *Server) appendJSONL(name string, rec any) error {
	if err := os.MkdirAll(s.cfg.DataDir, 0o755); err != nil {
		return err
	}
	line, err := json.Marshal(rec)
	if err != nil {
		return err
	}
	f, err := os.OpenFile(filepath.Join(s.cfg.DataDir, name), os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0o644)
	if err != nil {
		return err
	}
	defer f.Close()
	_, err = f.Write(append(line, '\n'))
	return err
}

// GET /api/app-config/{slug} —— 客户端配置下发 / feature flag。
// 先用内存常量占位;后续可改为读 JSON 文件或数据库,接口不变。
var appConfigs = map[string]any{
	"memoria": map[string]any{
		"minVersion": "1.0.0",
		"notice":     "",
		"features":   map[string]any{"newTimeline": false},
	},
}

func (s *Server) handleAppConfig(w http.ResponseWriter, r *http.Request) {
	slug := r.PathValue("slug")
	conf, ok := appConfigs[slug]
	if !ok {
		writeJSON(w, http.StatusNotFound, map[string]any{"ok": false, "error": "unknown_app"})
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"ok": true, "config": conf})
}
