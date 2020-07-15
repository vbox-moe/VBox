---
pageIndex: 2
title: BiLive
---

vNerve BiLive 用于聚合从 Bilibili 直播的实时弹幕数据源获取到的数据。其包括但不限于：

- 直播弹幕
- 礼物信息
- 醒目留言（即“Super Chat”）
- 直播间人气值
- 开播、下播与被切断直播
- 房间信息变更（标题与分区）
- 舰长购买与续费
- ……

BiLive 目前仅涉及实时性数据部分。关于如何解读下列文档，您可能需要先阅读《开始使用》(todo:link)。

## 实时性数据

### Routing Key

BiLive 的 Routing Key 内缩写为 `blv`。其 Routing Key 格式服从 `blv.<room_id>.<type>`，其中 `room_id` 为**房间号**（长房间号，非短房间号或主播 UID），而 `type` 为BiLive 提供的消息类型之一。其可能为下列值之一。

| type          | 简介                                               | Routing Key 示例         |
| ------------- | -------------------------------------------------- | ------------------------ |
| danmaku       | 直播间弹幕                                         | blv.123456.danmaku       |
| gift          | 直播间礼物                                         | blv.123456.gift          |
| sc            | 醒目留言(Super Chat)                               | blv.123456.sc            |
| new_guard     | 新的大航海用户（舰长/提督/总督）                   | blv.123456.new_guard     |
| welcome_vip   | 欢迎老爷                                           | blv.123456.welcome_vip   |
| welcome_guard | 欢迎舰长                                           | blv.123456.welcome_guard |
| user_blocked  | 直播间用户被禁言                                   | blv.123456.user_blocked  |
| live_status   | 直播状态改变（上下播）                             | blv.123456.live_status   |
| room_change   | 直播间信息更改（房间名、分区、房管、直播间皮肤等） | blv.123456.room_change   |
| room_locked   | 直播间被封禁                                       | blv.123456.room_locked   |
| room_warning  | 直播间被警告                                       | blv.123456.room_warning  |
| room_limited  | 直播间受限（版权等）                               | blv.123456.room_limited  |
| sc_delete     | 醒目留言被删除                                     | blv.123456.sc_delete     |

特别提示：**vNerve 永不会加入源消息命令 NOTICE_MSG（即全局系统通知）与源消息命令以 SMALL_TV 开头的消息的处理！**

### 数据结构

为了重用 Protobuf 消息类型，BiLive 的消息数据结构略有一点清奇，其采用了多层的结构，大致如下：

```
RoomMessage -> user_message    -> user (与消息相关的用户) 
(根对象)       (用户相关消息)   -> danmaku
                               -> super_chat
                               -> welcome
                               -> ...............
            -> live_status
            -> popularity_change
            -> info_change
            -> ............(其余与特定用户无关消息)
```

其中不同的消息类型（例如 `user_message` 与 `live_status`，或 `danmaku` 与 `super_chat`）之间通过 Protobuf `oneof` 结构分开。你可以将其类比于 C/C++ 的 `union`，或类似于这样的结构（以 Java 为例）：

```
enum RoomMessageType {
	USER_MESSAGE, LIVE_STATUS
}
class RoomMessage {
	RoomMessageType payload_type;
	Object payload;
}
```



| type                                               | 描述                 | Protobuf 路径         | Protobuf 类型                            | Routing Key 示例   |
| -------------------------------------------------- | -------------------- | --------------------- | ---------------------------------------- | ------------------ |
| danmaku                                            | 直播间弹幕           | .user_message.danmaku | RoomMessage UserMessage DanmakuMessage   | blv.123456.danmaku |
| gift                                               | 直播间礼物           | .user_message.gift    | RoomMessage UserMessage GiftMessage      | blv.123456.gift    |
| sc                                                 | 醒目留言(Super Chat) | .user_message.sc      | RoomMessage UserMessage SuperChatMessage | blv.123456.sc      |
| // 未完待续 TODO：建一个新的页面描述 BiLive 的细节 |                      |                       |                                          |                    |