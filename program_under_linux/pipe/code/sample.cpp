#include <iostream>
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
        execvp("ls",__argv);

    }
    else { // parent
        close(output_pipe_fd[1]); //关闭 output的 写端
        close(input_pipe_fd[0]); //关闭 intput的 读端
        
        //读取数据
        char buf[128];

        while ( 1 ) {
            
            int readn = read(output_pipe_fd[0], buf, sizeof(buf));
            if(readn <= 0) break;
            for(int i=1;i<=readn;++i){
                std::cout << buf[i-1];
            }
        }

        int ret = wait_child_exit(pid);
        std::cout << "wait child exit ret id: "
            << ret
            << "\n";
        std::cout << "\n main process exit " << "\n";

    }

    return 0;
}
