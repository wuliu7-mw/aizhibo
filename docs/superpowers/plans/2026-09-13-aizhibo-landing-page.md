# 爱智播宣传单页 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为「爱智播」直播语音助手构建产品官网宣传单页（Vite 静态站），push main 后 GitHub Actions 自动部署到 GitHub Pages。

**Architecture:** Vite vanilla 静态站（无框架）：`index.html` 承载 8 区块语义结构，`src/style.css` 为完整设计系统（暮色渐变 + 玻璃拟态），`src/main.js` 只做滚动渐入与年份注入。CI 用官方 Pages action 四步部署，`base: '/aizhibo/'` 适配子路径。

**Tech Stack:** Vite 7（Node ≥ 20.19 / ≥ 22.12，本机 v22.21.1 ✓）、原生 HTML/CSS/JS、Google Fonts Outfit（仅拉丁子集）、GitHub Actions Pages。

**规格文档:** `docs/superpowers/specs/2026-09-13-aizhibo-landing-page-design.md`

**测试策略说明:** 纯静态宣传页不引入单元测试框架（YAGNI）。每个任务的验证 = `npm run build` 零报错 + `npm run dev`/`preview` 目视 + DevTools 视口检查（Task 7 集中做）。

---

## 文件结构

```
aizhibo/
├── .github/workflows/deploy.yml   # CI：push main → build → Pages（Task 8）
├── .gitignore                     # 已有，补 node_modules/dist（Task 1）
├── index.html                     # 单页全部 8 区块语义结构（Task 1 最小版 → Task 2 完整版）
├── vite.config.js                 # base '/aizhibo/'（Task 1）
├── package.json                   # vite 唯一依赖（Task 1）
├── public/
│   └── favicon.svg                # 渐变声波标记（Task 2）
├── src/
│   ├── style.css                  # 设计系统，按区块分任务追加（Task 2-6）
│   └── main.js                    # 滚动渐入 + 年份（Task 6）
└── README.md                      # 项目/部署/占位替换说明（Task 8）
```

CSS 类名契约（各任务共用，后任务引用前任务定义的类名不可改名）：
Token（`:root`）→ 布局（`.container .section .grid .label .section-title .reveal`）→ 组件（`.nav-* .btn-* .hero-* .grad .phone-* .bubble .waves .card .trust-list .dl-* .contact-* .footer`）。

---

### Task 1: Vite 脚手架与构建链路

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`（最小占位，Task 2 替换为完整版）
- Modify: `.gitignore`（追加 node_modules/dist）

- [ ] **Step 1: 写入 package.json**

```json
{
  "name": "aizhibo-landing",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^7.1.7"
  }
}
```

- [ ] **Step 2: 写入 vite.config.js**

```js
import { defineConfig } from 'vite'

// 部署在 https://wuliu7-mw.github.io/aizhibo/ 子路径下，base 必须与仓库名一致
export default defineConfig({
  base: '/aizhibo/',
})
```

- [ ] **Step 3: 写入最小 index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>爱智播 · 会说话的直播间</title>
  <script type="module" src="/src/main.js"></script>
</head>
<body>
  <main class="container">
    <h1>爱智播</h1>
    <p>脚手架占位页 —— Task 2 替换为完整内容</p>
  </main>
</body>
</html>
```

- [ ] **Step 4: 追加 .gitignore**

在现有 `.gitignore` 末尾追加（保留已有内容）：

```gitignore

# Node / Vite
node_modules/
dist/
```

- [ ] **Step 5: 安装依赖**

Run: `npm install`
Expected: 无 error（warning 可忽略），生成 `package-lock.json` 与 `node_modules/`

- [ ] **Step 6: 构建验证**

Run: `npm run build`
Expected: `✓ built in <n>s`，输出 `dist/index.html`；`dist/` 内资源路径均含 `/aizhibo/` 前缀（打开 `dist/index.html` 检查 script 标签）

- [ ] **Step 7: 提交**

```bash
git add package.json package-lock.json vite.config.js index.html .gitignore
git commit -m "chore: Vite 脚手架，base=/aizhibo/ 适配 Pages 子路径"
```

---

### Task 2: 页面语义骨架 + 设计系统基座

**Files:**
- Modify: `index.html`（替换为完整 8 区块 + 真实文案）
- Create: `public/favicon.svg`
- Create: `src/style.css`（本任务只写：tokens / reset / 背景氛围 / 布局基座 / 标题排版 / 网格）
- Modify: `src/main.js`（临时最小版，仅引入 CSS，Task 6 扩展）

- [ ] **Step 1: 写入完整 index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>爱智播 · 会说话的直播间</title>
  <meta name="description" content="爱智播——AI 直播语音助手。文案轮播、评论秒答、弹幕欢迎、自动报时，AI 替你说话，主播只管安心出镜。" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap" rel="stylesheet" />
  <script type="module" src="/src/main.js"></script>
