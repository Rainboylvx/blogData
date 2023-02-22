#include <iostream>

struct listNode {};

struct PostTask {
    using callback_type = void (*)(PostTask *);

    void set_callback();
    
    callback_type get_callback(){
        return m_callback;
    }

    private:
        listNode m_listNode; // 从m_listNode 转成 PostTask 
        callback_type m_callback;
};

void form_node_to_postTask(){

}

// 加入队列的函数

int main(){
    
    return 0;
}
