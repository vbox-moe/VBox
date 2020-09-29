---
title: ITarget
pageIndex: 2
---

ITarget 是 Ruminoid Studio 中用于实现「目标（Target）」的接口实现。

ITarget 中只有 Render() 这一主要方法。这一方法用于接受一个 `RumiItem` 对象，将该对象中提供的 `Text` 值渲染为一个 `OpenGL.GL.RGBA` 指针。

```cs
public unsafe IntPtr Render(RumiItem item);
```

你可以通过获取 `item.Text` 属性来访问值，也可以通过 `item.Parent` 属性来访问其所在的 `RumiRow`。

渲染必须在这个方法内同步完成。同时，你也可以使用不安全的代码。
