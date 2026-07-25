const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const dirFile = path.join(dir, file);
    const dirent = fs.statSync(dirFile);
    if (dirent.isDirectory()) {
      if (!dirFile.includes('node_modules') && !dirFile.includes('.next')) {
        filelist = walkSync(dirFile, filelist);
      }
    } else {
      if (dirFile.endsWith('.tsx') || dirFile.endsWith('.ts') || dirFile.endsWith('.css')) {
        filelist.push(dirFile);
      }
    }
  }
  return filelist;
};

const files = walkSync('d:/Wassa/apps/web');
let updatedCount = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace old tailwind classes
  content = content.replace(/brand-red/g, 'brand-primary');
  content = content.replace(/brand-light/g, 'brand-hover');
  content = content.replace(/brand-orange/g, 'brand-primary');
  content = content.replace(/glow-red/g, 'glow-primary');
  content = content.replace(/glow-orange/g, 'glow-primary');

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
    updatedCount++;
  }
}

console.log(`Updated ${updatedCount} files.`);
