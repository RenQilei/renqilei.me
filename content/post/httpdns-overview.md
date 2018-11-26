---
title: "HttpDNS 原理"
slug: "HttpDNS Overview"
categories: ["运维"]
tags: ["httpdns"]
date: 2018-11-21T19:29:48+08:00
draft: false
---

# DNS

DNS（Domain Name System，域名系统），提供将网站域名转为 IP 地址的服务。

通常，需要通过 UDP 协议访问就近的 DNS 服务器，来查询域名的真实 IP。

![UDP访问DNS服务器](http://misc.linkedkeeper.com/misc/img/blog/201707/linkedkeeper0_d6ffa75c-1cf0-4b5e-94af-1da37e3af9a4.jpg)

这种 IP 查询方式比较容易造成安全问题，原因是：

1. UDP 本身是不可靠的网络传输协议
2. 运营商和其他中间人容易进行域名劫持，返回错误的 IP，或投放广告

# HttpDNS

HttpDNS 则是使用 HTTP 协议替代 UDP 协议与 DNS 服务器进行数据交互，并采用“权威 DNS”替代运营商的本地 DNS。此举可以有效地阻止域名劫持，并提高域名解析效率。

![HttpDNS 替代 DNS](http://misc.linkedkeeper.com/misc/img/blog/201707/linkedkeeper0_430832a1-fa08-4475-9eff-f19c4c1e99eb.jpg)


# 参考文档

* [《HttpDns 原理是什么》](http://www.linkedkeeper.com/171.html)