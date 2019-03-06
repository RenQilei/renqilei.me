---
title: "Laravel 最佳 API 架构"
slug: "Best Api Architecture With Laravel"
categories: ["开发"]
tags: ["Laravel", "API", "架构"]
date: 2019-02-07T12:43:30+08:00
draft: true
---

项目开发中，有效地进行组件化开发，能够使代码具有更好的可读性和可维护性。Laravel 是一款优雅的 PHP 框架，支持 RESTful API 的开发。

Laravel 的初步开发中，基本以基于 Controller 和 Model 的开发为主，如下图中的蓝色箭头数据流所示，为“Request --> Controller --> Model --> Controller --> Response”。其中，

* **Controller** 负责接收请求、处理请求并返回请求结果。
* **Model** 负责处理数据库相关的增删改查操作。

![Laravel API 请求工作流](https://static.renqilei.me/posts/img/laravel-api-request-workflow.png)

上述基于 Controller+Model 的传统开发，会使得 Controller 变得极为臃肿，故在整个请求处理流程中，如上图橙色箭头显示增加若干新的组件，针对性的进行数据处理操作。

在请求到达 Controller 前，通过 Middleware 进行数据验证和权限控制等请求筛选操作。

* **Middleware**

当 Controller 需要向 Model 获取数据相关内容时，加入 Repository 和 Service 进行辅助数据处理操作。

* **Repository**
* **Service**

在 Controller 完成请求处理进行数据返回时，使用 Transformer 和 Formatter 对数据进行必要的数据和格式处理操作。

* **Transformer** 负责将 Model 返回的数据针对接口所需进行必要的筛选处理。
* **Formatter** 负责将标准化处理返回数据，使各接口返回的数据格式统一，内容完整。

# 参考文档

* [打造 Laravel 优美架构——谈可维护性与弹性设计](https://mp.weixin.qq.com/s/gBeXW0Oqe56Eqo40vz7hnw)