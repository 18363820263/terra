# Schema 结构化数据实施计划 - SEO 优化方案

## 项目概述
为 terrazipay.com 网站实施全面的 JSON-LD Schema 结构化数据标记，以提升 Google 搜索可见性。包括创建新的 AI Agent Pay 页面，并在所有页面添加结构化数据。

## 域名信息
- 生产环境 URL: `https://terrazipay.com`
- 公司名称: TerryPay / TerraPay
- 支持语言: 4 种（zh-CN, en-US, zh-TW, es-ES）

## 实施阶段

### 第一阶段：基础架构搭建
创建核心 Schema 系统，可在所有页面复用。

**新建文件：**
1. `src/react-app/lib/schema/types.ts` - Schema.org 类型的 TypeScript 接口定义
2. `src/react-app/lib/schema/index.ts` - Schema 生成的工具函数
3. `src/react-app/lib/schema/data/organization.ts` - 集中管理的组织数据（名称、办公地点、联系方式）
4. `src/react-app/components/SchemaMarkup.tsx` - 将 JSON-LD 注入到文档 head 的 React 组件
5. `src/react-app/hooks/useSchemaMarkup.ts` - 管理 Schema 生命周期的自定义 Hook，支持多语言

**核心架构决策：**
- 使用 React Hooks 进行客户端 Schema 注入（适配 CSR 架构）
- 与现有 LanguageContext 集成的多语言 Schema 生成
- 集中式数据源，便于维护
- 路由切换时自动清理

### 第二阶段：核心 Schema 生成器
构建最具影响力的 Schema 类型生成器。

**新建文件：**
1. `src/react-app/lib/schema/generators/organization.ts` - 组织 Schema（包含办公地点、联系方式）
2. `src/react-app/lib/schema/generators/website.ts` - 网站 Schema（包含 SearchAction 以启用站点链接）
3. `src/react-app/lib/schema/generators/service.ts` - 服务 Schema（支付服务）
4. `src/react-app/lib/schema/generators/contactPage.ts` - 联系页面 Schema
5. `src/react-app/lib/schema/generators/product.ts` - 产品 Schema（用于 AI Agent Pay）

**Schema 类型优先级：**
- **Organization（组织）** - 关键 - 建立品牌权威性，启用知识图谱
- **WebSite（网站）** - 高 - 在 Google 搜索结果中启用站点链接搜索框
- **Service（服务）** - 高 - 描述稳定币支付服务
- **ContactPage（联系页面）** - 高 - 标记合作页面，便于发现
- **Product（产品）** - 高 - 用于 AI Agent Pay 产品

### 第三阶段：创建 AI Agent Pay 新页面
为 AI Agent Pay 创建新页面，包含专属 Schema 和元标签。

**新建文件：**
1. `src/react-app/pages/ai-agent-pay/index.tsx` - 新页面组件

**修改文件：**
1. `src/react-app/App.tsx` - 添加新路由 `/ai-agent-pay`
2. `src/react-app/locales/en-US.ts` - 添加 AI Agent Pay 翻译
3. `src/react-app/locales/zh-CN.ts` - 添加 AI Agent Pay 翻译
4. `src/react-app/locales/zh-TW.ts` - 添加 AI Agent Pay 翻译
5. `src/react-app/locales/es-ES.ts` - 添加 AI Agent Pay 翻译

**页面内容：**
- 标题: "TerraPay | The Payment Layer for the AI Agent Economy"
- 描述: "The payment layer for AI agents. Supporting instant stablecoin settlement, atomic ledgers, and full-chain traceability, providing a trusted transaction foundation for global AI agents."
- 关键词: TerraPay, TerraZip, AI Agent Pay, Agentic Commerce, AI Economy, AI Finance, KYA, Know Your Agent, Stablecoin, Payment, AI Pricing, Pay-as-you-go AI, AI Cost Management, Value-aligned Billing, Payment Infrastructure, Agent API, AI Workforce

**AI Agent Pay 页面的 Schema：**
- Product/Service Schema 描述 AI Agent Pay
- Organization Schema
- WebPage Schema

### 第四阶段：为现有页面集成 Schema

**首页 (`src/react-app/pages/index/index.tsx`)：**
- Organization Schema（总部、全球办公室）
- WebSite Schema（包含 SearchAction）
- Service Schema（跨境稳定币支付）
- 统计数据：50+ 地区、30+ 货币、20+ 支付方式、99.9% 正常运行时间

**关于页面 (`src/react-app/pages/about/index.tsx`)：**
- 详细的 Organization Schema（包含使命/愿景）
- 每个办公室的 Place Schema（香港总部、美国、马来西亚、墨西哥）
- ContactPoint Schema（客户服务、商务咨询）

**合作页面 (`src/react-app/pages/cooperation/index.tsx`)：**
- ContactPage Schema
- Organization Schema（包含联系详情）
- WebPage Schema

### 第五阶段：增强型 Schema 类型
添加额外的 Schema 类型以获得最大 SEO 收益。

**新建文件：**
1. `src/react-app/lib/schema/generators/breadcrumb.ts` - BreadcrumbList Schema
2. `src/react-app/lib/schema/generators/faq.ts` - FAQPage Schema（如果有 FAQ 内容）

