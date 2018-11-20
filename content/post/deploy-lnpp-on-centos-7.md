---
title: "CentOS 7 搭建 LNPP（Linux，Nginx，PHP，PostgreSQL）"
slug: "Deploy Lnpp on Centos 7"
categories: ["开发运维"]
tags: ["lnpp", "Linux", "Nginx", "PHP", "PostgreSQL", "CentOS7"]
date: 2017-07-26T14:25:31+08:00
draft: false
---

# 安装

> **安装版本：**
> 
> CentOS 7.3 64位 
> 
> Nginx 1.10.2 
> 
> PHP 7.1.6 
> 
> PostgreSQL 9.2.18

CentOS 7 上的 PHP 版本较低。所以首先，我们需要强化一下我们的 yum，添加 EPEL 源和 Webtatic 源。

```
rpm -Uvh https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm
```

接下来我们就可以通过 yum 来安装上述软件了。

```
# Nginx
yum install nginx
# PHP —— 包括 cli，fpm，数据库连接和其它需要模块
yum install php71w-cli php71-fpm php71w-mbstring php71w-pdo php71w-pgsql
# PostgreSQL —— 包括 client，server 和 contrib
yum install postgresql postgresql-contrib postgresql-server
```

其中，PHP 的相关模块基本均可以通过 yum 来安装，可以通过 yum info php71w* 来查看全部可用软件包。PostgeSQL 的 postgresql-contrib 则用于管理数据库相关的扩展模块。

# 配置

默认的，Nginx 的用户（组）为 nginx:nginx，php-fpm 的用户（组）为 apache:apache。为确保应用顺利启用，此处可将两者配置为相同的用户（组）www:www。

Nginx 的配置文件为 /etc/nginx/nginx.conf，修改其中的 user 值。

```
user www
```

php-fpm 的配置文件为 /etc/php-fpm.d/www.conf，修改其中的 user 和 group 值。

```
user = www
group = www
```

# 启动

完成上述安装和配置后，就可以开启相关服务了。

```
# 启动 Nginx
service nginx start
# 启动 php-fpm
service php-fpm start
# 初始化并启动 PostgreSQL
service postgresql initdb
service postgresql start
```


# 参考资料：

[CentOS 7 安装 PHP 7](http://devops-club.com/article/install_php_7_on_centos_7)