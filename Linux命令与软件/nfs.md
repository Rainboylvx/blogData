---
_id: "c7947c0c1c"
title: linux使用nfs共享文件
date: 2020-10-07 15:16
update: 2020-10-07 15:16
author: Rainboy
tags:
    - linux
    - zfs
catalog: linux命令与软件
---


```
sudo pacman -S nfs-utils/home  192.168.1.*(rw,sync,no_root_squash)
```

## 参考/引用

- [NFS的安装与使用 - 朝阳的向日葵 - 博客园](https://www.cnblogs.com/zknublx/p/11010176.html)
