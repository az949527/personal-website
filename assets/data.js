// 个人网站内容数据 —— 全部文案/项目集中于此，修改后刷新即生效。
// 约束（测试 seam）：window.SITE_DATA 的赋值字面量必须保持严格 JSON 语法：
// 双引号键、无尾随逗号。
// 隐私：不写入手机号与年龄（公开页面）。
window.SITE_DATA = {
  "profile": {
    "name": "高泽龙",
    "tagline": "能把不可控的大模型输出，从需求对齐一路约束到上线验收 —— Agent 编排、工具与协议接入、评测与回归门禁、交付落地，都能独立跑完整闭环。",
    "degree": "本科 · 长春理工大学光电信息学院 · 电气工程及其自动化",
    "email": "464585877@qq.com",
    "github": "https://github.com/az949527"
  },
  "resume": {
    "headline": "数据分析 × 数据开发 × 机器学习 × AI 应用工程化",
    "items": [
      {
        "label": "复合经验背景",
        "desc": "覆盖数据分析、数据开发、机器学习建模到 AI 应用工程化的完整成长路径，能把业务问题翻译成数据与模型方案，并推进到线上可用。"
      },
      {
        "label": "技术方向覆盖",
        "desc": "熟悉 RAG、Agent、NL2SQL、Tool Calling、LangGraph 等技术方向，能够基于平台底座完成智能问答、数据分析助手与 Agent 工具链开发。"
      },
      {
        "label": "工程化闭环能力",
        "desc": "具备 Python、SQL、FastAPI、Docker、Redis 等工程能力，能独立完成从数据接入、Python 建模、工具封装、Agent 编排到服务部署的完整链路。"
      }
    ],
    "keywords": [
      "RAG",
      "Agent",
      "NL2SQL",
      "Tool Calling",
      "LangGraph",
      "机器学习",
      "Python 建模",
      "Python",
      "SQL",
      "FastAPI",
      "Docker",
      "Redis"
    ],
    "summary": "具备数据分析、数据开发、机器学习与 AI 应用工程化经验，熟悉 RAG、Agent、NL2SQL、Tool Calling、LangGraph 等技术方向，能够基于平台底座完成智能问答、数据分析助手和 Agent 工具链开发；同时具备 Python 建模能力，结合 Python、SQL、FastAPI、Docker、Redis 等工程能力，能独立完成从数据接入、Python 建模、工具封装、Agent 编排到服务部署的完整链路。"
  },
  "works": [
    {
      "name": "LLM-Wiki — 编译式企业知识库（Agent 端到端交付）",
      "tagline": "用 Agent 分 10 个阶段端到端交付的编译式知识库：原始资料确定性编译为可互链 Wiki，抽取 75 节点 / 291 边知识图谱，实现可溯源问答与可重放质量评估。",
      "metrics": ["47 页 Wiki", "75 节点 / 291 边", "评估 91 → 92.4", "83/83 测试"],
      "highlights": [
        "确定性编译：每页含结论、来源证据、相关页面，并同步产出机器可读 manifest。",
        "可溯源问答：本地确定性检索 + SSE 流式；正文 [n] ↔ 证据卡 ↔ Wiki 原文三层双向对账，无证据时诚实拒答。",
        "可重放评估：题库 + 七维评估器（不适用返回 null 不污染分母）+ 固定时间 / 串行 / 隔离三件套；总分 91 → 92.4、通过 13/16 → 14/16、检索命中 80% → 90%，零指标退化。",
        "Agent 工具链扩展：实际路由使用 8 个 Skill 能力包；为 2 个第三方插件编写幂等补丁（含回退脚本）并做 18 条行为断言，拒绝假 PASS。",
        "产品化交付：六页工作台（工作台 / 资料中心 / Wiki / 图谱 / 问答 / 评估）、明暗主题持久化、83/83 单测 + 三包类型检查 + 生产构建。"
      ],
      "tags": ["TypeScript", "pnpm monorepo", "SQLite", "SSE", "本地检索", "知识图谱"],
      "gallery": [
        { "caption": "工作台 · 总览与处理流水线", "src": "assets/works/wiki-dashboard.png" },
        { "caption": "资料中心 · 导入与处理队列", "src": "assets/works/wiki-documents.png" },
        { "caption": "Wiki 阅读器 · 47 篇可互链知识页", "src": "assets/works/wiki-wiki.png" },
        { "caption": "知识图谱 · 75 节点 / 291 边", "src": "assets/works/wiki-graph.png" },
        { "caption": "可溯源问答 · 引用可回原文", "src": "assets/works/wiki-ask.png" },
        { "caption": "可重放评估 · 92.4 分 / 无回归", "src": "assets/works/wiki-evaluation.png" }
      ]
    }
  ],  "projects": [
    {
      "name": "面向业务自助取数的 Data Agent",
      "summary": "把「自然语言自助取数」做成业务方可直接使用的能力：口径先行对齐、查询受控可审计、结果可校验、失败可解释。构建自然语言到 SQL 的数据查询与分析助手，支持指标口径封装、SQL 生成、结果校验、结构化返回和自动化分析摘要生成，提升业务人员自助查询和数据分析效率。",
      "highlights": [
        "业务口径固化（交付前置）：把业务提问拆为标准步骤（指标识别 → 口径确认 → Schema 匹配），口径以语义层配置复用；检索层用 numpy 向量检索，实测表 top-1 命中率 73–96%、表 MRR 0.733、列 recall@30 65–100%。",
        "可审计的查询通道（交付质量底线）：7 层 SQL 护栏（语句类型/表名/列名白名单、DDL/DML 拦截、多语句拦截、强制 LIMIT、注释与字符串内伪指令处理），以自研 tokenizer 与 sqlglot 双解析器交叉验证；实测危险语句拦截与查询误杀双正常。",
        "自研编排与缺陷修复：13 节点 Agent 状态机、3 个条件派发点、1 个人工闸门（可中断、可续跑）；逐行核对上游源码后定位并修复 5 处真实缺陷，每条缺陷均配回归测试。",
        "可用性与成本控制：655 个测试覆盖编排、护栏、检索与评测；响应缓存按 sha256 内容寻址，改提示词即正确失效；单轮 89 题约 447 次调用、1.25M tokens、约 7 分钟，成本可预估。"
      ],
      "metrics": ["表 top-1 73–96%", "表 MRR 0.733", "列 recall@30 65–100%"],
      "tags": ["Data Agent", "SQL 护栏", "状态机编排", "向量检索", "评测体系"]
    },
    {
      "name": "MemBrain — 面向企业知识管理场景的 Agentic RAG 知识助手",
      "summary": "面向企业内部文档分散、跨系统检索效率低、知识复用困难等问题，独立设计并开发 Agentic RAG 知识助手，完成从文档接入、向量索引构建、检索增强、Agent 编排、流式响应到 Docker 容器化部署的完整链路，支持企业知识问答、上下文追踪与多轮交互。",
      "highlights": [
        "Agent 推理框架设计：基于 LangGraph + ReAct Agent 实现 Reasoning → Tool Calling → Observation → Re-Reasoning 多轮推理闭环；通过最大步数限制、循环检测、失败重试与兜底降级解决逻辑循环与工具调用失败问题。",
        "RAG 检索优化：搭建文档解析、Chunking、Embedding、FAISS Vector Search、相似度阈值过滤与上下文增强生成流程，提升知识问答准确性与可追溯性。",
        "上下文记忆机制设计：Semantic Memory 与动态上下文注入机制，结合用户问题、历史对话和检索结果构造 Prompt Context，提升多轮问答连续性。",
        "评测门禁：自建 500 条业务问答测试集，Recall@3 = 83.8%、P@1 = 71.4%；Prompt 或检索策略变更即执行回归，指标退化阻断上线。",
        "交付与边界：Streaming Response、链路日志追踪与 Docker 部署，单次检索由分钟级缩短至秒级，配套接入 SOP 与值班排查手册支持他人接管；未做多租户隔离与增量索引，权限控制为工具级。"
      ],
      "metrics": ["Recall@3 83.8%", "P@1 71.4%"],
      "tags": ["LangGraph", "ReAct", "FAISS", "评测门禁", "Docker"],
      "href": "https://github.com/az949527/Membrain"
    },
    {
      "name": "智能投研系统 — 宏观因子驱动的资产配置决策 Pipeline",
      "summary": "针对投研分析中数据来源分散、分析链路依赖人工串联、模型结果难复用和报告生成效率低的问题，构建基于 LLM Tool Calling 的 Agentic 投研助手，将数据获取、因子处理、周期预测、组合优化、回测分析和报告生成封装为自动化工具链，提升投研决策效率和结果复用能力。",
      "highlights": [
        "Agentic 工作流编排：将取数、特征处理、周期预测、组合优化、回测分析和报告生成封装为独立 Tools，由 Agent 根据用户问题动态规划调用链路；工具接口按 MCP 协议思路做标准化 schema 封装，统一返回周期判断、资产权重、回测指标、风险提示和报告摘要。",
        "工具契约：各投研模块标准化输入输出 Schema，统一返回周期判断、资产权重、回测指标与报告摘要。",
        "数据链路优化：构建宏观数据清洗、时间序列对齐、特征构造和因子生成链路，并对高频数据和中间结果进行缓存，降低重复计算成本。",
        "效果与边界：历史回测实现年化收益率 5.34%、Sharpe Ratio 2.11；投研报告生成从数小时人工压缩至分钟级。"
      ],
      "metrics": ["年化收益率 5.34%", "Sharpe Ratio 2.11"],
      "tags": ["LLM Tool Calling", "MCP", "Pipeline", "回测"],
      "href": "https://github.com/az949527/investment_agent"
    }
  ]
};
