---
title: "CDH本地镜像源的部署"
slug: "Cdh Repo Local Source Deployment"
categories: ["运维"]
tags: ["CentOS7","CDH","yum","repo"]
date: 2019-04-20T14:50:45+08:00
draft: false
---

[CDH](https://www.cloudera.com/products/open-source/apache-hadoop/key-cdh-components.html) 是 Cloudera 提供的开源企业级大数据工具集，包括 Hadoop、Flume、HBase、Hive 等一系列资源。

本文基于 CentOS 7，完成了 CDH 本地 yum 镜像源的制作。

# 关闭防火墙和 SELinux

关闭防火墙及 iptables

```
systemctl stop firewalld
systemctl stop iptables
chkconfig iptables off
```

服务也可以通过 service 来关闭。检查 ```/etc/selinux/config``` 是否配置正确：

```
# This file controls the state of SELinux on the system.
# SELINUX= can take one of these three values:
#     enforcing - SELinux security policy is enforced.
#     permissive - SELinux prints warnings instead of enforcing.
#     disabled - No SELinux policy is loaded.
SELINUX=disabled
# SELINUXTYPE= can take one of these two values:
#     targeted - Targeted processes are protected,
#     mls - Multi Level Security protection.
SELINUXTYPE=targeted 
```

# 下载并制作 Cloudera CDH repo

## 添加 CDH repo yum 源

Cloudera CDH repo 可以到其官网获取，如 CentOS7 的 CDH5 为：```https://archive.cloudera.com/cdh5/redhat/7/x86_64/cdh/cloudera-cdh5.repo```，下载该 repo 文件并放置于 ```/etc/yum.repo.d/``` 目录中。

## 下载并制作镜像源

安装 createrepo：

```
yum install yum-utils createrepo
```

选择目录并下载 CDH5 rpm 包：

```
# 建议放置在非系统盘的目录中，此处暂用 /cdh5-repo
cd /cdh5-repo
reposync -r cloudera-cdh5
```

制作 repo：

```
createrepo .
```

下载 RPM-GPG-KEY-cloudera 文件放置在同目录下：```https://archive.cloudera.com/cdh5/redhat/7/x86_64/cdh/RPM-GPG-KEY-cloudera```

## 添加 http 服务

使用 Nginx 搭建静态文件服务器：

```
location / {
    root /cdh5-repo;
    autoindex on;
}
```

# 修改本地 CDH5 yum 源至本地镜像源

```
name= CDH5
baseurl=http://127.0.0.1/RPMS/x86_64/
gpgkey =http://127.0.0.1/RPM-GPG-KEY-cloudera-cdh6
gpgcheck = 1
```

最后，```yum update``` 更新源即可使用。