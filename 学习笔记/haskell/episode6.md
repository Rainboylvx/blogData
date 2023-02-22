# 第6章 高阶函数

## 柯里函数

所有多个参数的函数都是柯里函数。

```plaintext
compareWithHundred :: (Num a，Ord a) => a -> Ordering 
compareWithHundred x = compare 100 x
```

```
compareWithHundred :: (Num a，Ord a) => a -> Ordering 
compareWithHundred = compare 100
```

为什么类型声明依然相同 ???

```plaintext
divideByTen :: (Floating a) => a -> a 
divideByTen = (/10)
```
调用`divideByTen 200`就是`(/10) 200`，和`200 / 10`等价。

将参数减4的函数，就用`subtract`好了，像这样`(subtract 4)`.


## 是时候了，来点高阶函数！

haskell中的函数可以取另一个函数做参数，也可以返回函数。 举个例子，我们弄个取一个函数并调用它两次的函数.

那这样的话,c++也可以有高阶函数

```plaintext
applyTwice :: (a -> a) -> a -> a   
applyTwice f x = f (f x)
```
它标明了首个参数是个参数与返回值类型都是a的函数

```plaintext
zipWith' :: (a -> b -> c) -> [a] -> [b] -> [c]   
zipWith' _ [] _ = []   
zipWith' _ _ [] = []   
zipWith' f (x:xs) (y:ys) = f x y : zipWith' f xs ys
```

flip简单地取一个函数作参数并返回一个相似的函数，只是它们的两个参数倒了个。
```plaintext
flip' :: (a -> b -> c) -> (b -> a -> c)   
flip' f = g   
    where g x y = f y x #?? 这里能简单的定义函数吗
```

从这类型声明中可以看出，它取一个函数，其参数类型分别为a和b，而它返回的函数的参数类型为b和a。 由于函数默认都是柯里化的，`->`为右结合，这里的第二对括号其实并无必要，`(a -> b -> c) -> (b -> a -> c)`与`(a -> b -> c) -> (b -> (a -> c))`等价,也与`(a -> b -> c) -> b -> a -> c`等价。 前面我们写了`g x y = f y x`，既然这样可行，那么`f y x = g x y`不也一样? 这一来我们可以改成更简单的写法:

    flip' :: (a -> b -> c) -> b -> a -> c   
    flip' f y x = f x y

## map 与 filter

map取一个函数和List做参数，遍历该List的每个元素来调用该函数产生一个新的List。 看下它的类型声明和实现:

    map :: (a -> b) -> [a] -> [b]   
    map _ [] = []   
    map f (x:xs) = f x : map f xs

filter函数取一个限制条件和一个List，返回该List中所有符合该条件的元素。 它的类型声明及实现大致如下:

    filter :: (a -> Bool) -> [a] -> [a]   
    filter _ [] = []   
    filter p (x:xs)    
        | p x       = x : filter p xs   
        | otherwise = filter p xs

```plaintext
quicksort :: (Ord a) => [a] -> [a]     
quicksort [] = []     
quicksort (x:xs) =      
    let smallerSorted = quicksort (filter (<x) xs) 
        biggerSorted = quicksort (filter (>x) xs)    
    in  smallerSorted ++ [x] ++ biggerSorted
```
## lambda

lambda 就是匿名函数

同普通函数一样，你也可以在 lambda 中使用模式匹配，只是你无法为一个参数设置多个模式，如 `[]` 和 `(x:xs)`。lambda 的模式匹配若失败，就会引发一个运行时错误，所以慎用！  

    ghci> map (\(a,b) -> a + b) [(1,2),(3,5),(6,3),(2,6),(2,5)]  
    [3,8,9,8,7]

## 关键字 fold

## 有$的函数调用
定义：

    ($) :: (a -> b) -> a -> b  
    f $ x = f x

`sum $ filter (> 10) $ map (*2) [2..10]`这不就是倒过来的管道吗?

除了减少括号外，`$` 还可以将数据作为函数使用。例如映射一个函数调用符到一组函数组成的 List：

    ghci> map ($ 3) [(4+),(10*),(^2),sqrt]  
    [7.0,30.0,9.0,1.7320508075688772]

## 函数组合
