---
title: "Linux 上分区大于 2T 的磁盘"
slug: "Partition Disk Over 2t on Linux"
categories: ["运维"]
tags: ["Linux","磁盘"]
date: 2019-04-20T14:50:45+08:00
draft: false
---

在 Linux 上，大于 2T 的磁盘需要通过 parted 来进行磁盘分区操作。

以将 6T磁盘 /dev/sdb 初始化为例。

```
parted /dev/sdb
```

接下来将会在命令交互中执行命令：

1. ```mklabel gpt```
2. ```Yes```
3. ```print``` 打印信息
4. ```mkpart primary 0 6001GB``` 根据需要初始化磁盘类型和大小
5. ```Ingore``` 忽略告警信息
6. ```print``` 打印并确认信息
7. ```quit``` 无误后退出

交互展示信息为：

```
GNU Parted 3.1
Using /dev/sdb
Welcome to GNU Parted! Type 'help' to view a list of commands.
(parted)  mklabel gpt
Warning: The existing disk label on /dev/sdb will be destroyed and all data on this disk will be
lost. Do you want to continue?
Yes/No? y
(parted) print
Model: DELL PERC H710P (scsi)
Disk /dev/sdb: 6001GB
Sector size (logical/physical): 512B/512B
Partition Table: gpt
Disk Flags:

Number  Start  End  Size  File system  Name  Flags

(parted) mkpart primary 0 6001GB
Warning: The resulting partition is not properly aligned for best performance.
Ignore/Cancel? Ignore
(parted) print
Model: DELL PERC H710P (scsi)
Disk /dev/sdb: 6001GB
Sector size (logical/physical): 512B/512B
Partition Table: gpt
Disk Flags:

Number  Start   End     Size    File system  Name     Flags
 1      17.4kB  6001GB  6001GB               primary

(parted) quit
Information: You may need to update /etc/fstab.
```

上面打印的信息中，Number 对应当前的分区，如上面的分区即为 ```/dev/sdb1```。

当然，如果需要删除已分区的磁盘，可以直接通过 ```(parted) rm number``` 完成。

# 参考文档

* [CentOS下使用parted分区工具分区大于2T硬盘](http://zhmgz.lofter.com/post/90909_6bb1ed3)