
先看一下`epoll_event`的定义
```plaintext
epoll_event

struct ioEvent : public epoll_event ; 
ioEvent 就是 epoll_event
```

定义了一个`struct Callback`,它的作用很简单,内部定义一个`CallBackPtr`函数指针变量,
通过函数`callback`调用这个指针对就的函数

```plaintext
struct CallbackImplBase : Callback
```

它的做用是利用内部的模板成员函数使自己成为一个**中转**,调用了类的`on_callback`方法
那**中转**实现的原理是什么呢?

原理是**模板构造函数与成员函数针对不同的子类类型实现不同的重载**,再加上`CRTP`这个功能

```plaintext

  Callback
    |
    v
+---------------------+
|  CallbackImplBase   |
+--------+------------+
         |
         v
Class a,b,c,d,....

```
类`a,b,c,d`最后都转化成`Callback`的指针,实现了一类似的`virtual table`


类`class PostTask`,一个存储类,存`m_callback,ListNode m_node`
回调函数,链表节点


```plaintext
class IoCtxBase
+- from_node_to_post_task 从listnode转成postTask类对象指针
+- m_epoll_handle
+- 一些virtual api ,run,post_task,request_abort
+- 内存管理std::pmr::memory_resource *m_memory_resource;
```

```plaintext
class IoContext
+- m_ctx
+- get_io_ctx_base 得到ioCtxBase基类的指针
+- post_task(PostTask task) 调用task
+- request_abort 调用m_ctx的
+- get_memory_resource_for_task 得到 memory_resource 指针
```
它的构造函数,使用一个技巧,**如何使用编译期间true,false-->intergral_constant**

`IoContext`只是一个包装类,它的功能都是通过`m_ctx`实现的

```plaintext

template <class CtxTrait>
class IoCtx : public IoCtxBase
```
这个类作为`IoContext`的一个成员函数`m_ctx`


两个工具类,
```plaintext
struct SingleThreadTrait
struct MultiThreadTrait
```

```plaintext
class IoCtx : public IoCtxBase
```

`IoCtx`是虚基类的实现

```plaintext
+- m_wakeup_handle
+- m_que_lock  队列锁
+- m_thread_waiting 线程等待数
+- m_task_queue_size 任务数量
+- m_task_queue 任务队列
+- m_abort_requested 是否abort 请求
+- k_multiple_thread 是否是多线程

成员函数

+- IoCtx();
  - 创建epoll
  - 创建了一个fd作为: m_wakeup_handle,加入epoll事件监控中
+- void wakeup_a_thread(); 唤醒一个线程
  - 把m_wakeup_handle加入epoll中
+- void post_task(PostTask *callback) override;
  - 单线程:把PostTask加入Queue队列中
  - 如果是多线程,如何wakeup_a_thread()起作用?
+- void request_abort() override;
  - 把m_abort_requested 设为true
+- void run() override;  执行任务循环
  - 取出m_task_queue 头部node
  - 调用task
  - 无task
  - 得到effective_event, wakeup_event
+- ~IoCtx() override;
```
