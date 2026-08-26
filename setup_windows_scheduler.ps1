# SAMRAT WORLDWIDE - Windows Task Scheduler Setup
# Registers a daily task at 8:30 AM to run run_daily_830am.bat

$TaskName = "SAMRAT_Daily_830AM_Engine"
$BatPath = "c:\Users\Administrator\Documents\ai agent\run_daily_830am.bat"
$WorkingDir = "c:\Users\Administrator\Documents\ai agent"

# Check if task already exists
$Existing = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue
if ($Existing) {
    Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
    Write-Host "Replaced existing task: $TaskName"
}

$Action = New-ScheduledTaskAction -Execute "cmd.exe" -Argument "/c `"$BatPath`"" -WorkingDirectory $WorkingDir
$Trigger = New-ScheduledTaskTrigger -Daily -At 8:30AM
$Settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

Register-ScheduledTask -TaskName $TaskName -Action $Action -Trigger $Trigger -Settings $Settings -Description "SAMRAT Daily 8:30 AM Lead Extractor and Email Outreach Engine by Founder Ismail Kazia"

Write-Host "✅ Successfully Scheduled $TaskName to run every day at 8:30 AM!"
