#include <iostream>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <chrono>
using namespace std;


mutex mu;
condition_variable cv;

bool ready = false;
bool processed = false;

int main(){
    
    thread a([](){

            while ( 1 ) {
                std::unique_lock<std::mutex> lck(mu);
                cv.wait(lck,[](){ return ready;});
                std::cout << " I am working ...... " << std::endl;
                for(int i=1;i<=3;++i){
                this_thread::sleep_for(chrono::seconds(1));
                std::cout << i << std::endl;
                }
                std::cout   << std::endl;
                std::cout   << std::endl;
                std::cout   << std::endl;
                ready = false;

            }

            });

    for(int i=1;i<=2;++i){
        ready = true;
        cv.notify_one();
    }


    a.join();



    return 0;
}
