#include <cstdio>

int main(){
    int fd = fileno(stdin);
    printf("fd of stdin is : %d\n",fd);
    return 0;
}
