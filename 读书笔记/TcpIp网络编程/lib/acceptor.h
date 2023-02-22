#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <sys/epoll.h>

#include "socket.h"


class Acceptor {
    //默认使用的是ipv4的地址
    struct sockaddr_in m_addr;
    int m_listen_que_size = 5;
    Socket m_socket;

public:
    
    Acceptor(const char * ip,int port) : Acceptor(port)
    {
        m_addr.sin_addr.s_addr = inet_addr(ip);
    }

    Acceptor(int port){
        m_socket.__init__();
        m_socket.reUseAddr();
        memset(&m_addr, 0, sizeof(m_addr)); //清空
        m_addr.sin_family = AF_INET; //使用IPv4 地址协议
        m_addr.sin_port = htons(port);
        m_addr.sin_addr.s_addr = htonl(INADDR_ANY);
    }

    //开始监听
    bool listen() {
        if( ::bind(m_socket.get(),(struct sockaddr *)&m_addr,sizeof(m_addr) ) == -1) {
            error_handling("bind() error!");
            return false;
        }

        if( ::listen(m_socket.get(), m_listen_que_size) == -1) {
            error_handling("listen() error!");
            return false;
        }
        return true;
    }

    int accept(struct sockaddr_in * client_addr) {
        socklen_t addr_sz= sizeof(sockaddr_in);
        return ::accept(m_socket.get(), (struct sockaddr *) client_addr,&addr_sz);
    }

    SOCKET_HANDLE get_socket() const {
        return m_socket.get();
    }

};



//基于epoll的server
class socketServer {
    
};
