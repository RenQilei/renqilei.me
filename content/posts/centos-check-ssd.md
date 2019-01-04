---
title: "CentOS 检查磁盘是否为 SSD"
slug: "Centos Check Ssd"
categories: ["运维"]
tags: ["CentOS","磁盘","SSD"]
date: 2018-12-13T15:14:02+08:00
draft: false
---

```
cat /sys/block/[sda]/queue/rotational
```

打印结果：

0，即为 SSD 硬盘
1，即为机械硬盘

其中，[sda] 可以替换为各磁盘设备编号，其可以通过 ```fdisk -l``` 指令查看。

