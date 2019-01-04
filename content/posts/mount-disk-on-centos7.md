---
title: "CentOS 7 挂载磁盘"
slug: "Mount Disk on Centos7"
categories: ["运维"]
tags: ["CentOS7"]
date: 2018-12-26T18:59:53+08:00
draft: false
---

> 下面的指令未特别指出，均需 root 权限

# 检查磁盘分区和挂载情况

```
fdisk -l
```

如果 Disk 下无 Device Boot 信息，则表示未进行磁盘分区。

```
df -h
```

如果 FileSystem 下无 /dev/[vdx] 的挂载信息，则表示未进行磁盘挂载。其中，[vdx] 可能为其他命名方式，视实际信息查看。

# 磁盘分区

```
fdisk /dev/[vdx]
```

对磁盘进行初分区，需要根据提示键入指令，如果计划分区为单块物理分区，则依次输入 n, p, 1, ↩︎（回车）, ↩︎（回车），wq（保存）。

完成分区后，可以通过 ```fdisk -l``` 查看分区情况。

# 磁盘格式化

```
mkfs.ext4 /dev/[vdx1]
```

此处使用 ext4 格式对磁盘进行格式化，格式化的是方才创建完的新分区，**（注意不是磁盘）**。

# 挂载磁盘

```
mount /dev/[vdx1] /[directory]
```

将格式化完成后的分区挂载在指定目录。

其中，```/[directory]``` 需要是存在的目录。如需要，可以通过 mkdir 新建。

# 将新分区写入系统

```
echo '/dev/[vdx1]   /[directory]    ext4    defaults    0   0'>> /etc/fstab
```
