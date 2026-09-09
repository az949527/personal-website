// 个人网站内容数据 —— 全部文案/作品/图谱集中于此，主理人可自行修改，刷新即生效。
// 约束（测试 seam）：window.SITE_DATA 的赋值字面量必须保持严格 JSON 语法：
// 双引号键、无尾随逗号。
window.SITE_DATA = {
  "profile": {
    "name": "gaozelong",
    "title": "AI Agent / LLM 应用开发工程师",
    "tagline": "专注大模型应用与智能体工程：RAG、Agent 编排、质量评估与可追踪开发。",
    "email": "464585877@qq.com",
    "github": "https://github.com/az949527"
  },
  "resume": [
    {
      "date": "2026-07",
      "title": "企业知识库 Agent（主线项目）",
      "points": [
        "建设可评估、可追踪的企业知识库 Agent：文档上传解析、RAG 问答（答案带引用来源）、质量评估、Agent Trace。",
        "完成 PDF 解析 v3：标题噪声过滤、置信度多栏重排、三线表、跨页表格、多层表头、公式区与 figure 节点，以 73 项完整测试收口。",
        "技术栈：Python 3.11 / FastAPI / LangGraph / FAISS / SQLite。"
      ]
    },
    {
      "date": "2026",
      "title": "金融投研 Agent 垂直样板（前期探索）",
      "points": [
        "从投资主题 Agent 拆出的垂直案例，沉淀 RAG 问答、报告生成与投研工作流经验，作为主线方法的验证样板。"
      ]
    },
    {
      "date": "持续",
      "title": "RAG 工程参考实现 Membrain",
      "points": [
        "FastAPI + LangGraph + 文档管理 + Trace 的 RAG 参考项目，用于工程形态与质量评估方法的对照学习。"
      ]
    }
  ],
  "capability": {
    "nodes": [
      {
        "id": "core",
        "label": "AI Agent / LLM 应用开发",
        "level": 5,
        "intro": "求职核心方向：大模型应用与智能体工程，强调可评估、可追踪、可落地。",
        "skills": ["Agent 编排", "RAG", "评估与 Trace"]
      },
      {
        "id": "llm-app",
        "label": "大模型应用开发",
        "level": 4,
        "intro": "提示工程、Function Calling、流式输出与 LLM 服务化接入。",
        "skills": ["提示工程", "Function Calling", "流式"]
      },
      {
        "id": "agent",
        "label": "智能体编排",
        "level": 4,
        "intro": "多步工具调用、工作流编排（LangGraph 形态）、可观测执行。",
        "skills": ["LangGraph", "工具调用", "编排"]
      },
      {
        "id": "rag",
        "label": "RAG / 知识库",
        "level": 4,
        "intro": "检索、引用定位、问答闭环与效果指标化评估。",
        "skills": ["FAISS", "引用定位", "检索"]
      },
      {
        "id": "doc-parse",
        "label": "文档解析工程",
        "level": 4,
        "intro": "真实 PDF 解析：表格、跨页、多栏、公式区与 figure 节点的工程化收口。",
        "skills": ["PDF", "表格识别", "分块"]
      },
      {
        "id": "backend",
        "label": "后端工程",
        "level": 4,
        "intro": "Python 服务化：FastAPI 路由、数据持久化与接口设计。",
        "skills": ["Python", "FastAPI", "SQLite"]
      },
      {
        "id": "testq",
        "label": "测试质量工程",
        "level": 4,
        "intro": "以回归测试与验收门控保证可交付：夹具收口、真实 Red/Green 流程。",
        "skills": ["pytest", "回归", "验收门控"]
      },
      {
        "id": "eval-trace",
        "label": "质量评估与 Trace",
        "level": 4,
        "intro": "用指标判断效果而非凭感觉，记录检索/生成/自检全过程。",
        "skills": ["评估集", "Trace", "自检"]
      },
      {
        "id": "front",
        "label": "轻量前端工作台",
        "level": 3,
        "intro": "为后端能力搭轻量 Web 工作台：上传、列表、查询与结果展示。",
        "skills": ["HTML/CSS/JS", "工作台"]
      }
    ],
    "edges": [
      { "source": "core", "target": "llm-app" },
      { "source": "core", "target": "agent" },
      { "source": "core", "target": "rag" },
      { "source": "core", "target": "doc-parse" },
      { "source": "core", "target": "backend" },
      { "source": "core", "target": "testq" },
      { "source": "core", "target": "eval-trace" },
      { "source": "core", "target": "front" }
    ]
  },
  "works": [
    {
      "name": "enterprise_knowledge_agent",
      "tagline": "企业知识库 Agent：RAG 问答 + 引用定位 + 质量评估 + Agent Trace",
      "tags": ["Python", "FastAPI", "RAG", "Agent", "文档解析"],
      "href": "https://github.com/az949527/enterprise_knowledge_agent"
    },
    {
      "name": "Membrain",
      "tagline": "RAG 知识库工程参考实现：FastAPI + LangGraph + Trace",
      "tags": ["Python", "FastAPI", "LangGraph", "RAG"],
      "href": "https://github.com/az949527/Membrain"
    },
    {
      "name": "investment_agent",
      "tagline": "金融投研 Agent 垂直样板（历史上探方向，本地上架中）",
      "tags": ["Python", "Agent", "金融投研"],
      "href": "https://github.com/az949527/investment_agent"
    }
  ]
};
