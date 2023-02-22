forward_list只提供钱箱迭代器，因此不支持反向迭代器，比如rbegin()等成员函数。
forward_list不提供size（）成员函数。
forward_list没有指向最末元素的锚点，因此不提供back（）、push_back（）和pop_back（）。
forward_list不提供随机访问，这一点跟list相同。
插入和删除元素不会造成“指向至其他元素”的指针，引用和迭代器失效
