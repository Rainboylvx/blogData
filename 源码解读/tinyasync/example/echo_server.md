`example/echo_server`运行分析

```plaintext
定义ctx
listen(ctx)
ctx.run()
```

0. IoContext的整体框架是什么?
1. 类Acceptor做了什么事?
2. acceptor.async_accept做了什么事?
3. `co_spawn`运行的规则,

## 0. IoContext的整体框架是什么?

先看一下`epoll_event`的定义
```plaintext
epoll_event

struct ioEvent : public epoll_event ; 
ioEvent 就是 epoll_event
```
## 1. 类Acceptor做了什么事?
## 2. acceptor.async_accept做了什么事?
## 3. `co_spawn`运行的规则,

## 总结

一个单线程的echo服务器
