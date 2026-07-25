import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('../../presentation-assets');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Load existing manifest so we can append/update it
let manifest = [];
const manifestPath = path.join(outDir, 'manifest.json');
if (fs.existsSync(manifestPath)) {
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
}

function logScreenshot(filename, description) {
  console.log(`Captured: ${filename}`);
  // Remove if exists
  manifest = manifest.filter(m => m.filename !== filename);
  manifest.push({ filename, description });
}

async function run() {
  console.log('Starting header-only screenshot capture...');
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  
  const gotoOpts = { waitUntil: 'networkidle' };
  
  await page.goto('http://localhost:3000', gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  
  const headerLocator = page.locator('nav').first();
  if (await headerLocator.count() > 0) {
    // We will capture a clip region that is 1440x400 from top left to ensure dropdowns are fully visible
    const clipRegion = { x: 0, y: 0, width: 1440, height: 450 };

    await page.screenshot({ path: path.join(outDir, '10-header-default.png'), clip: clipRegion });
    logScreenshot('10-header-default.png', 'Header close-up - Default state');

    const buttons = headerLocator.locator('button');
    const count = await buttons.count();
    if (count >= 4) {
      await buttons.nth(count - 4).click(); 
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(outDir, '10b-header-search-open.png'), clip: clipRegion });
      logScreenshot('10b-header-search-open.png', 'Header - Search input expanded');
      
      await page.fill('input[placeholder*="Films"]', 'banel');
      await page.waitForTimeout(800);
      await page.screenshot({ path: path.join(outDir, '10c-header-search-results.png'), clip: clipRegion });
      logScreenshot('10c-header-search-results.png', 'Header - Search live dropdown results');
      
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);

      await buttons.nth(count - 2).click(); 
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(outDir, '11-header-notification-open.png'), clip: clipRegion });
      logScreenshot('11-header-notification-open.png', 'Header - Notification dropdown open');
      await page.mouse.click(0, 500); 
      await page.waitForTimeout(500);
      
      await buttons.nth(count - 1).click(); 
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(outDir, '12-header-account-open.png'), clip: clipRegion });
      logScreenshot('12-header-account-open.png', 'Header - Account dropdown open');
      await page.mouse.click(0, 500);
      await page.waitForTimeout(500);
    }
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
