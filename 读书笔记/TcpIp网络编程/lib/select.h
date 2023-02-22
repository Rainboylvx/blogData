// 对select的封装
// C/C++网络编程，从socket到epoll P36 IO 复用介绍 https://www.bilibili.com/video/BV11Z4y157RY
// 视频对应的源码
//

#include <stdio.h>
#include <unistd.h>
#include <sys/time.h> //时间
#include <sys/select.h> // select头文件


class mySelect {
    fd_set m_reads; // 发生读取事件的文件描述的集合
    int m_maxfd = -1;
    struct timeval m_timout; //超时
    struct timeval * m_p_timout;
public:
    mySelect() {
        FD_ZERO(&m_reads); //清空
        m_p_timout = NULL; //永远不超时
    }

    //设置超时的时间,seconds
    mySelect(unsigned int timeout_sec){
        clear_reads();
        m_timout.tv_sec = timeout_sec;
        m_timout.tv_usec = 0;
        m_p_timout = &m_timout;
    }

    fd_set get_reads() const {
        return m_reads;
    }

    void set_maxfd(int _max){
        m_maxfd = _max;
    }
    int get_maxfd() const {
        return  m_maxfd;
    }

    void clear_reads() { FD_ZERO(&m_reads);}
    void add_reads(int fd) { 
        FD_SET(fd, &m_reads);
        if( fd > m_maxfd) 
            m_maxfd = fd;
    }
    void rm_reads(int fd) { FD_CLR(fd, &m_reads);}
    bool fd_isset(int fd) { return FD_ISSET(fd, &m_reads);}


    //监听
    // 传递进行一个引用
    // fd_set myreads = mySelect.get_reads()
    // mySelect(myreads);
    int select(fd_set & reads) {
        return ::select(m_maxfd+1, &reads, 0, 0, m_p_timout);
    }


    
};
