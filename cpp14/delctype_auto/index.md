[Placeholder type specifiers (since C++11) - cppreference.com](https://en.cppreference.com/w/cpp/language/auto)

## FAQ

- 如何去理解`decltype(auto)`?
- `decltype(auto)`与`auto`有什么不同?
- 什么时候使用`decltype(auto)`

the compilation of [cppreference][1] is following:

The placeholder auto may be accompanied by modifiers, such as const or &, which will participate in the type deduction. The placeholder decltype(auto) must be the sole constituent of the declared type. (since C++14)

**Notice:**

- `auto` : type is deduced using the rules for [template argument deduction](https://en.cppreference.com//w/cpp/language/template_argument_deduction#Other_contexts "cpp/language/template argument deduction").
- `decltype(type is [`decltype(expr)`](https://en.cppreference.com/w/cpp/language/decltype "cpp/language/decltype"), where `expr` is the initializer.)`

```plaintext
int a;
(a); // expression type is int &
auto b = (a); // b type is int
decltype(auto) c = (a); // c type is int&
```

`auto`基本就是原始类型,除非这样`auto &`


## 尝试
```cpp
<%- include("1.cpp") _%>
```

discover: if function return type is `decltype(auto)` ,then the real of
return type is equal with **the return expression type**.

According to this [c++ - What are some uses of decltype(auto)? - Stack Overflow](https://stackoverflow.com/questions/24109737/what-are-some-uses-of-decltypeauto)

## 1 use `decltype(auto)` for perfect forwarding

```cpp
// perfect forwarding of a function call must use decltype(auto)
// in case the function it calls returns by reference
template<class F, class... Args>
decltype(auto) PerfectForward(F fun, Args&&... args) 
{ 
    return fun(std::forward<Args>(args)...); 
}
```

## 2 Delaying return type deduction in recursive templates

## 3 Other uses

```
int i;
int&& f();
auto x3a = i;                  // decltype(x3a) is int
decltype(auto) x3d = i;        // decltype(x3d) is int
auto x4a = (i);                // decltype(x4a) is int
decltype(auto) x4d = (i);      // decltype(x4d) is int&
auto x5a = f();                // decltype(x5a) is int
decltype(auto) x5d = f();      // decltype(x5d) is int&&
auto x6a = { 1, 2 };           // decltype(x6a) is std::initializer_list<int>
decltype(auto) x6d = { 1, 2 }; // error, { 1, 2 } is not an expression
auto *x7a = &i;                // decltype(x7a) is int*
decltype(auto)*x7d = &i;       // error, declared type is not plain decltype(auto)
```




[1]: <https://en.cppreference.com/w/cpp/language/auto>
