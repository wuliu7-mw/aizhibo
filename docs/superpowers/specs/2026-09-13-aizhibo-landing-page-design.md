# 爱智播 宣传单页 · 设计规格

日期：2026-09-13
状态：已与需求方逐节确认（受众/入口/视觉方向/技术方案/内容结构/视觉规范均获批准）

---

## 1. 背景与目标

「爱智播」是一款 Android 直播语音助手（源项目：`D:\gitee\livetalking\app\android-volc-tts-assistant`，Jetpack Compose + Kotlin，鸿蒙版开发中）。本仓库（`wuliu7-mw/aizhibo`）承载其**产品官网宣传单页**。

- **受众**：直播从业者 / 运营团队（非开发者），目的是展示产品价值并引导下载与联系。
- **成功标准**：push 到 main 后 GitHub Actions 自动部署更新 GitHub Pages；手机与桌面浏览体验均为一等公民。
- 页面地址：`https://wuliu7-mw.github.io/aizhibo/`（子路径部署，全站相对路径 + Vite `base` 配置）。

## 2. 已确认的关键决策

| 决策点 | 结论 |
|---|---|
| 视觉方向 | **C · 声波暮色「渐变流体」**：深青绿→珊瑚橙暮色渐变、玻璃拟态、圆润亲和 |
| 技术方案 | **Vite 静态站**（vanilla，无前端框架） |
| 部署 | push main → GitHub Actions → GitHub Pages（官方 `actions/deploy-pages`） |
| 行动入口 | ① Android APK 下载（占位链接）② 鸿蒙版下载卡（标注"开发中"）③ 联系方式（占位） |
| 响应式 | 手机 + 桌面双一等公民（硬性要求） |
| 图片素材 | 全部占位 / 纯 CSS 视觉，不依赖真实截图 |
| 页面语言 | 中文 |

## 3. 仓库结构

```
aizhibo/
├── .github/workflows/deploy.yml    # push main 自动部署
├── index.html                      # Vite 入口（单页全部区块）
├── vite.config.js                  # base: '/aizhibo/'
├── package.json                    # vite 为唯一 devDependency
├── src/
│   ├── style.css                   # 设计系统：色板/字体/组件/动效
│   └── main.js                     # 滚动渐入、气泡循环、导航交互
├── public/                         # favicon、占位二维码等
├── docs/superpowers/specs/         # 本规格
└── README.md                       # 项目说明 + 部署说明
```

## 4. 页面内容结构（8 区块，自上而下）

1. **导航栏**：玻璃拟态滚动吸顶。左：爱智播 logo（文字 + 声波小标记）；右：锚点「功能」「场景」+ [下载 App] 按钮。`<720px` 精简为 logo + 下载按钮（无汉堡菜单）。
2. **Hero 首屏**：主标题「会说话的直播间，从此热气腾腾」（"热气腾腾"用暖杏渐变高亮）；副标题「AI 替你欢迎观众、回答评论、报时促单，主播只管安心出镜」；CTA 两枚：[下载 Android 版]（主）+ [鸿蒙版 · 开发中]（次，锚点滚动到下载区，本身不可下载）；右侧纯 CSS 手机 mockup，播报气泡逐条浮现无限循环（🎤欢迎新观众 / 💬"多少钱？"→自动报价 / ⏰整点报时促单）；背景暮色渐变 + 两层错相流动声波。
3. **能力信任条**：一行词条——双引擎语音 · 离线可用 · 抖音/快手/小红书 · 多账号隔离 · 悬浮控制台。
4. **核心功能**（6 张玻璃卡片网格，桌面 3 列）：
   ① 文案轮播：主文案 + 多变体随机播报，断点续播；② 评论秒答：读评论→关键词命中→自动语音回答；③ 弹幕欢迎 + 自动报时：定时随机模板，直播间永远有人气；④ AI 话术润色：一键润色/扩写，批量生成变体；⑤ 双引擎语音：本机 TTS 免费离线 ⇄ 增强引擎多音色；⑥ 悬浮控制台：时长/暂停/停止，人工接管一键切换。
   底部一行小字带过其余：多账号数据隔离、TTS 本地缓存、场次化日志、音色远端下发与试听。
5. **使用场景**（3 张场景卡）：电商带货（促单话术 + 秒答价格）· 才艺主播（欢迎互动 + 报时）· 团队运营（多账号 + 统一管理）。
6. **下载区**：[Android APK 下载]（占位链接，标"内测版"）；[鸿蒙版 开发中 · 敬请期待]（置灰卡片，不可点）；小字提示「需配合爱智播管理端账号使用」。
7. **联系方式**：邮箱占位 + 微信二维码占位框（虚线框明确标"占位"）。
8. **页脚**：© 2026 爱智播 · 让直播间会说话。

**文案基调**：口语化、有烟火气，讲主播听得懂的价值；不堆技术词（Kotlin/Compose 等不上页面）。所有下载链接、二维码为占位，集中在显眼处便于后续一处替换（见 §8）。

