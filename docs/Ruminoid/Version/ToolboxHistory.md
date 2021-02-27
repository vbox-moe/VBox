---
pageIndex: 10
title: Toolbox 更新历史
---

这里是 Ruminoid Toolbox 的更新历史。有关 Ruminoid（v0.2.x）或 Ruminoid Studio（v0.3.x）的更新历史，请参见 [更新历史](./History.html)。

特定于通道的更新会在版本的右上角显示 Badge。标为“已弃用”的版本不推荐下载，因为这些版本的自动更新服务已经失效，或在更新到新版本之后旧的偏好设置会被清除。

## v0.1.4 <Badge text="beta"/> <Badge text="stable"/>

2021-02-27 发布

修复：

- 修复了插件无法正确加载的问题。

## v0.1.3 <Badge text="beta"/>

2021-02-27 发布

改进：

- 新增了如下组件：

- X264EncodeQualityConfigSection（「视频质量」配置项）

- PowerShellFormatter

- X264Formatter

- Mp4BoxEncodeOperation（「小丸压制」）

- FFmpegEncodeOperation（「FFmpeg 压制」）

- SDK 实用工具：新增了更多的值转换器和路径处理实用函数。

修复：

- 修复了一个错误的插件 ID。

- 现在，进程通信管道出现错误将不会导致 GUI 崩溃。

- 修复了队列视图中任务提示可能会重叠的问题。

## v0.1.2 <Badge text="beta"/>

2021-02-26 发布

改进：

- 现在，你可以在 IOConfigSection 中使用「打开文件」对话框了。

- 优化了操作窗口的显示。现在，操作的设置项列表将会显示在窗口的左边。

- 固定了最小窗口大小。

- 优化了 FFmpeg 格式器的显示。

修复：

- 修复了自动构建时可能会输出错误的文件夹的问题。

- 修复了插件无法正确加载的问题。

- 修复了在 Mac 或 Linux 上使用 `rmbox` 启动 GUI 时出现的问题。

- <Badge type="error" text="wontfix"/> 某些 Linux 发行版上遇到的「Default font family name can't be null or empty」问题为发行版的字体缺失导致。尝试安装「ttf-mscorefonts-installer」或「ubuntu-restricted-extra」可能解决此问题。

## v0.1.1 <Badge text="beta"/>

2021-02-25 发布

改进：

- 添加了「关于」页和版本号的显示。

## v0.1.0 <Badge text="beta"/>

2021-02-25 发布

这是 Ruminoid Toolbox 的第一个 Beta 版本。

改进：

- 添加了 IOConfigSection。IOConfigSection 可以用作基础的输入输出配置。

- 添加了 FFmpegFormatter。FFmpegFormatter 可以解析 FFmpeg 输出。

- 添加了 FFmpegCopyOperation（「格式转换（不压制）」）。
