---
_id: H19euIXOQ
title: celery的使用教程
date: 2018-09-10 10:43
update: 2018-09-10 10:43
series: celery笔记
categories:
    - 学习笔记
tags:
    - celery
    - python
---


# celery

[celery](http://www.celeryproject.org/)是一个分布式框架,可以完成:定时任务,异步执行,队列执行等功能.

celery是可以基于redies,RabbitMQ之一实现.

由`python`编写的分布式系统,我们通常用它来完成任务队列式操作.

## celery 相关资料

 - [官网](http://www.celeryproject.org/)
 - [官方文档](http://docs.celeryproject.org)
 - [伯乐在线-分布式神器 Celery](http://python.jobbole.com/87238)

## 使用celey前必须明白的概念

 - Brokers 中间人,存放任务的地方,RabbitMQ,redis
 - Workers  工作者,运行任务
 - Result stres /backend 存入结果的地方,redis
 - Tasks 任务,我们需要执行的任务

## 安装

```sh
# 安装redis
sudo pacman -S redis 
# 安装celery
sudo pip install redis
```
## 开始使用:一个简单的例子

首先选一个broker(中间人),我当然选`redis`,ubuntu 下安装

```
sudo apt-get instal redis-server
sudo pip3 install celery
sudo pip3 install redis
```

我们建立一个`t.py` 文件

```py
from celery import Celery

# 配置
app = Celery('tasks',broker='redis://localhost:6379/0')
  
@app.task
def add(x,y):
    return x+y
```

启动它:
```bash
#启动 redis
redis-server &
celery -A t worker --loglevel=info
```
含义:把`t.py`做为worker,设置log等级为info

```py
>>> from t import add
>>> add.delay(4,4)
>>> result = add.delay(4,4)
>>> result.get()
```

## 配置

所有的可配置项在[这里](http://docs.celeryproject.org/en/latest/userguide/configuration.html#configuration)

你可以这配置:

```py
app.conf.task_serializer = 'json'
```

也可以一次配置多项

```py
app.conf.update(
    task_serializer='json',
    accept_content=['json'],  # Ignore other content
    result_serializer='json',
    timezone='Europe/Oslo',
    enable_utc=True,
)
```

也可以建立一个配置文件`celeryconfig.py`,(可以是其它的名字)
```py
celeryconfig.py:
broker_url = 'amqp://'
result_backend = 'rpc://'

task_serializer = 'json'
result_serializer = 'json'
accept_content = ['json']
timezone = 'Europe/Oslo'
enable_utc = True
```
要确保配置模块没有任何语法错误，且能够正确的工作，你可以通过下面的命令尝试导入它：

```bash
$ python -m celeryconfig
```
