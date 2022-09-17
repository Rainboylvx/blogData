// delay
#include <iostream>
#include <cstring>
#include <unistd.h>
#include <fcntl.h>
#include <wait.h>

using T = char * const;
char * __argv[100] = {
    "ls","-l",NULL
};

int wait_child_exit(int pid){
    int status;
    int ret = -1;
    while ( 1 ) {
        ret = waitpid(pid, &status, WNOHANG);
        if( ret == -1) break;
        if( ret == 0) continue;
        return pid;
    }
    return ret;
}

int main(){
    int input_pipe_fd[2]; //写管道
    int output_pipe_fd[2];//读管道
    int ret = pipe(input_pipe_fd);
    if( ret == -1){
        std::cerr << "input_pipe_fd create failed" << "\n";
        return -1;
    }

    ret = pipe(output_pipe_fd);
    if( ret == -1){
        std::cerr << "output_pipe_fd create failed" << "\n";
        return -1;
    }

    int pid = fork();

    auto set_fd_no_close_on_exec = [](int fd){
        int flags =  fcntl(fd,F_GETFD,0);
        fcntl(fd, F_SETFD,flags & (~FD_CLOEXEC));
    };

    if(pid == 0){ // child
        close(output_pipe_fd[0]); //关闭 output的 读端
        close(input_pipe_fd[1]); //关闭 intput的 写端

        // dup2(input_pipe_fd[0], 0);
        dup2(output_pipe_fd[1], 1); //重定向写
        set_fd_no_close_on_exec(input_pipe_fd[0]);
        set_fd_no_close_on_exec(0);
        dup2(output_pipe_fd[1], 1);
        set_fd_no_close_on_exec(output_pipe_fd[1]);
        set_fd_no_close_on_exec(1);

        //执行
        const char * child_message = "hello world !";
        for(int i=1;i<=3;++i){

            // std::cout << "print " << i << " times" << std::endl;
            // std::endl 会把c++ 输出缓存的内容fflush

            write(1,child_message , strlen(child_message));
            sleep(1);
        }
        // https://unix.stackexchange.com/a/430371
        // fd will automatically closed when process terminates
        return 0;

    }
    else { // parent
        close(output_pipe_fd[1]); //关闭 output的 写端
        close(input_pipe_fd[0]); //关闭 intput的 读端
        
        //读取数据
        char buf[128];

        char message_buf[128];
        while ( 1 ) {
            
            int readn = read(output_pipe_fd[0], buf, sizeof(buf));
            //std::cout << "\n===> readn bytes : " << readn << "\n";
            sprintf(message_buf, "\n===> readn %d bytes.\n",readn);
            write(1, message_buf, strlen(message_buf));
            if(readn <= 0) break;
            // for(int i=1;i<=readn;++i){
            //     std::cout << buf[i-1];
            // }
            write(1, buf, readn);
        }

        int ret = wait_child_exit(pid);
        std::cout << "wait child exit ret id: "
            << ret
            << "\n";
        std::cout << "\n main process exit " << "\n";

    }

    return 0;
}