</head>
<body>

  <!-- ① 导航 -->
  <header class="nav">
    <div class="container nav-inner">
      <a class="logo" href="#top" aria-label="爱智播首页">
        <svg class="logo-mark" viewBox="0 0 64 64" aria-hidden="true">
          <defs>
            <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#0F766E" /><stop offset="1" stop-color="#E8735A" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="14" fill="url(#lg)" />
          <g fill="#F4F9F7">
            <rect x="16" y="26" width="5" height="12" rx="2.5" />
            <rect x="25" y="18" width="5" height="28" rx="2.5" />
            <rect x="34" y="24" width="5" height="16" rx="2.5" />
            <rect x="43" y="29" width="5" height="6" rx="2.5" />
          </g>
        </svg>
        <span class="logo-name">爱智播</span>
        <span class="logo-en">AIZHIBO</span>
      </a>
      <nav class="nav-links" aria-label="页面导航">
        <a href="#features">功能</a>
        <a href="#scenes">场景</a>
      </nav>
      <a class="btn btn-primary btn-sm" href="#download">下载 App</a>
    </div>
  </header>

  <main id="top">

    <!-- ② Hero -->
    <section class="hero">
      <div class="waves" aria-hidden="true">
        <svg class="wave wave-1" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,64 C240,96 480,32 720,64 C960,96 1200,32 1440,64 L1440,120 L0,120 Z" />
        </svg>
        <svg class="wave wave-2" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,64 C240,96 480,32 720,64 C960,96 1200,32 1440,64 L1440,120 L0,120 Z" />
        </svg>
      </div>
      <div class="container hero-inner">
        <div class="hero-copy">
          <p class="eyebrow fx fx-1">AI 直播语音助手</p>
          <h1 class="fx fx-2">会说话的直播间，<br /><span class="grad">从此热气腾腾</span></h1>
          <p class="hero-sub fx fx-3">AI 替你欢迎观众、回答评论、报时促单，主播只管安心出镜。</p>
          <div class="hero-cta fx fx-4">
            <a class="btn btn-primary" href="#download">下载 Android 版</a>
            <a class="btn btn-ghost" href="#download">鸿蒙版 · 开发中</a>
          </div>
          <p class="hero-note fx fx-4">支持 Android 7.0 及以上 · 鸿蒙版开发中</p>
        </div>
        <div class="hero-visual fx fx-4">
          <div class="phone" role="img" aria-label="爱智播 App 播报演示：欢迎观众、回答评论、整点报时">
            <div class="phone-notch"></div>
            <div class="phone-screen">
              <div class="phone-title">正在直播 · 场次 0913-02</div>
              <div class="bubble b1">🎤 欢迎新朋友「小鹿」来到直播间～</div>
              <div class="bubble b2">💬 “多少钱？” → 现在下单立减 20 哦！</div>
              <div class="bubble b3">⏰ 现在是下午 3 点半，福利马上来！</div>
              <svg class="phone-wave" viewBox="0 0 120 28" aria-hidden="true">
                <rect x="4"   y="9"  width="4" height="10" rx="2" />
                <rect x="14"  y="5"  width="4" height="18" rx="2" />
                <rect x="24"  y="11" width="4" height="6"  rx="2" />
                <rect x="34"  y="3"  width="4" height="22" rx="2" />
                <rect x="44"  y="8"  width="4" height="12" rx="2" />
                <rect x="54"  y="13" width="4" height="2"  rx="1" />
                <rect x="64"  y="6"  width="4" height="16" rx="2" />
                <rect x="74"  y="10" width="4" height="8"  rx="2" />
                <rect x="84"  y="4"  width="4" height="20" rx="2" />
                <rect x="94"  y="12" width="4" height="4"  rx="2" />
                <rect x="104" y="7"  width="4" height="14" rx="2" />
                <rect x="114" y="11" width="4" height="6"  rx="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ③ 能力信任条 -->
    <section class="trustbar">
      <div class="container">
        <ul class="trust-list">
          <li>双引擎语音</li>
          <li>离线可用</li>
          <li>抖音 / 快手 / 小红书</li>
          <li>多账号隔离</li>
          <li>悬浮控制台</li>
        </ul>
      </div>
    </section>

    <!-- ④ 核心功能 -->
    <section class="section features" id="features">
      <div class="container">
        <p class="label reveal">核心功能</p>
        <h2 class="section-title reveal">一个助手，撑起整场直播</h2>
        <div class="grid grid-3">
          <article class="card feature reveal">
            <div class="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M17 2l4 4-4 4M21 6H8a5 5 0 0 0-5 5M7 22l-4-4 4-4M3 18h13a5 5 0 0 0 5-5" /></svg>
            </div>
            <h3>文案轮播</h3>
            <p>主文案配多条变体随机播报，支持暂停续播，话术永远不重样。</p>
          </article>
          <article class="card feature reveal">
            <div class="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-8 8H4l2.5-2.5A8 8 0 1 1 21 12z" /><path d="M9 11h6M9 14h4" /></svg>
            </div>
            <h3>评论秒答</h3>
            <p>自动读取直播间评论，关键词命中问答库，瞬间语音回复“多少钱”“怎么拍”。</p>
          </article>
          <article class="card feature reveal">
            <div class="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
            </div>
            <h3>弹幕欢迎 + 自动报时</h3>
            <p>定时随机模板欢迎新观众、播报时间，直播间永远有人气。</p>
          </article>
          <article class="card feature reveal">
            <div class="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /><path d="M19 16l.9 2.6L22.5 19.5l-2.6.9L19 23l-.9-2.6-2.6-.9 2.6-.9z" /></svg>
            </div>
            <h3>AI 话术润色</h3>
            <p>一键润色、扩写，批量生成多条变体，话术库自动保鲜。</p>
          </article>
          <article class="card feature reveal">
            <div class="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M4 10v4M8 6v12M12 3v18M16 8v8M20 10v4" /></svg>
            </div>
            <h3>双引擎语音</h3>
            <p>本机语音免费离线即开即用；增强引擎多音色，更像真人。</p>
          </article>
          <article class="card feature reveal">
            <div class="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><rect x="12" y="11" width="7" height="6" rx="1" /></svg>
            </div>
            <h3>悬浮控制台</h3>
            <p>悬浮窗实时显示直播时长，一键暂停、停止，随时人工接管。</p>
          </article>
        </div>
        <p class="features-more reveal">还有：多账号数据隔离 · TTS 本地缓存 · 场次化直播日志 · 音色远端下发与试听</p>
      </div>
    </section>

    <!-- ⑤ 使用场景 -->
    <section class="section scenes" id="scenes">
      <div class="container">
        <p class="label reveal">使用场景</p>
        <h2 class="section-title reveal">哪里有直播间，哪里用得上</h2>
        <div class="grid grid-3">
          <article class="card scene reveal">
            <div class="scene-emoji" aria-hidden="true">🛍️</div>
            <h3>电商带货</h3>
            <p>促单话术轮播不停，价格问题秒回，人流高峰也接得住。</p>
          </article>
          <article class="card scene reveal">
            <div class="scene-emoji" aria-hidden="true">🎤</div>
            <h3>才艺主播</h3>
            <p>唱歌跳舞时让 AI 替你欢迎观众、报时互动，专心表演不打断。</p>
          </article>
          <article class="card scene reveal">
            <div class="scene-emoji" aria-hidden="true">📊</div>
            <h3>团队运营</h3>
            <p>多账号数据隔离，文案问答统一管理，一键同步全部主播间。</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ⑥ 下载 -->
    <section class="section download" id="download">
      <div class="container">
        <p class="label reveal">获取爱智播</p>
        <h2 class="section-title reveal">现在，把话筒交给 AI</h2>
        <div class="dl-grid">
          <article class="card dl-card dl-android reveal">
            <div class="dl-head">
              <h3>Android APK</h3>
              <span class="badge">内测版</span>
            </div>
            <p>适用于 Android 7.0 及以上的大部分手机。</p>
            <!-- TODO: APK 链接占位 —— 上线后替换为真实下载地址（如 GitHub Releases） -->
            <a class="btn btn-primary dl-btn" href="#">下载 APK</a>
          </article>
          <article class="card dl-card dl-harmony reveal">
            <div class="dl-head">
              <h3>HarmonyOS</h3>
              <span class="badge badge-muted">开发中</span>
            </div>
            <p>鸿蒙原生版本正在打磨，敬请期待。</p>
            <span class="dl-disabled-btn" aria-disabled="true">鸿蒙版即将上线</span>
          </article>
        </div>
        <p class="dl-note reveal">※ 需配合爱智播管理端账号使用</p>
      </div>
    </section>

    <!-- ⑦ 联系方式 -->
    <section class="section contact" id="contact">
      <div class="container">
        <p class="label reveal">联系我们</p>
        <h2 class="section-title reveal">聊聊你的直播间</h2>
        <div class="contact-grid">
          <div class="card contact-item reveal">
            <h3>商务合作</h3>
            <p>试用、采购与团队版咨询：</p>
            <!-- TODO: 邮箱占位 —— 替换为真实邮箱 -->
            <a href="mailto:hello@aizhibo.example">hello@aizhibo.example</a>
          </div>
          <div class="card contact-item reveal">
            <h3>微信交流</h3>
            <!-- TODO: 二维码占位 —— 在 public/ 放入真实二维码图后替换此占位框 -->
            <div class="qr-placeholder">微信二维码<br />占位</div>
            <p class="qr-tip">扫码添加，备注「爱智播」</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- ⑧ 页脚 -->
  <footer class="footer">
    <div class="container">
      <p>© <span id="year">2026</span> 爱智播 · 让直播间会说话</p>
    </div>
  </footer>
