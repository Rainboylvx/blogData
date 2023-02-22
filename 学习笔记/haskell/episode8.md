# 第八章 Haskell构造我们自己的类型和类型类

## 数据类型入门

们以已经见识了许多数据类型，如`Bool`、`Int`、`Char`、`Maybe`等等

data关键字
```plaintext
data Bool = False | True
```

假定图形可以是圆（Circle）或长方形（Rectangle）：

    data Shape = Circle Float Float Float | Rectangle Float Float Float Float

这句代码直接定义了一个Shape类型,定义完之后,有了Circle和Rectangle

```plaintext
ghci> :t Circle   
Circle :: Float -> Float -> Float -> Shape   
ghci> :t Rectangle   
Rectangle :: Float -> Float -> Float -> Float -> Shape
```

- **项**, 谈到“项”(field)，其实应为“参数”(parameters)
- **值构造子**, 本质是个函数
## Record Syntax
## 类型参数
## 派生实例
## 类型别名
