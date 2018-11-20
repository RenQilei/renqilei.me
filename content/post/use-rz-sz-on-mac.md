---
title: "在 Mac 上优雅地使用 rz 和 sz"
slug: "Use Rz Sz on Mac"
categories: ["工具"]
tags: ["lrzsz", "rz/sz", "mac", "iterm2", "iterm2-zmodem"]
date: 2017-07-25T13:56:57+08:00
draft: false
---

> 敲黑板：本文终端默认使用 iTerm2。

windows 上，通过 Xshell 和 SecureCRT 使用 rz/sz 时，都会弹出一个路径上传/下载选择窗口。

可 Mac 在手，不容掉粉啊。

本文就来介绍一下如何通过 iTerm2，“优雅”地使用 rz 和 sz 了。

首先，安装 lrzsz。

```
brew install lrzsz
```

brew 命令也是“优雅”的一个必要条件。装好 [homebrew](https://brew.sh/index_zh-cn.html)，走上人生巅峰。

接下来，安装 [iterm2-zmodem](https://github.com/mmastrac/iterm2-zmodem)。下载大神写好的脚本到本地 /usr/local/bin 目录下，并赋予 777 的读写权限。

```
sudo wget -P /usr/local/bin https://raw.github.com/mmastrac/iterm2-zmodem/master/iterm2-send-zmodem.sh
sudo wget -P /usr/local/bin https://raw.github.com/mmastrac/iterm2-zmodem/master/iterm2-recv-zmodem.sh
sudo chmod 777 /usr/local/bin/iterm2-*
```

如果你还没有 ```wget``` 命令，可 ```brew install wget``` 安装。

装完了 iterm2-zmodem，让我们来为 iTerm2 做一些“优雅”的操作。

![iterm2_zmodem]()

打开 iTerm2 的 Preferences（⌘ + ,），打开 Profiles 标签，选择一个账户（默认 Default），继续选择 Advanced -> Triggers -> Edit，添加两条 Trigger 记录：

Regular expression | Action | Parameters | Instant
--- | --- | --- | ---
rz waiting to receive.\*\*B0100 | Run Silent Coprocess | /usr/local/bin/iterm2-send-zmodem.sh	| checked
\*\*B00000000000000 | Run Silent Coprocess | /usr/local/bin/iterm2-recv-zmodem.sh	| checked

注意“官方”标注了 Instant 为 checked（即需要勾选），但尝试了不勾选也能使用，但建议尊重“官方”配置。

至此，你就可以通过 iTerm2 在远程服务器上自由欢脱地上传下载文件啦~



**参考文档：**

1. [ZModem integration for iTerm 2](https://github.com/mmastrac/iterm2-zmodem)
2. [OSX下iTerm2实现rz/sz与服务器进行文件上传/下载](https://molunerfinn.com/iTerm2-lrzsz/)
3. [iTerm2使用rz、sz远程上传或下载文件](http://w3cboy.com/post/2016/02/mac-iterm2-rz-sz/index.html)