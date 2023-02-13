/// <reference types="vite/client" />
declare global {
    interface Window { 
        getCurrentTabInfo: any; 
    }
}

// 对所有以 virtual-dates: 开头的模块声明共同的类型
declare module 'virtual-blog-data' {
  // 声明一个变量，保存这个值的类型
  const date: Date
  // 告诉 ts，这个模块默认导出的值就是这个 date 变量的类型
  export default date
}
