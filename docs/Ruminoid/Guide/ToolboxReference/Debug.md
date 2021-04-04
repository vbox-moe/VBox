---
pageIndex: 8
title: Toolbox 除错指南
---

欢迎来到 Ruminoid Toolbox 除错指南。按照这个文章的步骤进行操作，你将能够自己解决使用 Rmbox 过程中遇到的大部分错误。

那么，让我们开始吧。不过在开始之前……

## 开始之前……

Toolbox FAQ 负责解决你 **在使用 Rmbox 的过程中遇到的报错**。

如果你是 **在使用 Rmbox 之前想要了解一些问题**，请参考 [Toolbox FAQ](./Faq.html)。

## 第一步：如果你能够确定……

如果你能够确定你的报错是由 **缺少插件或工具** 引起的，那么你可以参考 [Toolbox 兼容性疑难解答](./Compatibility.html)。

如果你能够确定你的报错是由 **路径或文件名错误** 引起的，请将输入输出目录均放置于 **不含空格、只含英文的目录-文件名** 下。

## 第二步：查阅「常见报错一览」

首先，你应该找到报错的 **关键信息**，它一般位于 `处理命令时出现错误。` 的上一行或上两行左右，但也可能在较上部。

比如：

```
21-04-04 02:49:05 info: ProcessRunner      [null]Node.js is only supported on Windows 8.1, Windows Server 2012 R2, or higher.
21-04-04 02:49:05 info: ProcessRunner      [null]Setting the NODE_SKIP_PLATFORM_CHECK environment variable to 1 skips this
21-04-04 02:49:05 info: ProcessRunner      [null]check, but Node.js might not execute correctly. Any issues encountered on
21-04-04 02:49:05 info: ProcessRunner      [null]unsupported platforms will not be fixed.
21-04-04 02:49:05 crit: ProcessRunner      命令运行 出现错误，退出码为 216。
21-04-04 02:49:05 crit: Processor      处理命令时出现错误。
Ruminoid.Toolbox.Core.ProcessRunnerException: 命令运行 出现错误，退出码为 216。
at Ruminoid.Toolbox.Core.ProcessRunner.Run(String target, String args, String formatter) in D:\a\Toolbox\Toolbox\src\rmbox\Core\ProcessRunner.cs:line 181
at Ruminoid.Toolbox.Core.ProcessRunner.Run(TaskCommand command) in D:\a\Toolbox\Toolbox\src\rmbox\Core\ProcessRunner.cs:line 192
at System.Collections.Generic.List`1.ForEach(Action`1 action)
at Ruminoid.Toolbox.Core.ProcessRunner.Run(List`1 commands) in D:\a\Toolbox\Toolbox\src\rmbox\Core\ProcessRunner.cs:line 202
at Ruminoid.Toolbox.Core.Processor..ctor(CommandLineHelper commandLineHelper, ProjectParser projectParser, ProcessRunner processRunner, ILogger`1 logger) in D:\a\Toolbox\Toolbox\src\rmbox\Core\Processor.cs:line 25
```

这里的

```
Node.js is only supported on Windows 8.1, Windows Server 2012 R2, or higher.
Setting the NODE_SKIP_PLATFORM_CHECK environment variable to 1 skips this
check, but Node.js might not execute correctly. Any issues encountered on
unsupported platforms will not be fixed.
```

就是关键信息。机翻可得到，这是由于 Node.js 的版本不兼容导致的。（这个 bug 在最新版本已经被修复。）

得到关键信息之后，你可以查阅 [Toolbox 常见报错一览](./Errors.html)。

## 第三步：尝试理解报错

Rmbox 及其插件的报错都是有意义的。

如果你在上一步中拿到的报错是中文的，请尝试理解它的意思，并按照它所说的去做。如果不是中文的，请机翻后尝试理解。

## 第四步：参考 Toolbox FAQ

参考 [Toolbox FAQ](./Faq.html)，你或许可以从这里找到答案。

## 我依旧无法解决我的问题。

请加入 Ruminoid 交流群：470394928。仔细阅读群规，然后提交报错。
