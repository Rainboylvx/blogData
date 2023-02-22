
//对EPOLL的封装
#ifndef __EPOLL_HEADER____
#define __EPOLL_HEADER____
#include <sys/epoll.h>


struct myEpoll {
    
    int m_epfd;

    myEpoll() {

    }
    
};


#endif
