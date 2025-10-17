# 🚀 GitHub Pages 部署指南

## 📋 部署前檢查清單

- [ ] 已安裝 Git
- [ ] 已安裝 Node.js 18+
- [ ] 有 GitHub 帳號
- [ ] 已創建 GitHub repository

## 🎯 完整部署步驟

### 步驟 1: 確認 Repository 名稱

1. 如果你的 GitHub repository 名稱**不是** `AWS-IVS`
2. 請修改 `next.config.js` 中的 `basePath`:

```javascript
basePath: '/你的repository名稱',
```

例如,如果 repository 是 `ivs-demo`:
```javascript
basePath: '/ivs-demo',
```

### 步驟 2: 推送代碼到 GitHub

在專案根目錄執行:

```bash
# 初始化 git (如果還沒有)
git init

# 添加所有檔案
git add .

# 提交變更
git commit -m "Initial commit: AWS IVS Real-time Streaming App"

# 連結到你的 GitHub repository
git remote add origin https://github.com/你的用戶名/AWS-IVS.git

# 確認主分支名稱為 main
git branch -M main

# 推送到 GitHub
git push -u origin main
```

### 步驟 3: 在 GitHub 啟用 Pages

1. 前往你的 GitHub repository
2. 點擊 **Settings** (設定)
3. 在左側選單找到 **Pages**
4. 在 **"Build and deployment"** 區塊:
   - **Source**: 選擇 `GitHub Actions`
5. 儲存設定

### 步驟 4: 觸發自動部署

推送代碼後,GitHub Actions 會自動開始建置:

1. 前往你的 repository
2. 點擊 **Actions** 標籤
3. 你會看到 "Deploy to GitHub Pages" workflow 正在執行
4. 等待約 1-2 分鐘直到部署完成 ✅

### 步驟 5: 訪問你的網站

部署完成後:
- 網址: `https://你的GitHub用戶名.github.io/AWS-IVS/`
- 也可以在 repository 的 **Settings > Pages** 看到網址

## 🔄 後續更新

每次推送新代碼到 `main` 分支,都會自動觸發重新部署:

```bash
git add .
git commit -m "更新描述"
git push origin main
```

## 🛠️ 手動部署 (備用方法)

如果自動部署有問題,可以手動部署:

```bash
# 1. 建置靜態檔案
npm run build

# 2. 創建 gh-pages 分支並部署
git add out/
git commit -m "Build for GitHub Pages"
git subtree push --prefix out origin gh-pages
```

然後在 GitHub Settings > Pages 中:
- **Source**: 選擇 `Deploy from a branch`
- **Branch**: 選擇 `gh-pages` 和 `/root`

## 🐛 常見部署問題

### 問題 1: 404 錯誤

**原因**: `basePath` 設定錯誤

**解決**:
1. 確認 `next.config.js` 的 `basePath` 與 repository 名稱一致
2. 重新建置並推送

### 問題 2: 頁面空白

**原因**: JavaScript 載入失敗

**解決**:
1. 檢查瀏覽器 Console 是否有錯誤
2. 確認 `basePath` 設定正確
3. 清除瀏覽器快取後重試

### 問題 3: Actions 執行失敗

**原因**: 權限設定問題

**解決**:
1. 前往 **Settings > Actions > General**
2. 在 **"Workflow permissions"** 選擇:
   - ✅ Read and write permissions
3. 儲存並重新執行 workflow

### 問題 4: 找不到 Pages 選項

**原因**: Repository 可能是私有的

**解決**:
- GitHub Pages 在免費帳號下只支援公開 repository
- 請將 repository 設為 Public

## 🎬 完整示範影片流程

1. **建立 AWS IVS Stage**
   ```
   AWS Console → Amazon IVS → Create Stage
   ```

2. **生成 Token**
   ```
   Stage → Create Participant Token
   Capabilities: ✅ Publish ✅ Subscribe
   ```

3. **測試應用**
   ```
   開啟網站 → 貼上 Token → 加入舞台
   ```

4. **多人測試**
   ```
   不同瀏覽器 → 不同 Token → 同一個 Stage
   ```

## 📊 部署狀態檢查

部署成功的標誌:
- ✅ GitHub Actions workflow 顯示綠色勾勾
- ✅ 可以正常訪問網站
- ✅ 可以選擇攝影機和麥克風
- ✅ 可以成功加入 Stage

## 💡 優化建議

1. **自訂網域** (選用):
   - 在 GitHub Settings > Pages 中設定 Custom domain
   - 需要配置 DNS CNAME 記錄

2. **效能優化**:
   - Next.js 已自動優化靜態資源
   - GitHub Pages CDN 提供全球加速

3. **監控**:
   - 使用瀏覽器 DevTools 檢查 Console
   - 查看 Network 標籤確認資源載入

## 🎉 部署成功!

恭喜!你的 AWS IVS Real-time Streaming 應用已成功部署到 GitHub Pages。

現在你可以:
- 分享網址給其他人測試
- 建立多個 Participant Token 進行多人視訊
- 繼續開發新功能

## 📞 需要幫助?

如果遇到問題:
1. 檢查 [常見問題](#-常見部署問題)
2. 查看 GitHub Actions 的執行日誌
3. 檢查瀏覽器 Console 的錯誤訊息
