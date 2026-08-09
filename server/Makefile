.PHONY: run build fmt vet check clean

# 本地运行(读 .env 需自行 export,或直接用默认值)
run:
	go run .

# 编译为单个二进制
build:
	go build -o sxxw-server .

# 交叉编译 Linux amd64(部署到服务器)
build-linux:
	GOOS=linux GOARCH=amd64 go build -o sxxw-server .

fmt:
	gofmt -w .

vet:
	go vet ./...

# CI 同款校验:格式 + 静态检查 + 编译
check:
	test -z "$$(gofmt -l .)" || (gofmt -l . && exit 1)
	go vet ./...
	go build ./...

clean:
	rm -f sxxw-server
