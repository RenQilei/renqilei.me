---
title: "CentOS 7 卸载文件系统"
slug: "Unmount Filesystem on Centos7"
categories: ["运维"]
tags: ["CentOS7"]
date: 2019-01-07T23:36:34+08:00
draft: false
---

卸载文件系统（或设备）是基于已挂载的文件系统（或设备）进行操作的。CentOS 7 的文件系统挂载包括对磁盘的初始化和文件目录的挂载，具体可参考：[《CentOS 7 挂载磁盘》](posts/mount-disk-on-centos7/)。

文件系统的卸载使用 ```umount``` 命令。

```umount``` 的常用参数包括：

```
-a：卸除/etc/mtab中记录的所有文件系统；
-h：显示帮助；
-n：卸除时不要将信息存入/etc/mtab文件中；
-r：若无法成功卸除，则尝试以只读的方式重新挂入文件系统；
-t<文件系统类型>：仅卸除选项中所指定的文件系统；
-v：执行时显示详细的信息；
-V：显示版本信息。
```

如果出现 ```umount``` 指令报错的情况，如 ```umount: /myfs: device is busy```，则为待写在文件系统仍在使用，可以通过 ```lsof``` 查看：

```
lsof | grep myfs
```

# 参考文档

1. [umount命令](http://man.linuxde.net/umount)

