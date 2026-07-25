const fs = require('fs');
const path = require('path');

const pagePath = 'd:/Wassa/apps/web/app/page.tsx';
let content = fs.readFileSync(pagePath, 'utf8');

const libDir = 'd:/Wassa/apps/web/lib';
if (!fs.existsSync(libDir)) fs.mkdirSync(libDir, { recursive: true });

// Extract all arrays
const regex = /const (MOCK_EPISODES|EXCLUSIVES_MOVIES|TRENDING_MOVIES|CLASSIC_MOVIES|WASSA_SERIES|NOLLYWOOD_MOVIES|IVOIRIAN_MOVIES|MALIAN_MOVIES|NORTH_AFRICAN_MOVIES|PANAFRICAN_MOVIES)[\s\S]*?\];/g;
let dataCode = 'import { ContentItem } from "@/types/content";\n\n';
let match;
const found = [];

// Copy the content out
while ((match = regex.exec(content)) !== null) {
  dataCode += 'export ' + match[0] + '\n\n';
  found.push(match[1]);
}

// Remove from page.tsx
content = content.replace(regex, '');

// Add imports to page.tsx
const importStatement = 'import { ' + found.join(', ') + ' } from "@/lib/data";\n';
// insert after other imports
content = content.replace(/(import .*;\n)+/, (m) => m + importStatement);

fs.writeFileSync('d:/Wassa/apps/web/lib/data.ts', dataCode, 'utf8');
fs.writeFileSync(pagePath, content, 'utf8');
console.log('Data extracted to lib/data.ts');
