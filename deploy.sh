#!/bin/bash

# AWS IVS GitHub Pages 快速部署腳本

echo "🚀 開始部署到 GitHub Pages..."

# 檢查是否有未提交的變更
if [[ -n $(git status -s) ]]; then
  echo "📝 發現未提交的變更,正在提交..."
  git add .
  read -p "請輸入提交訊息 (直接按 Enter 使用預設訊息): " commit_msg
  commit_msg=${commit_msg:-"Update: $(date '+%Y-%m-%d %H:%M:%S')"}
  git commit -m "$commit_msg"
fi

# 推送到 GitHub
echo "📤 正在推送到 GitHub..."
git push origin main

echo "✅ 推送完成!"
echo "⏳ GitHub Actions 正在自動建置和部署..."
echo "🌐 約 1-2 分鐘後可訪問: https://你的GitHub用戶名.github.io/AWS-IVS/"
echo ""
echo "💡 提示: 可以在 GitHub repository 的 Actions 標籤查看部署狀態"
