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
console.log(`Found ${allFiles.length} files to scan for rebranding...`);

let modifiedCount = 0;

allFiles.forEach(filePath => {
  // Skip this script itself
  if (filePath.endsWith('rebrand_to_gelicon.js')) return;

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Direct Replacements (order matters)
    content = content.replace(/GELICON GLOBAL/g, 'GELICON GLOBAL');
    content = content.replace(/Gelicon Global/g, 'Gelicon Global');
    content = content.replace(/samrat worldwide/g, 'gelicon global');
    content = content.replace(/SAMRAT GLOBAL/g, 'GELICON GLOBAL');
    content = content.replace(/Samrat Global/g, 'Gelicon Global');
    content = content.replace(/samrat-worldwide/g, 'gelicon-worldwide');
    content = content.replace(/samratglobal\.com/g, 'geliconglobal.com');
    content = content.replace(/ismail@samratglobal\.com/g, 'ismail@geliconglobal.com');
    content = content.replace(/SAMRAT/g, 'GELICON');
    content = content.replace(/Samrat/g, 'Gelicon');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Rebranded: ${path.relative(ROOT_DIR, filePath)}`);
      modifiedCount++;
    }
  } catch (err) {
    console.error(`❌ Error reading/writing ${filePath}:`, err.message);
  }
});

console.log(`\n🎉 Rebranding Complete! Successfully updated ${modifiedCount} files to GELICON!`);
