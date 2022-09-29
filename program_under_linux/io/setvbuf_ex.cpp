#include <stdio.h>
#include <stdlib.h>
#include <sys/stat.h>
 
char buff[1028];
int main(void)
{
    FILE* fp = fopen("test.txt", "r");
    if(fp == NULL) {
       perror("fopen"); return EXIT_FAILURE;
    }
 
    struct stat stats;
    int fileno(FILE*);
    if(fstat(fileno(fp), &stats) == -1) { // POSIX only
        perror("fstat"); return EXIT_FAILURE;
    }
 
    printf("BUFSIZ is %d, but optimal block size is %ld\n", BUFSIZ, stats.st_blksize);
    // if(setvbuf(fp, NULL, _IOFBF, 9999) != 0) {
    if(setvbuf(fp, buff, _IOFBF, 1024) != 0) {
       perror("setvbuf failed"); // POSIX version sets errno
       return EXIT_FAILURE;
    }
 
    int ch;
    while((ch=fgetc(fp)) != EOF); // read entire file: use truss/strace to
                                  // observe the read(2) syscalls used
 
    fclose(fp);
    return EXIT_SUCCESS;
}
