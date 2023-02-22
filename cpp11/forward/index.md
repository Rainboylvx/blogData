## 前提

```cpp
<%- include("./1.cpp") %>
```

原理
```cpp
template<typename T>
T&& forward( std::remove_reference_t<T>&& t ){
    return static_cast<T&&>(t);
}
```

原理：

 - 使用万能引用的时候，T的类型可能是`node`,也可能是`node &`
 - 引用折叠，如果T是`node`，那返回的值就是`node &&`
 - 引用折叠，如果T是`node&`，那返回的值就是`node&&& -> node&`

## 解析使用过程

```cpp
<%- include("./2.cpp") %>
```

### `func1(1)`

`func(1)`,Obviously the type of argument `a` is `int && `,
T is `int`. because of `1` is rvalue.

then call `std::forward` return type `int &&`


### `func1(a)`

`func1(a)`,Obviously the type of argument `a` is `int & `,
T is `int&`. because of `a` is lvalue.

```plaintext
func(int& && a)-> func(int & a)
```

then call `std::forward` return type `int &&`
