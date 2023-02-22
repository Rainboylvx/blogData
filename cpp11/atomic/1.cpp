#include <atomic>
#include <vector>
#include <thread>
#include <iostream>
using namespace std;

atomic<int> a{0};
//int a{0};

void func(){
    for(int i=1;i<=10000;++i){
        a+=1;
    }
}



int main(){
    vector<thread> v;
    for(int i=1;i<=10;++i){
        v.push_back(std::thread(func));
    }
    for (auto& e : v) {
        e.join();
    }
    std::cout << a << std::endl;
    return 0;
}
