---
title: "Docker 开发指南"
english-title: "Using Docker"
isbn: "978-7-115-44957-3"
recommendation: "5/10"
date: 2019-01-04T00:04:08+08:00
draft: false
---

《Docker 开发指南》出版于 2017 年初，英文原版则应该更早些。当时的 Docker 应该在 1.8。那时还没有 Moby，更没有现在如此完整的 Docker 生态圈。但早期的基础架构和概念，目前仍可适用。

全书以一个 Python 开发的 identidock 项目为基础，阐述了基于 Docker 的软件生命周期（包括创建、分发、CI/CD 、部署和监控），以及 Docker 集群的网络配置、编排管理和安全问题。

书中展现了大量重用的 Docker 命令，通篇操作后应该能对 Docker 的日常使用有一个笼统地了解和意识。但是不少指令也会让人觉得云里雾里，会有迅速略过之感。

Docker 作为一种轻量级、跨平台、易于快速迭代的虚拟机化解决方案，对于微服务来说，着实可谓甘霖。但也存在不少习惯了传统服务器运维管理的逻辑思维下容易产生误解和误操作的问题。

Docker 的迭代过程，可以理解为系统环境级的版本控制。通过编写 Dockerfile，可以轻松实现“环境+应用”镜像的创建和管理。

完整的产品研发流程中引入 Docker，可以着手以下几个步骤：

1. 编写 Dockerfile
2. 接入 Jenkins 或直接使用各类 Docker Hub 服务进行环境构建
3. 使用 Ansible 或 Docker Machine 进行镜像部署
4. 引入 Kubernetes，Swarm 等进行容器集群编排

> 当然，这只是我基于书中内容和我的个人选择得出的结论，不具备内容完整性和必然准确性。但至少，我是按照这个步骤进行尝试的。

常用的 Docker 指令有：

```
docker build
docker run
docker exec
docker inspect
```

具体的使用方式和参数就不在此赘述。

总的来说，这本书非常适合接入 Docker 的全盘了解和使用，但对于实际的生产工作，还是需要通过其他书籍和文档补充的 :)
