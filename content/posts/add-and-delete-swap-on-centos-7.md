---
title: "CentOS 7 添加和删除 swap 分区"
slug: "Add and Delete Swap on Centos 7"
categories: ["运维"]
tags: ["CentOS7"]
date: 2019-01-10T19:17:55+08:00
draft: false
---

# 什么是 swap

swap，中文名为交换空间。具体来说，Linux 将物理内存分为内存段，叫做页面。交换是指内存页面被复制到预先设定好的硬盘空间(叫做交换空间)的过程，目的是释放对于页面的内存。物理内存和交换空间的总大小是可用的虚拟内存的总量。

总之，swap 就是在必要的时候（如内存不足时）将部分内存空间释放到物理存储上，以腾出更多的内存空间给更需要的进程。

# 添加 swap

## 创建 swap

使用 ```dd``` 命令创建大小为 2G 的 /dev/mapper/swap。

```
dd if=/dev/zero of=/dev/mapper/swap bs=1024 count=2048000
```

## 初始化 swap

```
mkswap /dev/mapper/swap
mkswap -f /dev/mapper/swap
```

## 激活 swap

```
swapon /dev/mapper/swap
```

## 开机自启动

将分区信息添加到 ```/etc/fstab```。

```
/dev/mapper/swap swap swap default 0 0
```

# 删除 swap

## 停用正在使用的 swap

```
swapoff /dev/mapper/swap
```

## 删除 swap

```
rm /dev/mapper/swap
```

## 移除开机自启动

将 ```/etc/fstab``` 中的相关信息删除即可。

# 参考文档

1. [Swap](https://wiki.archlinux.org/index.php/Swap)
2. [Centos 7添加删除Swap交换分区](https://renwole.com/archives/1131)