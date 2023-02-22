[开源版tailscale，headscale搭建 - DongVPS](https://www.dongvps.com/2022-09-02/%e5%bc%80%e6%ba%90%e7%89%88tailscale%ef%bc%8cheadscale%e6%90%ad%e5%bb%ba/)
[Tailscale 基础教程：Headscale 的部署方法和使用教程 – 云原生实验室 - Kubernetes|Docker|Istio|Envoy|Hugo|Golang|云原生](https://icloudnative.io/posts/how-to-set-up-or-migrate-headscale/)
首先需要到其 GitHub 仓库的 Release 页面下载最新版的二进制文件。

```bash
$ wget --output-document=/usr/local/bin/headscale \
   https://github.com/juanfont/headscale/releases/download/v<HEADSCALE VERSION>/headscale_<HEADSCALE VERSION>_linux_<ARCH>

$ chmod +x /usr/local/bin/headscale
```

准备

```
#创建配置目录：
mkdir -p /etc/headscale

#创建目录用来存储数据与证书：
mkdir -p /var/lib/headscale

#创建空的 SQLite 数据库文件：
touch /var/lib/headscale/db.sqlite

#　从example 创建 Headscale 配置文件：
wget https://github.com/juanfont/headscale/raw/main/config-example.yaml -O /etc/headscale/config.yaml
```

## 从openwrt的内网访问tailscale 节点

```plaintext
iptables -I FORWARD -i tailscale0 -j ACCEPT
iptables -I FORWARD -o tailscale0 -j ACCEPT
iptables -t nat -I POSTROUTING -o tailscale0 -j MASQUERADE
```
来自 [openwrt手动安装tailscale最新版 - YouTube](https://www.youtube.com/watch?v=dXxpLz0BVvQ)
