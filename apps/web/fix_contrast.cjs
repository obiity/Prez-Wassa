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
      if (dirFile.endsWith('.tsx') || dirFile.endsWith('.ts')) {
        filelist.push(dirFile);
      }
    }
  }
  return filelist;
};

const files = walkSync('d:/Wassa/apps/web');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Fix the invalid -deep class
  content = content.replace(/bg-brand-primary-deep/g, 'bg-brand-hover');

  // Fix contrast issues on buttons with bg-brand-primary
  // Search for bg-brand-primary and if it contains text-white, replace text-white with text-black
  // We'll use a regex that matches class attributes containing both
  content = content.replace(/className="([^"]*bg-brand-primary[^"]*text-white[^"]*)"/g, (match, p1) => {
    return `className="${p1.replace('text-white', 'text-black')}"`;
  });

  // For hover states in CategoryRow
  content = content.replace(/hover:bg-brand-primary hover:border-brand-primary transition-colors text-white/g, 'hover:bg-brand-primary hover:border-brand-primary transition-colors text-white hover:text-black');

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Contrast updated ${file}`);
  }
}

// Special case for MovieCard icon
let mcPath = 'd:/Wassa/apps/web/components/MovieCard.tsx';
if (fs.existsSync(mcPath)) {
  let mcContent = fs.readFileSync(mcPath, 'utf8');
  mcContent = mcContent.replace(/<Play fill="currentColor" size={20} className="text-white ml-1" \/>/g, '<Play fill="currentColor" size={20} className="text-black ml-1" />');
  fs.writeFileSync(mcPath, mcContent);
}
