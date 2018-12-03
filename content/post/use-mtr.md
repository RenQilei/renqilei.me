---
title: "网络诊断工具 mtr"
slug: "Use Mtr"
categories: ["工具"]
tags: ["lrzsz", "rz/sz", "mac", "iterm2", "iterm2-zmodem"]
date: 2018-12-03T10:37:32+08:00
draft: false
---

mtr 结合了 traceroute 和 ping 的功能，完成对网络的诊断。

> 不同于 traceroute 默认使用 UDP 数据包进行探测的是，mtr 默认使用 ICMP 报文进行探测，在某些路由器上 ICMP 的优先级低于其他数据包，所以测试结果可能略低于实际情况。

mtr 可以通过 Linux 的包管理工具进行下载和安装。

# 使用

## 参数说明

```
-r  生成结果报表
-s  指定数据包大小（bytes）
-c  指定发送数量
-n  只输出 IP，不对 hostname 进行解析
```

## 报表说明

```
第一列  Host    hostname/IP
第二列  Loss    
第三列  Snt     已发送的包数
第四列  Last    最后一个包的延时
第五列  Avg     平均发送延时
第六列  Best    最佳发送延时
第七列  Erst    最差发送延时
第八列  StDev   发送延时方差（稳定性）
```

# 参考文档

* [《每天学习一个命令: mtr 查看路由网络连通性》](http://einverne.github.io/post/2017/11/mtr-usage.html)