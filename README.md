# AWS IVS Real-Time Streaming 測試應用

這是一個使用 **Amazon IVS Web Broadcast SDK** 實現的即時多人視訊串流測試應用程式。

## 🌐 線上 Demo

部署在 GitHub Pages: `https://你的GitHub用戶名.github.io/AWS-IVS/`

## 🚀 功能特點

- ✅ 低延遲串流 (< 300ms)
- ✅ 多人視訊互動
- ✅ 即時音視頻控制
- ✅ 設備切換支援
- ✅ 繁體中文界面

## 📋 前置需求

- Node.js 18.x 或更高版本
- npm 或 yarn
- AWS 帳號(用於創建 IVS Stage)

## 🛠️ 本地開發

1. 安裝依賴套件:
```bash
npm install
```

2. 啟動開發伺服器:
```bash
npm run dev
```

3. 在瀏覽器中打開 [http://localhost:3000](http://localhost:3000)

## 🚢 部署到 GitHub Pages

### 方法一: 自動部署 (推薦)

這個專案已配置 GitHub Actions 自動部署。只需:

1. **推送代碼到 GitHub**:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **在 GitHub 啟用 Pages**:
   - 前往你的 repository 設定
   - 點擊左側 **"Pages"**
   - 在 **"Build and deployment"** 下:
     - Source: 選擇 **"GitHub Actions"**
   - 等待部署完成 (約 1-2 分鐘)

3. **訪問你的網站**:
   - `https://你的GitHub用戶名.github.io/AWS-IVS/`

### 方法二: 手動部署

```bash
# 建置靜態檔案
npm run build

# 部署到 GitHub Pages
# 確保 gh-pages 分支已創建
git add out/
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix out origin gh-pages
```

### 重要設定

在部署前,請確認 `next.config.js` 中的 `basePath`:

```javascript
basePath: '/AWS-IVS', // 改成你的 repository 名稱
```

如果你的 repository 名稱不是 `AWS-IVS`,請修改這個值。

## 📝 使用說明

### 1. 在 AWS Console 創建 Stage

1. 登入 AWS Console
2. 前往 **Amazon IVS** > **Real-time streaming** > **Stages**
3. 點擊右上角的 **"Create stage"**
4. 輸入 Stage 名稱(可選)
5. 點擊 **"Create stage"**

### 2. 生成 Participant Token

1. 進入剛創建的 Stage
2. 找到 **"Participant tokens"** 區塊
3. 點擊 **"Create a participant token"**
4. 填寫以下資訊:
   - **UserId**: 任意 UTF-8 文字(最多 128 字元)
   - **Capabilities**: 同時選擇 **publish** 和 **subscribe**
   - **Token duration**: 預設 720 分鐘(可自訂)
   - **Attributes** (可選): 
     - Key: `username`
     - Value: 你想顯示的名稱
5. 點擊 **"Create a participant token"**
6. 複製生成的 Token

### 3. 使用應用程式

1. 將 Token 貼到應用程式的 **"Participant Token"** 輸入框
2. 選擇你的攝影機和麥克風
3. 點擊 **"加入舞台"** 按鈕
4. 開始串流!

### 4. 測試多人互動

- 在不同瀏覽器或設備上打開應用程式
- 使用不同的 Participant Token 加入同一個 Stage
- 即可看到多人視訊互動效果

## 🎮 控制按鈕

- **靜音/取消靜音**: 控制麥克風
- **隱藏鏡頭/顯示鏡頭**: 控制攝影機
- **離開舞台**: 結束串流並離開

## 📁 專案結構

```
AWS-IVS/
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions 自動部署
├── src/
│   └── app/
│       ├── components/          # React 組件
│       │   ├── Header.js        # 頁面標題
│       │   ├── Input.js         # 輸入框組件
│       │   ├── Select.js        # 下拉選單組件
│       │   ├── Video.js         # 視訊播放組件
│       │   ├── LocalParticipantVideo.js    # 本地參與者視訊
│       │   └── RemoteParticipantVideos.js  # 遠端參與者視訊
│       ├── utils/               # 工具函數
│       │   ├── mediaDevices.js  # 媒體設備管理
│       │   └── stageUtils.js    # Stage 相關功能
│       ├── layout.js            # 應用程式佈局
│       ├── page.js              # 主頁面
│       └── globals.css          # 全域樣式
├── package.json
├── next.config.js               # Next.js 配置 (含 GitHub Pages 設定)
└── README.md
```

## 🔧 核心技術

- **Next.js 14**: React 框架 (靜態導出模式)
- **Amazon IVS Web Broadcast SDK**: 即時串流 SDK
- **Milligram CSS**: 輕量級 CSS 框架
- **GitHub Actions**: 自動化部署

## 📚 關鍵概念

### Stage (舞台)
- 多個參與者互動的虛擬空間
- 每個 Stage 有唯一的 ARN

### Participant Token (參與者令牌)
- 用於身份驗證和授權
- 包含權限設定(publish/subscribe)
- 可攜帶自訂屬性(如 username)

### Strategy (策略)
- 定義音視頻流的發布和訂閱規則
- 控制參與者之間的互動方式

## ⚠️ 注意事項

1. **Token 安全**: 不要在公開場合分享你的 Participant Token
2. **瀏覽器相容性**: 建議使用最新版的 Chrome、Firefox 或 Safari
3. **網路需求**: 需要穩定的網路連線以獲得最佳體驗
4. **設備權限**: 首次使用需要授予攝影機和麥克風權限
5. **HTTPS 需求**: GitHub Pages 自動提供 HTTPS,符合媒體訪問要求

## 🐛 常見問題

### Q: 無法加入 Stage?
A: 請檢查:
- Token 是否正確
- Token 是否已過期
- 是否已授予攝影機/麥克風權限

### Q: 看不到其他參與者?
A: 請確認:
- 其他參與者是否成功加入同一個 Stage
- 網路連線是否正常
- 瀏覽器 Console 是否有錯誤訊息

### Q: 延遲很高?
A: 可能原因:
- 網路連線品質不佳
- 設備效能不足
- 距離 AWS 區域較遠

### Q: GitHub Pages 部署失敗?
A: 請檢查:
- `next.config.js` 中的 `basePath` 是否與 repository 名稱一致
- GitHub Actions 是否有執行權限
- 是否已在 repository 設定中啟用 Pages

## 📖 參考資源

- [Amazon IVS 官方文檔](https://docs.aws.amazon.com/ivs/)
- [Web Broadcast SDK 參考](https://aws.github.io/amazon-ivs-web-broadcast/docs/)
- [GitHub 範例專案](https://github.com/aws-samples/amazon-ivs-realtime-web-demo-reactjs)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

## 📄 授權

MIT License

---

**開發者**: 基於 AWS 官方範例修改  
**最後更新**: 2025-10-18
