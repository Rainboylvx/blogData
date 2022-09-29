整个代码1300多行

分成以几个部分

- log,日志部分,用来表明整个代码运行的过程,具体看[这个提取出来的代码](./code_first/log.cpp)
- io_context io事件的分发中心
- connect 抽象出来一次连接,异步的接收与发送
- AsyncSendAwaiter 异步的等待发送,直接io_context通知可以发送
- AsyncReceiveAwaiter 异步的等待接收,直接io_context通知可以接收
- Acceptor 一系列用于处理新连接的
- spawn 一个协程,目的是把一个task 变成不用再关心的协程,
  这个task是会无限的循环,处理指定的任务

1 第一部分
log

2 第二部分
name相关

- `set_name`
- `set_name_r`
- `NamedMixin`,继承自这个类,那么具体可以自身`m_h`取名字的能力

给每一个`std::coroutine_handle`取个名字


3 第三部分

task类的定义


神奇在是`promise_type`里有一个`std::coroutine_handle<> m_continue = nullptr`
的东西.当前的task执行完后,执行下一个?

这个`m_continue`是下面的代码里的`Awaiter`给它的

同时task本身是可以`co_await`的
先把自己挂起来



```cpp
task func1() {

}

task func2(){
  auto task1 = func1();
  co_await task1;
}
```

当另一个协程b内`co_await a`时,b会挂起,a的内部记录`m_continue = b 的corotine hanele`
`resume a`

让b挂起,a执行,返回执行b的caler
如果a执行结果到达了,`a.promise().final_suspend`
返回一个FinalAwaiter


测试代码见:

<toGitLink file="./code_first/task.cpp" />



## 1 Q AsyncReceiveAwaiter中的链表有会用?为什么

多次发送?

## Q 怎么用图来描述这个模型?
