const fs = require('fs');
const path = require('path');

function walkDir(dir) {
  let files = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'master') {
        files = files.concat(walkDir(filePath));
      }
    } else {
      if (filePath.endsWith('.html')) {
        files.push(filePath);
      }
    }
  });
  return files;
}

const htmlFiles = walkDir(__dirname);

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Detect depth relative prefix
  const relativePath = path.relative(__dirname, file);
  const depth = relativePath.split(path.sep).length - 1;
  const prefix = depth > 0 ? '../'.repeat(depth) : '';

  // Rebrand page titles if necessary to GALICON GLOBAL
  content = content.replace(/SAMRAT WORLDWIDE/g, 'GALICON GLOBAL');

  // Replace nav_loader.js tags with decoupled navbar.js and footer.js
  const targetTag1 = '<script src="nav_loader.js"></script>';
  const targetTag2 = '<script src="../nav_loader.js"></script>';
  const replacement = `<script src="${prefix}components/navbar.js"></script>\n  <script src="${prefix}components/footer.js"></script>`;

  if (content.includes(targetTag1)) {
    content = content.replace(targetTag1, replacement);
    console.log(`Updated scripts in: ${relativePath}`);
  } else if (content.includes(targetTag2)) {
    content = content.replace(targetTag2, replacement);
    console.log(`Updated scripts in: ${relativePath}`);
  } else {
    // If navbar-placeholder is present but no loader tag, append it before </body>
    if (content.includes('navbar-placeholder') && !content.includes('components/navbar.js')) {
      content = content.replace('</body>', `  ${replacement}\n</body>`);
      console.log(`Appended scripts to: ${relativePath}`);
    }
  }

  fs.writeFileSync(file, content, 'utf8');
});

console.log('✅ All script updates completed!');
