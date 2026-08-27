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
console.log(`Deep cleaning WORLDWIDE across ${allFiles.length} files...`);

let modifiedCount = 0;

allFiles.forEach(filePath => {
  if (filePath.endsWith('fix_all_worldwide_to_global.js')) return;

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Navbar logo spans
    content = content.replace(/<span>WORLDWIDE<\/span>/g, '<span>GLOBAL</span>');
    content = content.replace(/<span>Worldwide<\/span>/g, '<span>GLOBAL</span>');
    content = content.replace(/<span style="font-size:1.2rem;">WORLDWIDE<\/span>/g, '<span style="font-size:1.2rem;">GLOBAL</span>');
    content = content.replace(/<span style="color:#EAB308;">WORLDWIDE<\/span>/g, '<span style="color:#EAB308;">GLOBAL</span>');
    
    // Brand names
    content = content.replace(/GALICON WORLDWIDE/g, 'GALICON GLOBAL');
    content = content.replace(/Galicon Worldwide/g, 'Galicon Global');
    content = content.replace(/galicon worldwide/g, 'galicon global');
    content = content.replace(/SAMRAT WORLDWIDE/g, 'GALICON GLOBAL');
    content = content.replace(/Samrat Worldwide/g, 'Galicon Global');
    
    // Emails & domains
    content = content.replace(/samratworldwide\.com/g, 'galiconglobal.com');
    content = content.replace(/ismail@samratworldwide\.com/g, 'ismail@galiconglobal.com');
    content = content.replace(/galicon\.com/g, 'galiconglobal.com');
    content = content.replace(/ismail@galicon\.com/g, 'ismail@galiconglobal.com');
    
    // Catch-all remaining uppercase
    content = content.replace(/GALICON\s+WORLDWIDE/g, 'GALICON GLOBAL');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed: ${path.relative(ROOT_DIR, filePath)}`);
      modifiedCount++;
    }
  } catch (err) {
    console.error(`❌ Error in ${filePath}:`, err.message);
  }
});

console.log(`\n🎉 Deep Clean Complete! Successfully updated ${modifiedCount} files to 100% "GALICON GLOBAL"!`);
