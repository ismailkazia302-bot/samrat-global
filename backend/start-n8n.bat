@echo off
title n8n Local Server (Self-Hosted)
echo ====================================================
echo Starting n8n Self-Hosted Server on your machine...
echo ====================================================
echo.
echo Once started, open your browser at:
echo http://localhost:5678
echo.
echo Press Ctrl+C in this window anytime to stop n8n.
echo ====================================================
echo.

"C:\Users\Administrator\AppData\Local\npm-cache\_npx\a8a7eec953f1f314\node_modules\.bin\n8n.cmd" start

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Running via npx fallback...
    npx.cmd n8n
)

pause
