---
title: "CDH本地镜像源的部署"
slug: "Cdh Repo Local Source Deployment"
categories: ["运维"]
tags: ["CentOS7","CDH","yum","repo"]
date: 2019-04-20T14:50:45+08:00
draft: true
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

服务也可以通过 service 来关闭。


