# 爱智播 · 官网

「爱智播」AI 直播语音助手的产品宣传单页。线上地址：<https://home.heheland.ccwu.cc/>

## 技术

- Vite 7 静态站（无框架），单页 `index.html` + `src/style.css` + `src/main.js`
- 自定义域名 `home.heheland.ccwu.cc` 根路径部署（`public/CNAME` + GitHub Pages 设置）

## 本地开发

```bash
npm install
npm run dev      # http://localhost:5173/aizhibo/
npm run build    # 产物输出 dist/
npm run preview  # 本地预览构建产物
```

## 部署

push 到 `main` 即自动构建并部署（`.github/workflows/deploy.yml`，仅页面源文件变更时触发；支持 Actions 页手动 Run workflow）。

自定义域名（一次性配置）：
1. Cloudflare DNS 添加：`CNAME` · `home` · `wuliu7-mw.github.io` · **仅 DNS（灰云）**
2. 仓库 **Settings → Pages → Custom domain** 填 `home.heheland.ccwu.cc` → Save
3. DNS 校验通过后勾选 **Enforce HTTPS**

## 占位替换清单

| 占位 | 位置 |
|---|---|
| Android APK 下载链接 | `index.html` 中 `<!-- TODO: APK 链接占位 -->` 的 `href` |
| 商务邮箱 | `index.html` 中 `<!-- TODO: 邮箱占位 -->` |
| 微信二维码 | `public/` 放入图片后替换 `qr-placeholder` 占位框 |
| 鸿蒙版上线 | 将置灰卡片改为主按钮并加链接 |

## 相关仓库

Android 客户端与产品文档见 livetalking 项目（`android-volc-tts-assistant`）。
