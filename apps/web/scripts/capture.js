import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('../../presentation-assets');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const manifest = [];

function logScreenshot(filename, description) {
  console.log(`Captured: ${filename}`);
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

async function captureRowByTitle(page, title, filename, desc) {
  const locator = page.locator('h2', { hasText: title }).first();
  if (await locator.count() > 0) {
    const container = locator.locator('xpath=./ancestor::div[contains(@class, "w-full relative py-8")]').first();
    if (await container.count() > 0) {
      // Ensure it's in viewport so lazy images load
      await container.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
      await container.screenshot({ path: path.join(outDir, filename) });
      logScreenshot(filename, desc);
    } else {
      await locator.locator('xpath=../..').scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
      await locator.locator('xpath=../..').screenshot({ path: path.join(outDir, filename) });
      logScreenshot(filename, desc);
    }
  } else {
    console.warn(`Could not find section for: ${title}`);
  }
}

async function run() {
  console.log('Starting high-quality screenshot capture...');
  const browser = await chromium.launch();
  // Using deviceScaleFactor 2 for retina quality
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  
  const gotoOpts = { waitUntil: 'networkidle' };
  
  // Go to homepage and wait for fonts
  await page.goto('http://localhost:3000', gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await autoScroll(page);
  
  await page.evaluate(() => localStorage.setItem('theme', 'dark'));
  await page.reload(gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await autoScroll(page);

  await page.screenshot({ path: path.join(outDir, '01-homepage-hero-dark.png') });
  logScreenshot('01-homepage-hero-dark.png', 'Homepage - Full Hero Section (Dark Mode)');

  await page.evaluate(() => localStorage.setItem('theme', 'light'));
  await page.reload(gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(outDir, '01-homepage-hero-light.png') });
  logScreenshot('01-homepage-hero-light.png', 'Homepage - Full Hero Section (Light Mode)');
  
  await page.evaluate(() => localStorage.setItem('theme', 'dark'));
  await page.reload(gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await autoScroll(page);

  await captureRowByTitle(page, 'Nouveautés Exclusives', '02-nouveautes-exclusives.png', 'Homepage - Nouveautés Exclusives row');
  await captureRowByTitle(page, 'Tendances', '03-films-tendances.png', 'Homepage - Films Tendances row (leaderboard)');
  await captureRowByTitle(page, 'Classiques', '04-classiques-senegalais.png', 'Homepage - Classiques Sénégalais row (filmstrip)');
  await captureRowByTitle(page, 'Séries Originales', '05-series-originales.png', 'Homepage - Séries Originales WASSA row (showcase)');
  
  const exploreLocator = page.locator('h2', { hasText: 'Explorez' }).first();
  if (await exploreLocator.count() > 0) {
    await exploreLocator.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    try {
      await exploreLocator.locator('xpath=../..').screenshot({ path: path.join(outDir, '06-explorez-cinema.png') });
      logScreenshot('06-explorez-cinema.png', 'Homepage - Explorez le cinéma africain section');
    } catch(e) {}
  }

  const pourquoiLocator = page.locator('h2', { hasText: 'Pourquoi' }).first();
  if (await pourquoiLocator.count() > 0) {
    await pourquoiLocator.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    try {
      await pourquoiLocator.locator('xpath=./ancestor::section').first().screenshot({ path: path.join(outDir, '07-pourquoi-wassa.png') });
      logScreenshot('07-pourquoi-wassa.png', 'Homepage - Pourquoi WASSA editorial section');
    } catch(e) {}
  }

  const commentLocator = page.locator('h2', { hasText: 'Comment ça' }).first();
  if (await commentLocator.count() > 0) {
    await commentLocator.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    try {
      await commentLocator.locator('xpath=./ancestor::section').first().screenshot({ path: path.join(outDir, '08-comment-ca-marche.png') });
      logScreenshot('08-comment-ca-marche.png', 'Homepage - Comment ça marche section');
    } catch(e) {}
  }

  const abboLocator = page.locator('h2', { hasText: 'abonnement' }).first();
  if (await abboLocator.count() > 0) {
    await abboLocator.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    try {
      await abboLocator.locator('xpath=./ancestor::section').first().screenshot({ path: path.join(outDir, '09-abonnement.png') });
      logScreenshot('09-abonnement.png', 'Homepage - Choisissez votre abonnement section');
    } catch(e) {}
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  const headerLocator = page.locator('nav').first();
  if (await headerLocator.count() > 0) {
    await headerLocator.screenshot({ path: path.join(outDir, '10-header-default.png') });
    logScreenshot('10-header-default.png', 'Header close-up - Default state');

    const buttons = headerLocator.locator('button');
    const count = await buttons.count();
    if (count >= 4) {
      await buttons.nth(count - 4).click(); 
      await page.waitForTimeout(500);
      await headerLocator.screenshot({ path: path.join(outDir, '10b-header-search-open.png') });
      logScreenshot('10b-header-search-open.png', 'Header - Search input expanded');
      
      await page.fill('input[placeholder*="Films"]', 'banel');
      await page.waitForTimeout(800);
      // Capture a slightly larger area to include the dropdown
      await headerLocator.screenshot({ path: path.join(outDir, '10c-header-search-results.png') });
      logScreenshot('10c-header-search-results.png', 'Header - Search live dropdown results');
      
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);

      await buttons.nth(count - 2).click(); 
      await page.waitForTimeout(500);
      await headerLocator.screenshot({ path: path.join(outDir, '11-header-notification-open.png') });
      logScreenshot('11-header-notification-open.png', 'Header - Notification dropdown open');
      await page.mouse.click(0, 500); 
      await page.waitForTimeout(500);
      
      await buttons.nth(count - 1).click(); 
      await page.waitForTimeout(500);
      await headerLocator.screenshot({ path: path.join(outDir, '12-header-account-open.png') });
      logScreenshot('12-header-account-open.png', 'Header - Account dropdown open');
      await page.mouse.click(0, 500);
      await page.waitForTimeout(500);
    }
  }

  await page.goto('http://localhost:3000/movies', gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await autoScroll(page);
  await page.screenshot({ path: path.join(outDir, '13-movies-grid-dark.png'), fullPage: true });
  logScreenshot('13-movies-grid-dark.png', '/movies - Full catalog grid (Dark)');
  
  await page.evaluate(() => localStorage.setItem('theme', 'light'));
  await page.reload(gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await autoScroll(page);
  await page.screenshot({ path: path.join(outDir, '13-movies-grid-light.png'), fullPage: true });
  logScreenshot('13-movies-grid-light.png', '/movies - Full catalog grid (Light)');
  
  await page.evaluate(() => localStorage.setItem('theme', 'dark'));

  await page.goto('http://localhost:3000/series', gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await autoScroll(page);
  await page.screenshot({ path: path.join(outDir, '14-series-grid.png'), fullPage: true });
  logScreenshot('14-series-grid.png', '/series - Full catalog grid');

  await page.goto('http://localhost:3000/documentaires', gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await autoScroll(page);
  await page.screenshot({ path: path.join(outDir, '15-documentaires-grid.png'), fullPage: true });
  logScreenshot('15-documentaires-grid.png', '/documentaires - Landscape card grid');

  await page.goto('http://localhost:3000/afrique', gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await autoScroll(page);
  await page.screenshot({ path: path.join(outDir, '16-afrique-hub.png'), fullPage: true });
  logScreenshot('16-afrique-hub.png', '/afrique - Hub page');

  await page.goto('http://localhost:3000/categories', gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await autoScroll(page);
  await page.screenshot({ path: path.join(outDir, '17-categories-grid.png'), fullPage: true });
  logScreenshot('17-categories-grid.png', '/categories - Visual category tile grid');

  await page.goto('http://localhost:3000/search', gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await page.fill('input[placeholder*="Films, s"]', 'banel');
  await page.waitForTimeout(1000);
  await autoScroll(page);
  await page.screenshot({ path: path.join(outDir, '18-search-results.png'), fullPage: true });
  logScreenshot('18-search-results.png', '/search - Search page with live results');

  await page.goto('http://localhost:3000/movie/banel-adama', gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await autoScroll(page);
  await page.screenshot({ path: path.join(outDir, '19-film-detail.png'), fullPage: true });
  logScreenshot('19-film-detail.png', '/movie/:id - Full hero + metadata + CTA');

  await page.goto('http://localhost:3000/series/mdhm', gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await autoScroll(page);
  await page.screenshot({ path: path.join(outDir, '20-series-detail.png'), fullPage: true });
  logScreenshot('20-series-detail.png', '/series/:id - Showing season selector and episodes');

  // Populate list
  await page.goto('http://localhost:3000/movie/banel-adama', gotoOpts);
  const plusBtn = page.locator('button[title*="Ajouter"]').first();
  if (await plusBtn.count() > 0) await plusBtn.click();
  await page.waitForTimeout(500);

  await page.goto('http://localhost:3000/ma-liste', gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await autoScroll(page);
  await page.screenshot({ path: path.join(outDir, '21-ma-liste-populated.png'), fullPage: true });
  logScreenshot('21-ma-liste-populated.png', '/ma-liste - Populated state');
  
  const minusBtns = page.locator('button[title*="Retirer"]');
  const minusCount = await minusBtns.count();
  for (let i = 0; i < minusCount; i++) {
    await minusBtns.nth(i).click();
  }
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, '21-ma-liste-empty.png'), fullPage: true });
  logScreenshot('21-ma-liste-empty.png', '/ma-liste - Empty state');

  await page.goto('http://localhost:3000/profile', gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await autoScroll(page);
  await page.screenshot({ path: path.join(outDir, '22-profile.png'), fullPage: true });
  logScreenshot('22-profile.png', '/profile - Full profile page');

  await page.goto('http://localhost:3000/login', gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(outDir, '23-login.png'), fullPage: true });
  logScreenshot('23-login.png', '/login - Login page');
  await page.goto('http://localhost:3000/register', gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(outDir, '23-register.png'), fullPage: true });
  logScreenshot('23-register.png', '/register - Register page');

  // Video Intro
  await page.goto('http://localhost:3000/watch/banel-adama');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, '25-video-player-intro.png') });
  logScreenshot('25-video-player-intro.png', 'Video player - Opening title card');

  await page.waitForTimeout(3000); 
  await page.mouse.move(500, 500);
  await page.waitForTimeout(500);
  await autoScroll(page); // to show "Vous aimerez aussi"
  await page.screenshot({ path: path.join(outDir, '24-video-player-mid.png'), fullPage: true });
  logScreenshot('24-video-player-mid.png', 'Video player - Mid playback with controls and suggestions row');

  // Hover state card
  await page.goto('http://localhost:3000/movies', gotoOpts);
  await autoScroll(page);
  const cardLocator = page.locator('div.group.relative.cursor-pointer').first();
  if (await cardLocator.count() > 0) {
    await cardLocator.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const box = await cardLocator.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.waitForTimeout(600); // wait for hover animation
      // Capture a clip region slightly larger than the card to see the shadow/expansion
      await page.screenshot({ 
        path: path.join(outDir, '26-card-hover.png'), 
        clip: { 
          x: Math.max(0, box.x - 60), 
          y: Math.max(0, box.y - 60), 
          width: box.width + 120, 
          height: box.height + 120 
        } 
      });
      logScreenshot('26-card-hover.png', 'Card hover state close-up (Grid float up)');
    }
  }

  // Mobile
  const mobileContext = await browser.newContext({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 2 });
  const mobilePage = await mobileContext.newPage();
  
  await mobilePage.goto('http://localhost:3000', gotoOpts);
  await mobilePage.evaluate(() => document.fonts.ready);
  await autoScroll(mobilePage);
  await mobilePage.evaluate(() => window.scrollTo(0, 0));
  await mobilePage.screenshot({ path: path.join(outDir, '27-mobile-hero.png') });
  logScreenshot('27-mobile-hero.png', 'Mobile (375px) - Homepage hero');

  await mobilePage.goto('http://localhost:3000/movies', gotoOpts);
  await mobilePage.evaluate(() => document.fonts.ready);
  await autoScroll(mobilePage);
  await mobilePage.screenshot({ path: path.join(outDir, '27-mobile-grid.png'), fullPage: true });
  logScreenshot('27-mobile-grid.png', 'Mobile (375px) - Catalog grid');

  await mobilePage.goto('http://localhost:3000/watch/banel-adama', gotoOpts);
  await mobilePage.waitForTimeout(3000);
  await mobilePage.mouse.move(100, 100);
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({ path: path.join(outDir, '27-mobile-player.png') });
  logScreenshot('27-mobile-player.png', 'Mobile (375px) - Video player');

  await browser.close();

  fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  let md = '# WASSA Presentation Screenshots\n\n';
  manifest.forEach(m => {
    md += `- **${m.filename}**: ${m.description}\n`;
  });
  fs.writeFileSync(path.join(outDir, 'manifest.md'), md);
  
  console.log('Capture complete. Saved to presentation-assets/');
}

run().catch(console.error);
