    std::atomic_flag is an atomic boolean type. Unlike all specializations of std::atomic, it is guaranteed to be lock-free. Unlike std::atomic<bool>, std::atomic_flag does not provide load or store operations.

保证是无锁的

## operations

- clear 原子的设定为false
- test_and_set 原子的设定为true

std::atomic_flag 标志，如果 std::atomic_flag 之前没有被设置过，则设置 std::atomic_flag 的标志，并返回先前该 std::atomic_flag 对象是否被设置过，如果之前 std::atomic_flag 对象已被设置，则返回 true，否则返回 false。

```

   +-------+                  +-------+
   | false | -test and_set->  | true  |
   +-------+       |          +-------+
                   |
                   v
                 返回false

```

作用: 可以保证只有一个线程在处理这个资源

是互斥自旋转锁

[std::atomic_flag - cppreference.com](https://en.cppreference.com/w/cpp/atomic/atomic_flag)
