c++14加入的一个类模板

作用: 产生一个compile-time的一个整数序列,它作为一个类,作为 模板函数的的参数的时候,模板参数包可以be deduced(被推断)出来各个整数是什么,进而被使用

可能实现代码
```cpp
template<typename T,T... ints>
struct integer_sequence {
    using value_type = T;
    static constexpr size_t size() noexcept {
        return sizeof...(ints);
    }
};
```

```cpp
<%- include("2.cpp") %>
```
## 辅助模板(Helper templates)
- `index_sequence` 指定了T是`std::size_t`的`integer_sequence`
- 0-N的序列,类型自己指定`make_integer_sequence` 表示`using make_integer_sequence = std::integer_sequence<T, /* a sequence 0, 1, 2, ..., N-1 */ >;`
- 0-N的序列`make_index_sequence = std::make_integer_sequence<std::size_t, N>;`
- 转换任意模板参数包为一个序列`index_sequence_for = std::make_index_sequence<sizeof...(T)>;`

# `make_index_sequence` 的实现

看 [`./make_index_sequence原理.md`](./make_index_sequence原理.md)

实现1: 以递归的方式进行类型展开(查找)

实现2: 以继承的方式得到类型

gcc的实现

__integer_pack (length)
When used as the pattern of a pack expansion within a template definition, expands to a template argument pack containing integers from 0 to length-1. This is provided for efficient implementation of std::make_integer_sequence.

```
template<typename Tp,Tp... _Num>
using make_integer_sequence = integer_sequence<_Tp, __integer_pack(_Num)...>;
```

```cpp
<%- include("3.cpp") %>
```
