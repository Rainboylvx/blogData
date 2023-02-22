#include <stdio.h>
#include <unistd.h>
#include <pthread.h>
#include <stdlib.h>
#include <sys/time.h>
#include <iostream>
#include <atomic>

int global_int = 0;
// 进行初始化
std::atomic_flag mutex = ATOMIC_FLAG_INIT;
void* thread_func(void *arg)
{
	int i = 0;
    while(i < 1000000)
    {
        if(!mutex.test_and_set())
        {
            global_int++;
            i++;
            mutex.clear();
        }
        else
        {
            /* code */
        }
    }
}

int main()
{
	struct timeval start_time, end_time;
    //运行计时开始
	gettimeofday(&start_time, NULL);
	int proc, i;
	proc = sysconf(_SC_NPROCESSORS_ONLN);  // 获取cpu核数
	if (proc < 0)
    {
        exit(1);
    }
	pthread_t *threadId = (pthread_t *)malloc(proc*sizeof(pthread_t));
	for (i = 0; i < proc; i++)
    {
		pthread_create(&threadId[i], NULL, thread_func, NULL);
	}

	for (i = 0; i < proc; i++)
    {
		pthread_join(threadId[i], NULL);
	}
    //运行计时结束
	gettimeofday(&end_time, NULL);
    //打印相关信息
	printf("thread number = %d global_int = %d cost time msecond = %ld\n",
                 proc, global_int,
                  (long)((end_time.tv_sec - start_time.tv_sec)*1000 + (end_time.tv_usec - start_time.tv_usec)/1000));
}

