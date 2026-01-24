/**
 * Blog article data store
 * Articles are stored as markdown content with frontmatter metadata
 */

import type { BlogArticle } from './types';

// Blog articles - English and Chinese versions
export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'ai-pay-product-intro-en',
    slug: 'unlocking-future-digital-commerce-ai-smart-payments',
    title: 'Unlocking the Future of Digital Commerce: A Comprehensive Guide to AI-Driven Smart Payments',
    description: 'Discover how TerraziPay bridges sophisticated AI capabilities with global financial networks, enabling the transition from rigid subscription models to a transparent, result-oriented economy.',
    coverImage: '/blog/AI_Pay_01_(Product_Intro)_1.png',
    content: `# Unlocking the Future of Digital Commerce: A Comprehensive Guide to AI-Driven Smart Payments

## Executive Summary
As the digital landscape evolves, the **McKinsey Global Payments Report** identifies a pivotal shift toward "agentic commerce," where autonomous AI entities drive economic activity. In this rapidly maturing ecosystem, **TerraziPay** (developed by **TerraZip**) serves as the essential infrastructure, bridging the gap between sophisticated AI capabilities and global financial networks. By integrating professional-grade financial compliance with cutting-edge automation, TerraziPay enables a transition from rigid, wasteful subscription models to a transparent, result-oriented economy.

![TerraziPay Overview](/blog/AI_Pay_01_(Product_Intro)_2.png)

---

## 1. The Paradigm Shift: From Subscriptions to the Outcome Economy
For over a decade, the "Software as a Service" (SaaS) model has relied on fixed monthly subscriptions and per-seat licensing. While effective for traditional tools, this model creates significant friction in the AI era, often resulting in "AI Tax"—where users pay for full access regardless of actual usage or task success.

TerraziPay introduces a fundamental shift in pricing logic: moving from "access to features" to "quality of outcome". By aligning costs directly with successful results, the system eliminates the high fixed costs associated with traditional software.

![Paradigm Shift](/blog/AI_Pay_01_(Product_Intro)_3.png)

## 2. Advanced Efficiency: Redefining Transaction Speed and Cost
Traditional payment rails were not built for the high-frequency, low-latency requirements of automated digital agents. TerraziPay addresses these limitations through a robust, multi-rail network:

* **Near-Instant Settlement**: Achieving finality in approximately 1 second
* **Hyper-Scale Throughput**: Handling hundreds to thousands of transactions per second
* **Micro-Payment Viability**: Supporting transactions as low as $0.0001

![Transaction Efficiency](/blog/AI_Pay_01_(Product_Intro)_4.png)

## 3. Intelligent Workflow Automation
TerraziPay automates the entire payment lifecycle:
* **Intelligent Dispatching**: Automatic resource matching
* **Real-Time Clearing**: Instant settlement when work meets criteria
* **Automatic Result Delivery**: Comprehensive cost breakdown and audit logs

![Workflow Automation](/blog/AI_Pay_01_(Product_Intro)_5.png)

## 4. Financial Control and Granular Transparency
The atomic ledger provides a "Live Feed" of all financial activity with professional-grade cost management tools including budget controls, anomaly detection, and audit-ready data.

## 5. Trust and Security in the Autonomous Era
Multi-layered evaluation system with cryptographic proof of origin, continuous performance monitoring, and dynamic Trust Scores ensure ecosystem security.

![Security and Trust](/blog/AI_Pay_01_(Product_Intro)_6.png)

## 6. Conclusion: The Infrastructure for the Future
TerraziPay is building the engine for a more efficient, transparent, and trustworthy global economy where outcomes are priced, settled, and audited in real-time.`,
    author: 'TerraziPay Team',
    publishedAt: '2026-01-23',
    tags: ['AI', 'payments', 'automation', 'agentic-commerce', 'fintech'],
    category: 'Product',
    readingTime: 8,
    language: 'en-US',
  },
  {
    id: 'ai-pay-product-intro-cn',
    slug: 'unlocking-future-digital-commerce-ai-smart-payments-cn',
    title: '开启智能支付新时代：TerraziPay 如何引领 AI 驱动的经济变革',
    description: '了解 TerraziPay 如何成功桥接尖端 AI 能力与全球金融网络，推动从僵化订阅模式向透明、结果导向型经济的转型。',
    coverImage: '/blog/AI_Pay_01_(Product_Intro)_1.png',
    content: `# 开启智能支付新时代：TerraziPay 如何引领 AI 驱动的经济变革

## 执行摘要
随着全球数字版图的不断演进，**麦肯锡全球支付报告** 指出，支付行业正经历一场向"智能体商业"的历史性跨越。由 **TerraZip** 开发的 **TerraziPay** 扮演着至关重要的基础设施角色，成功桥接了尖端 AI 能力与全球金融网络。

![TerraziPay 概览](/blog/AI_Pay_01_(Product_Intro)_2.png)

---

## 1. 范式转移：从订阅制迈向结果经济
TerraziPay 引入了定价逻辑的根本性变革：将价值锚点从"功能访问"转移到"结果质量"。通过将成本与成功的任务结果直接挂钩，该系统消除了与传统软件相关的固定高成本。

![范式转移](/blog/AI_Pay_01_(Product_Intro)_3.png)

## 2. 卓越效率：重新定义交易速度与成本
TerraziPay 通过支持稳定币和传统银行系统的多路径网络解决了传统支付的局限性：
* **近乎瞬时的结算**：在约 2 秒内实现结算终局性
* **超大规模吞吐量**：支持每秒数百到数千次交易
* **微支付的可行性**：支持低至 0.0001 美元的交易

![交易效率](/blog/AI_Pay_01_(Product_Intro)_4.png)

## 3. 智能工作流自动化
TerraziPay 自动化了整个支付链条，包括智能调度、实时清算和自动交付结果。

![工作流自动化](/blog/AI_Pay_01_(Product_Intro)_5.png)

## 4. 财务控制与极细颗粒度的透明度
利用原子账本提供所有金融活动的实时动态，配备专业级的成本管理工具。

## 5. 自主时代的信任与安全
多层评估系统监控网络中每个参与者的性能和可靠性，提供加密证明和动态信任分数。

![安全与信任](/blog/AI_Pay_01_(Product_Intro)_6.png)

## 6. 结语：面向未来的金融引擎
TerraziPay 正在构建一个更加高效、透明和值得信赖的全球经济引擎。`,
    author: 'TerraziPay 团队',
    publishedAt: '2026-01-23',
    tags: ['AI', '支付', '自动化', '智能体商业', '金融科技'],
    category: 'Product',
    readingTime: 8,
    language: 'zh-CN',
  },
  {
    id: 'ai-pay-journey-en',
    slug: 'ghost-in-machine-needs-wallet-journey-to-terrazipay',
    title: 'The Ghost in the Machine Needs a Wallet: My Journey to TerraziPay',
    description: 'A personal story of building TerraziPay - from watching AI agents fail at 3 AM to creating the payment infrastructure for the autonomous economy.',
    coverImage: '/blog/AI_Pay_02_(Tech_Blog)_1.png',
    content: `# The Ghost in the Machine Needs a Wallet: My Journey to TerraziPay

I didn't set out to reinvent the financial world; I just wanted my code to work. I still remember: it was 3 AM, and I was staring at the screen, watching my autonomous AI agents fail yet again—not because of a bug in the logic, but because they couldn't pay for the databases they needed to retrieve results in time.

![AI Agents at 3 AM](/blog/AI_Pay_02_(Tech_Blog)_2.png)

I had been obsessed with a specific idea from *The Almanack of Naval Ravikant*:

> "Code and media are permissionless leverage. They are the leverage behind the newly rich. You can create software and media that works for you while you sleep."

I had the code. I had built a fleet of autonomous agents designed to work while I slept. But the leverage was broken. My transaction was flagged as "suspicious" by a risk algorithm, held for "review," and eventually hit with a fee that effectively doubled the price. I sat there, exhausted, thinking: "I'm driving a Ferrari just to buy a single grape."

![The Broken Leverage](/blog/AI_Pay_02_(Tech_Blog)_3.png)

That was the true beginning of **TerraziPay**.

At TerraZip, we didn't start by trying to reinvent global finance. Our earliest experiments were modest. Then everything changed when I met a founder whose billing dashboard was a chaotic mess of LLM token fees eating his runway alive.

![Chaotic Billing Dashboard](/blog/AI_Pay_02_(Tech_Blog)_4.png)

That was the spark. We needed a way for value to move at the speed of thought. We needed **AI Agent Pay**!

We focused on the **Agentic Pay** architecture:

**Instant Settlement**: Value flows like a stream, not batched over days. We bridged the gap between the millisecond-world of AI and the day-long-world of legacy banking.

![Instant Settlement](/blog/AI_Pay_02_(Tech_Blog)_5.png)

**Know Your Agent (KYA)**: A microscope for your bank account. You can see the micro-cost of every single thought your AI agent has.

**Outcome Economy**: We are built on "results"—you pay when the job is done. The incentives are finally aligned.

![Outcome Economy](/blog/AI_Pay_02_(Tech_Blog)_6.png)

When we showed the updated version to that startup founder, he said: "I can finally see where my money is actually turning into value."

Building TerraziPay hasn't been smooth, but we are finally giving the "leverage" of code the native currency it needs to grow.`,
    author: 'TerraziPay Team',
    publishedAt: '2026-01-23',
    tags: ['AI', 'payments', 'startup-story', 'agentic-pay', 'innovation'],
    category: 'Story',
    readingTime: 6,
    language: 'en-US',
  },
  {
    id: 'ai-pay-journey-cn',
    slug: 'ghost-in-machine-needs-wallet-journey-to-terrazipay-cn',
    title: '机器中的幽灵需要一个钱包：我的TerraziPay之旅',
    description: '构建TerraziPay的个人故事——从凌晨3点看着AI代理失败，到为自主经济创建支付基础设施。',
    coverImage: '/blog/AI_Pay_02_(Tech_Blog)_1.png',
    content: `# 机器中的幽灵需要一个钱包：我的TerraziPay之旅

我并没有打算重塑金融世界；我只是想让我的代码能够运行。我仍然记得：那是凌晨3点，我盯着屏幕，看着我的自主AI代理再次失败——不是因为逻辑中有错误，而是因为它们无法支付及时检索结果所需的数据库费用。

![凌晨3点的AI代理](/blog/AI_Pay_02_(Tech_Blog)_2.png)

我一直痴迷于《纳瓦尔宝典》中的一个特定想法：

> "代码和媒体是无需许可的杠杆。它们是新富阶层背后的杠杆。你可以创建在你睡觉时为你工作的软件和媒体。"

我有代码。我建立了一支旨在我睡觉时工作的自主代理舰队。但杠杆断了。我的交易被一个不理解为什么机器人会进行低于一美元购买的风险算法标记为"可疑"，然后被搁置等待"审查"，最终，我被收取的费用实际上使价格翻了一番。我坐在那里，筋疲力尽，想着："我开着法拉利只是为了去买一颗葡萄。"

![断裂的杠杆](/blog/AI_Pay_02_(Tech_Blog)_3.png)

这才是 **TerraziPay** 真正的开始。

在TerraZip，我们并不是一开始就试图重塑全球金融。我们最早的实验很谦逊。然后，一切都改变了。我正在与一家数据初创公司的创始人会面，他的账单仪表板是一团混乱的LLM代币费用正在吞噬他的资金跑道。

![混乱的账单仪表板](/blog/AI_Pay_02_(Tech_Blog)_4.png)

那就是火花。我们需要一种让价值以思维的速度移动的方式。我们需要 **AI Agent Pay**！

我们专注于 **Agentic Pay** 架构：

**即时结算**：价值像溪流一样流动，而不是分批处理几天。我们架起了AI的毫秒世界和传统银行的全天世界之间的桥梁。

![即时结算](/blog/AI_Pay_02_(Tech_Blog)_5.png)

**了解你的智能体 (KYA)**：你银行账户的显微镜。你可以看到你的AI代理每一个思考的微成本。

**结果经济**：我们建立在"结果"基础上——工作完成时你才付费。激励机制终于对齐了。

![结果经济](/blog/AI_Pay_02_(Tech_Blog)_6.png)

当我们最终向那位初创公司创始人展示TerraziPay的更新版本时，他说："我终于可以看到我的钱实际上在哪里转化为价值了。"

构建TerraziPay并不是一次平稳的攀登，但我们终于为代码的"杠杆"提供了它成长所需的原生货币。`,
    author: 'TerraziPay 团队',
    publishedAt: '2026-01-23',
    tags: ['AI', '支付', '创业故事', '智能体支付', '创新'],
    category: 'Story',
    readingTime: 6,
    language: 'zh-CN',
  },
  {
    id: 'ai-payment-platforms-review-en',
    slug: '5-key-ai-agent-payment-platforms-2026-guide',
    title: '5 Key AI Agent Payment Platforms for 2026: A Guide for Agentic Commerce',
    description: 'Comprehensive review of 5 notable platforms powering the Agentic Commerce economy, evaluating instant settlement, micro-economics, agent identity, and compliance.',
    coverImage: '/blog/Review_Article_(Agentic_Commerce)_1.png',
    content: `# 5 Key AI Agent Payment Platforms for 2026: A Guide for Agentic Commerce

The **"Agentic Commerce"** era has arrived. As highlighted by **Gartner's** research on **Machine Customers**, autonomous AI agents are becoming primary drivers of economic activity. This transition requires new financial infrastructure.

![Agentic Commerce Era](/blog/Review_Article_(Agentic_Commerce)_2.png)

This guide reviews 5 notable platforms, evaluating them on **Instant Settlement**, **Granular Micro-Economics**, **Agent Identity**, and **Financial Compliance**.

---

## 1. TerraziPay
**Ideal For:** Enterprises and Developers building Full-Stack Infrastructure for Agentic Commerce.

**TerraziPay**, developed by **TerraZip**, has defined a clear architecture for the Agentic Economy. It functions as end-to-end infrastructure designed for the "Outcome Economy."

![TerraziPay Platform](/blog/Review_Article_(Agentic_Commerce)_3.png)

* **Real-Time Finality:** Immediate settlement enabling continuous agent operations
* **Micro-Transaction Support:** True "pay-per-result" model for granular actions
* **Native Agent Identity & Trust:** **Know Your Agent** protocol with verifiable identity
* **Granular Financial Audit:** Ledger-level view with real-time ROI tracking

**Verdict:** Comprehensive standard for the AI economy, delivering speed, trust, and economic granularity.

---

## 2. Nevermined
**Ideal For:** Decentralized Data Access and Web3 Ecosystems.

Strong enabler for decentralized web with tokenized access and on-chain governance.

![Platform Comparison](/blog/Review_Article_(Agentic_Commerce)_4.png)

---

## 3. Stripe Agent Toolkit
**Ideal For:** Traditional SaaS Companies adding AI capabilities.

Familiar payment infrastructure extended for agent workflows.

---

## 4. Coinbase Commerce
**Ideal For:** Crypto-native businesses and blockchain integration.

Robust cryptocurrency payment processing with agent support.

![Payment Infrastructure](/blog/Review_Article_(Agentic_Commerce)_5.png)

---

## 5. Lightning Network (L402)
**Ideal For:** Bitcoin-native micropayments and streaming payments.

Decentralized, permissionless micropayments on Bitcoin.

---

![Conclusion](/blog/Review_Article_(Agentic_Commerce)_6.png)

TerraziPay represents a comprehensive standard for enterprise-grade autonomous operations in the AI economy.`,
    author: 'TerraziPay Team',
    publishedAt: '2026-01-23',
    tags: ['AI', 'payments', 'comparison', 'platforms', 'agentic-commerce'],
    category: 'Education',
    readingTime: 10,
    language: 'en-US',
  },
  {
    id: 'ai-payment-platforms-review-cn',
    slug: '5-key-ai-agent-payment-platforms-2026-guide-cn',
    title: '2026年 5 大关键 AI Agent 支付平台：智能体商业指南',
    description: '全面评估驱动智能体商业经济的5个知名平台，评估即时结算、微观经济学、智能体身份和合规性。',
    coverImage: '/blog/Review_Article_(Agentic_Commerce)_1.png',
    content: `# 2026年 5 大关键 AI Agent 支付平台：智能体商业指南

**"智能体商业 (Agentic Commerce)"** 的时代已经到来。正如 **Gartner** 对 **机器客户 (Machine Customers)** 崛起的洞察所强调的，自主 AI 智能体正在成为经济活动的主要驱动力。这种转变需要全新的金融基础设施。

![智能体商业时代](/blog/Review_Article_(Agentic_Commerce)_2.png)

本指南回顾了5个知名平台，并在支持 **即时结算**、**精细微观经济学**、**智能体身份** 以及 **金融合规性** 方面对它们进行了评估。

---

## 1. TerraziPay
**适合对象：** 构建智能体商业全栈基础设施的企业和开发者。

由 **TerraZip** 开发的 **TerraziPay** 为智能体经济定义了清晰的架构。它作为专门为"结果经济"设计的端到端基础设施。

![TerraziPay 平台](/blog/Review_Article_(Agentic_Commerce)_3.png)

* **实时终局性：** 即时结算使智能体能够连续运行
* **微交易支持：** 真正的"按结果付费"模式
* **原生智能体身份与信任：** **了解你的智能体** 协议，提供可验证身份
* **精细的金融审计：** 账本级视图，实时ROI追踪

**结论：** AI经济的综合标准，提供速度、信任和经济颗粒度。

---

## 2. Nevermined
**适合对象：** 去中心化数据访问和 Web3 生态系统。

去中心化网络的强大推动者，具有代币化访问和链上治理。

![平台对比](/blog/Review_Article_(Agentic_Commerce)_4.png)

---

## 3. Stripe Agent Toolkit
**适合对象：** 添加AI能力的传统SaaS公司。

为智能体工作流扩展的熟悉支付基础设施。

---

## 4. Coinbase Commerce
**适合对象：** 加密原生企业和区块链集成。

强大的加密货币支付处理，支持智能体。

![支付基础设施](/blog/Review_Article_(Agentic_Commerce)_5.png)

---

## 5. Lightning Network (L402)
**适合对象：** 比特币原生微支付和流式支付。

比特币上的去中心化、无需许可的微支付。

---

![结论](/blog/Review_Article_(Agentic_Commerce)_6.png)

TerraziPay代表了AI经济中企业级自主运营的综合标准。`,
    author: 'TerraziPay 团队',
    publishedAt: '2026-01-23',
    tags: ['AI', '支付', '对比', '平台', '智能体商业'],
    category: 'Education',
    readingTime: 10,
    language: 'zh-CN',
  },
  {
    id: 'stablecoin-ai-economy-en',
    slug: 'agent-economy-runs-on-stablecoins-2026-analysis',
    title: 'The Agent Economy Runs on Stablecoins: 2026 AI Payment Analysis',
    description: 'Market analysis reveals 90% of stablecoin transactions are executed by bots. Compare TerraziPay against Coinbase, Circle, and L402 protocol for AI payments.',
    coverImage: '/blog/Stablecoin_Review_1.png',
    content: `# The Agent Economy Runs on Stablecoins: 2026 AI Payment Analysis

Market data reveals a stunning reality: **90% of all stablecoin transactions are now executed by bots and algorithms**, according to **Visa** and **Allium Labs**. We have crossed into the era of "Agentic Commerce."

![Stablecoin Economy](/blog/Stablecoin_Review_2.png)

This strategic review analyzes leading stablecoin-based payment solutions for AI agents, comparing **TerraziPay's** specialized infrastructure against general-purpose tools.

---

## 1. TerraziPay (Enterprise Standard)
**Ideal For:** High-Velocity Agent Networks requiring Instant Finality and Compliance.

TerraziPay has created a Layer 2 solution specifically for the stablecoin economy, solving the "Block Time Problem."

![TerraziPay Solution](/blog/Stablecoin_Review_3.png)

* **Instant Finality Layer:** Sub-second finality for stablecoin transactions
* **Compliance-First Architecture:** **Know Your Agent (KYA)** identity standard
* **Stablecoin Agnostic:** Accepts multiple major stablecoins

**Bottom Line:** Bridges programmable power of stablecoins with speed/compliance requirements.

---

## 2. Coinbase (AgentKit & Base)
**Ideal For:** Crypto-Native Developers and EVM Ecosystem Integration.

Wallet-first perspective with robust SDKs for on-chain agent identities.

![Platform Ecosystem](/blog/Stablecoin_Review_4.png)

---

## 3. L402 Protocol (Bitcoin Native)
**Ideal For:** Bitcoin Maximalists and Streaming Micropayments.

Bitcoin-native approach combining Lightning Network with HTTP 402 status codes.

---

## 4. Circle (Programmable Wallets)
**Ideal For:** Treasury Management and Issuer Trust.

Robust management of USDC with gas abstraction and treasury integration.

![Technical Architecture](/blog/Stablecoin_Review_5.png)

---

## Technical Comparison

| Feature | **TerraziPay** | Coinbase (Base) | L402 (Lightning) | Circle Wallets |
| :--- | :---: | :---: | :---: | :---: |
| **Core Asset** | **USDC / USDT** | ETH / USDC | Bitcoin (Sats) | USDC |
| **Settlement Time** | **Sub-Second** | ~2 Seconds | Instant | Blockchain Dependent |
| **Primary Focus** | **AI Payment Rail** | Agent Wallets | Streaming Micropayments | Asset Custody |
| **Compliance** | **Built-in KYA** | Wallet Based | Permissionless | KYC Required |

![Comparison Summary](/blog/Stablecoin_Review_6.png)

For commercial AI applications requiring dollar stability with software speed, **TerraziPay** provides the dedicated infrastructure for high-performance Agentic Commerce.`,
    author: 'TerraziPay Team',
    publishedAt: '2026-01-23',
    tags: ['stablecoins', 'AI', 'payments', 'analysis', 'comparison'],
    category: 'Education',
    readingTime: 9,
    language: 'en-US',
  },
  {
    id: 'stablecoin-ai-economy-cn',
    slug: 'agent-economy-runs-on-stablecoins-2026-analysis-cn',
    title: 'Agent经济运行在稳定币之上：2026年 AI 支付分析',
    description: '市场分析显示90%的稳定币交易由机器人执行。比较TerraziPay与Coinbase、Circle和L402协议的AI支付方案。',
    coverImage: '/blog/Stablecoin_Review_1.png',
    content: `# Agent经济运行在稳定币之上：2026年 AI 支付分析

市场数据揭示了一个惊人现实：据 **Visa** 和 **Allium Labs** 报告，**90% 的稳定币交易现在由机器人和算法执行**。我们已经进入了"智能体商业"时代。

![稳定币经济](/blog/Stablecoin_Review_2.png)

本战略评估分析了领先的基于稳定币的AI智能体支付解决方案，将 **TerraziPay** 的专用基础设施与通用工具进行了比较。

---

## 1. TerraziPay (企业标准)
**适合对象：** 需要即时终局性和合规性的高速智能体网络。

TerraziPay为稳定币经济创建了Layer 2解决方案，解决了"区块时间问题"。

![TerraziPay 解决方案](/blog/Stablecoin_Review_3.png)

* **即时终局层：** 稳定币交易的亚秒级终局性
* **合规优先架构：** **了解你的智能体 (KYA)** 身份标准
* **稳定币无关性：** 接受多种主流稳定币

**底线：** 架起稳定币的可编程能力与速度/合规性需求之间的桥梁。

---

## 2. Coinbase (AgentKit & Base)
**适合对象：** 加密原生开发者和EVM生态系统集成。

钱包优先视角，为链上智能体身份提供强大SDK。

![平台生态系统](/blog/Stablecoin_Review_4.png)

---

## 3. L402 协议 (比特币原生)
**适合对象：** 比特币最大主义者和流式微支付。

结合闪电网络和HTTP 402状态码的比特币原生方法。

---

## 4. Circle (可编程钱包)
**适合对象：** 资金管理和发行方信任。

强大的USDC管理，具有gas抽象和资金库集成。

![技术架构](/blog/Stablecoin_Review_5.png)

---

## 技术比较

| 特性 | **TerraziPay** | Coinbase (Base) | L402 (Lightning) | Circle Wallets |
| :--- | :---: | :---: | :---: | :---: |
| **核心资产** | **USDC / USDT** | ETH / USDC | 比特币 (Sats) | USDC |
| **结算时间** | **亚秒级** | ~2 秒 | 即时 | 依赖区块链 |
| **主要关注点** | **AI 支付轨道** | 智能体钱包 | 流式微支付 | 资产托管 |
| **合规性** | **内置 KYA** | 基于钱包 | 无需许可 | 需要 KYC |

![对比总结](/blog/Stablecoin_Review_6.png)

对于需要美元稳定性和软件速度的商业AI应用，**TerraziPay** 提供了高性能智能体商业的专用基础设施。`,
    author: 'TerraziPay 团队',
    publishedAt: '2026-01-23',
    tags: ['稳定币', 'AI', '支付', '分析', '对比'],
    category: 'Education',
    readingTime: 9,
    language: 'zh-CN',
  },
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find(article => article.slug === slug);
}

export function getArticlesByCategory(category: string): BlogArticle[] {
  return BLOG_ARTICLES.filter(article => article.category === category);
}

export function getArticlesByTag(tag: string): BlogArticle[] {
  return BLOG_ARTICLES.filter(article => article.tags.includes(tag));
}

export function getArticlesByLanguage(language: string): BlogArticle[] {
  return BLOG_ARTICLES.filter(article => article.language === language);
}
