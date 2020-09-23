---
pageIndex: 2
title: 列和目标
---

## 列（Column）

「列（Column）」是 Ruminoid Project 文件中存储「目标（Target）」相关信息的部分，这些信息会在字幕进行渲染的时候用到。一个 Ruminoid Project 文件中可以有多个列，它们作为一个 JSON 数组位于 `columns` 节点下。

### `id`

该列的唯一 ID，使用 GUID 标识。

### `title`

该列的标题。

### `transformations`

参见「转换（Transformations）」。

### `target`

参见「目标（Target）」。

## 转换（Transformation）

转换（Transformation）是一个长度为 5 的 JSON 数组，它存储了该列的转换链。

**Ruminoid Studio 在进行「渲染（Render）」或「生成（Build）」时，会将行（Row）中的 `data` 字段中的 `text` 字段按顺序分别使用这 5 个「转换（Transformation）」进行转换，转换之后的结果交给下一个转换，最后交给「目标（Target）」进行字幕的渲染。**

转换由「Ruminoid 插件（RMX）」通过实现 `ITransform` 接口提供，如 `JavaScriptTransform` 等。

大多数情况下，我们无需使用转换。

## 目标（Target）

目标（Target）存储了该列在渲染字幕时所使用的生成器。目标负责将输入的字段转换成 `OpenGL.GL.RGBA` 格式的图像，并交由 Ruminoid Studio、Ruminoid Exporter 或 R/Connect 进行显示。

目标由「Ruminoid 插件（RMX）」通过实现 `ITarget` 接口提供，如 `LibAssTarget`、`VsFilterTarget` 等。

## 项目设置中的 `textColumn` 和 `effectColumn`

Ruminoid Studio 只会同时渲染一列的内容。`textColumn` 指示了 Ruminoid Studio 应该渲染哪一列的内容。

`effectColumn` 则与 ASS 中的 Effect 列兼容，指示该行的效果类型。

## 行（Row）中的 `data`

既然一个 Ruminoid Project 文件中可以有多个列，那么每一行中就需要存储每一列的信息了。这些数据存储在行（Row）中的 `data` 字段。

`data` 字段是一个 JSON Array，里面包含了含有信息的各列的信息。

```ts
declare interface Row {
	data: Array<DataItem>
}

declare interface DataItem {
    id: string // 列 ID
    text: string // 该列的文本
}
```
