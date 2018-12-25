---
title: "CentOS 7 安装 Docker"
slug: "Deploy Docker on Centos7"
categories: ["运维"]
tags: ["CentOS","docker"]
date: 2018-12-25T17:35:50+08:00
draft: false
---

# 依赖

## devicemapper

CentOS 7 上需要安装 devicemapper 存储驱动来支持 Docker 的安装。具体 Docker 在各操作系统中使用的存储驱动参考：[Compatibility Matrix](https://success.docker.com/article/compatibility-matrix)。

## lvm

CentOS 7 上可以使用 lvm2 来管理 Linux 上逻辑卷的用户空间。

# 安装

```
# 安装必要的一些系统工具
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
# 添加软件源信息
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
# 更新并安装Docker-CE
sudo yum makecache fast
sudo yum -y install docker-ce
```

# 启动

```
# 启动 Docker
sudo systemctl start docker
# 开启自启动
sudo systemctl enable docker
```

# 参考文档

* [安装Docker](https://help.aliyun.com/document_detail/60742.html?spm=a2c4g.11186623.6.547.5eca378brCWftp)
* [Device Mapper系列 (3)：Docker 中使用 devicemapper 存储驱动](https://www.yangcs.net/posts/use-devicemapper/)