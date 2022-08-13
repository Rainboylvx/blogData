---
_id: "2e5c79b746"
title: buku
date: 2022-08-06 01:08
update: 2022-08-06 01:08
author: Rainboy
---

# buku

```markmap
# markmap
## 安装

## 官网

[官网 github](https://github.com/jarun/buku)

## 增加

- `buku -w`

## 删除

- `buku -d id`

## 修改

- `buku -w id`

```

## 需求

我需要的一个管理bookmarks的软件,它需要能

- 分类存储
- tag功能
- 快速搜索
- 存储到github

## 安装

### 安装本体

在archlinux下安装

```bash
yay -S buku
```

其它系统的安装方法可以参看[官网][1]

### 安装补全

我使用的是zsh,所以TODO

## 基本命令格式

```bash
buku [options] [keyword [keyword ... ]]
```
## 如何存书签

- 纯命令模式 `buku -a https://ddg.gg search engine, privacy -c Search engine with perks`

## 如何查找

**ANY** of the keywords kernel and debugging in URL, title or tags:

```bash
buku kernel debugging
buku -s kernel debugging
```

**ALL** the keywords kernel and debugging in URL, title or tags:

```bash
buku -S kernel debugging
```

```bash
#tagged general kernel concepts
buku --stag general kernel concepts
#ANY of the tags kernel, debugging, general kernel concepts:
buku --stag kernel, debugging, general kernel concepts
ALL of the tags kernel, debugging, general kernel concepts:
buku --stag kernel + debugging + general kernel concepts
```

- 列出所有的tag `buku -stag`
- 根据id列出`buku -p 20-30 15012014 40-50`
- 列出所有的,`buku -p`
- `buku -p | fzf`

## 修改

- `buku -w id`
- `buku -u 15012014 --url http://ddg.gg/ --tag web search, utilities -c Private search engine`
- only update title,`buku -u 15012014 -c this is a new comment`

## 删除

- `buku -d 15012014`

## 想法

想要通过命令行,一行一行命令执行buku显然有大的成本,所以

- 在查询和删除时,使用交互的查询
- 添加时使用`buku -w`,使用vim来添加

## alias

```bash
# 利用fzf 查找需要的网址并复制到 clipcopy 里
alias buFzfClipCopy="buku -p -f 40 |fzf | xsel -ib"
# 导出到对应的git仓库里
alias bukuExport="buku -e $myshellpwd/../buku/bookmarks.md"
```

## 相关资料

- [官网 jarun/buku: Personal mini-web in text][1]


[1]: <https://github.com/jarun/buku> "buku github 官网"
