---
title: "PHP 项目使用 google/protobuf"
slug: "Use Google Protobuf in Php Project"
categories: ["开发"]
tags: ["mac","php", "protobuf"]
date: 2019-01-28T17:47:29+08:00
draft: false
---

# 使用 brew 安装 protobuf

brew 安装 protobuf：

```
brew install protobuf
```

检查是否安装成功：

```
protoc --version
```

# 源码安装 php-protobuf

下载 ```allegro/php-protobuf``` 项目并编译安装：

```
git clone https://github.com/allegro/php-protobuf
cd php-protobuf
composer install
./configure
make
make install
```

检查 php.ini 的路径并编辑添加 protobuf 扩展：

```
# 获取当前加载的 php.ini 路径
php -ini | grep "Loaded Configuration File"
# 添加扩展
extension="protobuf.so"
```

检查 php 扩展是否添加成功：

```
php -m | grep protobuf
```

# 使用 composer 引入项目使用

PHP 项目中使用 ```google/protobuf``` 最便捷的方式是借助 composer 安装使用。

首先，通过 composer 进行安装：

```
composer require google/protobuf
```

然后进行包中进行编译：

```
cd ./vendor/google/protobuf
./autogen.sh
./configure
make
make install
```

# 参考文档

* [Installing the Protobuf Compiler on a Mac](https://medium.com/@erika_dike/installing-the-protobuf-compiler-on-a-mac-a0d397af46b8)
* [Github allegro/php-protobuf](https://github.com/allegro/php-protobuf)
* [Mac php安装protobuf扩展](https://blog.csdn.net/JoeBlackzqq/article/details/83118248)
* [Packagist google/protobuf](https://packagist.org/packages/google/protobuf)