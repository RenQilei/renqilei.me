---
title: "SSH 登录报错 Authentication refused: bad ownership or modes for directory"
slug: "Ssh Authentication Refused"
categories: ["Linux","CentOS","ssh"]
tags: ["Hugo","页面","模板定制"]
date: 2019-01-26T00:17:01+08:00
draft: false
---

在一次服务器故障后，发现常用的非 root 用户无法正常登录服务器了。通过 root 登录后查看 /var/log/secure，其报错为：```Authentication refused: bad ownership or modes for directory```。

该错误是由于非 root 用户的 .ssh 目录和其 authorized_keys 权限问题导致的。其解决方案为：

```
chmod g-w /home/[user]
chmod 700 /home/[user]/.ssh
chmod 600 /home/[user]/.ssh/authorized_keys
```

> 事实证明，当问题发生时，千万不要目测其目录和文件的权限是否正确，目测正确并非一定正确的，直接执行上述命令，即可解决问题。

# 参考文档

* [SSH Authentication Refused: Bad Ownership or Modes for Directory](https://www.daveperrett.com/articles/2010/09/14/ssh-authentication-refused/)
