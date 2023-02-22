
一口气到 `e49c42644cd5ce3e2aaaf35b2d67fc2c494237c5`第26个提交,ping pong benchmark

让我们开始读代码吧

```plaintext
├── chatroom_server
├── condition_variable
├── coroutine_task
├── echo_server
├── http_client
├── http_helloworld_server
├── lockcore
├── mutex
├── pingpong
├── sleepsort
└── wait
```
多了很多的测试

```plaintext
#include "basics.h"
#include "task.h"
#include "io_context.h"
#include "buffer.h"
#include "awaiters.h"
#include "mutex.h"
```

## 1 根据顺序先读`basics.h`


```plaintext
类似c的printf格式化成string
std::string format(char const* fmt, ...)

chrono转timespec
timespec to_timespec(std::chrono::nanoseconds nanoseconds)

sleep
void sync_sleep(std::chrono::nanoseconds nanoseconds)

typeid(int).name() -> "i"-->"int"
std::string abi_name_demangle(const char* abi_name)


?? 初始化 atomic
TINYASYNC_VCINL T initialize_once(std::atomic<T>& atom, T uninitialized_flag, std::mutex& mtx, L func)


using TypeInfoRef = std::reference_wrapper<const std::type_info>;
struct TypeInfoRefHahser 
struct TypeInfoRefEqualer 
inline  const char * c_name() ?

// socket handle -> c_str
inline char const* handle_c_str(NativeHandle handle)
inline char const* socket_c_str(NativeSocket handle)

exception ---> str
void to_string_to(std::exception_ptr const& e, std::string& string_builder)

//? 做什么用的waiter
struct ThisCoroutineAwaiter : std::suspend_always {


//exception_ptr -> string
std::string to_string(std::exception_ptr const& e)

--> log用
#ifdef TINYASYNC_TRACE


找到trivial数据,那么目的是什么
constexpr bool is_trivial_parameter_in_itanium_abi_v =

// 为什么呢?
// you can safely use memcpy
// you can't safely use memset 
template <class T>
constexpr bool has_trivial_five_v =

Class Name
set_name_r
throw_error_


队列,无虚类队列?
listNode
Queue

class TicketSpinLock ?
class SysSpinLock 

```

## task.h

```plaintext

    //resume之后的结果
    // m_return_from
    struct ResumeResult;

    template<class Result>
    class Task;


    // operator new and delete 操作
    class TaskPromiseBase {

    //存结果
    template<class Result>
    class PromiseResultMixin  {


    template<>
    class PromiseResultMixin<void>  {

    //promise_object
    template<class Result>
    class TaskPromise : public TaskPromiseBase,
        public PromiseResultMixin<Result>

    //!注意Final_suspend resume什么东西
     continuum 这个东西

    std::coroutine_handle<ToPromise> change_promsie(std::coroutine_handle<Promise> h) {
    A->B


    template<class Result = void>
    class [[nodiscard]] Task
    !!核心在于 Awaiter 要完成的功能

    inline void destroy_and_throw_if_necessary_impl(std::coroutine_handle<TaskPromiseBase> coroutine, char const* func)


    inline bool destroy_and_throw_if_necessary(std::coroutine_handle<TaskPromiseBase> coroutine, char const* func)


    inline void throw_impl(std::coroutine_handle<TaskPromiseBase> coroutine, char const* func)

    template<class Result>
    Task<Result> TaskPromise<Result>::get_return_object()

    inline bool resume_coroutine(std::coroutine_handle<TaskPromiseBase> coroutine, char const* func = "")
    {


    class YieldAwaiter {
```

## io_context

```plaintext

//功能函数 输出一个evt代表的事件
std::string ioe2str(epoll_event& evt)

//不使用virtul table 
Callback
原理 内部存一个函数指针`m_callback`

struct CallbackImplBase : Callback
原理,利用template函数来存子类的信息

struct PostTask
--> from_node -> 从内部的成员变量m_node转成PostTask*
--> m_callback

class IoCtxBase
interface类
--> run,post_task,request_abort


class IoContext
template <bool multiple_thread = false>
IoContext(std::integral_constant<bool, multiple_thread> = std::false_type());
它的构造函数很神奇,--> 解决了 template constructor 无法指定(special)值的问题
https://stackoverflow.com/a/3960925/5757674
代码见 ./code_continue/1.cpp

只是对ctxBase的我包装


struct SingleThreadTrait

struct MultiThreadTrait


//真正实现
class IoCtx : public IoCtxBase

构造函数
- 创建epoll

eventfd ??
m_wakeup_handle = fd;

post_task函数
---- ? thread_waiting 有什么用?

require_abort


核心中的核心-->run函数

如有task, 就做task

多线程下的 wake_event 有什么用?
```

Callback的原理见 <toGitLink file="./code_continue/callback.cpp" />

技巧,

## buffer

```
pool

定大小内存池,每一次申请的内存大小固定,
所以free时,把链表把他们固定在一起
```


## mutex

理解`mutex.h`代码

828行,太大了😓

核心类

```plaintext

- LockCore 对队列进行操作?
  - try_lock
  - unlock 取队列的头部
- class Mutex;
  - 成员变量 LockCore,IoContext
  - MutexLockAwaiter lock() 这个应该是核心功能
- class MutexLockAwaiter; Mutex 对应的Awaiter
- class AdoptUniqueLock

template <class Awaiter>
class WaitAwaiter;

template <class Awaiter>
struct WaitCallback : CallbackImplBase


一个函数
template <class Awaiter>
auto wait(Mutex &mtx, Awaiter &&awaiter) -> WaitAwaiter<std::remove_reference_t<Awaiter> >


事件
class Event;
class EventAwaiter;

template<class Trait>
class Condv;

template<class Condv>
class CondvAwaiter;

struct PostTaskEvent : PostTask
{
    ListNode *m_awaiters;
};

class Event
```
