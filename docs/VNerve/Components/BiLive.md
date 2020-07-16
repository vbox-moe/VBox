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

### 使用 NeuronWire 获取数据

//TODO @美东

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

首先您可以参考 BiLive 所有的 Protobuf 文件：[vNerveTransmitter/vNerve/bilibili/live](https://github.com/vNerve/vNerveTransmitter/blob/master/vNerve/bilibili/live/)

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

```java
enum RoomMessageType {
	USER_MESSAGE, LIVE_STATUS
}
class RoomMessage {
	RoomMessageType payloadCase;
	Object payload;
}
```

因此，如果需要处理原始 Protobuf 数据，您的第一步应该是判断消息类型。下面是 C# 上的使用 Google Protobuf 官方库实现的一个小例子。其他语言大同小异：

```csharp
var rootMessage = RoomMessage.Parser.ParseFrom(body); // 先解析根对象
uint roomId = rootMessage.RoomId; // 房间号
switch (rootMessage.PayloadCase)
{
    case RoomMessage.PayloadOneofCase.None:
        break;
    case RoomMessage.PayloadOneofCase.PopularityChange:
        var popularity = rootMessage.PopularityChange.Popularity; // 直播间人气值
        break;
    case RoomMessage.PayloadOneofCase.LiveStatus:
        var newStatus = rootMessage.LiveStatus.Status;            // 上下播
        break;
    case RoomMessage.PayloadOneofCase.InfoChange:
        var newInfo = rootMessage.InfoChange;                     // 修改直播间信息
        switch (newInfo.ChangedCase)
        {
            case RoomInfoChangedMessage.ChangedOneofCase.None:
                break;
            case RoomInfoChangedMessage.ChangedOneofCase.BaseInfo:
                var newBaseInfo = newInfo.BaseInfo;               // 房间名与分区
                break;
            case RoomInfoChangedMessage.ChangedOneofCase.BackgroundUrl:
                var newBackgroundUrl = newInfo.BackgroundUrl;     // 房间背景图
                break;
            case RoomInfoChangedMessage.ChangedOneofCase.SkinId:
                var newSkinId = newInfo.SkinId;                   // 房间皮肤
                break;
            case RoomInfoChangedMessage.ChangedOneofCase.Admin:
                var newRoomAdminUids = newInfo.Admin.Uid.ToList();// 房管变更
                break;
            default:
                throw new ArgumentOutOfRangeException();
        }
        break;
    case RoomMessage.PayloadOneofCase.RoomLocked:
        var expireAt = rootMessage.RoomLocked.LockedUntil;        // 房间被锁
        break;
    case RoomMessage.PayloadOneofCase.RoomWarning:
        var message = rootMessage.RoomWarning.Message;            // 房间被警告
        break;
    case RoomMessage.PayloadOneofCase.RoomLimited:
        var details = rootMessage.RoomLimited;                    // 房间受限
        break;
    case RoomMessage.PayloadOneofCase.SuperchatDelete:
        var deletedSCIds = rootMessage.SuperchatDelete.Id.ToList(); // 删除SC
        break;
    case RoomMessage.PayloadOneofCase.UserMessage:
        var userMessage = rootMessage.UserMessage;
        var userInfo = userMessage.User; // 下面所有消息涉及到的用户
        switch (userMessage.PayloadCase)
        {
            case UserMessage.PayloadOneofCase.None:
                break;
            case UserMessage.PayloadOneofCase.Danmaku:
                var danmaku = userMessage.Danmaku;           // 弹幕
                break;
            case UserMessage.PayloadOneofCase.Gift:
                var gift = userMessage.Gift;                 // 礼物
                break;
            case UserMessage.PayloadOneofCase.SuperChat:
                var superChat = userMessage.SuperChat;       // Super Chat
                break;
            case UserMessage.PayloadOneofCase.NewGuard:
                var newGuard = userMessage.NewGuard;         // 大航海
                break;
            case UserMessage.PayloadOneofCase.WelcomeVip:
                var welcomeVip = userMessage.WelcomeVip;     // 欢迎老爷
                break;
            case UserMessage.PayloadOneofCase.WelcomeGuard:
                var welcomeGuard = userMessage.WelcomeGuard; // 欢迎舰长
                break;
            case UserMessage.PayloadOneofCase.UserBlocked:
                var userBlocked = userMessage.UserBlocked;   // 用户被封禁
                break;
            default:
                throw new ArgumentOutOfRangeException();
        }
        break;
    default:
        throw new ArgumentOutOfRangeException();
}
```

实际情况下，**由于 Routing Key 已经过滤了一次消息类型，您并不需要处理所有消息类型**。

### 消息类型

下面将会详细介绍各个消息类型。在阅读下述文档时，您应该同时参考 vNerve Transmitter 中的 Proto 源文件。部分注释写在源文件中，且为了避免让本文过于冗长部分字段等在本文中略去不写。

#### 凡例

- Protobuf 类型均在 `vNerve.bilibili.live` 命名空间下
- Protobuf 路径均以 `RoomMessage` 作为根

#### 用户相关消息

```
Protobuf 类型 - UserMessage
Protobuf 路径 - .user_message
字段 - user     : 该消息对应的用户 
     - payload  : 内容
```

所有与用户相关（广义上的）的消息，例如用户产生的消息等。注意，在处理 `payload` 之前，您可能先需要从 `user` 获取该消息对应的用户！

##### 用户信息 - User

```
Protobuf 类型 - UserInfo
Protobuf 路径 - .user_message.user
字段 - uid      : 用户 UID
     - name     : 用户昵称
     - 更多请参照 Protobuf 源文件
```

注意：**`User` 类型中仅有 `uid` 保证在所有消息中均可用**。大部分消息中 `name` 可用。其他字段的可用情况会在下面的文档中标明，若未标明则表示此消息中 `user` 对应字段没有数据。