</body>
</html>
```

- [ ] **Step 2: 写入 public/favicon.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0F766E"/><stop offset="1" stop-color="#E8735A"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="url(#g)"/>
  <g fill="#F4F9F7">
    <rect x="16" y="26" width="5" height="12" rx="2.5"/>
    <rect x="25" y="18" width="5" height="28" rx="2.5"/>
    <rect x="34" y="24" width="5" height="16" rx="2.5"/>
    <rect x="43" y="29" width="5" height="6" rx="2.5"/>
  </g>
</svg>
```

- [ ] **Step 3: 写入 src/style.css（基座部分）**

```css
/* ============================================================
   爱智播 · 设计系统
   Task 2: tokens / reset / 背景氛围 / 布局基座 / 标题排版 / 网格
   ============================================================ */

/* ---- tokens ---- */
:root {
  --bg-deep: #0b2b2e;
  --bg-mid: #10403c;
  --coral: #e8735a;
  --coral-light: #ff9a76;
  --teal: #0f766e;
  --sand: #ffd9a0;
  --text-1: #f4f9f7;
  --text-2: rgba(244, 249, 247, 0.65);
  --glass-bg: rgba(255, 255, 255, 0.08);
  --glass-bg-strong: rgba(255, 255, 255, 0.12);
  --glass-border: rgba(255, 255, 255, 0.18);
  --radius-l: 20px;
  --radius-m: 14px;
  --font-cn: "PingFang SC", "HarmonyOS Sans SC", "Source Han Sans SC",
    "Microsoft YaHei", sans-serif;
  --font-en: "Outfit", var(--font-cn);
}

/* ---- reset / base ---- */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-cn);
  color: var(--text-1);
  line-height: 1.7;
  background:
    radial-gradient(90% 60% at 85% -5%, rgba(232, 115, 90, 0.28), transparent 60%),
    radial-gradient(70% 55% at -10% 30%, rgba(15, 118, 110, 0.4), transparent 60%),
    radial-gradient(80% 60% at 70% 105%, rgba(232, 115, 90, 0.16), transparent 55%),
    linear-gradient(165deg, var(--bg-deep) 0%, var(--bg-mid) 100%);
  background-attachment: fixed;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* 噪点纹理：增加暮色氛围 */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E");
}

main {
  position: relative;
  z-index: 1;
}

img,
svg {
  display: block;
  max-width: 100%;
}

a {
  color: inherit;
  text-decoration: none;
}

::selection {
  background: rgba(232, 115, 90, 0.45);
  color: #fff;
}

/* 吸顶导航下的锚点偏移 */
section[id] {
  scroll-margin-top: 84px;
}

/* ---- 布局基座 ---- */
.container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
}

.section {
  padding: 88px 0;
}

.label {
  font-family: var(--font-en);
  font-size: 13px;
  letter-spacing: 0.35em;
  color: var(--coral-light);
  margin-bottom: 10px;
}

.section-title {
  font-size: clamp(26px, 3.6vw, 38px);
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 40px;
}

/* 网格：<720 单列 / 720-1080 两列 / >1080 三列（规格 §7） */
.grid {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
}

@media (min-width: 720px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1080px) {
  .grid-3 {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 719px) {
  .section {
    padding: 64px 0;
  }
}
```

