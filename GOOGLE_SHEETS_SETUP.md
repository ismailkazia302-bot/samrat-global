# 📊 Free Google Sheets CRM Setup Guide (1-Minute Guide)

Aapki website ka form submit hote hi har naya lead aapki Google Sheet me **automatically** save ho sakta hai — bilkul FREE (bina kisi paid software ke)!

---

## 🛠️ Setup Steps (Roman Urdu):

### **Step 1: Google Sheet Banayein**
1. [Google Sheets](https://sheets.new) open karein.
2. Pehli row (Headers) me ye columns likhein:
   - **Column A:** Timestamp
   - **Column B:** Name
   - **Column C:** Email
   - **Column D:** Phone
   - **Column E:** Service
   - **Column F:** Location
   - **Column G:** Details

---

### **Step 2: Apps Script Code Paste Karein**
1. Google Sheet ke menu me **Extensions** > **Apps Script** par click karein.
2. Wahan pehle se likha hua code delete karein aur neeche diya gaya code paste karein:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp || new Date(),
      data.name,
      data.email,
      data.phone,
      data.service,
      data.location,
      data.details
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

### **Step 3: Webhook URL Deploy Karein**
1. Top right me **Deploy** > **New deployment** par click karein.
2. Select type: **Web app**.
3. **Execute as:** `Me`
4. **Who has access:** `Anyone` *(taake website se data sheet me save ho sake)*.
5. **Deploy** button click karein aur **Web App URL** copy kar lein.

---

### **Step 4: `app.js` me Paste Karein**
- `app.js` file me line 232 par `GOOGLE_SHEET_WEBHOOK_URL` ke andar apna copied URL paste kar dein:
  ```javascript
  const GOOGLE_SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
  ```

---

Ab jab bhi koi client website par form bharega, data foran Google Sheet me bhi save hoga aur WhatsApp par bhi open hoga! 🎉
