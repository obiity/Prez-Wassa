import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('../../presentation-assets');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

let manifest = [];
const manifestPath = path.join(outDir, 'manifest.json');
if (fs.existsSync(manifestPath)) {
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
}

function logScreenshot(filename, description) {
  console.log(`Captured: ${filename}`);
  manifest = manifest.filter(m => m.filename !== filename);
  manifest.push({ filename, description });
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 300;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 50);
    });
  });
  await page.waitForTimeout(1000); // Wait for lazy images to settle after scrolling
}

async function run() {
  console.log('Starting sections screenshot capture...');
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  
  const gotoOpts = { waitUntil: 'networkidle' };
  
  await page.goto('http://localhost:3000', gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await autoScroll(page);
  
  const commentLocator = page.locator('h2', { hasText: 'Comment ça' }).first();
  if (await commentLocator.count() > 0) {
    await commentLocator.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    try {
      await commentLocator.locator('xpath=./ancestor::section').first().screenshot({ path: path.join(outDir, '08-comment-ca-marche.png') });
      logScreenshot('08-comment-ca-marche.png', 'Homepage - Comment ça marche section');
    } catch(e) {
      console.log("Could not capture Comment ça marche");
    }
  } else {
    console.log("Locator not found: Comment ça marche");
  }

  // Tarifs
  const abboLocator = page.locator('h2', { hasText: 'Tarifs' }).first();
  if (await abboLocator.count() > 0) {
    await abboLocator.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    try {
      await abboLocator.locator('xpath=./ancestor::section').first().screenshot({ path: path.join(outDir, '09-abonnement.png') });
      logScreenshot('09-abonnement.png', 'Homepage - Choisissez votre abonnement (Tarifs) section');
    } catch(e) {
      console.log("Could not capture Tarifs");
    }
  } else {
    console.log("Locator not found: Tarifs");
  }

  await browser.close();

  // Sort manifest based on filename so they stay ordered
  manifest.sort((a, b) => a.filename.localeCompare(b.filename));

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  let md = '# WASSA Presentation Screenshots\n\n';
  manifest.forEach(m => {
    md += `- **${m.filename}**: ${m.description}\n`;
  });
  fs.writeFileSync(path.join(outDir, 'manifest.md'), md);
  
  console.log('Capture complete. Saved to presentation-assets/');
}

run().catch(console.error);