- [ ] **Step 4: 写入 src/main.js（最小版）**

```js
import './style.css'
```

- [ ] **Step 5: 构建验证**

Run: `npm run build`
Expected: 成功，无报错

Run: `npm run dev`（保持运行），浏览器打开 `http://localhost:5173/aizhibo/`（注意带 base 路径）
Expected: 看到 8 个区块的无样式感骨架（此阶段多数区块尚未美化，正常）、favicon 生效、页面背景已是暮色渐变 + 噪点

- [ ] **Step 6: 提交**

```bash
git add index.html public/favicon.svg src/style.css src/main.js
git commit -m "feat: 单页语义骨架（8 区块）+ 设计系统基座与暮色背景"
```

---

### Task 3: 导航 + Hero 首屏（手机 mockup / 气泡 / 声波）

**Files:**
- Modify: `src/style.css`（在文件末尾追加本任务代码块）

- [ ] **Step 1: 在 style.css 末尾追加导航与按钮样式**

```css
/* ============================================================
   Task 3: 导航 / 按钮 / Hero / 手机 mockup / 气泡 / 声波
   ============================================================ */

/* ---- 导航 ---- */
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background: rgba(11, 43, 46, 0.55);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.nav-inner {
  display: flex;
  align-items: center;
  gap: 28px;
  height: 64px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: auto;
}

.logo-mark {
  width: 30px;
  height: 30px;
  border-radius: 8px;
}

.logo-name {
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.04em;
}

.logo-en {
  font-family: var(--font-en);
  font-size: 11px;
  letter-spacing: 0.28em;
  color: var(--text-2);
  transform: translateY(2px);
}

.nav-links {
  display: flex;
  gap: 28px;
}

.nav-links a {
  padding: 10px 2px;
  font-size: 15px;
  color: var(--text-2);
  transition: color 0.2s;
}

.nav-links a:hover {
  color: var(--text-1);
}

/* ---- 按钮 ---- */
.btn {
  display: inline-block;
  padding: 14px 32px;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.3;
  transition: transform 0.25s, box-shadow 0.25s, background 0.25s;
}

.btn-primary {
  background: linear-gradient(90deg, var(--coral-light), var(--coral));
  color: #fff;
  box-shadow: 0 8px 24px rgba(232, 115, 90, 0.35);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(232, 115, 90, 0.45);
}

.btn-ghost {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  color: var(--text-1);
}

.btn-ghost:hover {
  background: var(--glass-bg-strong);
  transform: translateY(-2px);
}

.btn-sm {
  padding: 9px 22px;
  font-size: 14px;
}

/* ---- Hero ---- */
.hero {
  position: relative;
  overflow: hidden;
  padding: 96px 0 140px;
}

.hero-inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 48px;
  align-items: center;
}

.eyebrow {
  font-size: 14px;
  letter-spacing: 0.35em;
  color: var(--coral-light);
  margin-bottom: 18px;
}

.hero h1 {
  font-size: clamp(34px, 5.2vw, 58px);
  font-weight: 800;
  line-height: 1.18;
  margin-bottom: 22px;
}

/* 标题点睛字：暖杏→珊瑚文字渐变 */
.grad {
  background: linear-gradient(90deg, var(--sand), var(--coral-light));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-sub {
  font-size: clamp(16px, 1.6vw, 19px);
  color: var(--text-2);
  max-width: 34em;
  margin-bottom: 34px;
}

.hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 16px;
}

.hero-note {
  font-size: 13px;
  color: var(--text-2);
}

/* ---- 声波（Hero 底部氛围）---- */
.waves {
  position: absolute;
  inset: auto 0 0 0;
  height: 110px;
  pointer-events: none;
}

.wave {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 200%;
  height: 110px;
}

.wave-1 {
  fill: rgba(255, 255, 255, 0.07);
  animation: wave-slide 16s linear infinite;
}

.wave-2 {
  fill: rgba(232, 115, 90, 0.18);
  animation: wave-slide 22s linear infinite reverse;
}

@keyframes wave-slide {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

/* ---- 手机 mockup ---- */
.hero-visual {
  display: flex;
  justify-content: center;
}

.phone {
  position: relative;
  width: 272px;
  aspect-ratio: 9 / 19;
  border-radius: 36px;
  border: 1px solid var(--glass-border);
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.04));
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 32px 64px rgba(0, 0, 0, 0.35);
  padding: 14px;
}

.phone-notch {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 84px;
  height: 20px;
  border-radius: 999px;
  background: rgba(11, 43, 46, 0.9);
}

.phone-screen {
  height: 100%;
  border-radius: 24px;
  background: rgba(11, 43, 46, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 44px 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
}

.phone-title {
  font-family: var(--font-en);
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--text-2);
  margin-bottom: 2px;
}

/* 播报气泡：三气泡轮播循环 */
.bubble {
  background: var(--glass-bg-strong);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 12px;
  padding: 9px 11px;
  font-size: 12.5px;
  line-height: 1.55;
  opacity: 0;
  animation: bubble-cycle 9s ease infinite;
}

.bubble.b2 { animation-delay: 3s; }
.bubble.b3 { animation-delay: 6s; }

@keyframes bubble-cycle {
  0% { opacity: 0; transform: translateY(10px); }
  6% { opacity: 1; transform: translateY(0); }
  30% { opacity: 1; }
  36% { opacity: 0; transform: translateY(-6px); }
  100% { opacity: 0; }
}

/* 屏内均衡器声波 */
.phone-wave {
  margin-top: auto;
  width: 100%;
}

.phone-wave rect {
  fill: var(--coral-light);
  transform-origin: center bottom;
  transform-box: fill-box;
  animation: eq 1.1s ease-in-out infinite alternate;
}

.phone-wave rect:nth-child(2n) { animation-delay: 0.15s; fill: var(--sand); }
.phone-wave rect:nth-child(3n) { animation-delay: 0.3s; }
.phone-wave rect:nth-child(4n) { animation-delay: 0.45s; }

@keyframes eq {
  from { transform: scaleY(0.35); }
  to { transform: scaleY(1); }
}

/* ---- 首屏加载编排：依次渐入 ---- */
.fx {
  opacity: 0;
  animation: rise 0.8s ease forwards;
}

.fx-1 { animation-delay: 0.05s; }
.fx-2 { animation-delay: 0.18s; }
.fx-3 { animation-delay: 0.32s; }
.fx-4 { animation-delay: 0.48s; }

@keyframes rise {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: none; }
}

/* ---- Hero 响应式（<720 单列堆叠）---- */
@media (max-width: 719px) {
  .nav-links {
    display: none;
  }

  .hero {
    padding: 64px 0 120px;
  }

  .hero-inner {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
  }

  .hero-sub {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-cta {
    justify-content: center;
  }
}
```

