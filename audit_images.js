const fs = require('fs');
const path = require('path');

const pageContent = fs.readFileSync('d:/Wassa/apps/web/app/page.tsx', 'utf8');
const publicDir = 'd:/Wassa/apps/web/public';

const regex = /id:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*imageUrl:\s*"([^"]+)"/g;
let match;

const allImagesInPublic = fs.readdirSync(publicDir).filter(f => fs.statSync(path.join(publicDir, f)).isFile());
// Create a lowercased map for case-insensitivity checks
const lowerCaseFilesMap = {};
allImagesInPublic.forEach(f => {
  lowerCaseFilesMap[f.toLowerCase()] = f;
});

const missing = [];
const allEntries = [];

while ((match = regex.exec(pageContent)) !== null) {
  const id = match[1];
  const title = match[2];
  const rawUrl = match[3];
  // Remove leading slash
  const urlFile = rawUrl.replace(/^\//, '');
  
  allEntries.push({ id, title, urlFile });
  
  const expectedPath = path.join(publicDir, urlFile);
  if (!fs.existsSync(expectedPath)) {
    // Determine reason
    let reason = "Missing completely";
    let suggestion = null;
    
    // Check case sensitivity
    if (lowerCaseFilesMap[urlFile.toLowerCase()]) {
       reason = "Case mismatch";
       suggestion = lowerCaseFilesMap[urlFile.toLowerCase()];
    } else {
       // Check extension mismatch
       const nameWithoutExt = path.parse(urlFile).name;
       const possibleFiles = allImagesInPublic.filter(f => path.parse(f).name.toLowerCase() === nameWithoutExt.toLowerCase());
       if (possibleFiles.length > 0) {
         reason = "Extension/Case mismatch";
         suggestion = possibleFiles[0];
       } else {
         // Check if there's any file containing the id
         const fuzzyFiles = allImagesInPublic.filter(f => f.toLowerCase().includes(id.toLowerCase().replace(/-/g, ' ')));
         if (fuzzyFiles.length > 0) {
           reason = "Fuzzy match found";
           suggestion = fuzzyFiles[0];
         }
       }
    }
    missing.push({ id, title, urlFile, reason, suggestion });
  }
}

console.log("Total entries checked:", allEntries.length);
if (missing.length > 0) {
  console.log("\n--- BROKEN REFERENCES FOUND ---");
  missing.forEach(m => {
    console.log(`- [${m.id}] "${m.title}" -> ${m.urlFile}`);
    console.log(`  Reason: ${m.reason}`);
    if (m.suggestion) console.log(`  Suggestion: ${m.suggestion}`);
    console.log("");
  });
} else {
  console.log("All images exist and are matched exactly.");
}
