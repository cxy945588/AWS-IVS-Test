# ⚡ 快速開始指南

## 🎯 5 分鐘部署到 GitHub Pages

### 1️⃣ 準備工作 (一次性設定)

```bash
# 1. 安裝依賴
npm install

# 2. 測試本地運行
npm run dev
# 開啟 http://localhost:3000 確認運作正常
```

### 2️⃣ 修改配置

編輯 `next.config.js`:
```javascript
basePath: '/你的repository名稱',  // ⚠️ 改成你的 repo 名稱!
```

### 3️⃣ 部署到 GitHub

**選項 A: 使用腳本 (推薦 - Windows)**
```bash
# 雙擊運行
deploy.bat
```

**選項 B: 手動命令**
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

### 4️⃣ 啟用 GitHub Pages

1. 前往 GitHub repository 的 **Settings**
2. 點擊左側 **Pages**
3. Source 選擇: **GitHub Actions**
4. 儲存

### 5️⃣ 等待部署完成

- 前往 **Actions** 標籤查看進度
- 約 1-2 分鐘後完成
- 訪問: `https://你的用戶名.github.io/AWS-IVS/`

## 🎬 使用你的應用

### 在 AWS 創建 Stage

```bash
AWS Console 
→ Amazon IVS 
→ Real-time streaming 
→ Create Stage
```

### 生成 Token

```bash
進入 Stage 
→ Create Participant Token
→ 勾選 Publish + Subscribe
→ 複製 Token
```

### 開始串流

1. 開啟你的網站
2. 貼上 Token
3. 選擇攝影機和麥克風
4. 點擊「加入舞台」

## 🎉 完成!

多開幾個瀏覽器測試多人視訊吧!

---

**需要詳細說明?** 查看 [完整部署指南](DEPLOY.md)
