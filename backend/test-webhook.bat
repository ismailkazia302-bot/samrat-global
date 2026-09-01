@echo off
echo Sending test event to n8n Webhook...
powershell -Command "Invoke-RestMethod -Uri 'http://localhost:5678/webhook-test/universal-stitch-receiver' -Method Post -ContentType 'application/json' -Body '{\"project\": \"ecommerce\", \"message\": \"Plan a marketing campaign for Diwali sale\", \"order_count\": 120}'"
echo.
echo Test event sent successfully!
pause
