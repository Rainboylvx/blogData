> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [blog.csdn.net](https://blog.csdn.net/dboyguan/article/details/51706357)

功能
==

    实现编译期的整数序列，如下例 make_index_sequence<3>() 会使 fun 函数的模板参数: int... N 推演为：0，1，2 序列 ：

```
#include <iostream> 
#include <tuple>
 
using namespace std;
 
template<int... N>
decltype(auto) fun(index_sequence<N...> is) {
    return make_tuple(N...);
}
 
int main() {
 
    auto t = fun(make_index_sequence<3>());
    cout << std::get<0>(t) << endl;
    cout << std::get<1>(t) << endl;
    cout << std::get<2>(t) << endl;
    return 0;
}
```

实现分析
====

    傻瓜式实现
---------

       即是生成一个可变的编译期整数序列，实际上目的就是要生成如下类的对象：        

```
template<int...N>
struct index_sequence {};
```

  
      定义出上面的 index_sequence 后，其实就可以使用了，仍利用 fun 函数，调用方式为：  

```
template<int... N>
struct index_seq{};
 
template<int N, int ...M>
struct make_index_seq: public make_index_seq<N - 1, N -1, M...> {
 
};
 
template<int ...M>
struct make_index_seq<0, M...> : public index_seq<M...> {
};
```

     实际上就是一个空类，因为我们的目的只是模板的可变参数（英文直译应叫模板参数包），并生成一个递增的整数序列，这种实现实际什么都不需要做。

    更好的实现
---------

       分析，c++14 的实现的 make_index_sequence 模板只需指定一个模板参数 “N”，就会自动生成整数序列：0 - N-1，从接口来看：        make_index_sequence<4> 可以实现为 index_sequence 的子类或，一个函数，并返回 index_sequence<0,1,2...> 对象。

###        继承方式实现

        因 c++14 已定义 index_sequence，为避免符号冲突，使用 index_seq 代替。

```
template<int... M>
void make_index_seq_impl(std::true_type t) {
 
}
 
template<int N, int... M>
void make_index_seq_impl(std::false_type t) {
 
    (N < 1) ? (make_index_seq_impl<M...>(std::true_type())) : (make_index_seq_impl<N-1, N-1, M...>(std::false_type()));
}
```

        实现的原理是，当给定一个整数 N，如 3，定义 make_index_seq<3>() 对象时，模板可变参数 M，由空逐渐推导为序列 0，1，2。        即 make_index_seq<3> 时，M 为空。            make_index_seq<3-1,3-1, M...> 时，M 为 3-1 = 2            make_index_seq<2-1,2-1,M...> 时，M 为 2-1=1，2 即序列（1，2）            make_index_seq<1-1,1-1,M...> 时，M 为 1-1 = 0， 1，2 即序列（0，1，2）            make_index_seq<0,M...> 时，           M 为（0，1，2）此时，make_index_seq<3 > 实际继承自 index_seq<0,1,2>       这样就生成了编译期的整数序列。  
  
      对于使用函数方式还不知道是否可行，整体思路的代码如下：

```
template<int... M>
void make_index_seq_impl(std::true_type t) {
 
}
 
template<int N, int... M>
void make_index_seq_impl(std::false_type t) {
 
    (N < 1) ? (make_index_seq_impl<M...>(std::true_type())) : (make_index_seq_impl<N-1, N-1, M...>(std::false_type()));
}
```

       此种写法是不可以的，会导编译器编译时，模板的无穷递归。