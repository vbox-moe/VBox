---
pageIndex: 2
title: Real-Time Processor
---

vNerve Processor 在 vNerve 中负责接收和处理实时消息，由 Receptor（接受器）、CNS（中枢神经系统）和 Effector（效应器）构成，核心代码使用 C++ 编写。轻敲以选择您想要查看的内容。

<select-button title="Receptor Supervisor" description="Supervisor 是实时消息接收的中心节点，使用一套负载均衡系统管理所有 Worker 并接收由其返回的实时数据，同时负责将数据传递至 CNS。" href="/VNerve/Inside/Processor/Supervisor/"></select-button>

<select-button title="Receptor Worker" description="Worker 负责监听目标并获取实时数据，由 Supervisor 管理。" href="/VNerve/Inside/Processor/Worker/"></select-button>

<select-button title="CNS" description="CNS 基于 RabbitMQ，是处理消息的核心部分。" href="/VNerve/Inside/Processor/CNS/"></select-button>

<select-button title="Effector" description="效应器部分负责实时将消息分发到下游应用。" href="/VNerve/Inside/Processor/Effector/"></select-button>
