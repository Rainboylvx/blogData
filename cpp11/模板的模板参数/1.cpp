#include <vector>
using namespace std;

template <typename T, 
          template <typename ELEM, typename Alloc = std::allocator<ELEM> > 
          Container = std::vector>
class Stack
{
public:
    void push(const T &);
    void pop();
    T top() const
    {
        return cont_.back();
    }
    bool empty() const
    {
        return cont_.empty();
    }
private:
    Container<T> cont_; //利用传进来的模板进行声明
};

//template <typename T, template <typename, typename> class Container>
//void Stack<T, Container>::push(const T &val)
//{
    //cont_.push_back(val);
//}

//template <typename T, template <typename, typename> class Container>
//void Stack<T, Container>::pop()
//{
    //cont_.pop_back();
//}
int main(){
    Stack<int, std::vector> a;
    Stack<int, std::vector<int,std::allocator<int>> > a;
    return 0;
}
