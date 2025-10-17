@echo off
chcp 65001 >nul
echo 🚀 開始部署到 GitHub Pages...
echo.

REM 檢查 Git 狀態
git status --short >nul 2>&1
if errorlevel 1 (
    echo ❌ 錯誤: 請確認這是一個 Git repository
    pause
    exit /b 1
)

REM 添加所有變更
echo 📝 添加變更...
git add .

REM 提交變更
set /p commit_msg="請輸入提交訊息 (直接按 Enter 使用預設訊息): "
if "%commit_msg%"=="" (
    for /f "tokens=1-3 delims=/ " %%a in ('date /t') do set today=%%a-%%b-%%c
    for /f "tokens=1-2 delims=: " %%a in ('time /t') do set now=%%a:%%b
    set commit_msg=Update: %today% %now%
)

echo 💾 正在提交...
git commit -m "%commit_msg%"

REM 推送到 GitHub
echo 📤 正在推送到 GitHub...
git push origin main

if errorlevel 1 (
    echo.
    echo ❌ 推送失敗! 請檢查:
    echo    1. 是否已設定 remote origin
    echo    2. 是否有推送權限
    echo    3. 網路連線是否正常
    pause
    exit /b 1
)

echo.
echo ✅ 推送完成!
echo ⏳ GitHub Actions 正在自動建置和部署...
echo 🌐 約 1-2 分鐘後可訪問你的網站
echo.
echo 💡 提示:
echo    - 可以在 GitHub repository 的 Actions 標籤查看部署狀態
echo    - 網址: https://你的GitHub用戶名.github.io/AWS-IVS/
echo.

pause
