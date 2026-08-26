@echo off
title SAMRAT WORLDWIDE - Daily 8:30 AM Engine
cd /d "c:\Users\Administrator\Documents\ai agent"

echo ========================================================
echo   SAMRAT WORLDWIDE -- DAILY AUTOMATED GROWTH RUNNER
echo   Founder: Ismail Kazia
echo ========================================================
echo.

echo [1/2] Extracting Fresh B2B & Google Maps Leads...
node lead_extractor.js
echo.

echo [2/2] Running Daily 300 Email Outreach & 3-Month Follow-Up...
node daily_outreach_engine.js
echo.

echo ========================================================
echo   Run Finished! Check daily_reports/ folder.
echo ========================================================
