---
title: "CentOS 7 安装 PHP 7"
slug: "Install Php 7 on Centos 7"
categories: ["开发运维"]
tags: ["PHP7", "CentOS7", "yum", "epel", "webtatic", "php-fpm", "php-opcache"]
date: 2017-07-25T13:52:04+08:00
draft: false
---

CentOS 7 的官方 yum 源中提供的 PHP 版本为 5.4.16。这一版本已经无法满足 PHP 较新框架（如 Laravel 5）的使用需求。下面就提供一种“优雅”方法，实现在 CentOS 7 上安装 PHP 7，即通过开源维护的 [Webtatic Yum](https://webtatic.com/) 源来获取最新的 PHP 版本 7.1.x。

首先，我们先检查并删除可能已经通过 yum 安装的老版本 PHP，源码安装的则需要自己删除。

```
# 列表已安装的 PHP 相关包
yum list installed | grep php
# 确认移除上面列出的全部 PHP 相关包
yum remove php*
```

然后，安装 Webtatic Yum 源。这里，我们还需要使用到另一个开源支持的高质量附加包源 EPEL。

```
rpm -Uvh https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm
```

软件源安装完成后，我们就可以通过 yum 命令，实现“优雅”地安装 PHP 7 了。

```
yum install php71w-fpm php71w-opcache
```

这里仅安装了 [php71w-fpm](https://secure.php.net/manual/zh/install.fpm.php) 和 [php71w-opcache](http://www.php.net/manual/zh/book.opcache.php)。还可以通过命令 yum info php71w* 获得更多 php 7 相关的包。



**参考资料**

[PHP 7.1 on CentOS/RHEL 6.8 and 7.3 via Yum](https://webtatic.com/packages/php71/)