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

## 组件

现阶段 vNerve 的开发重心集中在其目前唯一的组件 `vNerveBiLiveReceptor`。 

### vNerveBiLiveReceptor

vNerveBiLiveReceptor 用于聚合从 Bilibili 直播的实时弹幕数据源获取到的数据。其包括但不限于：

- 直播弹幕
- 礼物信息
- 醒目留言（即“Super Chat”）
- 直播间人气值
- 开播、下播与被切断直播
- 房间信息变更（标题与分区）
- 舰长购买与续费
- 欢迎信息（欢迎老爷与舰长）
- 用户封禁与踢出
- 房间封禁、警告与地区限制

// 怎么弄个链接到里面的文档？