- [ ] **Step 2: 构建与目视验证**

Run: `npm run build` → Expected: 成功

浏览器（dev server）：检查桌面视口 —— 导航玻璃吸顶、标题渐变字、按钮 hover 上浮、手机内气泡轮播、底部声波流动；再开 DevTools 设备模式 375px —— 导航只剩 logo+按钮、hero 纵向居中。

- [ ] **Step 3: 提交**

```bash
git add src/style.css
git commit -m "feat: 导航与 Hero 首屏（手机 mockup、气泡轮播、流动声波、入场编排）"
```

---

### Task 4: 信任条 + 功能网格 + 场景卡

**Files:**
- Modify: `src/style.css`（末尾追加）

- [ ] **Step 1: 在 style.css 末尾追加**

```css
/* ============================================================
   Task 4: 信任条 / 玻璃卡片 / 功能 / 场景
   ============================================================ */

/* ---- 信任条 ---- */
.trustbar {
  padding: 26px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.trust-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px 36px;
  list-style: none;
  font-size: 14.5px;
  color: var(--text-2);
}

.trust-list li::before {
  content: "✦";
  color: var(--coral-light);
  margin-right: 9px;
  font-size: 12px;
}

/* ---- 玻璃卡片（功能/场景/下载/联系共用）---- */
.card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-l);
  padding: 28px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 154, 118, 0.45);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
}

.card h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
}

.card p {
  font-size: 14.5px;
  color: var(--text-2);
}

/* ---- 功能卡 ---- */
.feature .icon {
  width: 46px;
  height: 46px;
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(160deg, rgba(255, 154, 118, 0.22), rgba(15, 118, 110, 0.28));
  border: 1px solid rgba(255, 154, 118, 0.3);
  margin-bottom: 16px;
}

.feature .icon svg {
  width: 23px;
  height: 23px;
  fill: none;
  stroke: var(--coral-light);
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.features-more {
  margin-top: 30px;
  text-align: center;
  font-size: 14px;
  color: var(--text-2);
}

/* ---- 场景卡 ---- */
.scene-emoji {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  background: var(--glass-bg-strong);
  border: 1px solid var(--glass-border);
  margin-bottom: 16px;
}
```

