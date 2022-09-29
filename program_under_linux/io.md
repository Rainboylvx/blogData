# 有关io的相关操作

## fdopen

fdopen,把fd与c stream连接在一起

coe

```cpp
<%- include("io/fdopen_example.cpp") _%>
```

```cpp
<%- include("io/fdopen_example2.cpp") _%>
```

## setvbuf

这是一个c的api
[setvbuf - cppreference.com](https://en.cppreference.com/w/c/io/setvbuf)

指明c文件流的buffering mode


根据下面的写的如果buffer point to Null,就不会改size
[c - setvbuf not changing buffer size? - Stack Overflow](https://stackoverflow.com/questions/62126052/setvbuf-not-changing-buffer-size)


