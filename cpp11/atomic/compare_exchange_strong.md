`compare_exchange_strong`,见名知意:它表示的意思是**比较,交换,强制(保证)**

函数原型


```plaintext
bool compare_exchange_weak(T &expected, T desired, std::memory_order success, std::memory_order failure);
bool compare_exchange_weak(T &expected, T desired, std::memory_order success, std::memory_order failure) volatile;
bool compare_exchange_weak(T &expected, T desired, std::memory_order order = std::memory_order_seq_cst);
bool compare_exchange_weak(T &expected, T desired, std::memory_order order = std::memory_order_seq_cst) volatile;
bool compare_exchange_strong(T &expected, T desired, std::memory_order success = std::memory_order failure);
bool compare_exchange_strong(T &expected, T desired, std::memory_order success = std::memory_order failure) volatile;
bool compare_exchange_strong(T &expected, T desired, std::memory_order order = std::memory_order_seq_cst);
bool compare_exchange_strong(T &expected, T desired,std::memory_order order = std::memory_order_seq_cst) volatile;
```

作用,若`*this` 与`expected` 逐位相等,那就是满足期望,`*this = expected`,否则`expected = *this`

这是一种CAS操作(compare and swap)

在应用中CAS可以用于实现无锁数据结构，常见的有无锁队列（先入先出）[3] 以及无锁栈（先入后出）。

- [【多线程】compare\_exchange\_strong用法 - 苏格拉底的落泪 - 博客园](https://www.cnblogs.com/sunbines/p/14800113.html)
- [比较并交换 - 维基百科，自由的百科全书](https://zh.m.wikipedia.org/zh-hans/%E6%AF%94%E8%BE%83%E5%B9%B6%E4%BA%A4%E6%8D%A2#:~:text=%E6%AF%94%E8%BE%83%E5%B9%B6%E4%BA%A4%E6%8D%A2(compare%20and,%E6%9B%BF%E6%8D%A2%E4%B8%BA%E6%96%B0%E7%9A%84%E5%80%BC%E3%80%82)
