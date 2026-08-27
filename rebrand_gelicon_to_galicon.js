const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (file === 'node_modules' || file === '.git' || file === '.gemini') continue;
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.html', '.js', '.json', '.md', '.css', '.txt', '.xml', '.bat', '.ps1'].includes(ext)) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

const allFiles = getAllFiles(ROOT_DIR);
console.log(`Scanning ${allFiles.length} files: GELICON → GALICON...`);

let modifiedCount = 0;

allFiles.forEach(filePath => {
  if (filePath.endsWith('rebrand_gelicon_to_galicon.js')) return;

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content.replace(/GELICON GLOBAL/g, 'GALICON GLOBAL');
    content = content.replace(/Gelicon Global/g, 'Galicon Global');
    content = content.replace(/gelicon global/g, 'galicon global');
    content = content.replace(/GELICON/g, 'GALICON');
    content = content.replace(/Gelicon/g, 'Galicon');
    content = content.replace(/gelicon/g, 'galicon');
    content = content.replace(/geliconglobal\.com/g, 'galiconglobal.com');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated: ${path.relative(ROOT_DIR, filePath)}`);
      modifiedCount++;
    }
  } catch (err) {
    console.error(`❌ Error in ${filePath}:`, err.message);
  }
});

console.log(`\n🎉 Complete! Updated ${modifiedCount} files from GELICON → GALICON!`);
