---
title: "Hugo 为不同的静态页面创建不同的页面模板"
slug: "Multi Templates for Multi Static Pages in Hugo"
categories: ["开发","Hugo"]
tags: ["Hugo","页面","模板定制"]
date: 2018-11-26T11:33:34+08:00
draft: false
---

# 背景

使用 Hugo 进行静态页面开发过程中，除了日常的博客文章记录外，准备新建一些“关于我（about me）”之类的特殊介绍性静态页面。

这类页面与普通的博客文章页面不同的是，它们有着个性化定制的需求：

* 独立的路由
* 定制的模板

# 开发

这里我以“关于我”页面进行举例。

## 创建静态页面

首先，我们需要将独立的页面视为一个独立的 section，即 ```content/about/```，并在该 section 下创建一个默认文本 ```_index.md```。

```
hugo new about/_index.md
```

这样，就会创建出路径为 ```content/about/_index.md``` 的文件。

## 定制页面模板

在主题中创建对应的模板文件。

根据 [liquiddandruff](https://github.com/liquiddandruff) 在 Hugo 的 Issues 中的[讨论](https://github.com/gohugoio/hugo/issues/679#issuecomment-294785804)，我们可以为独立的 section 创建独立的模板，即为 ```content/about``` 创建一个独立的模板于 ```themes/[your-theme]/section/about.html```。

## 效果

完成上述步骤后，就可以实现最初我们希望的效果，即

* 能够实现独立的路由访问：http://localhost:1313/about (```hugo server``` 下)
* 独立的定制模板

# 参考文档

* [Need multiple static pages - home, about, contact, prices etc. #679](https://github.com/gohugoio/hugo/issues/679#issuecomment-294785804)

