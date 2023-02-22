# 基于TCP的半关闭
## 单方面断开连接带来的问题
在A、B两个主机进行通信的过程中，A在发送了最后一条数据之后，直接调用close(sockFd);将套接字的读和写两个方向的输入流和输出流同时关闭，若在此时B主机正在向A主机发送数据那么这条数据将无法接收到。
## 套接字和流
两台主机一旦建立了连接之后，两台主机上会分别产生输入流和输出流，进行双向通信，一个主机的输入流与另一个主机的输出流相连，优雅的断开套接字即只断开一个方向上的数据流，而非同时断开输入、输出流。
## 针对优雅断开的shutdown函数
```
int shutdown(int sock, int howto);
//成功时返回0，失败时返回-1
```
howto:断开连接的方式，可能的取值如下：
- SHUT_RD:断开输入流
- SHUT_WR:断开输出流
- SHUT_RDWR:同时断开输入流和输出流
> 断开输入流时若输入缓冲中有数据则输入缓冲中的数据将会被清除，断开输出流时若输出缓冲中仍然有未发送的数据，则会将输出缓冲中的数据发送到对方主机中。

## 测试

Q:如果 client 关闭 shutdown的时候,server 是如何得知的呢?



A: 通过read == 0 得知. `shutdown(ser_sock,SHUT_WR)`会发送一个FIN包,相当于EOF,server端read后返回0

> > My understanding of what it will do is that it will prevent the client application from further sending the data and thus will also prevent the server side from further attempting to read any data.

> Your understanding is correct.

> > What I cant understand is that why is it used in this program …

> > As your own statement suggests, without the client's `s.shutdown(socket.SHUT_WR)` the server would not quit waiting for data, but instead stick in its `sc.recv(1024)` forever, because there would be no connection termination request sent to the server.  
Since the server then would never get to its `sc.close()`, the client on his part also would not quit waiting for data, but instead stick in its `s.recv(42)` forever, because there would be no connection termination request sent from the server.  
Reading [this answer to "close vs shutdown socket?"](https://stackoverflow.com/a/23483487/2413201) might also be enlightening.

> from https://stackoverflow.com/a/36397712/19867157

Q: 如果 client shutdown(server_fd ,shutdown_RD),那么server还能写入吗,write会有错误吗?

A: server端能写入,但是client接收不到,或者接收到就在缓冲区丢弃数据.根据这个:[networking - Behavior of shutdown(sock, SHUT\_RD) with TCP - Stack Overflow](https://stackoverflow.com/questions/740817/behavior-of-shutdownsock-shut-rd-with-tcp)