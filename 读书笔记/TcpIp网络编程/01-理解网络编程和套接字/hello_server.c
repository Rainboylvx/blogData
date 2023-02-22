#include<unistd.h>
#include<stdlib.h>
#include<stdio.h>
#include<string.h>
#include<sys/socket.h>
#include<arpa/inet.h>

void errorHandling(const char* message);

int main(int argc, char* argv[]){
    if(argc != 2){
        printf("Usage: %s <port> \n", argv[1]);
        exit(1);
    }
    // 原型: int socket(int af, int type, int protocol);
    // 作用: 创建 socket
    // 参数1 : PF_INET 就是 AF_INET
    // af 为地址族（Address Family），也就是 IP 地址类型，
    // 常用的有 AF_INET 和 AF_INET6。AF 是“Address Family”的简写，INET是“Inetnet”的简写。
    // AF_INET 表示 IPv4 地址，例如 127.0.0.1；AF_INET6 表示 IPv6 地址，例如 1030::C9B4:FF12:48AA:1A2B。
    // 
    // 参数2: type 为数据传输方式/套接字类型，常用的有 SOCK_STREAM（流格式套接字/面向连接的套接字） 和 SOCK_DGRAM（数据报套接字/无连接的套接字）
    // 参数3: protocol 表示传输协议，常用的有 IPPROTO_TCP 和 IPPTOTO_UDP，分别表示 TCP 传输协议和 UDP 传输协议。
    // 上面出自: http://c.biancheng.net/view/2131.html


    int sockServ = socket(PF_INET, SOCK_STREAM, 0);

    //创建sockaddr_in结构体变量
    //struct sockaddr_in{
    // sa_family_t     sin_family;   //地址族（Address Family），也就是地址类型
    // uint16_t        sin_port;     //16位的端口号
    // struct in_addr  sin_addr;     //32位IP地址
    // char            sin_zero[8];  //不使用，一般用0填充
    // };
    // in_addr 本质是一个unsigned long 整数,具体看 http://c.biancheng.net/view/2344.html
    struct sockaddr_in sockServAddr;
    memset(&sockServAddr, 0, sizeof(sockServAddr)); //清空,每个字节都用0填充
    sockServAddr.sin_family = AF_INET; //使用IPv4地址
    sockServAddr.sin_addr.s_addr = htonl(INADDR_ANY); //任意地址
    //serv_addr.sin_addr.s_addr = inet_addr("127.0.0.1"); //具体的IP地址
    sockServAddr.sin_port = htons(atoi(argv[1]));

    //bind() 第二个参数的类型为 sockaddr，而代码中却使用 sockaddr_in，然后再强制转换为 sockaddr，这是为什么呢？
    //是为了方便的创建地址与端口,sockaddr 是一种通用的结构体，可以用来保存多种类型的IP地址和端口号，而 sockaddr_in 是专门用来保存 IPv4 地址的结构体 ,具体看 http://c.biancheng.net/view/2344.html
    if(bind(sockServ, (struct sockaddr*)& sockServAddr, sizeof(sockServAddr)) ==-1){
        errorHandling("bind() error!");
    }

    // listen() 函数可以让套接字进入被动监听状态
    // 5 表示 请求队列 的大小, 具体看 : http://c.biancheng.net/view/2345.html
    if(listen(sockServ, 5) == -1){
        errorHandling("listen() error!");
    }

    struct sockaddr_in sockClientAddr;
    socklen_t clientAddrLen = sizeof(sockClientAddr);

    // 当套接字处于监听状态时，可以通过 accept() 函数来接收客户端请求。它的原型为：
    // 原型为: int accept(int sock, struct sockaddr *addr, socklen_t *addrlen);  //Linux
    int sockClient = accept(sockServ, (struct sockaddr*)& sockClientAddr, &clientAddrLen);
    if(sockClient == -1){
        errorHandling("accept() error!");
    }
    else{
        puts("New Client connected...");
    }

    char message[] = "Hello World!";

    // 写入数据
    write(sockClient, message, strlen(message));

    close(sockClient);
    close(sockServ);

    return 0;
}

void errorHandling(const char* message){
    fputs(message, stderr);
    fputc('\n', stderr);
    exit(1);
}