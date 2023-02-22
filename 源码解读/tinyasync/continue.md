## second commit

删除了NamedMixin,因为`first commit`就是使用的就是`set_name_r`


```plaintext
template<class Awaiter, class Buffer>
    class DataAwaiterMixin
```

作用:把共同的成员提取出来

connImpl,构造时不创建epoll

connImpl 新的callback

所有的callback都改了

加入了`is_standard_layout_v`测试

`echo_server` 保证send的数据发完

改变了`AsyncReceiveAwaiter`挂起时(`await_suspend`)的动作:加入socket进入epoll,
好像是想要用LT触发

## commit 0c057be

`std::string ioe2str(IoEvent &evt)` 触发的种类转成string

`class SocketMixin` 作用
`class ConnectorAwaiter`一系列的东西


## commit 
m_added_to_event_pool = true;
.....

一口气到 `e49c42644cd5ce3e2aaaf35b2d67fc2c494237c5`第26个提交,ping pong benchmark
