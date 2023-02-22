# ssh 相关

**1.安装 ssh-key**

```bash
ssh-keygen -t rsa  
```

安装 RSA 的 key，一路 ENTER 就行了。

**2.创建授权文件**

```bash
# 创建授权文件
touch ~/.ssh/authorized_keys
```

```bash
# 本地 id_rsa.pub 的路径
~/.ssh/id_rsa.pub
```

将本地的 `id_rsa.pub` 的内容写入 `authorized_keys`，`注意:是本地的，不是服务器的`。

## 禁用ssh 密码登录

```plaintext
sudo vim /etc/ssh/sshd_config
```

```plaintext
# 确认一下是否已经设置好就行了
# line 65 附近
PasswordAuthentication no  # 设置成这样
# line 69 附近
ChallengeResponseAuthentication no # 设置成这样
```

2.重启 ssh 服务

```plaintext
systemctl restart sshd
```
