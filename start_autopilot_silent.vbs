Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "c:\Users\Administrator\Documents\ai agent"
WshShell.Run "node auto_pilot_daemon.js", 0, False
