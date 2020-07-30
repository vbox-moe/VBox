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

## 特性

- 完全公益：我们不会以任何形式提供任何收费服务；
- 文档完善：所有接口与数据结构均有完善的文档。大部分应用具有手把手的教学；
- 高可用性：在实时性数据部分，我们采用了多重镜像的设计以应对网络波动。例如在 BiLive（处理哔哩哔哩直播实时数据接口），同一个直播间的实时数据会同时被多个服务器接收，去重后路由到下游；
- 多语言友好：我们尽可能将接口与数据结构设计得让使用各种语言、平台的开发者均能有良好的开发体验。我们甚至为 JavaScript 开发者单独提供了开发用 SDK；
- 高度模块化：想给 vNerve 增加新的数据源？没有问题！vNerve 的各个部分高度模块化，，阅读本篇文档后半部分有助于您理解 vNerve 的结构；

## vNerve 有何作用？

考虑如下几个实例：

### 实例 I

M 君想要开发一个录制全 B 站虚拟主播直播间的超级录播机。因此，他需要实时获得大量直播间开播与下播的通知。

#### 传统思路

1. 轮询 bilibili 直播的直播间状态接口；
2. 监听近 2000 个直播间的直播间实时 WebSocket 接口；

然而，思路 1 面临若轮询速度过慢则数据不够实时，而轮询速度过快则可能被 B 站封 IP 的情况；思路 2 中 M 君被迫去了解 B 站的实时接口协议。然而这一协议较复杂，涉及到 Auth Token 的获取、压缩、心跳等等。且 B 站的实时接口完全处于零文档状态，只在 GitHub 上有一些零散的数据包例子。

#### 使用 vNerve 的思路

此时， M 君只需要通过 vNerve Neuron Wire 或手动连接消息队列的方式，绑定一个 Routing Key `blv.*.live_status`，即可接收到整个 DD Center VDB 中收录的虚拟主播的哔哩哔哩直播间的上下播状态。且接收到的数据的格式具有良好文档。最重要的是，**这种情况下的网络资源浪费是最小的，因为有且仅有上下播状态被传输到 M 君的录播机中**。

### 实例 II

X 君与 D 君想要开发一个统计 YouTube 与 B 站虚拟主播直播收入的网站。因此，他们需要获得所有的 Super Chat、礼物、大航海的通知。

#### 传统思路

1. 对于 YouTube，他们需要使用 YouTube 的私有 API 来统计 Super Chat；
2. 对于 Bilibili，他们必须监听所有虚拟主播房间的实时接口；

YouTube 暂且略过不谈（vNerve 目前未提供 YouTube 相关接口，但已列入计划）。但对于 Bilibili 而言，即使他们完全理解了 Bilibili 的弹幕协议并实现了出来，仍然面临不稳定的连接等影响，而这可能在高峰期对统计结果产生巨大的影响。

#### 使用 vNerve 的思路

对于 YouTube 他们仍需要采取传统手段；

对于 Bilibili，他们可以绑定多个 Routing Key，绑定到 `blv.*.sc`、`blv.*.gift`、`blv.*.new_guard` 即可获取所有付费礼物相关的数据。而由于 vNerve 采取**单个直播间同时由多个接收端同时接受的高可用性镜像机制**，单个连接或单个接收端的网络波动并不会对统计结果产生较大影响。

## 数据形式

现阶段 vNerve 包含两种数据提供方式。

### 实时性数据

实时性数据将以**消息队列**的传输方式，`protobuf` 的数据格式提供。可以通过 `AMQP`、`WebSTOMP`、等协议获取。其中 `WebSTOMP` 可以通过 JavaScript 库在浏览器端直接获取。

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

vNerve 所有代码均开源，欢迎您参与开发。[查看我们的组织与仓库](/VNerve/GitHub.html)。
