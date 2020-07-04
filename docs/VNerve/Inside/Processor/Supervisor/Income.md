---
pageIndex: 2
title: Income
---

Income 模块负责处理 Worker 传来的消息。

## Workflow

### 重置 Timeout

在 Worker 传来消息后，Supervisor 首先会重置该 Worker 的 Timeout，保证 Supervisor 与 Worker 的连接，参见 [负载均衡](./LoadBalance.md)。
