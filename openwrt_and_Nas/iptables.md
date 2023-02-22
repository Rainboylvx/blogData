原理

## 参考

[理解 iptables · Jimmy Song](https://jimmysong.io/blog/understanding-iptables/)






下面来自 https://mp.weixin.qq.com/s/QOfORsSIcxuRXFj1xkUFcA
iptables 学习

 目的,端口转发 

 发送给我的 9422  端口的 都转发给 home.roj.ac.cn:9422
 发送给的

 前置知识:
 
 iptables flow 图

filter 表
 nat表(network address translate,网络地址转换)

查看nat表 `iptables -t nat -nL --line`


-t nat指定看nat表，不用-t默认为filter表
-L 列出表内所有规则，可以指定特定链
-n 使输出中的IP地址和端口以数值的形式显示
-v 输出详细化
--line 显示出每条规则在相应链中的序号

开启转发



PREROUTING链的作用是在包刚刚到达防火墙时改变它的目的地址，是从外部连接过来时的转发
OUTPUT链改变本地产生的包的目的地址，是本机连接时的转发
POSTROUTING链在包就要离开防火墙之前改变其源地址

如果想实现端口转发,主要是用nat表的上面三个链(prerouting,output,postrouting)实现这个功能

-t 指定配置表
-A 链中添加规则
-D 删除链中规则
-C 修改链中规则
-j target 决定符合条件的包到何处去，target模式很多

iptables -t nat -A PREROUTING -p tcp --dport 4444 -j REDRIECT --to-ports 6666

-t nat 目的是操作 nat 表
-A PREROUTING 在 PREROUTING 里添加一条规则
-p tcp tcp协议
--dport 4444 目的端口是4444时
-j REDRIECT 操作,重定向
--to-ports 6666 转到6666 

iptables -t nat -A PREROUTING -p tcp -s 192.168.10.0/24 --dport 4444 -j REDRIECT --to-ports 6666

将192.168.10.0/24网段访问4444端口的包转发到本机6666端口，其他网段则正常访问4444端口

远程端口转发

A 192.168.10.1
B 192.168.10.142
C 192.168.10.6

iptables -t nat -A PREROUTING --dst 192.168.10.142 -p tcp --dport 4444 -j DNAT --to-destination 192.168.10.6:6666

iptables -t nat -A POSTROUTING --dst 192.168.10.6 -p tcp --dport 6666 -j SNAT --to-source 192.168.10.142


MASQUERADE模式和SNAT模式作用一样，区别就是它不需要指定--to-source ，而是动态获取IP地址的连接的。比如，拨号上网、DHCP连接时我们ip是会变的。
只能用于nat表的POSTROUTING链 ，有一个非必须--to-ports选项

iptables -t nat -A POSTROUTING -p TCP -j MASQUERADE
iptables -t nat -A POSTROUTING --dst 192.168.10.6 -p tcp --dport 6666 -j MASQUERADE