- [ ] **Step 2: 构建与目视验证**

Run: `npm run build` → Expected: 成功

浏览器：信任条居中分行正常；功能卡 hover 上浮 + 珊瑚描边微光；图标线性描边显示正常（无 fill 塌陷）；375px 下卡片单列。

- [ ] **Step 3: 提交**

```bash
git add src/style.css
git commit -m "feat: 能力信任条、玻璃功能网格与使用场景卡"
```

---

### Task 5: 下载区 + 联系方式 + 页脚

**Files:**
- Modify: `src/style.css`（末尾追加）

- [ ] **Step 1: 在 style.css 末尾追加**

```css
/* ============================================================
   Task 5: 下载区 / 联系方式 / 页脚
   ============================================================ */

/* ---- 下载区 ---- */
.dl-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  max-width: 760px;
}

.dl-card .dl-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.badge {
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 999px;
  color: var(--sand);
  background: rgba(255, 154, 118, 0.18);
  border: 1px solid rgba(255, 154, 118, 0.4);
}

.badge-muted {
  color: var(--text-2);
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--glass-border);
}

.dl-card p {
  margin-bottom: 22px;
}

.dl-android {
  border-color: rgba(255, 154, 118, 0.5);
  background: linear-gradient(160deg, rgba(255, 154, 118, 0.14), rgba(255, 255, 255, 0.05));
}

/* 鸿蒙：置灰不可点（规格 §4-⑥） */
.dl-harmony {
  opacity: 0.62;
}

.dl-disabled-btn {
  display: inline-block;
  padding: 12px 26px;
  border-radius: 999px;
  border: 1px dashed var(--glass-border);
  color: var(--text-2);
  font-size: 14px;
  cursor: not-allowed;
}

.dl-note {
  margin-top: 26px;
  font-size: 13px;
  color: var(--text-2);
}

/* ---- 联系方式 ---- */
.contact-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  max-width: 760px;
}

.contact-item a {
  color: var(--sand);
  text-decoration: underline;
  text-underline-offset: 4px;
  word-break: break-all;
}

.qr-placeholder {
  width: 132px;
  height: 132px;
  border: 1.5px dashed var(--glass-border);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 12px;
  color: var(--text-2);
  margin: 14px 0 10px;
}

.qr-tip {
  font-size: 12.5px;
}

/* ---- 页脚 ---- */
.footer {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 36px 0 44px;
  text-align: center;
  font-size: 14px;
  color: var(--text-2);
}
```

