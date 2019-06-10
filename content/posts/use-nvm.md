---
title: "使用 Node.js 版本管理工具 nvm"
slug: "Use Nvm"
categories: ["开发", "工具"]
tags: ["node.js", "nvm"]
date: 2019-06-11T02:22:11+08:00
draft: false
---

安装 nvm

```
brew install nvm
```

配置环境（`.bash_profile` 或 `.zshrc` 中）

```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

激活环境

```
source .bash_profile
# or
source .zshrc
```

常用命令

```
nvm install stable
nvm install <version>
nvm ls
nvm ls-remote
nvm current
nvm use <version>
nvm alias <name> <version>
nvm unalias <name>
nvm reinstall-packages <version>
```

参考：

* [Best way to install and use nvm on Mac](https://medium.com/@isaacjoe/best-way-to-install-and-use-nvm-on-mac-e3a3f6bc494d)
* [Mac OS 下 NVM 的安装与使用](https://www.jianshu.com/p/622ad36ee020)