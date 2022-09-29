/* compile with SYSIFCOPT(*IFSIO) */
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <string.h>
#include <unistd.h>
 
int main(void)
{
   long length;
   int fh;
   char buffer[20];
   FILE *fp;
 
   printf("\nCreating sample.dat.\n");
   if ((fp= fopen("sample.dat", "w")) == NULL) {
       perror(" File was not created: ");
       exit(1);
   }
   fputs("Sample Program", fp);
   fclose(fp);
 
   memset(buffer, '\0', 20);                              /* Initialize buffer*/
 
   if (-1 == (fh = open("sample.dat", O_RDWR|O_APPEND))) {
      perror("Unable to open sample.dat");
      exit(1);
   }
   if (NULL == (fp = fdopen(fh, "r"))) {
      perror("fdopen failed");
      close(fh);
      exit(1);
   }
   if (14 != fread(buffer, 1, 14, fp)) {
      perror("fread failed");
      fclose(fp);
      exit(1);
   }
   printf("Successfully read from the stream the following:\n%s.\n", buffer);
   fclose(fp);
   return 1;
 
   /****************************************************************
    * The output should be:
    *
    * Creating sample.dat.
    * Successfully read from the stream the following:
    * Sample Program.
    */
}
