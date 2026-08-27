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
  if (filePath.endsWith('rebrand_to_galicon.js')) return;

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Direct Replacements (order matters)
    content = content.replace(/GALICON GLOBAL/g, 'GALICON GLOBAL');
    content = content.replace(/Galicon Global/g, 'Galicon Global');
    content = content.replace(/samrat worldwide/g, 'galicon global');
    content = content.replace(/SAMRAT GLOBAL/g, 'GALICON GLOBAL');
    content = content.replace(/Samrat Global/g, 'Galicon Global');
    content = content.replace(/samrat-worldwide/g, 'galicon-worldwide');
    content = content.replace(/samratglobal\.com/g, 'galiconglobal.com');
    content = content.replace(/ismail@samratglobal\.com/g, 'ismail@galiconglobal.com');
    content = content.replace(/SAMRAT/g, 'GALICON');
    content = content.replace(/Samrat/g, 'Galicon');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Rebranded: ${path.relative(ROOT_DIR, filePath)}`);
      modifiedCount++;
    }
  } catch (err) {
    console.error(`❌ Error reading/writing ${filePath}:`, err.message);
  }
});

console.log(`\n🎉 Rebranding Complete! Successfully updated ${modifiedCount} files to GALICON!`);
