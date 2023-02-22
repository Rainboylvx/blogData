
#include <iostream>
#include <iterator>
#include <string>
#include <regex>
using namespace std;
int main(){
    string name = "problem1.in";
    std::regex e("\\w+(\\d+)\\.in");
    smatch cm;
    regex_match(name, cm, e);
    std::cout << 
    cm[1].str().c_str();
        ;
    for (const auto& e : cm) {
        std::cout << e<< std::endl;
    }
    return 0;
}
