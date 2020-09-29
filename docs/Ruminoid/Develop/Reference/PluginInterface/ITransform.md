---
title: ITransform
pageIndex: 1
---

ITransform 是 Ruminoid Studio 中用于实现「转换（Transform）」的接口实现。

ITransform 中只有 Convert() 这一主要方法。

```cs
public string Convert(RumiItem item);
```

你可以通过获取 `item.Text` 属性来访问值，也可以通过 `item.Parent` 属性来访问其所在的 `RumiRow`。

转换必须在这个方法内同步完成。你可以通过使用多线程来进行处理，但是若要使用 `Task`，请确保你等待了结果的返回。
