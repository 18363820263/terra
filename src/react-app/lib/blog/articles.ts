/**
 * Blog article data store
 * Articles are stored as markdown content with frontmatter metadata
 */

import type { BlogArticle } from './types';

// Sample articles - in production, these would be loaded from markdown files
export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: '1',
    slug: 'introduction-to-stablecoin-payments',
    title: 'Introduction to Stablecoin Payments: The Future of Cross-Border Transactions',
    description: 'Learn how stablecoin payments are revolutionizing cross-border transactions with instant settlement, lower fees, and global accessibility.',
    content: `# Introduction to Stablecoin Payments

Stablecoin payments are transforming the way businesses handle cross-border transactions. Unlike traditional payment methods that can take days to settle and incur high fees, stablecoin payments offer instant settlement at a fraction of the cost.

## What are Stablecoins?

Stablecoins are cryptocurrencies designed to maintain a stable value by being pegged to a reserve asset, typically the US Dollar. Popular stablecoins include USDT (Tether) and USDC (USD Coin).

## Benefits of Stablecoin Payments

1. **Instant Settlement**: Transactions settle in seconds, not days
2. **Lower Fees**: Transaction costs are significantly reduced compared to traditional methods
3. **Global Accessibility**: Available 24/7 across borders without intermediaries
4. **Transparency**: All transactions are recorded on the blockchain

## Use Cases

- Cross-border e-commerce payments
- International payroll and remittances
- B2B settlements
- Digital content monetization

TerraPay provides enterprise-grade stablecoin payment infrastructure to help businesses leverage these benefits.`,
    author: 'TerraPay Team',
    publishedAt: '2026-01-15',
    tags: ['stablecoins', 'payments', 'blockchain', 'cross-border'],
    category: 'Education',
    readingTime: 5,
    language: 'en-US',
  },
  {
    id: '2',
    slug: 'ai-agent-economy-payment-infrastructure',
    title: 'Building Payment Infrastructure for the AI Agent Economy',
    description: 'Explore how Agentic Pay is creating the payment layer for autonomous AI agents to transact seamlessly in the digital economy.',
    content: `# Building Payment Infrastructure for the AI Agent Economy

The rise of AI agents is creating a new digital economy where autonomous systems need to transact with each other without human intervention. This requires a fundamentally different payment infrastructure.

## The Challenge

Traditional payment systems are designed for humans:
- Manual approval processes
- Batch settlement cycles
- High minimum transaction amounts
- Complex integration requirements

AI agents need:
- Instant, programmable payments
- Micro-transaction support
- Machine-readable pricing
- Autonomous execution

## Agentic Pay Solution

Agentic Pay provides the payment infrastructure specifically designed for AI agents:

### KYA (Know Your Agent)
Identity verification and reputation system for AI agents, ensuring trust in autonomous transactions.

### Instant Settlement
Real-time stablecoin payments with blockchain confirmation, enabling immediate value transfer.

### Atomic Ledgers
Guaranteed transaction atomicity ensuring all-or-nothing execution for complex multi-party settlements.

### Pay-as-you-go Pricing
Micro-transaction support with usage-based billing, perfect for AI API calls and agent services.

## Use Cases

1. **AI-to-AI Commerce**: Agents buying and selling services autonomously
2. **Agent Workforce Payments**: Compensating AI agents for completed tasks
3. **API Usage Billing**: Automatic billing for AI API calls
4. **Cross-border AI Services**: Global AI services with instant payments

Join the waitlist to be among the first to access Agentic Pay when we launch in Q2 2026.`,
    author: 'TerraPay Team',
    publishedAt: '2026-01-20',
    tags: ['AI', 'agents', 'payments', 'automation', 'agentic-pay'],
    category: 'Product',
    readingTime: 7,
    language: 'en-US',
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