- [ ] **Step 2: 构建与目视验证**

Run: `npm run build` → Expected: 成功

浏览器：Android 卡片珊瑚高亮、鸿蒙卡片置灰虚线按钮；邮箱链接下划线；二维码虚线占位框；375px 下 dl/contact 网格自动单列（auto-fit 生效）。

- [ ] **Step 3: 提交**

```bash
git add src/style.css
git commit -m "feat: 下载区（Android 内测 + 鸿蒙开发中）、联系方式与页脚"
```

---

### Task 6: 交互动效（滚动渐入）+ 无障碍降级

**Files:**
- Modify: `src/main.js`
- Modify: `src/style.css`（末尾追加）

- [ ] **Step 1: 替换 src/main.js 全部内容**

```js
import './style.css'

// ---- 页脚年份自动更新 ----
document.getElementById('year').textContent = new Date().getFullYear()

// ---- 滚动渐入：进入视口后一次性显示，不回退 ----
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const revealEls = document.querySelectorAll('.reveal')

if (prefersReduced) {
  // 减少动态效果：直接全部可见
  revealEls.forEach((el) => el.classList.add('is-visible'))
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.15 }
  )
  revealEls.forEach((el) => io.observe(el))
}
```

- [ ] **Step 2: 在 style.css 末尾追加**

```css
/* ============================================================
   Task 6: 滚动渐入 + 减少动态效果降级
   ============================================================ */

.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: none;
}

/* 无障碍：用户偏好减少动态效果时，关闭全部动画（规格 §6） */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .fx,
  .reveal,
  .bubble {
    opacity: 1 !important;
    transform: none !important;
  }

  .waves {
    display: none;
  }
}
```

- [ ] **Step 3: 验证**

Run: `npm run build` → Expected: 成功

浏览器验证 A：滚动页面 —— 各区块元素进入视口时渐入上浮，回滚不消失。
浏览器验证 B：DevTools → Rendering → Emulate CSS media `prefers-reduced-motion: reduce` → 刷新 —— 所有内容直接可见、声波隐藏、无动画。

- [ ] **Step 4: 提交**

```bash
git add src/main.js src/style.css
git commit -m "feat: IntersectionObserver 滚动渐入与 prefers-reduced-motion 降级"
```

---

### Task 7: 双端响应式与视觉终检（chrome-devtools 实测）

**Files:**
- Modify: `src/style.css`（仅当实测发现问题时修补）

- [ ] **Step 1: 构建并本地预览**

Run: `npm run build && npm run preview`
Expected: 输出本地预览地址（默认 `http://localhost:4173/aizhibo/`）

- [ ] **Step 2: 桌面视口实测（1440×900）**

用 chrome-devtools MCP：`new_page` 打开预览地址 → `resize_page` 1440×900 → `take_screenshot`（整页）。
核对清单：
- [ ] hero 双栏、功能/场景 3 列、声波贴底流动
- [ ] 标题渐变字、玻璃卡 hover 正常
- [ ] 正文对比度可读（次要文字不发灰成隐形）

- [ ] **Step 3: 手机视口实测（375×812）**

`resize_page` 375×812 → `take_screenshot`（整页）。
核对清单：
- [ ] 导航只剩 logo + 下载按钮，无横向滚动
- [ ] hero 单列居中、CTA 按钮并排放得下（放不下换行也可）、触控目标 ≥44px
- [ ] 手机 mockup 居中且完整可见；气泡动画正常
- [ ] 卡片单列、二维码/下载卡不溢出
- [ ] 无横向滚动条（`document.documentElement.scrollWidth <= 375`）

- [ ] **Step 4: 中间视口抽查（820×1180）**

核对：功能/场景两列、hero 保持双栏不挤压。

- [ ] **Step 5:（如发现问题）修补并复验**

修补规则：布局问题改对应选择器的 media query；溢出类问题优先 `min-width: 0` / `overflow-wrap`。修完重复 Step 2-4 截图确认。

- [ ] **Step 6: 提交（有修补时）**

```bash
git add src/style.css
git commit -m "fix: 双端视口实测后的响应式修补"
```

---

### Task 8: CI 流水线 + README

**Files:**
- Create: `.github/workflows/deploy.yml`
- Modify: `README.md`（替换现有单行内容）

