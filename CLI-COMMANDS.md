# AWS CLI 快速指令參考

## 📋 生成 Token 指令

### Windows PowerShell

```powershell
# 設定 Stage ARN（替換成你的 ARN）
$STAGE_ARN = "arn:aws:ivs:us-west-2:123456789012:stage/xxxxxxxxxxxx"

# 生成主播 Token
aws ivs-realtime create-participant-token `
  --stage-arn $STAGE_ARN `
  --capabilities PUBLISH SUBSCRIBE `
  --duration 7200 `
  --user-id "broadcaster-1" `
  --query 'participantToken.token' `
  --output text

# 生成觀眾 Token
aws ivs-realtime create-participant-token `
  --stage-arn $STAGE_ARN `
  --capabilities SUBSCRIBE `
  --duration 7200 `
  --user-id "viewer-1" `
  --query 'participantToken.token' `
  --output text
```

### macOS / Linux

```bash
# 設定 Stage ARN（替換成你的 ARN）
STAGE_ARN="arn:aws:ivs:us-west-2:123456789012:stage/xxxxxxxxxxxx"

# 生成主播 Token
aws ivs-realtime create-participant-token \
  --stage-arn $STAGE_ARN \
  --capabilities PUBLISH SUBSCRIBE \
  --duration 7200 \
  --user-id "broadcaster-1" \
  --query 'participantToken.token' \
  --output text

# 生成觀眾 Token
aws ivs-realtime create-participant-token \
  --stage-arn $STAGE_ARN \
  --capabilities SUBSCRIBE \
  --duration 7200 \
  --user-id "viewer-1" \
  --query 'participantToken.token' \
  --output text
```

## 🔄 批次生成觀眾 Token

如果要測試多個觀眾，可以批次生成：

### PowerShell

```powershell
$STAGE_ARN = "arn:aws:ivs:us-west-2:123456789012:stage/xxxxxxxxxxxx"

# 生成 10 個觀眾 Token
for ($i=1; $i -le 10; $i++) {
    Write-Host "Viewer $i Token:"
    aws ivs-realtime create-participant-token `
      --stage-arn $STAGE_ARN `
      --capabilities SUBSCRIBE `
      --duration 7200 `
      --user-id "viewer-$i" `
      --query 'participantToken.token' `
      --output text
    Write-Host ""
}
```

### Bash

```bash
STAGE_ARN="arn:aws:ivs:us-west-2:123456789012:stage/xxxxxxxxxxxx"

# 生成 10 個觀眾 Token
for i in {1..10}; do
    echo "Viewer $i Token:"
    aws ivs-realtime create-participant-token \
      --stage-arn $STAGE_ARN \
      --capabilities SUBSCRIBE \
      --duration 7200 \
      --user-id "viewer-$i" \
      --query 'participantToken.token' \
      --output text
    echo ""
done
```

## 📊 查看 Stage 資訊

```bash
# 列出所有 Stage
aws ivs-realtime list-stages

# 查看特定 Stage 詳細資訊
aws ivs-realtime get-stage --arn $STAGE_ARN

# 列出 Stage 中的參與者
aws ivs-realtime list-participants --stage-arn $STAGE_ARN
```

## 🗑️ 刪除 Stage

測試完成後記得刪除 Stage：

```bash
aws ivs-realtime delete-stage --arn $STAGE_ARN
```

## ⚙️ 參數說明

| 參數 | 說明 | 可選值 |
|------|------|--------|
| `--capabilities` | 權限設定 | `PUBLISH`、`SUBSCRIBE` 或兩者 |
| `--duration` | Token 有效期（秒） | 1 ~ 7200 (最長 2 小時) |
| `--user-id` | 使用者 ID | 任意字串 |
| `--attributes` | 自訂屬性（選填） | JSON 格式 |

## 💡 進階用法

### 帶自訂屬性的 Token

```bash
aws ivs-realtime create-participant-token \
  --stage-arn $STAGE_ARN \
  --capabilities SUBSCRIBE \
  --duration 7200 \
  --user-id "viewer-vip-1" \
  --attributes '{"role":"vip","name":"John Doe"}' \
  --query 'participantToken.token' \
  --output text
```

### 指定區域

```bash
aws ivs-realtime create-participant-token \
  --region us-west-2 \
  --stage-arn $STAGE_ARN \
  --capabilities SUBSCRIBE \
  --duration 7200 \
  --user-id "viewer-1" \
  --query 'participantToken.token' \
  --output text
```

## 🔐 AWS CLI 設定

如果尚未設定 AWS CLI：

```bash
# 設定 AWS 憑證
aws configure

# 輸入以下資訊：
# - AWS Access Key ID
# - AWS Secret Access Key
# - Default region name (例如: us-west-2)
# - Default output format (建議: json)
```

檢查設定：

```bash
# 查看當前設定
aws configure list

# 測試連線
aws sts get-caller-identity
```

## 📝 CloudShell 快速測試

如果不想安裝 AWS CLI，可以使用 AWS CloudShell：

1. 登入 AWS Console
2. 點擊右上角的 CloudShell 圖示
3. 直接執行上述指令

## 🎯 測試流程

```bash
# 1. 建立 Stage（在 AWS Console 完成）

# 2. 設定變數
STAGE_ARN="your-stage-arn-here"

# 3. 生成主播 Token
BROADCASTER_TOKEN=$(aws ivs-realtime create-participant-token \
  --stage-arn $STAGE_ARN \
  --capabilities PUBLISH SUBSCRIBE \
  --duration 7200 \
  --user-id "broadcaster-1" \
  --query 'participantToken.token' \
  --output text)

echo "Broadcaster Token: $BROADCASTER_TOKEN"

# 4. 生成觀眾 Token
VIEWER_TOKEN=$(aws ivs-realtime create-participant-token \
  --stage-arn $STAGE_ARN \
  --capabilities SUBSCRIBE \
  --duration 7200 \
  --user-id "viewer-1" \
  --query 'participantToken.token' \
  --output text)

echo "Viewer Token: $VIEWER_TOKEN"

# 5. 複製 Token 到網頁進行測試

# 6. 測試完成後刪除 Stage
aws ivs-realtime delete-stage --arn $STAGE_ARN
```

---

**快速提示：** 複製 Token 時確保完整複製，不要包含前後空格！
