//weak_ptr 的基本使用
//
//
#include <iostream>
#include <memory>
using namespace std;
std::weak_ptr<int> gw;
 
void observe()
{
    std::cout << "gw.use_count() == " << gw.use_count() << "; ";
    // we have to make a copy of shared pointer before usage:
    if (std::shared_ptr<int> spt = gw.lock()) {
        std::cout << "*spt == " << *spt << '\n';
    }
    else {
        std::cout << "gw is expired\n";
    }
}
 

int main(){
    {
        auto sp = std::make_shared<int>(42);
        cout <<  "share ptr sp use count :" << sp.use_count() << endl;
        gw = sp;
        observe();
        auto sp2 = sp;
        cout <<  "share ptr sp use count :" << sp.use_count() << endl;
        gw = sp;
        observe();
    }
    observe();
    return 0;
}
