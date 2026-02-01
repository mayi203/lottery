# 双色球历史开奖数据查询工具

一个基于 Next.js 的双色球彩票号码查询应用，帮助用户快速检索所选号码组合在历史上的中奖记录。

## 功能特性

- **号码选择器** - 可视化选择 6 个红球（1-33）和 1 个蓝球（1-16）
- **历史查询** - 实时查询数据库，检索所选号码在 2013 年至今的开奖记录
- **最新开奖** - 首页展示最新一期双色球开奖结果
- **响应式设计** - 适配桌面端和移动端设备
- **SEO 优化** - 包含结构化数据、Open Graph 和 Twitter Card 标签

## 技术栈

- **框架**: Next.js 15 (App Router)
- **运行时**: React 19
- **语言**: TypeScript 5
- **样式**: Tailwind CSS 4
- **数据库**: PostgreSQL
- **包管理**: pnpm
- **构建**: Turbopack

## 项目结构

```
├── app/
│   ├── lib/
│   │   ├── actions.ts      # Server Actions - 查询数据库
│   │   ├── data.ts         # 数据获取函数
│   │   └── definitions.ts  # TypeScript 类型定义
│   ├── ui/
│   │   ├── ball.tsx        # 号码球组件
│   │   ├── picker.tsx      # 号码选择器组件
│   │   ├── lottery-draw.tsx # 开奖结果展示组件
│   │   └── skeletons.tsx   # 骨架屏组件
│   ├── page.tsx            # 首页
│   ├── layout.tsx          # 根布局
│   ├── globals.css         # 全局样式
│   ├── robots.ts           # SEO: robots.txt
│   └── sitemap.ts          # SEO: sitemap.xml
├── public/                 # 静态资源
├── .env                    # 环境变量
├── next.config.ts          # Next.js 配置
├── package.json            # 项目依赖
└── tsconfig.json           # TypeScript 配置
```

## 快速开始

### 环境要求

- Node.js 18+
- PostgreSQL 数据库

### 安装依赖

```bash
pnpm install
```

### 环境变量配置

创建 `.env` 文件并配置以下变量：

```env
POSTGRES_URL=postgresql://user:password@host:port/database
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 数据库准备

确保 PostgreSQL 数据库中存在 `double_color_ball` 表，包含以下字段：

```sql
CREATE TABLE double_color_ball (
    code VARCHAR(20) PRIMARY KEY,      -- 期号
    date DATE NOT NULL,                -- 开奖日期
    week VARCHAR(10),                  -- 星期
    red VARCHAR(20) NOT NULL,          -- 红球号码（逗号分隔，如"03,12,15,20,25,33"）
    blue VARCHAR(5) NOT NULL,          -- 蓝球号码
    sales BIGINT,                      -- 销售额
    poolmoney BIGINT,                  -- 奖池金额
    content TEXT,                      -- 开奖详情
    prizegrades JSON                   -- 各奖项中奖情况
);
```

### 开发模式

```bash
pnpm dev
```

访问 http://localhost:3000

### 生产构建

```bash
pnpm build
pnpm start
```

## 部署

本项目针对 Vercel 部署进行了优化：

1. 在 Vercel 上创建新项目
2. 添加 PostgreSQL 数据库集成（或使用外部数据库）
3. 配置环境变量 `POSTGRES_URL` 和 `NEXT_PUBLIC_SITE_URL`
4. 部署

## 许可证

MIT License

## 免责声明

本工具仅供娱乐和学习使用，不构成任何投注建议。请理性购彩，量力而行。
