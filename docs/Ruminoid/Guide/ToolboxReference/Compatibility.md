---
pageIndex: 20
title: Toolbox 兼容性疑难解答
---

欢迎来到 Ruminoid Toolbox 兼容性疑难解答。这里详细描述了 Toolbox 在各个平台上的缺陷、缺失的工具和行为。

:::tip 提示

下方的工具文件名称统一不带 `.exe`，命令统一在 `tools` 目录下执行。

:::

## 我应该如何补充缺失的工具？

你可以从下面的两种方式中任选其一，进行缺失工具的补充。

### 下载并覆盖

搜索工具的官网，并下载二进制文件。将下载的二进制文件放置在 `tools` 目录下。

### 创建软连接（高级）

通过创建软连接的方式，你可以指示 Toolbox 使用安装在本地计算机上的工具实例运行操作。

在 Windows 上，你可以使用：

```sh
mklink <目标> <源>
```

如：

```sh
mklink node "C:\Program Files\nodejs\node.exe"
```

在 MacOS/Linux 上，你可以使用：

```sh
ln -s <源> <目标>
```

如：

```sh
ln -s /opt/node/bin/node ./node
```

## FFmpeg

`ffserver` 仅在 MacOS 上可用。

## x264

该工具没有兼容性问题。

## PowerShell

该工具没有兼容性问题。

## Node.js

在 MacOS 上，你需要自己安装 `npm`。

在 Linux 上，你需要自己解压 `node.tar.xz`。

## Python

在 MacOS 上，你需要自己编译 `Python`。由于编译 `Python` 较为困难，我们推荐使用软连接。

在 Linux 上，你需要自己编译 `Python`。由于编译 `Python` 较为困难，我们推荐使用软连接。

## Lua/Json.lua

该工具没有兼容性问题。

## 7za

该工具没有兼容性问题。

## VapourSynth

在 MacOS 上，你需要自己安装 `VapourSynth`。`VapourSynth` 官网给出了详细的安装教程。

在 Linux 上，你需要自己安装 `VapourSynth`。`VapourSynth` 官网给出了详细的安装教程。

## QAAC

在 MacOS 上，你需要使用软连接的方式加入 `QAAC` 支持。

在 Linux 上，你需要自行搜索适用于 Linux 的 `QAAC` 二进制文件。

## HwEnc

在 MacOS 上，你需要自己编译 HwEnc。

在 Linux 上，你需要自己编译 HwEnc。
