---
title: "关于 CSS 文字两端对齐的小结"
slug: "Summary of Css Paragraph Justify"
categories: ["开发"]
tags: ["前端", "CSS"]
date: 2019-03-07T00:18:09+08:00
draft: false
---

最近网页开发中，碰到一个需求：希望对文字实现两端对齐。

第一时间使用了 ```text-align: justify```。但发现一个问题，如果是单行文字，中文可以实现两端对齐，但英文却并不会。

原因是：两端对齐仅支持多行文字，且最后一行并不会两端对齐。而单行文字，恰恰就是“最后一行”。也不是没有道理，一段文字，最后一行两端对齐的话想象一下也奇怪。

但恰恰此时需要！

# 解决方案一

思路就是在它后面再“创造”一行。

## 实现

```
.something {
    text-align: justify;
    &:after{
        content: '';
        display: inline-block;
        height:0;
        width: 100%;
    }
}
```

## 兼容性

IE6/7不支持 ```:after```，IE8 仅支持单冒号，其他浏览器均支持。

# 解决方案二

采用属性 ```text-align-last```。

## 实现

```
.something {
    text-align: justify;
    text-align-last: justify;
}
```

## 兼容性

IE 对 text-align-last 属性部分实现。Firfox12+ 和 Chrome47+ 支持。

**结论就是目前可以尽量使用解决方案一来实现这一需求！**

# 参考文档

* [文字两端对齐实现](https://www.jianshu.com/p/be28af882e2a)