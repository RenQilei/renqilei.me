---
title: "开始使用 Raspberry PI"
slug: "Start to Use Raspberry Pi"
categories: ["树莓派"]
tags: ["树莓派","Raspberry PI","VNC","raspbian"]
date: 2019-06-08T15:35:47+08:00
draft: false
---

毋容置疑，Raspberry PI（树莓派）可谓当前最火的单片机之一。玩转树莓派之前，首先是要将树莓派的操作系统和各项功能准备妥当。本文的核心目标就是从零开始上手树莓派，并完成远程连接的各项功能。

# 准备工作

开始玩树莓派前，需要准备：

* Raspberry PI 3 Model B+（目前最新款）
* Micro SD 卡，不小于 8G
* USB 电源线，5V 电压、不小于 2A 电流
* 有线网络（建议拥有，当然树莓派已支持 WiFi）

如果需要本机使用（即非远程连接使用），那么还需要 HDMI 线及显示器，以及鼠标键盘等外设。当然本文初始化过程中完成了远程连接 console 和 GUI 的全部设置，所以理论上来说无需本机使用了 :)

同时，本文默认以 Mac 作为远端局域网设备进行调试，但所用软件和工具基本满足 Mac 和 Windows 的兼容，如有差异会在文中指出。

# 安装操作系统

