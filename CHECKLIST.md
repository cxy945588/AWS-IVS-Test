# ✅ GitHub Pages 部署檢查清單

在推送到 GitHub 前,請確認以下項目:

## 📋 必要設定

- [ ] **修改 `next.config.js` 的 basePath**
  ```javascript
  basePath: '/你的repository名稱',
  ```
  ⚠️ 必須與 GitHub repository 名稱一致!

- [ ] **確認 Git 已初始化**
  ```bash
  git status  # 應該要能執行
  ```

- [ ] **確認已連結 GitHub remote**
  ```bash
  git remote -v
  # 應該顯示 origin 指向你的 GitHub repository
  ```

## 🚀 部署步驟檢查

- [ ] 本地測試通過 (`npm run dev`)
- [ ] 建置測試通過 (`npm run build`)
- [ ] 代碼已提交到 Git
- [ ] 代碼已推送到 GitHub
- [ ] GitHub Pages 已啟用 (Settings > Pages > Source: GitHub Actions)
- [ ] GitHub Actions workflow 已執行成功

## 🌐 部署後驗證

- [ ] 可以訪問網站: `https://你的用戶名.github.io/你的repo名稱/`
- [ ] 頁面正常顯示,沒有 404 錯誤
- [ ] 可以看到「選擇攝影機」和「選擇麥克風」選單
- [ ] Console 沒有 JavaScript 錯誤
- [ ] IVS SDK 腳本成功載入

## 🎬 功能測試

- [ ] 可以貼上 AWS IVS Participant Token
- [ ] 可以選擇攝影機和麥克風
- [ ] 點擊「加入舞台」可以成功連線
- [ ] 可以看到本地視訊畫面
- [ ] 靜音/取消靜音按鈕正常運作
- [ ] 隱藏/顯示鏡頭按鈕正常運作
- [ ] 多個瀏覽器可以看到彼此的視訊

## 🐛 問題排查

如果遇到問題,檢查:

### 404 錯誤
- [ ] `basePath` 是否正確
- [ ] GitHub Pages 是否已啟用
- [ ] 等待 1-2 分鐘讓 DNS 生效

### 頁面空白
- [ ] 開啟瀏覽器 Console 查看錯誤
- [ ] 確認 `basePath` 設定
- [ ] 檢查 GitHub Actions 建置日誌

### Actions 執行失敗
- [ ] Settings > Actions > General > Workflow permissions
- [ ] 選擇 "Read and write permissions"
- [ ] 重新執行 workflow

### 無法訪問攝影機/麥克風
- [ ] 網站是否使用 HTTPS (GitHub Pages 自動提供)
- [ ] 瀏覽器是否允許媒體權限
- [ ] 設備是否被其他應用程式佔用

## 📞 取得幫助

- 查看 [DEPLOY.md](DEPLOY.md) 詳細部署指南
- 查看 [QUICKSTART.md](QUICKSTART.md) 快速開始
- 查看 [README.md](README.md) 完整文檔
- 檢查 GitHub Actions 執行日誌
- 檢查瀏覽器 Console 錯誤訊息

## 🎉 全部通過?

恭喜!你的應用已成功部署到 GitHub Pages! 🚀

現在可以:
- 分享網址給朋友測試
- 建立多個 Token 進行多人視訊
- 繼續開發新功能

---

**記得**: 每次更新代碼後,只需 `git push` 就會自動重新部署!
