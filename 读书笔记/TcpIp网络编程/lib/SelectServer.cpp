//一个基于select的server
#include "acceptor.h"
#include "select.h"

const int BUFF_SIZE = 1;
char buff[BUFF_SIZE];

void error_handling(const char *);

int main(){
    Acceptor myacceptor(9090);
    if( !myacceptor.listen() ){
        error_handling("acceptor listen() failed!");
        return 1;
    }
    mySelect my_select; //永久的等
    my_select.add_reads(myacceptor.get_socket());
    printf("listen at port 9090\n");

    while(1){
        fd_set cpy_reads = my_select.get_reads();

        int fd_num = my_select.select(cpy_reads);
        if( fd_num == -1) break;
        if( fd_num == 0) continue;

        for(int i =0 ;i< my_select.get_maxfd()+1;i++){
            if( FD_ISSET(i, &cpy_reads) == 0 ) continue;

            if( i == myacceptor.get_socket()){
                struct sockaddr_in client_addr;
                // 等待连接
                printf("waiting client connect..\n");
                int client_socket = myacceptor.accept(&client_addr);

                my_select.add_reads(client_socket);
                printf("connect client %d\n",client_socket);
            }
            else {
                int read_len = read(i,buff,BUFF_SIZE);
                if( read_len == 0) { // ? 0 代表关闭?
                    my_select.rm_reads(i);
                    close(i);
                    printf("close client %d\n",i);
                }
                else { //读取不为0
                    //echo
                    printf("send %.*s\n",read_len,buff);
                    write(i, buff, read_len);
                    // ? 
                    // 如果在写的时候client 主动关闭了怎么办?
                }
            }

        }
    }

    return 0;
}
