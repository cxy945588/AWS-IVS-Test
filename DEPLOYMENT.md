# 🚀 部署到 GitHub Pages

## 快速部署步驟

### 1️⃣ 建立 GitHub Repository

1. 登入 [GitHub](https://github.com/)
2. 點擊右上角的 **+** → **New repository**
3. 設定：
   - Repository name: `aws-ivs-test` (或任意名稱)
   - Public 或 Private (建議 Public)
   - 不要勾選 "Add a README file"
4. 點擊 **Create repository**

### 2️⃣ 上傳檔案

#### 方法 A: 使用 Git (推薦)

```bash
# 進入專案目錄
cd C:\Users\Cxy\Documents\MarbleLeague\AWS-IVS

# 初始化 Git
git init

# 添加所有檔案
git add .

# 提交
git commit -m "Initial commit: AWS IVS Real-Time Streaming"

# 連結遠端倉庫（替換成你的 GitHub 用戶名和倉庫名）
git remote add origin https://github.com/YOUR_USERNAME/aws-ivs-test.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

#### 方法 B: 使用 GitHub 網頁介面

1. 在 GitHub Repository 頁面點擊 **Add file** → **Upload files**
2. 將以下檔案拖曳上傳：
   - `index.html`
   - `broadcaster.html`
   - `viewer.html`
   - `README.md`
   - `CLI-COMMANDS.md`
   - `.gitignore`
3. 點擊 **Commit changes**

### 3️⃣ 啟用 GitHub Pages

1. 在 Repository 頁面，點擊 **Settings**
2. 左側選單選擇 **Pages**
3. 在 **Source** 部分：
   - Branch: 選擇 `main`
   - Folder: 選擇 `/ (root)`
4. 點擊 **Save**
5. 等待 1-2 分鐘，頁面會顯示你的網站 URL：
   ```
   https://YOUR_USERNAME.github.io/aws-ivs-test/
   ```

### 4️⃣ 測試網站

1. 訪問你的 GitHub Pages URL
2. 應該會看到首頁
3. 點擊「主播端」或「觀眾端」進行測試

## 📝 更新部署

當你修改檔案後，重新部署：

```bash
# 添加變更
git add .

# 提交
git commit -m "Update: 描述你的變更"

# 推送
git push
```

等待幾秒鐘，GitHub Pages 會自動更新。

## 🔗 自訂網域 (選填)

如果你有自己的網域：

1. 在 Repository Settings → Pages
2. 在 **Custom domain** 輸入你的網域
3. 點擊 **Save**
4. 在你的 DNS 設定中添加 CNAME 記錄：
   ```
   CNAME   www   YOUR_USERNAME.github.io
   ```

## ⚠️ 安全提醒

### ❌ 絕對不要在 GitHub 上傳的內容：

- AWS Access Keys
- AWS Secret Keys
- Stage Tokens
- 任何敏感資訊

### ✅ 正確做法：

本專案已經設計成「使用者手動輸入 Token」，所以：
- 不會在程式碼中硬編碼 Token
- Token 只在瀏覽器本地使用
- 不會被儲存或上傳

## 🎯 分享連結

部署完成後，你可以分享以下連結：

```
主頁：    https://YOUR_USERNAME.github.io/aws-ivs-test/
主播端：  https://YOUR_USERNAME.github.io/aws-ivs-test/broadcaster.html
觀眾端：  https://YOUR_USERNAME.github.io/aws-ivs-test/viewer.html
```

## 🐛 常見問題

### Q: 無法訪問 GitHub Pages 網址

**A:** 
- 確認 Pages 已啟用
- 等待 2-5 分鐘讓 GitHub 建置網站
- 檢查 Repository 是否為 Public
- 清除瀏覽器快取

### Q: 修改後沒有更新

**A:**
- 確認已正確 push 到 GitHub
- 在 Repository 的 Actions 標籤查看建置狀態
- 清除瀏覽器快取（Ctrl+Shift+R 強制重新載入）

### Q: 404 錯誤

**A:**
- 確認檔案名稱正確（區分大小寫）
- 確認檔案已上傳到正確位置
- URL 不要包含多餘的路徑

## 📊 監控部署狀態

1. 進入 Repository
2. 點擊 **Actions** 標籤
3. 可以看到每次部署的建置記錄
4. 綠色勾勾表示成功，紅色 X 表示失敗

## 🎉 完成！

現在你可以：
1. ✅ 在任何裝置訪問你的直播測試環境
2. ✅ 分享給團隊成員測試
3. ✅ 隨時更新程式碼
4. ✅ 完全免費使用 GitHub Pages

---

**需要幫助？** 參考 [GitHub Pages 官方文檔](https://docs.github.com/en/pages)
