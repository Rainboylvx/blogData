#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <cstring>

#include <fcntl.h>
#include <unistd.h>

int main(){
    
    std::cout << "creating sample.dat" << "\n";

    //创建一个 c 语言的 文件流
    FILE * fd = fopen("sample.dat", "w");
    if( fd == nullptr ) {
        std::cout << "File create failed!" << "\n";
        return 0;
    }

    //写入 文件流里
    fprintf(fd, "sample program");
    fclose(fd); //关闭c文件流

    //创建一个buffer
    char buffer[20] = {0};

    //使用open创建一个文件描述符号
    int fh = open("sample.data", O_RDWR | O_APPEND);
    if( fh == -1 ){ //创建失败
        std::cout << "Uable to open sample.data" << "\n";
        return 0;
    }

    //关联 文件描述符号 与 c文件流
    FILE * fp = fdopen(fh, "r");
    if(fp == nullptr) {
        std::cout << "fdopen failed" << "\n";
        return 0;
    }

    // 读取 c文件流
    if( 14 != fread(buffer, 1, 14, fp)){
        std::cout << "read error" << "\n";
        fclose(fp);
        return 1;
    }
    std::cout << "Successly read from the stream :\n" << buffer << "\n";
    fclose(fp);
    return 0;
}
