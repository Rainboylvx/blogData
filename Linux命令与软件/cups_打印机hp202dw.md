# Archlinux下使用hp 202dw wifi printer

## Cause

买一个打印 hp m202dw,可以自动双面,无线打印,这样我切换电脑系统,手机,平板的时候,就可以无缝的打印了,😄


## 1. 如何无线连接打印机?

通过打印机的面板,打开无线直连,参考这个Youtube [Connect HP Laserjet 202dw Printer with Mobile using Wifi II HP Wifi Printer connect with mobile - YouTube](https://www.youtube.com/watch?v=msV8a1FaDmw)

然后电脑连接printer wifi,通过ip`http://192.168.223.1`,设置printer连接路由器的wifi,记住路由器上它的ip

ps: 不要忘记把关闭无线直连,为了安全



## window 安装驱动

简单,下载安装`hp smart`

## Android 安装

TODO

## Archlinux 下

先安装 [CUPS - ArchWiki](https://wiki.archlinux.org/title/CUPS#Network)

```
sudo pacman -S cups
```

查一下文档和其它



看了这两个文档

- [How to Set Up a Printer by Using the lpadmin Command - Configuring and Managing Printing in Oracle® Solaris 11.2](https://docs.oracle.com/cd/E36784_01/html/E36821/gllia.html)
- [Adding a network printer with lpadmin](http://www.physics.drexel.edu/~wking/unfolding-disasters-old/posts/Adding_a_network_printer_with_lpadmin/)

手动添加了下

```plaintext
lpadmin -E -p 202dw -v socket://192.168.31.114 -m drv:///sample.drv/laserjet.ppd  -E
```

发现可以打印,但是必须还要按一下打印的ok button,一定是哪里不对


又看了这个:[How to install networked HP printer and scanner on Ubuntu Linux - nixCraft](https://www.cyberciti.biz/faq/how-to-install-networked-hp-printer-and-scanner-on-ubuntu-linux/)

下载
```
sudo pacman -S hplib
```


添加打印机

```
hp-toolbox
```

打印ok

其它文章 [[SOLVED] Setting up an HP printer (HP OfficeJet Pro 9010 Series), wifi / Newbie Corner / Arch Linux Forums](https://bbs.archlinux.org/viewtopic.php?id=272238)
