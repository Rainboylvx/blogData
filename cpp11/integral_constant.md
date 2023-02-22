## cppreference

- [std::integral\_constant - cppreference.com](https://en.cppreference.com/w/cpp/types/integral_constant)

## 作用

`std::integral_constant`目的代替,对某类型的constant进行进行代替,不同点如下


```cpp
const int a = 100; // a是一个值
using type_b = std::integral_constant<int,100>;
//type_b 是一种类型
```
因为`type_b`是一种类型,所以它可以作为模板的参数
