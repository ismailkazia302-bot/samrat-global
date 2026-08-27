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
      if (['.html', '.js', '.json', '.md', '.css', '.txt', '.xml'].includes(ext)) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

const allFiles = getAllFiles(ROOT_DIR);
console.log(`Scanning ${allFiles.length} files to update WORLDWIDE to GLOBAL...`);

let modifiedCount = 0;

allFiles.forEach(filePath => {
  if (filePath.endsWith('update_to_gelicon_global.js') || filePath.endsWith('rebrand_to_gelicon.js')) return;

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content.replace(/GELICON WORLDWIDE/g, 'GELICON GLOBAL');
    content = content.replace(/Gelicon Worldwide/g, 'Gelicon Global');
    content = content.replace(/gelicon worldwide/g, 'gelicon global');
    content = content.replace(/gelicon-worldwide/g, 'gelicon-global');
    content = content.replace(/GELICON_WORLDWIDE/g, 'GELICON_GLOBAL');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated: ${path.relative(ROOT_DIR, filePath)}`);
      modifiedCount++;
    }
  } catch (err) {
    console.error(`❌ Error reading/writing ${filePath}:`, err.message);
  }
});

console.log(`\n🎉 Complete! Successfully updated ${modifiedCount} files to "GELICON GLOBAL"!`);
