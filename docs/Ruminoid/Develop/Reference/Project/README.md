---
pageIndex: 1
title: Ruminoid Project（.rmproj）
---

Ruminoid Project （.rmproj）文件是 Ruminoid Studio 的项目文件，使用 JSON 格式存储。一个 Ruminoid Project 文件存储了该 Ruminoid 项目中所包含的全部**内部资源**。（关于什么是外部资源，请参见「外部资源」）。Ruminoid Project 由以下几个部分组成。

## 项目设置（Project Settings）

「项目设置（Project Settings）」中包含了一个 Ruminoid 项目中需要具有的全部的配置属性，位于 `settings` 节点。它类似于 ASS 文件中的 `[Script Info]` 节点。

### `title`

项目的标题。

### `width`

int 类型，指示字幕画布的宽度。这个值需要能够被 2 整除。

### `height`

int 类型，指示字幕画布的高度。这个值需要能够被 2 整除。

### `textColumn` 和 `effectColumn`

有关这些字段的详细内容，请参见「[列和目标](./ColumnAndTarget.html)」。

::: tip 提示

诸如 `remoteUrl`、`commit` 和 `author` 等等的配置不在 Ruminoid Project 文件中。它们位于 Ruminoid PackageSpec（`rmnd-package.json`）文件中。该文件中同时包含了一个 `main` 字段用于指示 Ruminoid Project 文件在项目目录中的位置。

:::

## 样式（Styles）

有关样式的详细内容，请参见「[样式](./Styles.html)」。

## 行（Row）

「行（Row）」是 Ruminoid Project 文件中存储字幕文本和其他信息的部分，是项目文件的核心。一个 Ruminoid Project 文件中可以有多个行，一行包含一个时间段内的字幕信息。它们作为一个 JSON 数组位于 `rows` 节点下。

### `id`

该行的唯一 ID，使用 GUID 标识。

### `type`

string 类型。

```ts
declare interface Row {
    type: 'Comment' | 'Dialogue'
}
```

### `layer`

### `style`

### `start`

### `end`

### `data`

有关 `data` 字段的详细内容，请参见「[列和目标](./ColumnAndTarget.html)」。

## 列（Column）

「列（Column）」是 Ruminoid Project 文件中存储「目标（Target）」相关信息的部分，这些信息会在字幕进行渲染的时候用到。

有关列和目标的详细内容，请参见「[列和目标](./ColumnAndTarget.html)」。

## 元数据（Metadata）

「元数据（Metadata）」中包含了 Ruminoid Project 文件本身的一些特征，例如 Ruminoid Project 的架构版本和一些其他的信息。它们位于 `meta` 节点。

### `version`

int 类型，指示该项目文件的架构版本。

Ruminoid Studio 会去解析它们所支持的版本，或是版本 0。若某个版本不被 Ruminoid Studio 所支持，Ruminoid Studio 将会询问你是否尝试解析。

所有版本的 Ruminoid Studio 都会尝试解析版本 0 的 Ruminoid Project，但版本 0 只应该在测试项目文件或兼容性的时候使用。

目前，所有位于 studio/stable 上的 Ruminoid Studio 版本都只支持版本 1。