从树莓派[官网](https://www.raspberrypi.org/downloads/raspbian/)下载树莓派定制的 Debian 操作系统 Raspbian，初始玩家建议使用 [Raspbian Stretch with desktop and recommended software](https://downloads.raspberrypi.org/raspbian_full_latest) 版本的系统。下载完成后解压获得 `.dmg` 镜像文件。

使用 [balenaEtcher](https://www.balena.io/etcher/) 工具向准备好的 Micro SD 卡烧录操作系统。烧录前，Micro SD 卡请格式化为 FAT 格式。balenaEtcher 是一款开源的烧录工具，且支持 Mac 和 Windows，使用过程仅需选择镜像、选择目标盘符、烧录即可！

**为了能够直接开始远程连接，这里请完成两个步骤**

1. 在烧录完成的 Micro SD 卡中新建一个 `ssh` 文件。

Mac 上可以直接进入目录并创建

```
cd /Volumes/boot
touch ssh
```

Windows 则直接打开盘符并新建文本文件，但务必不要带 `.txt` 后缀。

2. 如果准备直接连接无线网络，则添加 `wpa_supplicant.conf` 文件。

```
cd /Volumes/boot
vi wpa_supplicant.conf
```

文件内容为：

```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=CN

network={
    ssid="xxxx"      # wifi name
    psk="xxxx"       # wifi password
    key_mgmt=WPA-PSK # encryption method
}
```

3. 使用 `arp -a` 查看当前局域网内设备的连接情况。

这个步骤的目的是为了待会树莓派开机后可以查看增加了哪一个IP，当然，也可以通过其它局域网工具查看，树莓派的 hostname 非常容易辨认。

> Windows 中需要使用 Powershell 等相关命令行工具方可执行 arp 命令。

# 基本配置

OKAY，现在可以把 Micro SD 卡插入树莓派并开机了！

## ssh 远程连接设备

开机后，通过 `arp -a` 持续关注当前局域网内设备连接情况的变化，新增的 IP 即为树莓派的 IP。

> 这种获取 IP 的方式显得很不精致，也不适用于 IP 流动量大的局域网环境中。所以，更加理性的方法是使用相关局域网工具，通过 hostname 显著的区分设备并获得相应 IP。
> Mac 可以使用 LanScan；Windows 可以使用 Advanced Ip Scanner。

如果刚才烧录完操作系统后在目录下创建了 `ssh` 文件的话，那么现在就可以使用 ssh 进行设备连接了。

```
ssh pi@[device_ip]

# 密码为：raspberry
```

## 设置静态 IP

ssh 远程登录设备成功后，为了避免设备因网络重连导致 IP 变化，这里建议第一时间固化 IP。

通过修改 `/etc/dhcpcd.conf` 文件实现静态化 IP 配置，**在该文件底部添加配置**：

```
interface eth0
static ip_address=192.168.1.114/24
static routers=192.168.1.1
static domain_name_servers=192.168.1.1

interface wlan0
static ip_address=192.168.1.113/24
static routers=192.168.1.1
static domain_name_servers=192.168.1.1
```

> /etc/dhcpcd.conf 文件中包含了大量的配置和示例配置，切勿随意修改或覆盖。
> 配置中的
> interface 为指定的网卡口，eth0 为默认有线口，wlan0 为默认无线口
> ip_address 为固定 IP 地址及其子网掩码
> routers 为其网关
> domain_name_servers 为其 DNS 服务器

当然，只在树莓派上配置固定 IP 并不是完整的静态化操作，在条件允许的情况下，可以在路由器上直接将 IP 与树莓派的 MAC 地址对应绑定。

## 设置时区、语言

系统的相关设置可以通过修改相应的 Linux 系统配置完成，亦可通过 GUI 窗口化设置调整。Raspbian 提供了便捷的命令行配置工具 raspi-config，可通过 `sudo raspi-config` 开启并配置。相关设置可根据提示进行操作。

## 启用 VNC

### 安装 VNC

vnc 是可以远程打开 GUI 界面的服务。目前， Raspbian 系统中已经自带了 vnc 服务，可以通过 `sudo raspi-config` 中的配置进行启用。

`Interfacing Options --> VNC --> select`，选择后会进行一系列的应用包安装，根据提示进行确认操作完成安装即可。

### 设置 VNC 密码

重设 VNC 密码的命令为：`vncpasswd`。

### 服务化 VNC

可以通过 `vncserver :1` 来启用 VNC 服务，但这并不优雅，首先关闭服务需要通过 kill 来完成，同时无法进一步实现开机自启动服务。

这里，我们首先进行 VNC 服务化的配置：

创建文件 `/etc/init.d/vncserver` 并粘贴下面内容于其中，

```
#!/bin/sh
### BEGIN INIT INFO
# Provides:          vncserver
# Required-Start:    $local_fs
# Required-Stop:     $local_fs
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Start/stop vncserver
### END INIT INFO
 
# More details see:
# http://www.penguintutor.com/linux/vnc
 
### Customize this entry
# Set the USER variable to the name of the user to start vncserver under
export USER='pi'
### End customization required
 
eval cd ~$USER
 
case "$1" in
  start)
    su $USER -c '/usr/bin/vncserver -depth 16 -geometry 1024x768 :1'
    echo "Starting VNC server for $USER "
    ;;
  stop)
    su $USER -c '/usr/bin/vncserver -kill :1'
    echo "vncserver stopped"
    ;;
  *)
    echo "Usage: /etc/init.d/vncserver {start|stop}"
    exit 1
    ;;
esac
exit 0
```

保存后为文件添加执行权限：

```
sudo chmod +x /etc/init.d/vncserver
```

至此，已可以使用 `service vncserver start|stop` 进行 VNC 服务开启、关闭了。

### 开机自启动 VNC

添加开机启动项：

```
sudo update-rc.d vncserver defaults
```

树莓派重启后生效。

### VNC 远程连接

这里推荐使用 [RealVNC Viewer](https://www.realvnc.com/en/connect/download/viewer/) 来进行 VNC 远程连接，这是一个跨平台的开源软件，方便使用。

连接时键入 `[raspberry_ip]:1` 并输入密码即可。

# 参考文档

* [树莓派折腾笔记 - 无显示器情况下连接使用树莓派](https://juejin.im/entry/5b634203e51d45191e0d2b06)
* [树莓派无线网卡配置指北](https://juejin.im/post/592259d72f301e006b18584e)
* [树莓派设置静态 IP 地址](https://www.jianshu.com/p/f9cb0f85a4e6)
* [树莓派3B远程VNC的设置（包括开机启动）](https://www.cnblogs.com/crosys/p/6220471.html)