---
home: true
heroImage: /Icons/Icons/VNerve/VNerve.Colored.Transparent.png
heroText: vNerve
tagline: vNerve 文档站。
actionText: 现在开始 →
actionLink: /VNerve/Guide/
pageIndex: 990
footer: MIT Licensed | Copyright © 2020 DD Center
---

# Project vNerve

vNerve 旨在提供一个与虚拟主播相关的综合数据源，且希望将各种数据以便于查询、整理与统计的方式提供。

## 数据形式

现阶段 vNerve 包含两种数据提供方式。

### 实时性数据

实时性数据将以**消息队列**的传输方式，`protobuf` 的数据格式提供。可以通过 `AMQP`、`STOMP`、`WebSTOMP`、`MQTT` 等协议获取。其中 `WebSTOMP` 可以通过 JavaScript 库在浏览器端直接获取。

### 非实时性数据

非实时性数据将以 HTTP API 形式提供，使用 GraphQL 协议、JSON 数据格式。

## 结构与组件

vNerve 具有高度模块化的结构，但亦具有方便的接口来统一地获取来自各个数据源的数据。对于实时性数据，vNerve 具有如下结构：

```
Receptor -> CNS -> (NeuronWire) -> Effector
            ↓
            vNerve Memory
```

其中：

- Receptor（感受器）用于从各个数据源获取数据并统一化数据格式、结构；例如 BiLiveReceptor
- CNS（中枢神经系统）在系统中唯一，用于路由消息并递送到下游应用。这一部分由一个消息队列中间人实现
- NeuronWire 为一些平台（目前仅 JavaScript）提供了更加便利的连接到 CNS 的方式，类似于一个 SDK，这使得下游开发者不需要关心连接细节等内容
- Effector（效应器）即下游应用的开发者与 vNerve 交互的部分，为您的应用程序注入数据

对于非实时性数据，vNerve 具有以下结构：

// TODO

而在 vNerve 中，由于数据源多种多样，因此每一种数据源都对应一种数据源组件。例如哔哩哔哩直播的实时弹幕处理即对应 BiLive 组件。为了处理来自各个组件的数据，下游开发者需要阅读各个组件的文档。

- BiLive：(// TODO link)

## Roadmap

目前 Project vNerve 正在构建 BiLive 与部署 CNS 系统。在 BiLive 实现稳定、高可用的数据提供后，我们会考虑哔哩哔哩的主站相关的数据更新（例如粉丝量等）。

## Contribute

vNerve 所有代码均开源，欢迎您参与开发。

// TODO repositories