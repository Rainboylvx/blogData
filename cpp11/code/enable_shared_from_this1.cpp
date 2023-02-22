#include <memory>
#include <iostream>
#include <string>
using namespace std;


// 必须用public 继承
class BB : public enable_shared_from_this<BB>{
    public:
        std::shared_ptr<BB> getptr(){
            return shared_from_this();
        }
        ~BB(){
            cout << "BB: ~BB() called !" << endl;
        }

};
int main(){
    //shared_ptr<BB> p1 = make_shared<BB>();
    shared_ptr<BB> p1(new BB());
    cout << p1.use_count() << endl;

    shared_ptr<BB> p2 = p1->getptr();
    cout << p1.use_count() << endl;

    return 0;
}
