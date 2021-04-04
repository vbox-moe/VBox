---
pageIndex: 15
title: Toolbox 常见报错一览
---

这里收集了 Rmbox 的常见报错。请善用 `Ctrl+F` 进行页面内搜索。

## `mov,mp4,m4a,3gp,3g2,mj2`

常见报错：

```
info: ProcessRunner      [ffmpeg]  libpostproc    55.  7.100 / 55.  7.100
info: ProcessRunner      [ffmpeg]Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'test.mp4':
info: ProcessRunner      [ffmpeg]  Stream #0:1 -> #0:0 (copy)
info: ProcessRunner      [ffmpeg]    Last message repeated 1 times
crit: ProcessRunner      ffmpeg 出现错误，退出码为 1。
crit: Processor      处理命令时出现错误。
Ruminoid.Toolbox.Core.ProcessRunnerException: ffmpeg 出现错误，退出码为 1。
```

该报错是因为输出指定了不兼容的格式。按照下列情况检查：

- 如果你在抽取音频，请将输出格式设定为 `m4a`。如果你需要 `mp3` 音频请使用「音频压制」操作。

## `Node.js is only supported on Windows 8.1, Windows Server 2012 R2, or higher.`

常见报错：

```
info: ProcessRunner      [null]Node.js is only supported on Windows 8.1, Windows Server 2012 R2, or higher.
info: ProcessRunner      [null]Setting the NODE_SKIP_PLATFORM_CHECK environment variable to 1 skips this
info: ProcessRunner      [null]check, but Node.js might not execute correctly. Any issues encountered on
info: ProcessRunner      [null]unsupported platforms will not be fixed.
crit: ProcessRunner      命令运行 出现错误，退出码为 216。
crit: Processor      处理命令时出现错误。
Ruminoid.Toolbox.Core.ProcessRunnerException: 命令运行 出现错误，退出码为 216。
```

该报错是因为 Node.js 版本不兼容。

Rmbox 的最新版本已经解决了这个问题，请更新 Rmbox 至最新版本。
