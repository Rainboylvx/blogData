
这个是在ubuntu是手动安装gitea的视频

[[Gitea] Gitee不能用？手把手教你搭建git服务\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1ZU4y1y7SP/?spm_id_from=333.337.search-card.all.click&vd_source=a16e7d60ec30d7ca460e723941be155c)


我查一下官方的docker安装方法

先安装docker-compose`curl -sL xxx -o xxx`

```
version: "3"

networks:
  gitea:
    external: false

services:
  server:
    image: gitea/gitea:1.17.4
    container_name: gitea
    environment:
      - USER_UID=1000
      - USER_GID=1000
      - GITEA__database__DB_TYPE=mysql
      - GITEA__database__HOST=db:3306
      - GITEA__database__NAME=gitea
      - GITEA__database__USER=gitea
      - GITEA__database__PASSWD=gitea
    restart: always
    networks:
      - gitea
    volumes:
      # 这里要改
      - /path/to/gitea:/data
      # 这里要改,和原来的不一样
      - /etc/TZ:/etc/timezone:ro
      - /etc/localtime:/etc/localtime:ro
    ports:
      - "4000:3000"
      - "4222:22"
    depends_on:
      - db

  db:
    image: mysql:8
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=gitea
      - MYSQL_USER=gitea
      - MYSQL_PASSWORD=gitea
      - MYSQL_DATABASE=gitea
    networks:
      - gitea
    volumes:
      - /path/to/mysql:/var/lib/mysql
```

不知道为什么会有mysql的权限的问题,所以`chmod 777 /path/to/mysql`


再根据这个修改gitea的配置[Nas轻量git方案：Docker安装Gitea - 知乎](https://zhuanlan.zhihu.com/p/351649897)

输入 vi /synology/data/gitea/conf/app.ini进入修改配置

```
DOMAIN = 
SSH_DOMAIN =
ROOT_URL = 
service]
DISABLE REGISTRATION = true
REQUIRE SIGNIN VIEW = true
```

