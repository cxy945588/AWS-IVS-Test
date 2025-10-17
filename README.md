# AWS IVS Real-Time Streaming 測試環境

這是一個完整的 Amazon IVS Real-Time Streaming 測試環境，支援**超低延遲 (<500ms)** 的即時直播。

## 🎯 功能特色

- ✅ **超低延遲**: WebRTC 技術，延遲 < 300-500ms
- ✅ **支援 1000+ 觀眾**: 可擴展的即時直播
- ✅ **完整 UI**: 主播控制台和觀眾端介面
- ✅ **即時監控**: 連線狀態、直播時長、參與者數量
- ✅ **日誌追蹤**: 詳細的事件日誌
- ✅ **GitHub Pages 就緒**: 可直接部署到 GitHub Pages

## 📁 檔案結構

```
AWS-IVS/
├── index.html          # 首頁導航
├── broadcaster.html    # 主播端頁面
├── viewer.html         # 觀眾端頁面
└── README.md          # 本文件
```

## 🚀 快速開始

### 步驟 1: 在 AWS Console 建立 Stage

1. 登入 [AWS Console](https://console.aws.amazon.com/)
2. 搜尋並進入 **"Amazon IVS"** 服務
3. 選擇 **"Real-time streaming"**
4. 點擊 **"Create stage"**
5. 設定：
   - **Stage name**: `test-stage` (或任意名稱)
   - 其他保持預設值
6. 點擊 **"Create stage"**
7. **記下 Stage ARN** (格式: `arn:aws:ivs:region:account-id:stage/xxxx`)

### 步驟 2: 生成 Participant Token

使用 AWS CLI 生成 Token（需要先安裝並設定 AWS CLI）

#### 安裝 AWS CLI (如果尚未安裝)

```bash
# Windows (使用 MSI 安裝程式)
# 下載: https://awscli.amazonaws.com/AWSCLIV2.msi

# macOS
brew install awscli

# Linux
pip install awscli
```

#### 設定 AWS CLI

```bash
aws configure
# 輸入你的 AWS Access Key ID
# 輸入你的 AWS Secret Access Key
# 輸入 Region (例如: us-west-2)
# 輸入 Output format (建議: json)
```

#### 生成主播 Token

```bash
aws ivs-realtime create-participant-token \
  --stage-arn "arn:aws:ivs:us-west-2:123456789012:stage/xxxxxxxxxxxx" \
  --capabilities PUBLISH SUBSCRIBE \
  --duration 7200 \
  --user-id "broadcaster-1" \
  --query 'participantToken.token' \
  --output text
```

#### 生成觀眾 Token

```bash
aws ivs-realtime create-participant-token \
  --stage-arn "arn:aws:ivs:us-west-2:123456789012:stage/xxxxxxxxxxxx" \
  --capabilities SUBSCRIBE \
  --duration 7200 \
  --user-id "viewer-1" \
  --query 'participantToken.token' \
  --output text
```

**參數說明：**
- `--stage-arn`: 你的 Stage ARN
- `--capabilities`: 
  - `PUBLISH SUBSCRIBE`: 主播權限（可推流和接收）
  - `SUBSCRIBE`: 觀眾權限（僅接收）
- `--duration`: Token 有效期（秒），最長 7200 秒（2小時）
- `--user-id`: 使用者 ID（可自訂）

### 步驟 3: 測試直播

#### 方法 A: 本地測試

1. 將整個 `AWS-IVS` 資料夾放到任意位置
2. 用瀏覽器直接開啟 `index.html`
3. 點擊「主播端」，貼上主播 Token，開始直播
4. 另開分頁點擊「觀眾端」，貼上觀眾 Token，開始觀看

#### 方法 B: GitHub Pages 部署

1. 在 GitHub 建立新 repository
2. 上傳這些檔案
3. 進入 Settings → Pages
4. Source 選擇 `main` branch
5. 儲存後會得到一個 URL，例如：`https://yourusername.github.io/repo-name/`
6. 訪問該 URL 開始測試

## 🎮 使用說明

### 主播端操作

1. 開啟 `broadcaster.html`
2. 貼上主播 Token（需要 PUBLISH,SUBSCRIBE 權限）
3. 點擊「開始直播」
4. 允許瀏覽器使用攝像頭和麥克風
5. 開始直播後，觀察：
   - 連線狀態
   - 攝像頭/麥克風狀態
   - 直播時長
   - 日誌訊息

### 觀眾端操作

1. 開啟 `viewer.html`
2. 貼上觀眾 Token（只需要 SUBSCRIBE 權限）
3. 點擊「開始觀看」
4. 等待主播開始直播
5. 收到串流後自動播放（如無法自動播放請手動點擊播放按鈕）
6. 觀察：
   - 連線狀態
   - 視頻狀態
   - 觀看時長
   - 在線參與者數量

### 多人測試

- 可以開啟多個瀏覽器分頁或視窗作為觀眾
- 每個觀眾需要使用不同的 `user-id` 生成 Token
- 或使用相同 Token（但建議為每個觀眾生成獨立 Token）

## 🔍 測試延遲

1. 在主播端顯示一個計時器或揮手
2. 觀察觀眾端的延遲時間
3. 正常情況下延遲應該在 300-500ms 之間

## 💰 成本估算

IVS Real-Time 按 **Participant Hours** 計費：

| 場景 | 計算方式 | 估算成本 (美國區) |
|------|---------|-----------------|
| 1 主播 + 10 觀眾，1 小時 | (1+10) × 1 = 11 participant hours | ~$0.11 USD |
| 1 主播 + 100 觀眾，1 小時 | (1+100) × 1 = 101 participant hours | ~$1.01 USD |
| 1 主播 + 1000 觀眾，1 小時 | (1+1000) × 1 = 1001 participant hours | ~$10.01 USD |

**注意：**
- 實際價格依區域而異
- 詳細定價請參考 [AWS IVS 定價頁面](https://aws.amazon.com/ivs/pricing/)
- 測試完記得停止直播並刪除 Stage

## ⚠️ 注意事項

### 瀏覽器相容性

推薦使用以下瀏覽器：
- ✅ Chrome / Edge (Chromium) - 最佳支援
- ✅ Firefox
- ✅ Safari (需要較新版本)
- ❌ 不支援 IE

### Token 管理

- Token 有效期最長 2 小時（7200 秒）
- Token 過期需要重新生成
- 生產環境應使用後端 API 動態生成 Token
- 不要在前端或版本控制系統中硬編碼 Token

### 網路需求

- 主播端：上傳速度建議 ≥ 3 Mbps
- 觀眾端：下載速度建議 ≥ 2 Mbps
- 網路不穩定可能導致卡頓或斷線

### 安全性

- 本範例為測試用途，直接在前端輸入 Token
- **生產環境必須**：
  - 後端生成和驗證 Token
  - 實作身份驗證
  - 加入權限控制
  - 監控異常行為

## 🐛 常見問題排解

### 問題 1: 無法獲取攝像頭權限

**解決方法：**
- 確保使用 HTTPS 或 localhost
- 檢查瀏覽器權限設定
- 確認攝像頭未被其他應用程式占用

### 問題 2: 觀眾看不到畫面

**可能原因：**
- 主播尚未開始直播
- Token 權限不正確
- 網路連線問題
- Token 已過期

**解決方法：**
1. 確認主播已成功開播（查看主播端狀態）
2. 檢查 Token 是否有 SUBSCRIBE 權限
3. 查看瀏覽器 Console 的錯誤訊息
4. 重新生成 Token

### 問題 3: 延遲過高

**可能原因：**
- 網路品質不佳
- 裝置性能不足
- 區域距離過遠

**解決方法：**
- 使用有線網路
- 選擇較近的 AWS 區域
- 降低視頻解析度

### 問題 4: "Failed to join stage" 錯誤

**可能原因：**
- Token 無效或過期
- Stage ARN 錯誤
- AWS 憑證問題

**解決方法：**
- 重新生成 Token
- 確認 Stage ARN 正確
- 檢查 AWS CLI 設定

## 📚 進階使用

### 自訂視頻品質

修改 `broadcaster.html` 中的視頻設定：

```javascript
mediaStream = await navigator.mediaDevices.getUserMedia({
    video: {
        width: { ideal: 1920 },   // 調整寬度
        height: { ideal: 1080 },  // 調整高度
        frameRate: { ideal: 30 }  // 調整幀率
    },
    audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
    }
});
```

### 整合後端 API

生產環境應該：

1. **建立後端 API** (Lambda + API Gateway)
2. **實作 Token 生成邏輯**
3. **加入身份驗證**
4. **前端透過 API 獲取 Token**

範例架構：
```
前端 → API Gateway → Lambda → IVS create-participant-token → 返回 Token
```

## 🔗 相關資源

- [AWS IVS Real-Time 官方文檔](https://docs.aws.amazon.com/ivs/latest/RealTimeUserGuide/)
- [IVS Web Broadcast SDK](https://docs.aws.amazon.com/ivs/latest/RealTimeUserGuide/broadcast.html)
- [AWS CLI 參考](https://docs.aws.amazon.com/cli/latest/reference/ivs-realtime/)
- [定價資訊](https://aws.amazon.com/ivs/pricing/)

## 📝 授權

本專案僅供學習和測試使用。

## 🤝 貢獻

歡迎提出 Issue 或 Pull Request！

---

**祝你測試順利！ 🎉**

如有問題，請查看日誌或瀏覽器 Console 獲取更多資訊。
