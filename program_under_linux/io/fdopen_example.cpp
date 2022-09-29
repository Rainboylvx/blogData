#include <cstdio>

int main(){
    FILE * rd = fdopen(0, "r");
    int a;
    fscanf(rd, "%d",&a);
    printf("a = %d \n",a);
    return 0;
}
