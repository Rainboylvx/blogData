#include <iostream>
#include <atomic>
using namespace std;

std::atomic<int> ai;

int  tst_val= 4;
int  new_val= 5;
bool exchanged= false;

// vals output
void valsout()
{
    std::cout << "ai= " << ai
          << "  tst_val= " << tst_val
          << "  new_val= " << new_val
          << "  exchanged= " << std::boolalpha << exchanged
          << "\n";
}

int main(){
    ai = 3; //给ai值
    
    valsout(); //输出值

    exchanged = ai.compare_exchange_strong(tst_val,new_val);
    valsout();

    exchanged = ai.compare_exchange_strong(tst_val,new_val);
    valsout();
    return 0;
}
