//对socket进行操作的头文件
#ifndef  ___SOCKET__HEADER___
#define  ___SOCKET__HEADER___
#include <sys/socket.h>
#include <unistd.h>
#include <sys/fcntl.h>
#include <stdio.h>

void error_handling(const char * msg) {
    printf("error : %s\n",msg);
}


using SOCKET_HANDLE = int;

struct Socket {
    SOCKET_HANDLE m_socket;

    void __init__(){
        m_socket = create_socket();
    }

    ~Socket() {
        ::close(m_socket);
    }

    SOCKET_HANDLE  get() const {
        return m_socket;
    }



    //创建一个socket
    //默认创建的是 ipv4 tcp 协义的socket
    static
    SOCKET_HANDLE create_socket(int domain= AF_INET,int type = SOCK_STREAM ,int protocol = 0) {
        return socket(domain, type, protocol);
    }

    //对socket 进行设置,书上第9章的内容
    //
    //TODO
    //getsockopt
    //setsockopt

    //快捷设置 , re use addr 
    void reUseAddr() {
        int option = 1;
        int optionLen = sizeof(option);
        ::setsockopt(m_socket, SOL_SOCKET, SO_REUSEADDR,&option,optionLen);
    }

};

#endif
