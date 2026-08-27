/**
 * SAMRAT WORLDWIDE — AUTONOMOUS 24/7 AUTO-PILOT DAEMON
 * Founder: Ismail Kazia
 * 
 * Functions:
 * 1. Runs continuously in background as a lightweight process.
 * 2. Every single morning at exactly 08:30 AM local time, automatically executes:
 *    - lead_extractor.js (extracts fresh high-ticket B2B leads)
 *    - daily_outreach_engine.js (dispatches 300 Brevo emails + 3-month followups)
 * 3. Logs all activities to autopilot.log.
 * 4. Never sends twice on the same calendar day.
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, 'autopilot.log');
const LAST_RUN_FILE = path.join(__dirname, '.last_daily_run');

function log(msg) {
  const timestamp = new Date().toLocaleString();
  const line = `[${timestamp}] ${msg}\n`;
  console.log(line.trim());
  fs.appendFileSync(LOG_FILE, line);
}

function runDailyPipeline() {
  const today = new Date().toISOString().split('T')[0];
  log(`🚀 AUTOPILOT TRIGGERED: Starting Daily 8:30 AM Autonomous Pipeline for ${today}...`);

  // Step 0: Scan Google Search Trends & Synthesize Trending Solution
  exec('node autonomous_demand_arbitrage_engine.js', { cwd: __dirname }, (err0, stdout0) => {
    if (err0) {
      log(`⚠️ Demand Arbitrage error: ${err0.message}`);
    } else {
      log(`✅ Google Trend Demand Analyzed & Solution Asset Synthesized.`);
    }

    // Step 1: Run Lead Extractor
    exec('node lead_extractor.js', { cwd: __dirname }, (err1, stdout1) => {
      if (err1) {
        log(`⚠️ Lead Extractor error: ${err1.message}`);
      } else {
        log(`✅ Lead Extractor finished successfully.`);
      }

      // Step 2: Run Daily Outreach Engine via Brevo
      exec('node daily_outreach_engine.js', { cwd: __dirname }, (err2, stdout2) => {
        if (err2) {
          log(`⚠️ Outreach Engine error: ${err2.message}`);
        } else {
          log(`✅ Outreach Engine completed 300 batch dispatch.`);
        }

        // Record successful run for today
        fs.writeFileSync(LAST_RUN_FILE, today, 'utf8');
        log(`🎉 Daily Pipeline Complete! Next scheduled trigger tomorrow at 08:30 AM.`);
      });
    });
  });
}

function checkSchedule() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const today = now.toISOString().split('T')[0];

  let lastRunDate = '';
  if (fs.existsSync(LAST_RUN_FILE)) {
    lastRunDate = fs.readFileSync(LAST_RUN_FILE, 'utf8').trim();
  }

  // Trigger at 08:30 AM if not already run today
  if (hours === 8 && minutes === 30 && lastRunDate !== today) {
    runDailyPipeline();
  }
}

// Start Daemon
log(`=======================================================`);
log(`👑 SAMRAT WORLDWIDE AUTO-PILOT DAEMON STARTED`);
log(`Founder: Ismail Kazia`);
log(`Schedule: Daily at 08:30 AM automatically`);
log(`Status: Active and monitoring...`);
log(`=======================================================`);

// If started with --now flag, trigger immediately
if (process.argv.includes('--now')) {
  log(`⚡ Manual immediate trigger requested.`);
  runDailyPipeline();
}

// Check every 30 seconds
setInterval(checkSchedule, 30 * 1000);
