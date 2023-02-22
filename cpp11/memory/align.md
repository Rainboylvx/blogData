[std::align - cppreference.com](https://en.cppreference.com/w/cpp/memory/align)

要看当目录下的code下的 三个cpp文件,就理解了

https://stackoverflow.com/a/67834958/5757674

```cpp
inline void*
align(size_t __align, size_t __size, void*& __ptr, size_t& __space) noexcept
{
  if (__space < __size) //剩余的空间不夠
    return nullptr;
  const auto __intptr = reinterpret_cast<uintptr_t>(__ptr);

  //核心计算 (x-1 + y) & -y ,得到align倍数
  const auto __aligned = (__intptr - 1u + __align) & -__align;
  const auto __diff = __aligned - __intptr;
  if (__diff > (__space - __size))
    return nullptr;
  else
    {
      __space -= __diff;
      return __ptr = reinterpret_cast<void*>(__aligned);
      // 返回的值是 对齐后的起点
      // space 对齐后剩下的空间
    }
}
```

