---
title: "CSS Flexbox 的使用"
slug: "Use Css Flexbox"
categories: ["开发","前端"]
tags: ["CSS","flexbox"]
date: 2018-12-11T19:07:01+08:00
draft: false
---

# 使用场景

多个 ```<div></div>``` 能够实现按序排列，而不是独占一行。如下面的例子，```.container``` 内的 ```.item``` 能够按序排列。

```
<div class="container">
    <div class="item">
    </div>
    <div class="item">
    </div>
    <div class="item">
    </div>
    ...
</div>
```

# 采用 flexbox 方案

## 父级容器属性

对父级容器声明内部排列样式。

```
.container {
    display: flex | inline-flex;
    flex-direction: row | row-reverse | column | column-reverse;
    flex-wrap: nowrap | wrap | wrap-reverse;
    flex-flow: <‘flex-direction’> || <‘flex-wrap’>;
    justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
    align-items: flex-start | flex-end | center | baseline | stretch;
    align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

## 子级元素属性

对子级元素声明排列样式。

```
.item {
    order: <integer>;
    flex-grow: <number>;
    flex-shrink: <number>;
    flex-basis: <length> | auto;
    flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ];
    align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

# 兼容性

Browser | Versions
--- | ---
Chrome | 21+
Firefox | 22+
Safari | 6.1+
IE | 11+
Android | 4.4+
iOS | 7.1+

# 参考文档

* [《A Complete Guide to Flexbox》](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)