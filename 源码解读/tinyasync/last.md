多了一个memory_pool

```plaintext
PoolNode
Pool
  m_block_size
  m_block_per_chunk 一个chunk内的block的数量
  PoolNode m_heade 头的地址 PoolNode
  m_chunks 存每一个chunk的指针
  alloc() 申请内存 ,head 非空就从head里取
  free() 释放内存,不是真的释放,还是存成一个链表
FreeNode
PoolBlock ?

PoolImpl

包含关系 
---> PoolImpl( PoolBlock(FreeNode))
PoolResource(PoolImpl)
FixPoolResource(Pool) Fix是固定的意思吗?

StackfulPoolArg 
struct StackfulPool 这个是做什么的????

class FixPoolResource : public std::pmr::memory_resource

class PoolResource : public std::pmr::memory_resource
```

example 下面有一个`memory_pool`的测试,可以帮助理解代码

## lockcore.cpp 解析

lockcore的定义,应该是锁的抽象,主要的作用应该是给队列加上锁🔒

实现一个无锁(lockfree)队列

```plaintext
成员变量 Queue-> 一个内部存储 ListNode的队列

常量标记
static constexpr int k_mtx_locked = 1; 已锁
static constexpr int k_que_locked = 2; 队列已锁
static constexpr int k_que_notempty = 4; 队列不空

std::atomic<int> m_flags = 0; 原子标记flag

is_locked 提示当前是否获得锁
```

分析`try_lock`函数,注释说它完的的功能如下:
- 如果`mutex`已锁,返回true
- 否则,加入`listNode *p`,返回false

`compare_exchange_strong`

### 重点:`try_lock`的过程

```plaintext

lockcore的成员变量设定了一个状态:m_flags,它是一个三元状态,[4,2,1],分别表示
que_notempty,que_locked,mtx_locked

1.得到 old_flag,也就是此时,m_flags的状态

进行第一轮的锁

- 是否已经 锁 mtx_locked -- NO --> CAS(old_flag,mtx_locked)
  -- yes--> old_flag.clear(que_locked)  保证que_locked 无锁
      ---> CAS(old_flags,flag)

第二阶段,

enque true -> 此时锁了 que_locked ,否则 锁了 mtx_locked

要么锁了 mtx_locked
要么锁了 que_locked

如果 mtx_locked,在debug的状态下
    -> mtx_thd_cnt+=1 记录有几个线程 通过 mtx_locked 锁住,占用的线程
    -> return true ,表示锁住了?

如果 que_locked,在debug的状态下

  m_que.push(p)
    get_old_flag
    flag.clear(que_locked)
    flag.set(que_notempty)
    CAS(old_flags,flag)
    确实清除了 que_locked 标记


```

### 重点:`unlock`的过程

```
unlock 发生的事情

得到 old_flags

第一阶段
  que_empty -> yes -- > flag = clear mtx_mtx_locked ->[ 0|0|0]
  |
  |
  No
    flag = old_flags | que_locked
    old_flags -> clear que_locked
CAS(old_flags ,flag) -> 改成新的状态
总结:unlock 下
  如果 队列空 -> m_flag 变成 000
  不空 flag为old_flag加上que_locked,同时保证CAS时old_flag无que_locked

如果que_empty 
  return nullptr
else head = que.pop()

第二阶段


flag que_notempty or que_locked

CAS(old_flags,flag), 清空 que_locked 锁

```

可以把整个lockcore认为是一个可以使用的无锁的队列




## mutex.cpp 解析

example 目录下的`mutex.cpp`写的是`mutex.h`的测试,理解这个代码可以理解`mutex.h`代码的目的.

### 1. `mutex.lock()`的作用


!!! 它加上的锁的作用是什么?或者说明加锁的目的是什么?

函数定义,返回一个`MutexLockAwaiter`对象 
```plaintext 
MutexLockAwaiter lock(IoContext &ctx)
{
    return {*this, *ctx.get_io_ctx_base()};
}
```

一个`awaiter`对象运行的过程是


`MutexLockAwaiter`对象的主要

```plaintext
await_ready -> false 所以直接挂起了
|
V
得到 suspended_coroutine_base

-> 核心是调用了m_mutex的m_lockcore->try_lock(m_node)

如何 

当第一次执行mtx.lock时,m_lockcore里的元素m_flag为000,也就是flag_mtx_locked = 0
所以m_lockcore.try_lock() 返回true
m_lockcore-> try_lock 设置了 mtx_locked -> own_mtx = true -> !own_mtx = false
      当前的协程没有挂起

如何 m_lockcore-> try_lock 设置了 mtx_que_locked -> own_mtx = false -> !own_mtx = true
      q 入队了
      当前的协程没有挂起,
```


```plaintext
mtx.unlock

从lockcore里取出 awaiter

加入到ctx的task list
```
