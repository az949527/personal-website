// 个人网站内容数据 —— 全部文案/项目集中于此，修改后刷新即生效。
// 约束（测试 seam）：window.SITE_DATA 的赋值字面量必须保持严格 JSON 语法：
// 双引号键、无尾随逗号。
// 隐私：不写入手机号与年龄（公开页面）。
window.SITE_DATA = {
  "profile": {
    "name": "高泽龙",
    "title": "AI Agent / LLM 应用开发工程师",
    "tagline": "以大模型与 Agent 工程落地真实业务：从数据接入、Python 建模、Agent 编排、工具封装到容器化部署的端到端能力。",
    "degree": "本科 · 长春理工大学光电信息学院",
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
  "projects": [
    {
      "name": "MemBrain — 面向企业知识管理场景的 Agentic RAG 知识助手",
      "summary": "面向企业内部文档分散、跨系统检索效率低、知识复用困难等问题，独立设计并开发 Agentic RAG 知识助手，完成从文档接入、向量索引构建、检索增强、Agent 编排、流式响应到 Docker 容器化部署的完整链路，支持企业知识问答、上下文追踪与多轮交互。",
      "highlights": [
        "Agent 推理框架设计：基于 LangGraph + ReAct Agent 实现 Reasoning → Tool Calling → Observation → Re-Reasoning 多轮推理闭环，Agent 可按问题动态调用检索工具并生成答案。",
        "RAG 检索优化：搭建文档解析、Chunking、Embedding、FAISS 向量检索、相似度阈值过滤与上下文增强生成流程，提升问答准确性与可追溯性。",
        "多格式知识接入：封装统一文档处理流程，支持 PDF / TXT / Markdown 导入，将异构文档统一转换为可索引文本块。",
        "上下文记忆机制：设计 Semantic Memory 与动态上下文注入，结合用户问题、历史对话与检索结果构造 Prompt Context，提升多轮问答连续性。",
        "部署与评估闭环：实现 Streaming Response、异常兜底与 Docker 容器化。"
      ],
      "metrics": ["Recall@3 83.8%", "MRR 0.96"],
      "tags": ["LangGraph", "Agentic RAG", "ReAct", "FAISS", "FastAPI", "Docker"],
      "href": "https://github.com/az949527/Membrain"
    },
    {
      "name": "智能投研系统 — 宏观因子驱动的资产配置决策 Pipeline",
      "summary": "针对投研分析中数据来源分散、分析链路依赖人工串联、模型结果难复用与报告生成效率低的问题，构建基于 LLM Tool Calling 的 Agentic 投研助手，将数据获取、因子处理、周期预测、组合优化、回测分析与报告生成封装为自动化工具链。",
      "highlights": [
        "Agentic 工作流编排：把取数、特征处理、周期预测、组合优化、回测分析与报告生成封装为独立 Tools，由 Agent 按用户问题动态规划调用链路。",
        "结构化工具接口设计：为各投研模块设计标准化输入输出 Schema，统一返回周期判断、资产权重、回测指标、风险提示与报告摘要。",
        "数据 Pipeline 与缓存优化：构建宏观数据清洗、时间序列对齐、特征构造与因子生成链路，对高频数据与中间结果缓存，降低重复计算成本。",
        "后端服务化与效果验证：将核心投研能力封装为后端服务接口，支持自动化生成结构化投研结论。"
      ],
      "metrics": ["年化收益率 5.34%", "Sharpe Ratio 2.11"],
      "tags": ["LLM Tool Calling", "因子模型", "组合优化", "回测", "Pipeline"],
      "href": "https://github.com/az949527/investment_agent"
    },
    {
      "name": "面向业务分析场景的自然语言数据查询系统",
      "summary": "面向业务分析和经营看板场景，构建自然语言到 SQL 的数据查询与分析助手，支持指标口径封装、SQL 生成、结果校验、结构化返回与自动化分析摘要生成，提升业务人员自助查询与数据分析效率。",
      "highlights": [
        "Agentic 查询链路设计：将问题理解、指标识别、Schema 匹配、SQL 生成、结果校验与分析总结拆分为可编排步骤，实现从自然语言提问到业务分析结论的自动化闭环。",
        "SQL Guardrails 安全校验：对生成 SQL 的表名、字段、聚合逻辑、过滤条件、查询范围与危险操作进行校验，降低幻觉字段、错误聚合和高风险查询问题。",
        "数据结构化输出：统一封装查询 SQL、结构化结果、字段解释、异常提示与分析摘要，支持前端展示表格、指标卡片与自动化业务解读。",
        "缓存与性能优化：针对高频指标与重复查询设计缓存机制，减少重复 SQL 执行与模型生成成本，提升看板与管理层问答场景的响应效率。"
      ],
      "metrics": ["端到端自动化闭环：提问 → SQL 生成 → 结果校验 → 分析摘要", "SQL Guardrails 覆盖表名/字段/聚合/过滤/范围/危险操作"],
      "tags": ["NL2SQL", "SQL Guardrails", "结构化输出", "缓存优化"]
    }
  ]
};
