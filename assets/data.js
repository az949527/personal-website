// 个人网站内容数据 —— 全部文案/项目/图谱集中于此，修改后刷新即生效。
// 约束（测试 seam）：window.SITE_DATA 的赋值字面量必须保持严格 JSON 语法：
// 双引号键、无尾随逗号。
// 隐私：不写入手机号与年龄（公开页面）。
window.SITE_DATA = {
  "profile": {
    "name": "高泽龙",
    "title": "AI Agent / LLM 应用开发工程师",
    "tagline": "以大模型与 Agent 工程落地真实业务：从数据接入、业务建模、Agent 编排、工具封装到容器化部署的端到端能力。",
    "degree": "本科 · 长春理工大学光电信息学院",
    "email": "464585877@qq.com",
    "github": "https://github.com/az949527"
  },
  "capabilities": [
    {
      "label": "AI 应用端到端交付",
      "desc": "独立完成从数据接入、业务建模、Agent 编排、工具封装到服务部署的完整实现链路。"
    },
    {
      "label": "AI 工程化建设",
      "desc": "落地 Redis 缓存、日志追踪、异常兜底、结构化输出、流式响应与 Docker 部署，提升系统稳定性与交互体验。"
    },
    {
      "label": "数据体系与监控",
      "desc": "搭建多套业务监控体系与风控预警机制，覆盖核心指标波动、异常流量与转化变化。"
    },
    {
      "label": "指标体系与分析",
      "desc": "搭建活跃、留存、转化、流失等核心指标体系，沉淀可复用分析模板，支持专题分析与异常定位。"
    },
    {
      "label": "数据开发与质量保障",
      "desc": "SQL 开发、专题分析、数据质量排查与报表维护，支撑运营、产品与管理层的数据决策。"
    },
    {
      "label": "跨部门协同与口径统一",
      "desc": "参与跨部门数据整合与指标沉淀，统一分析口径，提升数据服务效率与业务协同效率。"
    }
  ],
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
  ],
  "capability": {
    "nodes": [
      {
        "id": "core",
        "label": "AI Agent / LLM 应用开发",
        "level": 5,
        "intro": "求职核心方向：大模型应用与智能体工程，强调可评估、可追踪、可落地。",
        "skills": ["Agent 编排", "Agentic RAG", "工程化落地"]
      },
      {
        "id": "agent",
        "label": "Agent 编排与推理",
        "level": 5,
        "intro": "基于 LangGraph + ReAct 的多轮推理闭环，工具封装与动态调用链路规划。",
        "skills": ["LangGraph", "ReAct", "Tool Calling"]
      },
      {
        "id": "rag",
        "label": "Agentic RAG / 检索增强",
        "level": 5,
        "intro": "文档解析、Chunking、Embedding、向量检索、阈值过滤与上下文增强生成。",
        "skills": ["FAISS", "Chunking", "上下文增强"]
      },
      {
        "id": "llm-app",
        "label": "大模型应用开发",
        "level": 4,
        "intro": "Prompt Engineering、结构化输出、流式响应与多轮上下文记忆设计。",
        "skills": ["Prompt Engineering", "流式响应", "Semantic Memory"]
      },
      {
        "id": "nl2sql",
        "label": "自然语言数据查询",
        "level": 4,
        "intro": "NL2SQL 查询链路编排与 SQL 安全校验，面向经营看板与自助分析。",
        "skills": ["NL2SQL", "SQL Guardrails"]
      },
      {
        "id": "backend",
        "label": "后端与部署工程",
        "level": 4,
        "intro": "服务接口封装、缓存、异常兜底与容器化部署。",
        "skills": ["FastAPI", "Redis", "Docker"]
      },
      {
        "id": "data",
        "label": "数据工程与分析",
        "level": 4,
        "intro": "SQL 开发、指标体系搭建、监控预警与数据质量排查。",
        "skills": ["SQL", "PostgreSQL", "Hive", "pandas"]
      },
      {
        "id": "eval",
        "label": "评估与可观测",
        "level": 4,
        "intro": "自建评估脚本量化检索效果，日志追踪与异常兜底保障可观测。",
        "skills": ["评估脚本", "Recall@3", "MRR"]
      },
      {
        "id": "doc-parse",
        "label": "多格式文档接入",
        "level": 4,
        "intro": "统一 PDF / TXT / Markdown 处理流程，异构文档转为可索引文本块。",
        "skills": ["PDF", "Markdown", "统一处理"]
      }
    ],
    "edges": [
      { "source": "core", "target": "agent" },
      { "source": "core", "target": "rag" },
      { "source": "core", "target": "llm-app" },
      { "source": "core", "target": "nl2sql" },
      { "source": "core", "target": "backend" },
      { "source": "core", "target": "data" },
      { "source": "core", "target": "eval" },
      { "source": "core", "target": "doc-parse" }
    ]
  }
};
