#include <iostream>
#include <iterator>
#include <string>
#include <regex>
using namespace std; 
int main()
{

string str = "Hello_Hello_2018!";
regex pattern("Hello");	
cout << regex_replace(str, pattern, "") << endl;	//输出：_2018，将Hello替换为""
cout << regex_replace(str, pattern, "Hi") << endl;	//输出：Hi_2018，将Hello替换为Hi
std::string s = regex_replace(str, pattern, "Hi");
std::cout << str << endl ;
return 0;
}
