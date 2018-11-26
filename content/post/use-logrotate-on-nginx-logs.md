---
title: "使用logrotate进行Nginx日志切割"
slug: "Use Logrotate on Nginx Logs"
categories: ["运维"]
tags: ["Nginx", "logrotate"]
date: 2018-11-11T12:11:44+08:00
draft: false
---


使用 Nginx 过程中，我们一定会通过记录访问日志和错误日志来记录和分析用户行为和运行情况。但随着时间的推移，日志文件就会变得愈来愈大，乃至占满有限的磁盘空间。因此，我们需要合理的根据时间或文件大小，来切割拆分日志并删除历史记录。
Nginx 默认并没有提供日志切割相关的方法，只是提供了切割日志时输出文件变更的信号 [USR1](https://www.nginx.com/resources/wiki/start/topics/examples/logrotation/)，本文采用 logrotate 和 crontab 实现对 Nginx 日志的切割和管理工作。

# logrotate 和 crontab

logrotate 和 crontab 均为 Linux 默认安装的服务。
检查 crontab 是否可用：
```
service crond status
```
检查 logrotate 配置文件存在和定时任务有效：
```
# logrotate 配置文件
/etc/logrotate.conf
# logrotate 定时任务
/etc/cron.daily/logrotate
```

# 配置 logrotate 定时脚本

通常，我们将定时脚本放在 ``` /etc/logrotate.d/ ``` 目录中，使用时请确认 ```/etc/logrotate.conf``` 中 include 了该目录。

## logrotate 常用参数

```
compress                   通过 gzip 压缩转储以后的日志
nocompress                 不压缩
copytruncate               用于还在打开中的日志文件，把当前日志备份并截断
nocopytruncate             备份日志文件但是不截断
create mode owner group    转储文件，使用指定的文件模式创建新的日志文件
nocreate                   不建立新的日志文件
delaycompress              一起和 compress 配合使用时，转储的日志文件到下一次转储时才压缩
nodelaycompress            覆盖 delaycompress 选项，转储同时压缩
ifempty                    即使是空文件也转储，这个是 logrotate 的缺省选项
notifempty                 如果是空文件的话，不转储
nomail                     转储时不发送日志文件
olddir [directory]         转储后的日志文件放入指定的目录，必须和当前日志文件在同一个文件系统
noolddir                   转储后的日志文件和当前日志文件放在同一个目录下
missingok                  如果待转储日志文件丢失，不要显示错误，执行下一个文件
sharedscripts              对于目录下所有待转储日志只运行一次脚本
prerotate/endscript        在转储以前需要执行的命令可以放入这个对，这两个关键字必须单独成行
postrotate/endscript       在转储以后需要执行的命令可以放入这个对，这两个关键字必须单独成行
daily                      指定转储周期为每天
weekly                     指定转储周期为每周
monthly                    指定转储周期为每月
rotate [count]             指定日志文件删除之前转储的次数，0 指没有备份，5 指保留 5 个备份
size [size]                当日志文件到达指定的大小时才转储，单位为 bytes（缺省），K，M
minsize [size]             当日志文件不小于指定大小时才转储，可以与转储周期配合使用，但要用在转储周期后，单位同上
```
更多的参数可以参考：[logrotate(8) - Linux man page](https://linux.die.net/man/8/logrotate)

## 编写一个 Nginx logrotate 脚本

在 ```/etc/logrotate.d``` 下创建脚本 ```nginx``` 文件
```
# 待转储日志路径可根据需要修改
/var/log/nginx/*.log {
    # 指定转储周期为每天
    daily
    # 最小转储大小为 1M
    minsize 1M
    # 待转储日志文件丢失不报错
    missingok
    # 指定日志文件删除之前转储的次数，此处保留 5 个备份
    rotate 5
    # 空日志文件则不转储
    notifempty
    # 创建转储文件的用户、组和权限信息
    create 664 www www
    # 转储成功后脚本只执行一次
    sharedscripts
    # 转储完成后触发 Nginx 信号
    postrotate
        [ ! -f /var/run/nginx.pid ] || kill -USR1 `cat /var/run/nginx.pid`
    endscript
}
```
保存脚本后，进行脚本测试：
```
/usr/sbin/logrotate -f /etc/logrotate.d/nginx
```

## crontab 定时执行策略

通过 ```/etc/crontab``` 或 ```/etc/anacrontab``` 每天定时执行 ```/etc/cron.daily``` 中的文件，包括 logrotate，具体执行时间可以通过配置上述 crontab 配置文件完成。

# 参考文档：

* [logrotate(8) - Linux man page](https://linux.die.net/man/8/logrotate)
* [配置 logrotate 的终极指导](https://linux.cn/article-8227-1.html)
* [被遗忘的Logrotate](https://huoding.com/2013/04/21/246)
* [nginx如何做日志切割](https://segmentfault.com/q/1010000000120419)