## 5. 视觉规范

### 5.1 色板（CSS 自定义属性）

| Token | 值 | 用途 |
|---|---|---|
| `--bg-base` | `#0B2B2E → #10403C` 渐变 | 全页夜色基底 |
| `--glow-coral` | `#E8735A` | 氛围 radial 高光 |
| `--glow-teal` | `#0F766E` | 氛围 radial 高光 |
| `--accent` | `#FF9A76 → #E8735A` 渐变 | CTA、主强调 |
| `--highlight` | `#FFD9A0 → #FF9A76` 文字渐变 | 标题点睛字 |
| `--text-primary` | `#F4F9F7` | 主文字 |
| `--text-secondary` | `rgba(244,249,247,.65)` | 次文字 |
| 玻璃卡 | 填充 `rgba(255,255,255,.08)`、描边 `rgba(255,255,255,.18)` + `backdrop-filter: blur` | 卡片/导航 |

### 5.2 字体

- 中文：系统栈 `"PingFang SC", "HarmonyOS Sans SC", "Microsoft YaHei", sans-serif`——**不加载中文字体包**。
- 英文/数字点缀：Google Fonts **Outfit**（仅拉丁子集，几十 KB），用于 logo 英文、数字、小标签。
- 页面 `<html lang="zh-CN">`。

### 5.3 质感细节

- SVG 流动声波：两条波浪 path，CSS `translateX` 横移、错相、慢速常驻。
- 噪点纹理：SVG `feTurbulence` data-URI，低透明度叠加，增加暮色氛围。
- 玻璃卡 hover：上浮 2-4px + 边缘微光。
- 手机 mockup：纯 CSS 绘制（圆角矩形 + 刘海 + 屏幕内容），不依赖图片。

## 6. 动效与可访问性

- 首屏加载编排：标题 → 副标题 → CTA → 手机 mockup 依次渐入上浮（staggered `animation-delay`）。
- 滚动渐入：各区块 IntersectionObserver 触发 `.reveal`，一次性不回退。
- `prefers-reduced-motion: reduce`：关闭所有动画与过渡（声波整体隐藏以避免任何位移动画、元素直接可见）。
- 对比度：正文文字在基底色上满足 WCAG AA（≥4.5:1）；半透明文字不得低于 60% 不透明度。
- 语义化：单 `h1`（Hero）、区块用 `section` + `h2`；链接/按钮真实可聚焦；触控目标 ≥ 44×44px。

## 7. 响应式断点

| 范围 | 布局 |
|---|---|
| `<720px` | 单列；导航精简（logo + 下载按钮）；hero 纵向堆叠、mockup 居中缩小；功能/场景卡单列 |
| `720–1080px` | 过渡：hero 保持双栏、卡片两列 |
| `>1080px` | 双栏 hero、功能卡 3 列、场景卡 3 列 |

## 8. 占位清单（后续替换点，集中管理）

| 占位 | 位置 | 替换方式 |
|---|---|---|
| Android APK 下载链接 | Hero CTA + 下载区 | `index.html` 中标注 `<!-- TODO: APK 链接 -->` 的 `href` |
| 鸿蒙版链接 | 下载区卡片 | 当前不可点；上线后改为主按钮 |
| 邮箱 | 联系方式区 | 占位文本 `hello@aizhibo.example` |
| 微信二维码 | 联系方式区 | `public/` 下放图后替换 |
| favicon | `public/` | 临时用内联 SVG 声波标记 |

## 9. CI/CD 流水线

`.github/workflows/deploy.yml`：

```yaml
on: push 到 main（含页面源文件时；用 paths 过滤排除 docs 等纯文档改动）
步骤：actions/checkout@v4 → actions/setup-node@v4（Node 22，缓存 npm）
     → npm ci → npm run build → actions/upload-pages-artifact（dist）
     → actions/deploy-pages
权限：pages: write、id-token: write；并发部署组 concurrency 取消旧任务
```

**需求方一次性手动步骤**（推送后）：GitHub 仓库 → Settings → Pages → Source 选 **GitHub Actions**。

## 10. 验证方式

1. `npm run build` 零报错；`npm run vite preview` 本地预览正常。
2. DevTools 双视口（375×812 手机 / 1440×900 桌面）截图检查布局、字号、触控目标。
3. 构建产物在 `/aizhibo/` 子路径下资源全部 200（验证 `base` 生效，检查 index.html 内资源引用均为相对路径）。
4. 开启系统"减少动态效果"验证动画降级。
5. push 后确认 Actions 绿、Pages 地址可访问、手机实际打开一遍。

## 11. 范围外（明确不做）

- 不做多语言、不做暗/亮主题切换（页面本身即深色暮色风）。
- 不引入框架（React/Vue）、不引入 CSS 框架（Tailwind 等）。
- 不做博客/文档等多页面；单页即全部。
- 不放真实截图（等有素材后另行替换手机 mockup）。
