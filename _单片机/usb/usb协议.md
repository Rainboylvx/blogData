当D+/D-有一个上拉信号的时候,USB设备被检测到插入.


过程:

 - usb设备插入
 - 总线挂起复位多次
 - host->usb设备请求
 - device->host 设备描述符

usb标请求
 GET_DESCRIPTOR
 SET_ADDRESS
 SET_CONFIGURATION
设备描述符
设置地址
配置描述的集合
 - 配置描述符的结构
 - 接口描述符的结构
 - 端点描述符的结构
 - HID描述符的结构
字符串ji语言ID
报告描述符
