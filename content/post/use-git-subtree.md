---
title: "Git subtree 的使用"
slug: "Use Git Subtree"
categories: ["开发","工具"]
tags: ["git","subtree"]
date: 2018-12-12T13:43:19+08:00
draft: false
---

# 场景

目前，git 的使用已是必不可少，但在实际生产开发过程中，不可避免的会出现这种的情况：项目 P1 和 P2 共用了一个项目 S。

使用中，我们希望保持项目 S 的独立开发，但同时希望保证项目 P1 和 P2 能够获取其最新的代码，甚至在 P1 和 P2 内就可以修改并提交针对 S 的更新。

# Git submodule VS subtree

submodule 是子项目的一个链接（link）；

subtree 则是子项目的一个拷贝（copy）。

# Git subtree 的使用

1. 添加项目 S（下均使用 proj-s）的 remote 信息：

```
git remote add proj-s http://github.com/[path-to-proj-s]
```

2. 拉取 proj-s 并指明路径

```
git subtree add --prefix=component/proj-s proj-s master
```

其中，```--prefix``` 后面的路径为基于 P1 或 P2 项目内的相对路径，```proj-s``` 为上一步中添加的 remote 名称，```master``` 为拉取分支，也可以来取其他分支。

3. P1/P2 中拉取 proj-s 到本地

```
git subtree pull --prefix=component/proj-s proj-s master
```

4. P1/P2 中提交 proj-s 到远端

```
git subtree push --prefix=component/proj-s proj-s hotfix/new-proj-s
```

如果这里提交到的是非 master 分支，那么在前往 proj-s 项目完成分支合并后，自己和其它人就可以通过拉取 master 使用最新的代码了。

# 参考文档

* [用 Git Subtree 在多个 Git 项目间双向同步子项目，附简明使用手册](https://segmentfault.com/a/1190000003969060)
* [Differences between git submodule and subtree](https://stackoverflow.com/questions/31769820/differences-between-git-submodule-and-subtree)