**增强功能：**
- BreadcrumbList 用于导航层次结构
- FAQPage Schema（如果添加了 FAQ 内容）
- AggregateRating Schema（如果客户评价可以结构化为评分）

## 组织数据结构

**集中在 `src/react-app/lib/schema/data/organization.ts` 中：**
```typescript
{
  name: "TerraPay",
  legalName: "TerryPay",
  url: "https://terrazipay.com",
  logo: "https://terrazipay.com/logo.png",
  email: {
    business: "payoffice@starbit.net.cn",
    support: "support@starbit.net.cn"
  },
  offices: [
    { type: "headquarters", country: "HK", city: "Hong Kong" },
    { type: "branch", country: "US" },
    { type: "branch", country: "MY", city: "Malaysia" },
    { type: "branch", country: "MX", city: "Mexico" }
  ],
  services: {
    coverage: "50+ regions",
    currencies: "30+ currencies",
    paymentMethods: "20+ payment methods",
    uptime: "99.9%"
  }
}
```

## 多语言策略

**实施方法：**
- Schema 生成器接受 `language: Language` 参数
- 使用 locales 中现有的翻译键来获取描述文本
- 在所有 Schema 对象中包含 `inLanguage` 属性
- 保持结构化数据（URL、邮箱、坐标）与语言无关

**示例：**
```typescript
generateOrganizationSchema(language: Language) {
  const t = getTranslations(language);
  return {
    "@type": "Organization",
    "inLanguage": language,
    "description": t.heroSubtitle,
    "name": "TerraPay",
    "url": "https://terrazipay.com"
  };
}
```

## 技术实现模式

**在页面组件中：**
```typescript
import { useLanguage } from '@/locales/LanguageContext';
import { useSchemaMarkup } from '@/hooks/useSchemaMarkup';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/schema';

const HomePage = () => {
  const { currentLanguage } = useLanguage();

  const schemas = useMemo(() => [
    generateOrganizationSchema(currentLanguage),
    generateWebSiteSchema(currentLanguage)
  ], [currentLanguage]);

  useSchemaMarkup(schemas);

  return (/* 页面内容 */);
};
```

**Schema 注入（在 useSchemaMarkup Hook 中）：**
```typescript
useEffect(() => {
  const scriptTags = schemas.map(schema => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return script;
  });

  return () => {
    scriptTags.forEach(script => document.head.removeChild(script));
  };
}, [schemas]);
```

## 需要修改的关键文件

1. **`src/react-app/App.tsx`** - 添加 AI Agent Pay 路由
2. **`src/react-app/pages/index/index.tsx`** - 集成 Organization + WebSite + Service Schema
3. **`src/react-app/pages/about/index.tsx`** - 集成 Organization + Place + ContactPoint Schema
4. **`src/react-app/pages/cooperation/index.tsx`** - 集成 ContactPage + Organization Schema
5. **所有 locale 文件** - 添加 AI Agent Pay 翻译

## 验证与测试

**手动测试：**
1. 运行 `pnpm dev` 并访问每个页面
2. 打开浏览器开发者工具 → Elements → `<head>` 部分
3. 验证 JSON-LD script 标签存在且包含正确的 Schema
4. 切换语言并验证 Schema 更新了正确的 `inLanguage`
5. 在页面间导航并验证旧的 Schema 被移除

**Google 工具：**
1. 使用 [Google Rich Results Test](https://search.google.com/test/rich-results) 验证 Schema
2. 使用 [Schema Markup Validator](https://validator.schema.org/) 检查语法
3. 部署后测试每个页面 URL

**预期结果：**
- Google Rich Results Test 中无验证错误
- Organization Schema 被识别，符合知识图谱资格
- WebSite Schema 启用站点链接搜索框
- Service/Product Schema 正确分类
- ContactPage Schema 被识别

**构建与部署：**
```bash
pnpm typecheck  # 验证无 TypeScript 错误
pnpm build      # 生产环境构建
pnpm deploy     # 部署到 Cloudflare Workers
```

## SEO 影响预期

**即时收益：**
- Organization Schema → 品牌权威性、知识图谱资格
- WebSite Schema → 站点链接搜索框（更高点击率）
- Service/Product Schema → 更好地理解产品服务
- ContactPage Schema → 更容易发现联系信息

**长期收益：**
- 品牌查询的搜索排名提升
- 搜索结果中的富媒体摘要增强
- 多语言内容的索引改善
- 搜索结果的点击率提升

## 实施顺序

1. **第一阶段** - 基础架构（Schema 基础设施、组件、Hooks）
2. **第二阶段** - 核心生成器（Organization、WebSite、Service、ContactPage、Product）
3. **第三阶段** - AI Agent Pay 页面（新页面 + 路由 + 翻译）
4. **第四阶段** - 为现有页面集成 Schema（首页、关于、合作）
5. **第五阶段** - 增强型 Schema（BreadcrumbList、FAQPage 如适用）
6. **测试** - 使用 Google 工具验证、测试语言切换、验证清理
7. **部署** - 构建并部署到生产环境

## 注意事项

- 暂无社交媒体资料（可稍后添加到 Organization Schema）
- 所有 Schema 注入都在客户端进行（适配 CSR 架构，Google 可以读取）
- 用户切换语言时 Schema 自动更新
- 通过 useEffect 自动处理路由切换时的清理
- 类型安全的实现可防止 Schema 错误
