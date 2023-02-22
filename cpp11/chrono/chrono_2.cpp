#include <chrono>
#include <iostream>



void print_time_(){

}
int main(){
    
    auto t = std::chrono::high_resolution_clock::now();
    // std::cout << t.time_since_epoch() << '\n';

    auto x = t + std::chrono::milliseconds(10);
    // std::cout << x.time_since_epoch() << "\n";
    return 0;
}
