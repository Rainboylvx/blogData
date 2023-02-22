# 5 递归


```plaintext
maximum' :: (Ord a) => [a] -> a   
maximum' [] = error "maximum of empty list"   
maximum' [x] = x   
maximum' (x:xs)    
    | x > maxTail = x   
    | otherwise = maxTail   
    where maxTail = maximum' xs
```


```plaintext
replicate' :: (Num i, Ord i) => i -> a -> [a]   
replicate' n x   
    | n <= 0    = []   
    | otherwise = x:replicate' (n-1) x
```

实现`take`函数
```plaintext
take' :: (Num i, Ord i) => i -> [a] -> [a]   
take' n _   
    | n<=0   = []   
take' _ []     = []   
take' n (x:xs) = x : take' (n-1) xs
```


quicksort
```plaintext
quicksort :: (Ord a) => [a] -> [a]   
quicksort [] = []   
quicksort (x:xs) =   
  let smallerSorted = quicksort [a | a<-xs, a<=x]  
       biggerSorted = quicksort [a | a<-xs, a > x]   
  in smallerSorted ++ [x] ++ biggerSorted
```
