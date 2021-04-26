---
pageIndex: 2
title: 更新历史
---

这里是 Ruminoid 的更新历史。

此处包含的产品有：

- Ruminoid（v0.2.x）

- Ruminoid Studio（v0.3.x）

- Ruminoid Dashboard、R/Connect 等 v0.2.x 以上的 Ruminoid 公共组件

此处不包含的产品有：

- Ruminoid World

- [Ruminoid Toolbox](./ToolboxHistory.html)

特定于通道的更新会在版本的右上角显示 Badge。标为“已弃用”的版本不推荐下载，因为这些版本的自动更新服务已经失效，或在更新到新版本之后旧的偏好设置会被清除。

## v0.2.7

Build 10 - 2021-04-27 发布

### Ruminoid SubLight Classic

<Badge type="error" text="注意"/> 警告：因为增加了新的参数，更新这个版本的 SubLight 将会导致你的工程文件无法打开。在升级 SubLight 之前请务必移除旧版 SubLight 效果，保存工程，之后再进行升级。

如果你错误地进行了升级，你可以回退旧版并重新打开你的工程进行处理。

改进：

- 新增了「叠加比率」参数。通过控制此参数，你可以控制 **字幕/原图层** 与下方图层进行叠加的比率。

比率为 0（默认）则使用字幕与下方叠加，比率为 65535（最大）则使用原图层与下方叠加。

- 现在，在 SubLight 渲染过程中，After Effects 会显示表示渲染进度的进度条。

## v0.2.6

Build 9 - 2021-04-24 发布

### Ruminoid SubLight Classic

修复：

- 现在，Ruminoid SubLight Classic 的闪屏问题已经得到了修复。

### Ruminoid Tapper Timer <Badge type="warning" text="dogfood"/>

Ruminoid Tapper Timer 现已发布！使用 Tapper Timer 可以一边看直播一边打轴，快来尝试吧。

### Ruminoid <Badge type="warning" text="dogfood"/>

- 添加了新的 KeyTap 支持库。

## v0.2.5

Build 8 - 2020-08-21 发布

### Ruminoid SubLight Classic

Ruminoid SubLight Classic 现已发布！快来使用 SubLight 在 After Effects 和 Premiere 中导入、预览和渲染你的特效字幕吧。

### Ruminoid Plugin Manager

Plugin Manager 现已发布！您可以使用它安装、升级和管理您的 Ruminoid 插件。

### Ruminoid Dashboard

改进：

- 现在，Dashboard 中的设置将会应用到所有 Ruminoid 产品。

### Ruminoid

改进：

- 添加了高性能的下载器组件。

- 添加了部分公共窗口组件。

## v0.2.4

Build 7 - 2020-08-15 发布

### Ruminoid LIVE

改进：

- 重构了预渲染核心，预渲染性能更上一层楼。

- 加入了内存和预渲染指示器，使内存和预渲染情况可视化。

- 更新了默认参数配置，使其更加适应大多数设备。

- 优化了垃圾回收机制，使得在释放字幕和音频时能够强制清理内存。

- 移除了部分无用的代码。

修复：

- 修复了某些在低配设备上会出现的预渲染逻辑问题。

- 修复了若干界面上的问题。

- 修复了一个问题，该问题会导致 LIVE 在多显示器设备上界面显示不正常。

## v0.2.3

Build 6 - 2020-08-07 发布

### Ruminoid LIVE

Ruminoid LIVE 现已发布！快来使用 LIVE 在 OBS 中展示特效字幕吧。

### Ruminoid Dashboard

改进：

- 优化了应用启动逻辑。

### Ruminoid Trimmer

改进：

- 优化了应用启动逻辑。

- 为控件按钮应用了新的样式。

- 更新了控件按钮的本地化字串。

- 移除了部分无用代码。

### Ruminoid

改进：

- 从这个版本开始，Ruminoid 安装程序将会显示 Ruminoid 图标。

## v0.2.2

Build 5 - 2020-07-22 发布

### Ruminoid Dashboard

改进：

- 优化了多个本地化字符串。

修复：

- 修复了一个问题，该问题可能导致 Dashboard 在关闭之后弹出错误。

- 修复了一个问题，该问题可能导致 Dashboard 中的更新状态显示不正确。

### Ruminoid Trimmer

改进：

- 改进了界面布局，使得 Trimmer 更加现代化。

- 移除了「帮助」菜单。请通过 Ruminoid World 获取帮助和支持。

- 移除了一些并无实际作用的代码。

- 欢迎提示现在可以默认关闭了。

- 改善了应用退出逻辑。

- 改进了列表样式，现在列表中的行不会有边框聚焦提示。

修复：

- 修复了一个问题，该问题可能导致「加载媒体」快捷键无法使用。

- 修复了一个问题，该问题可能导致导出 ASS 字幕文件时丢失扩展名。

- 修复了部分对话框中的错误提示内容。

注意：

- 原「保存」命令现已更名「导出ASS」，且快捷键修改为「Ctrl+Shift+S」。

### Ruminoid

改进：

- 为多种控件优化了样式。

## v0.2.1

Build 4 - 2020-07-18 发布

### Ruminoid Dashboard

改进：

- 修复了一些小的问题并提升了应用的稳定性。

### Ruminoid Trimmer

修复：

- Trimmer 无法启动的问题现已修复。

## v0.2.0 <Badge type="error" text="已弃用"/>

<Badge type="error" text="已弃用"/> 请注意，由于该版本的安装程序存在问题，我们已经不推荐下载这个版本的 Ruminoid。

Build 3 - 2020-07-17 发布

### Ruminoid Dashboard

Ruminoid Dashboard 发布！您现在可以在「开始」屏幕中直接打开 Ruminoid，并使用 Dashboard 启动 Ruminoid 产品。

改进：

- Ruminoid Dashboard 中更新了全新的软件更新系统，在 Ruminoid 系列进行更新的时候，您可以继续使用 Ruminoid 的应用和产品。

### Ruminoid Trimmer

改进：

- 音视频回放内核全新升级，新的内核在回放时时间码显示更加精准，且对系统性能的占用也大大降低。

- 大大精简了安装包的体积。

### Ruminoid

改进：

- 重构了所有框架，现在，Ruminoid 的大多数子产品都将使用 Ruminoid Common 框架来进行字幕的处理和渲染等通用操作。

- 大大精简了安装包的体积。

注意：

- <Badge type="error" text="注意"/> 请注意，由于这个版本的 Ruminoid 重构了所有的通用框架和动态链接库，旧版本的偏好设置在升级之后将会清除。

- <Badge type="error" text="注意"/> 请注意，由于 Ruminoid 已经更换了新的更新服务，旧版本的更新服务将会失效。

## v0.1.1 <Badge type="error" text="已弃用"/>

Build 2 - 2020-04-17 发布

### Ruminoid Trimmer

修复了一些小的问题并提升了应用的稳定性。

## v0.1.0 <Badge type="error" text="已弃用"/>

Build 1 - 2020-04-16 发布

### Ruminoid Trimmer

Ruminoid Trimmer 发布！快来使用 Trimmer 制作卡拉 OK 字幕时间轴吧。
