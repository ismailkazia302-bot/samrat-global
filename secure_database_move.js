const fs = require('fs');
const path = require('path');

const privateDir = path.join(__dirname, 'private_data');

if (!fs.existsSync(privateDir)) {
  fs.mkdirSync(privateDir, { recursive: true });
}

// Copy files if they exist
const filesToMove = ['leads_database.json', 'leads_database.csv', 'crm_status.csv', 'leads_with_pitches.json', 'outreach_ready.csv'];
filesToMove.forEach(file => {
  const src = path.join(__dirname, file);
  const dest = path.join(privateDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied secure file: ${file} -> private_data/${file}`);
  }
});

// Update gitignore
const gitignorePath = path.join(__dirname, '.gitignore');
let gitignoreContent = '';
if (fs.existsSync(gitignorePath)) {
  gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
}

const secureRules = `
# GALICON Secure Data Directories
private_data/
.env
`;

if (!gitignoreContent.includes('private_data/')) {
  fs.writeFileSync(gitignorePath, gitignoreContent + '\n' + secureRules, 'utf8');
  console.log('Updated .gitignore with secure data exclusions.');
}
