//梁笔记
//zouzhongliang.com
 
 
#include <iostream>
using namespace std;
 
struct struct_Test1
{
	char c;
	int  i;
	double d;
};
 
struct struct_Test2
{
	char c;
	double d;
	int  i;
};
 
int main()
{
	struct_Test1 test1;
	struct_Test2 test2;
 
	cout<<"char alignment:"<<alignof(char)<<endl;
	cout<<"int alignment:"<<alignof(int)<<endl;
	cout<<"double alignment:"<<alignof(double)<<endl;
	cout<<"test1 alignment:"<<alignof(test1)<<endl;
	cout<<"test2 alignment:"<<alignof(test2)<<endl;
	cout<<"test1 size:"<<sizeof(test1)<<endl;
	cout<<"test1 size:"<<sizeof(test2)<<endl;
 
 
	return 0;
}