- [ ] **Step 1: 写入 .github/workflows/deploy.yml**

```yaml
name: Deploy Pages

on:
  push:
    branches: [main]
    paths-ignore:
      - 'docs/**'
      - 'README.md'

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - run: npm ci

      - run: npm run build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: 替换 README.md 全部内容**

```markdown
# 爱智播 · 官网

「爱智播」AI 直播语音助手的产品宣传单页。线上地址：<https://wuliu7-mw.github.io/aizhibo/>

## 技术

- Vite 7 静态站（无框架），单页 `index.html` + `src/style.css` + `src/main.js`
- 部署在 GitHub Pages 子路径 `/aizhibo/`（`vite.config.js` 的 `base` 与仓库名一致）

## 本地开发

```bash
npm install
npm run dev      # http://localhost:5173/aizhibo/
npm run build    # 产物输出 dist/
npm run preview  # 本地预览构建产物
```

## 部署

push 到 `main` 即自动构建并部署（`.github/workflows/deploy.yml`，仅页面源文件变更时触发）。
首次使用需在仓库 **Settings → Pages → Source 选 "GitHub Actions"**（一次性手动设置）。

## 占位替换清单

| 占位 | 位置 |
|---|---|
| Android APK 下载链接 | `index.html` 中 `<!-- TODO: APK 链接占位 -->` 的 `href` |
| 商务邮箱 | `index.html` 中 `<!-- TODO: 邮箱占位 -->` |
| 微信二维码 | `public/` 放入图片后替换 `qr-placeholder` 占位框 |
| 鸿蒙版上线 | 将置灰卡片改为主按钮并加链接 |

## 相关仓库

Android 客户端与产品文档见 livetalking 项目（`android-volc-tts-assistant`）。
```

- [ ] **Step 3: 校验 workflow 语法**

Run: `node -e "const fs=require('fs'); const s=fs.readFileSync('.github/workflows/deploy.yml','utf8'); if(!s.includes('deploy-pages@v4')||!s.includes('upload-pages-artifact@v3')) process.exit(1); console.log('workflow ok')"`
Expected: `workflow ok`

- [ ] **Step 4: 提交**

```bash
git add .github/workflows/deploy.yml README.md
git commit -m "ci: GitHub Actions 自动部署 Pages；更新 README 与占位替换清单"
```

---

### Task 9: 最终验证与发布交接

**Files:** 无新文件（只验证）

- [ ] **Step 1: 干净构建**

Run: `rm -rf dist && npm run build`
Expected: 零 error 零 warning

- [ ] **Step 2: 子路径资源检查**

Run: `grep -o 'src="[^"]*"\|href="[^"]*"' dist/index.html | grep -v '^[DL]'`
Expected: 所有本地资源引用均为相对路径（`./assets/...`、`/aizhibo/` 或 `favicon.svg`），不含 `/src/` 绝对引用

- [ ] **Step 3: 桌面 + 手机最终截图**

`npm run preview` → chrome-devtools 分别 1440×900 与 375×812 整页截图各一张，与 Task 7 清单复核。

- [ ] **Step 4: 减少动效终检**

DevTools 模拟 `prefers-reduced-motion: reduce` → 刷新 → 内容直接可见、无动画。

- [ ] **Step 5: git 状态确认**

Run: `git status`
Expected: working tree clean（全部已提交）

- [ ] **Step 6: 向需求方交接两件事**

1. 执行 `git push origin main`（需求方确认后执行）。
2. 推送后到 GitHub 仓库 **Settings → Pages → Source 选 "GitHub Actions"**，然后手动重跑一次 Actions（或任意再 push 一次）触发首次部署；之后每次 push main 自动更新页面 `https://wuliu7-mw.github.io/aizhibo/`。

---

## 自审记录

- **规格覆盖**：§3 仓库结构→T1/2/8；§4 八区块→T2(骨架)+T3/4/5(样式)；§5 视觉→T2 tokens/T3-5；§6 动效与无障碍→T6 + T3 内 fx 编排；§7 断点→T2(.grid)/T3(nav,hero)/T5(auto-fit)；§8 占位→T2 HTML 含 TODO 注释 + T8 README 清单；§9 CI→T8（含 paths-ignore、concurrency、手动步骤）；§10 验证→T7/T9；§11 范围外未引入。无缺口。
- **占位符扫描**：代码块均为完整实现，无 TBD/省略；HTML 中 TODO 为交付物要求的占位标记，非计划缺口。
- **一致性**：类名契约（文件结构节）与各任务 CSS 选择器一一核对：`.reveal/.is-visible`(T2 html 标注, T6 定义)、`.fx-1..4`(T3)、`.dl-grid/.contact-grid` auto-fit 无需额外断点、`#year`(T6 JS ↔ T2 HTML)。Node 22 本机 v22.21.1 满足 Vite 7。
