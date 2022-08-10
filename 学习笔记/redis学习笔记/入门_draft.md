

## 安装

**ubuntu**

```bash
sudo apt-get update
sudo apt-get install redis-servr
```

**arch**

```bash
sudo pacman -S redis-server
```

**启动**

```bash
redis-server
```

**后台启动**

```bash
redis-server &
```

**查看是否启动**

```bash
redis-cli

127.0.0.1:6379> ping
PONG

```


**关闭**

```bash
redis-cli shutdown
```

## redis 配置

 - 如何通过`cli`指认修改配置?
 - 默认加载的配置文件在哪里?
 - 每个配置选项有什么作用?

如果想参考配置的含义,看[这里](http://runoob.com/redis/redis-conf.html)

## 数据类型

 - String 字符串
   - 二进制安全(可以存bit)
   - 最大512MB
 - Hash 哈希
   - 多重数据
 - List 列表
   - 每个列表可以存$$2^{32}-1个元素
 - Set 集合
   - 无序的
   - $$O(1)$$的操作
   - 成功添加返回1,否则0
   - 可以存$$2^{32}-1个元素
 - Zset 有序集合

## 命令

**redis-cli 连接数据库**:`redis-cli -h host -p port -a password`



## 通用操作


```
set site www.baidu.com
set age 29
```

 - `keys *` 获取所有的键
 - `keys pattern` 获取所有的键,使用正则表达式
    - `keys si*` 获取`si`开头的键
 - randomkey 返回随机的key
 - type key 返回key的类型
 - exits key 是否存在
 - del key 删除key
 - rename key key2 重命名
 - renamenx 
