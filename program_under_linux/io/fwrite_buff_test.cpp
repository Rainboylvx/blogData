// 测试fwrite 多次时,会不会 调用多次 write
#include <cstdio>

int main(){
    FILE * w_fd = fopen("test.out", "w");
    for(int i=1;i<=5;++i){
        fwrite("1", 1, 1, w_fd);
        // fflush(w_fd);
    }
    return 0;
}

