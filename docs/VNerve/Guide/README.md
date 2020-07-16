---
pageIndex: 1
title: 开始使用
---

## 实时性数据

对于 JavaScript 开发者，您可以直接使用 vNerveNeuronWire 库（TODO: @镁矿）拉取实时性数据。对于其他语言开发者，您可参考以下教程。

### 前置条件

- AMQP / WebSTOMP 客户端
- Protobuf 解析库
- [vNerve Transmitter](https://github.com/vNerve/vNerveTransmitter)

实时性数据使用消息队列进行传输，因此您首先支持 AMQP 或 WebSTOMP 协议的消息队列客户端。若在本地使用（例如 Java 或 C#），二者皆可使用。若在浏览器上直接连接，仅可选择 WebSTOMP 协议（其内部使用 WebSocket 建立连接）。大部分语言都有对应的 AMQP 与 WebSTOMP 协议客户端。**AMQP 客户端，很多时候会作为 RabbitMQ 的客户端发布。** 例如 C# 上的 [RabbitMQ.Client](https://www.nuget.org/packages/RabbitMQ.Client)。

从消息队列获取到的数据必须通过 Protobuf 解析工具解析。对于大部分语言或平台均存在官方或非官方的 Protobuf 解析工具。下列是一些例子。

- C#：[protobuf-net](https://github.com/protobuf-net/protobuf-net) / [Google.Protobuf](https://developers.google.com/protocol-buffers/docs/csharptutorial)
- Java: [com.google.protobuf](https://developers.google.com/protocol-buffers/docs/javatutorial)
- C++: [protobuf](https://developers.google.com/protocol-buffers/docs/cpptutorial)
- Go: [protobuf](https://developers.google.com/protocol-buffers/docs/gotutorial)
- Rust: [rust-protobuf](https://github.com/stepancheg/rust-protobuf)

由于 Protobuf 是一种 Schemaful 的格式，因此为了正常解析收到的数据，还需要获取各种数据类型的定义，即 vNerveTransmitter。

若使用 `protobuf-net` 等第三方非常规库，您需要根据 vNerveTransmitter 中定义的 proto 文件手动编写对应的数据结构，而若使用 Google 提供的 Protobuf 解析库，您可以直接从 `vNerveTransmitter` Git 库的 `dist` 分支获取生成好的对应语言的源代码。请参考 Google 官方提供的文档来了解如何使用这些代码，大部分情况下您只需要将对应语言的源文件加入项目并加上 Google Protobuf 的依赖即可。

另外，对于 JavaScript 开发者，我们亦提供 `protobuf.js`（目前还没有，晚点配CI，你考虑自己先用pbjs车一个吧@美东）的 static 与 JSON 格式。

### 明确需要的数据

vNerve 通过设置消息队列的 Routing Key 来按照需求投递消息。这使得您可以只关注于您感兴趣的消息类型，避免不必要的带宽浪费。同时，Routing Key 也支持通配符。

所有 Routing Key 均以 `<src>.` 开头，其中 `src` 为来源组件的简写，例如 BiLive 数据源的简写为 `blv`。

欲了解各个数据源的 Routing Key 格式，请参阅各个数据源的文档。

- vNerve BiLive: （链接）

### 拉取数据

为了分散服务器负载，vNerve 通过多个镜像服务器分流数据获取请求。您可以任意选取一个服务器拉取数据，其提供的数据均是相同的的。

#### 服务器信息

所有服务器均支持以下提到的所有协议。

```
mq1.vnerve.dd.center
mq2.vnerve.dd.center
```

- 端口号请参照下方协议。
- 用户名与密码均为 `vnerve`。注意该用户无进行任何写操作的权限。
- 消息队列 Exchange 名称为 `vNerve`，类型为 Topic。

#### AMQP 协议

// TODO

#### WebSTOMP 协议

WebSTOMP 协议提供了一种简便的，通过 WebSocket 获取数据的方式。

端口号：  
- WSS - `7216`
- WS - `7215`

**注意：需要接收二进制消息而非字符串，有时候需要配置对应客户端。**

下面给出一个使用 [stompjs](https://stomp-js.github.io/guide/stompjs/using-stompjs-v5.html) 库在浏览器中 JavaScript 上的例子（改编自官方例子）。

```javascript
const client = new StompJs.Client({
  brokerURL: "wss://mq1.vnerve.dd.center:7216/ws",
  connectHeaders: {
    login: "vnerve",
    passcode: "vnerve"
  },
  reconnectDelay: 10000,
});

client.onConnect = function(frame) {
  let subscription = client.subscribe("/topic/vNerve/blv.*.sc", function(message) {
  let raw_data = message.binaryBody;
    // 处理 raw_data
  });
    
  // 当不再需要时
  subscription.unsubscribe();
};

client.activate();

// 当不再需要时
client.deactivate();


```

// TODO：测试这段代码

### 解析数据

上面的例子中提到了需要处理 `raw_data`，即接收到的数据。

所有收到的数据均是一个 Protobuf 对象。其类型为对应的感应器组件所提供消息的根类型。例如，BiLive 组件提供的根类型是 `vNerve.bilibili.live.RoomMessage`。具体的各组件对应的根类型可以在（//TODO）查询。因此首先需要明确从消息队列中接收到的来自哪个组件，以选择合适的根类型。对于 AMQP 连接，你可以直接通过收到消息的 Routing Key 判断。通常各个组件的根对象相同，判断出消息属于的组件之后即可进行解析。

解析出根类型之后，您需要查阅对应组件的文档（TODO），确定各个消息的结构。

下面是通过 [protobuf.js 6](https://github.com/protobufjs/protobuf.js) 库解析哔哩哔哩直播的弹幕消息的一个例子（protobuf.js 属于第三方库，使用与标准库略有不同的加载 proto 文件的方式。另外其性能也更优，因此在 JavaScript 环境您应该始终使用 protobuf.js）。

```javascript
let raw_data = message.binaryBody; // 书接上回

protobuf.load("vNerve_Proto.json", function(err, root) { // 应该在最开始就加载 proto 并保存 root 对象.
  if (err)
    throw err;
  var RoomMessage = root.lookupType("vNerve.bilibili.live.RoomMessage");
  var message = RoomMessage.decode(raw_data);
    
  const username = message.user_message.user.name;
  const content = message.user_message.danmaku.message;
  console.log(username + " said: " + content);
}
```

// TODO测试一下

关于如何使用解析后的结构，请参阅对应组件的文档。例如 BiLive。(TODO link) **注意：对于使用 vNerveNeuronWire 的用户而言，数据结构略有优化，请参照vNerveNeuronWire 的文档(todo link)来处理。**

