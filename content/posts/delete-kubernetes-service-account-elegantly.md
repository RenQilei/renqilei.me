---
title: "优雅地删除 Kubernetes 服务账号"
slug: "Delete Kubernetes Service Account Elegantly"
categories: ["运维","Kubernetes"]
tags: ["Kubernetes"]
date: 2019-05-31T00:34:57+08:00
draft: false
---

在优雅地删除 Kubernetes 服务账号（Service Account）前，我们得先通过 kubectl 创建一个账号：

```
kubectl create serviceaccount test-account -n default
```

这一条指令就能够完成服务账号的创建了，同样可以通过 kubectl 来查看：

```
kubectl get secret -n default
```

这里会看到一个包含 NAME、TYPE、DATA、AGE 等字段的列表，其中包含 test-account-token-sg4fc，其中最后一组字符串随机生成。

走到这里，为了简单起见，不再对该账号产生任何想法，准备直接删除它。

# 删除 secret

如果删除账户的目的仅仅是因为其 Token 或信息泄露导致，那么这里可以通过直接删除 secret 来实现账户信息的重新创建。

```
kubectl delete secret test-account-token-sg4fc -n default
```

当 secret 被删除后，会自动重建一个新的 secret，名称上最后一组字符串会有改变。

# 彻底删除 Service Account

如果确实想直接删除服务账户，那么就直接通过其名称就行删除。

```
kubectl delete serviceaccount test-account -n default
```

这里的 Service Account 显然不是和上面创建的 secret 有所不同，为服务账户创建时的名称。

# 参考文档

* [干货 | 京东云托管Kubernetes集成镜像仓库并部署原生DashBoard 5.1 创建 ServiceAccount](https://juejin.im/post/5ce63ed6e51d4556f76e7fe8#heading-20)
* [How to delete a service account in kubernetes?](https://stackoverflow.com/a/52323436)
