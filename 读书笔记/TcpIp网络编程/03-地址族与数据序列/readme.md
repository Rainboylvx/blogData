# 分配给套接字的IP地址与端口号
## 网络地址
- IPv4:4字节地址
- IPv6:16字节地址

- A类网络地址首字节范围：0~127
- B类网络地址首字节范围：128~191
- C类网络地址首字节范围：192~223

# 地址信息的表示
## 表示IPv4地址的结构体
```
struct sockaddr_in
{
    sa_family_t sin_family; //地址族
    uint16_t sin_port;      //16位端口号
    struct in_addr sin_addr;//32位IP地址
    char zero[8];           //不使用
}

struct in_addr
{
    in_addr_t s_addr;   //32位IP地址
}

struct sockaddr
{
    sa_family_t sin_family;
    char sa_data[14];
}
```
## ipv6的相关疑问

`sockaddr`只有14个字节来存端口与ip地址,那如果来存ipv6呢,ipv6的地址就有16个字节

真正来存ipv6相关信息是`sockaddr_in6`,就像使用`sockaddr_in`来存ipv4,

我猜测,注意,只是我的猜测,
`sockaddr`只是作为一个指针来使用,系统使用它的时候,先分析它的`sin_family`来决定,这个`sockaddr`指针,指向的是`sockaddr_in`还是`sockaddr_in6`

- [c - sockaddr and IPv6 address - Stack Overflow](https://stackoverflow.com/questions/24817642/sockaddr-and-ipv6-address)
- [c - Binding Sockets to IPv6 Addresses - Stack Overflow](https://stackoverflow.com/questions/13504934/binding-sockets-to-ipv6-addresses)


# 网络字节序列与地址转换
## 字节序与网络字节序列
- 大端序（Big Endian）：小(个位)放**大**(高)地址,0x1234 存的是时候,[0x12,0x34]
- 小端序(Little Endian)：小(个位)放**小**(低)地址,0x1234 存的是时候,[0x34,0x12]
- 网络字节序列(Network Byte Order)：统一为大端序
## 字节序列转换(Endian Conversions)
```
unsigned short htons(unsigned short);    //主机字节序->网络字节序
unsigned short ntohs(unsigned short);    //网络字节序列->主机字节序列
unsigned long htonl(unsigned long);      
unsigned long ntohl(unsigned long);
```
# 网络地址的初始化与分配
## 将字符串信息转换为网络字节序列的整数型

字符串ip,例如,`127.0.0.1`与 `unsigned long,in_addr`的相互转换
```
#include<arpa/inet.h>

// 字符串 转成 unsigned long ,in_addr_t 就是 unsigned long
in_addr_t inet_addr(const char* string);
//成功时返回32位大端序列整型数值，失败时返回INADDR_NONE

int inet_aton(const char* string, struct in_addr* addr);
//成功时返回true，失败时返回false

char* inet_ntoa(struct in_addr addr);
```