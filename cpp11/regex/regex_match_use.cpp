#include <iostream>
#include <iterator>
#include <string>
#include <regex>
using namespace std; 
#define  log(one) std::cout << #one << " " << one << std::endl
int main()
{

    string str = "Hello_Hello_2018!";
    regex pattern("Hello.+");	
    regex pattern2("Hello_(\\w+)_(\\d{4})!");	
    std::smatch sm;
    if( regex_match(str, sm, pattern) ){
        std::cout << "match" << std::endl;
        std::cout << sm.str() << std::endl;
        std::cout << sm.length() << std::endl;
    }
    else    
        std::cout << "no match" << std::endl;

    std::smatch sm2;
    if( regex_match(str , sm2,pattern2) ){
        std::cout << "pattern2 match" << std::endl;
        std::cout << sm2.str() << std::endl;
        std::cout << sm2.length(0) << std::endl;
        std::cout << sm2.length(1) << std::endl;
        std::cout <<"sm2[0] " << sm2[0] << std::endl;
        std::cout <<"sm2[1] " << sm2[1] << std::endl;
        std::cout <<"sm2[2] " << sm2[2] << std::endl;
        std::cout <<"sm2[3] " << sm2[3] << std::endl;
        std::cout << "for { sm2}" << std::endl;
        for (const auto& e : sm2) {
            std::cout << e << std::endl;
        }
        std::cout << "sm2.size() " << sm2.size() << std::endl;
        log(sm2.leng);
    }

return 0;
}
