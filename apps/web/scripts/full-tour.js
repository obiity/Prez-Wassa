import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('../../presentation-assets');
const videoRawDir = path.join(outDir, 'video-raw');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(videoRawDir)) fs.mkdirSync(videoRawDir, { recursive: true });

const manifest = [];
function logShot(filename, description) {
  console.log('Captured:', filename);
  manifest.push({ filename, description });
}

const gotoOpts = { waitUntil: 'networkidle', timeout: 30000 };

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 260;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 45);
    });
  });
  await page.waitForTimeout(900);
}

async function smoothScrollIntoView(page, locator) {
  await locator.evaluate((el) => el.scrollIntoView({ behavior: 'smooth', block: 'center' }));
  await page.waitForTimeout(900);
}

// For CategoryRow instances: h2 is nested inside div.w-full.relative.py-8
async function captureRow(page, h2Text, filename, desc) {
  try {
    const locator = page.locator('h2', { hasText: h2Text }).first();
    if (await locator.count() === 0) {
      console.warn('Locator not found:', h2Text);
      return;
    }
    await smoothScrollIntoView(page, locator);
    let target = locator.locator('xpath=./ancestor::div[contains(@class, "w-full relative py-8")]').first();
    if (await target.count() === 0) target = locator.locator('xpath=../..');
    await target.screenshot({ path: path.join(outDir, filename) });
    logShot(filename, desc);
  } catch (e) {
    console.warn('Failed row capture', h2Text, e.message);
  }
}

// For <section>-wrapped blocks (HeroZone, FeaturedMixedRow, BrandManifesto, HowItWorks, PricingSection)
async function captureSection(page, h2Text, filename, desc) {
  try {
    const locator = page.locator('h2', { hasText: h2Text }).first();
    if (await locator.count() === 0) {
      console.warn('Locator not found:', h2Text);
      return;
    }
    await smoothScrollIntoView(page, locator);
    let target = locator.locator('xpath=./ancestor::section').first();
    if (await target.count() === 0) target = locator.locator('xpath=..');
    await target.screenshot({ path: path.join(outDir, filename) });
    logShot(filename, desc);
  } catch (e) {
    console.warn('Failed section capture', h2Text, e.message);
  }
}

async function finalizeVideo(context, page, finalName) {
  const videoObj = page.video();
  await context.close();
  if (!videoObj) return;
  try {
    const tmpPath = await videoObj.path();
    const dest = path.join(outDir, finalName);
    fs.copyFileSync(tmpPath, dest);
    console.log('Saved video:', finalName);
  } catch (e) {
    console.warn('Video finalize failed:', e.message);
  }
}

async function run() {
  console.log('Starting full site tour (video + screenshots)...');
  const browser = await chromium.launch();

  // =========================================================
  // DESKTOP TOUR
  // =========================================================
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    recordVideo: { dir: videoRawDir, size: { width: 1440, height: 900 } },
  });
  const page = await context.newPage();

  // ---- Homepage: force dark theme ----
  await page.goto('http://localhost:3000', gotoOpts);
  await page.evaluate(() => localStorage.setItem('theme', 'dark'));
  await page.reload(gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2000); // let hero carousel + videos settle

  await page.screenshot({ path: path.join(outDir, '01-homepage-hero-dark.png') });
  logShot('01-homepage-hero-dark.png', 'Accueil — Bannière Hero (carrousel, mode sombre)');

  // Light mode still for the doc, then back to dark for the rest of the tour
  await page.evaluate(() => localStorage.setItem('theme', 'light'));
  await page.reload(gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(outDir, '01b-homepage-hero-light.png') });
  logShot('01b-homepage-hero-light.png', 'Accueil — Bannière Hero (mode clair)');

  await page.evaluate(() => localStorage.setItem('theme', 'dark'));
  await page.reload(gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1500);

  // ---- Hero Zone (VOD + Live) ----
  await captureSection(page, 'À La Une VOD', '02-hero-zone.png', 'Accueil — Zone Hero (VOD à la une + Direct TV)');
  if (!manifest.find(m => m.filename === '02-hero-zone.png')) {
    // fallback: capture by structural section index if the pill text isn't matched by h2 locator
    try {
      const sec = page.locator('section').first();
      await smoothScrollIntoView(page, sec);
      await sec.screenshot({ path: path.join(outDir, '02-hero-zone.png') });
      logShot('02-hero-zone.png', 'Accueil — Zone Hero (VOD à la une + Direct TV)');
    } catch (e) { console.warn('hero zone fallback failed', e.message); }
  }

  // ---- Featured Mixed Row ----
  await captureSection(page, 'Sélection En Direct', '03-selection-en-direct.png', 'Accueil — Sélection En Direct & À la Une (4 programmes phares)');

  // ---- Genre rows ----
  await captureRow(page, 'Nouveautés Exclusives', '04-nouveautes-exclusives.png', 'Accueil — Rangée Nouveautés Exclusives');
  await captureRow(page, 'Films Tendances', '05-films-tendances.png', 'Accueil — Rangée Films Tendances');
  await captureRow(page, 'Classiques Sénégalais', '06-classiques-senegalais.png', 'Accueil — Rangée Classiques Sénégalais');
  await captureRow(page, 'Séries Originales', '07-series-originales.png', 'Accueil — Rangée Séries Originales WASSA');

  // ---- Pan-African intro + rows ----
  const exploreLocator = page.locator('h2', { hasText: 'Explorez' }).first();
  if (await exploreLocator.count() > 0) {
    await smoothScrollIntoView(page, exploreLocator);
    try {
      await exploreLocator.locator('xpath=..').screenshot({ path: path.join(outDir, '08-explorez-cinema-africain.png') });
      logShot('08-explorez-cinema-africain.png', 'Accueil — Intro "Explorez le cinéma africain"');
    } catch (e) { console.warn(e.message); }
  }
  await captureRow(page, 'Nollywood', '09-nollywood.png', 'Accueil — Rangée Nollywood (Nigeria)');
  await captureRow(page, 'Ivoirien', '10-cinema-ivoirien.png', 'Accueil — Rangée Cinéma Ivoirien');
  await captureRow(page, 'Malien', '11-cinema-malien.png', 'Accueil — Rangée Cinéma Malien');
  await captureRow(page, 'Afrique du Nord', '12-afrique-du-nord.png', 'Accueil — Rangée Afrique du Nord');
  await captureRow(page, 'Panafricain', '13-panorama-panafricain.png', 'Accueil — Rangée Panorama Panafricain');

  // ---- Editorial sections ----
  await captureSection(page, 'Pourquoi', '14-pourquoi-wassa.png', 'Accueil — Section éditoriale Pourquoi WASSA');
  await captureSection(page, 'Comment ça', '15-comment-ca-marche.png', 'Accueil — Section Comment ça marche');
  await captureSection(page, 'Tarifs', '16-abonnement-tarifs.png', 'Accueil — Choisissez votre abonnement (Tarifs)');
  if (!manifest.find(m => m.filename === '16-abonnement-tarifs.png')) {
    await captureSection(page, 'abonnement', '16-abonnement-tarifs.png', 'Accueil — Choisissez votre abonnement (Tarifs)');
  }

  // ---- Header interactions ----
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await page.waitForTimeout(900);
  const headerLocator = page.locator('nav').first();
  const clipRegion = { x: 0, y: 0, width: 1440, height: 450 };
  await page.screenshot({ path: path.join(outDir, '17-header-default.png'), clip: clipRegion });
  logShot('17-header-default.png', 'Header — État par défaut (navigation, TV Direct, recherche, notifications, profil)');

  try {
    await page.click('[aria-label="Recherche"]');
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, '17b-header-search-open.png'), clip: clipRegion });
    logShot('17b-header-search-open.png', 'Header — Champ de recherche ouvert');

    await page.fill('input[placeholder="Films, séries..."]', 'banel');
    await page.waitForTimeout(900);
    await page.screenshot({ path: path.join(outDir, '17c-header-search-results.png'), clip: clipRegion });
    logShot('17c-header-search-results.png', 'Header — Résultats de recherche en direct (dropdown)');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
  } catch (e) { console.warn('search interaction failed', e.message); }

  try {
    await page.click('[aria-label="Notifications"]');
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, '18-header-notifications.png'), clip: clipRegion });
    logShot('18-header-notifications.png', 'Header — Dropdown Notifications');
    await page.mouse.click(700, 600);
    await page.waitForTimeout(400);
  } catch (e) { console.warn('notifications interaction failed', e.message); }

  try {
    await page.click('[aria-label="Profil"]');
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, '19-header-account-menu.png'), clip: clipRegion });
    logShot('19-header-account-menu.png', 'Header — Menu Compte (Profil, Ma Liste, Déconnexion)');
    await page.mouse.click(700, 600);
    await page.waitForTimeout(400);
  } catch (e) { console.warn('account menu interaction failed', e.message); }

  // ---- TV Direct ----
  await page.goto('http://localhost:3000/tv', gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(outDir, '20-tv-direct-hero.png') });
  logShot('20-tv-direct-hero.png', '/tv — Direct en cours (lecteur live + programme)');
  await autoScroll(page);
  await page.screenshot({ path: path.join(outDir, '21-tv-direct-guide.png'), fullPage: true });
  logShot('21-tv-direct-guide.png', '/tv — Grille des chaînes et guide des programmes');

  // ---- Catalog pages ----
  await page.goto('http://localhost:3000/movies', gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await autoScroll(page);
  await page.screenshot({ path: path.join(outDir, '22-movies-grid-dark.png'), fullPage: true });
  logShot('22-movies-grid-dark.png', '/movies — Catalogue complet (mode sombre)');

  await page.evaluate(() => localStorage.setItem('theme', 'light'));
  await page.reload(gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await autoScroll(page);
  await page.screenshot({ path: path.join(outDir, '22b-movies-grid-light.png'), fullPage: true });
  logShot('22b-movies-grid-light.png', '/movies — Catalogue complet (mode clair)');
  await page.evaluate(() => localStorage.setItem('theme', 'dark'));

  // Card hover close-up
  await page.reload(gotoOpts);
  await autoScroll(page);
  try {
    const cardLocator = page.locator('div.group.relative.cursor-pointer').first();
    await smoothScrollIntoView(page, cardLocator);
    const box = await cardLocator.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.waitForTimeout(700);
      await page.screenshot({
        path: path.join(outDir, '23-card-hover.png'),
        clip: { x: Math.max(0, box.x - 60), y: Math.max(0, box.y - 60), width: box.width + 120, height: box.height + 120 },
      });
      logShot('23-card-hover.png', 'Carte film — État hover (agrandissement + actions rapides)');

      // Add to "Ma Liste" from the grid card (Plus button)
      const plusBtn = cardLocator.locator('button[title*="Ajouter"]').first();
      if (await plusBtn.count() > 0) {
        await plusBtn.click();
        await page.waitForTimeout(500);
      }
    }
  } catch (e) { console.warn('card hover failed', e.message); }

  await page.goto('http://localhost:3000/series', gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await autoScroll(page);
  await page.screenshot({ path: path.join(outDir, '24-series-grid.png'), fullPage: true });
  logShot('24-series-grid.png', '/series — Catalogue complet');

  await page.goto('http://localhost:3000/documentaires', gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await autoScroll(page);
  await page.screenshot({ path: path.join(outDir, '25-documentaires-grid.png'), fullPage: true });
  logShot('25-documentaires-grid.png', '/documentaires — Grille de cartes format paysage');

  await page.goto('http://localhost:3000/afrique', gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await autoScroll(page);
  await page.screenshot({ path: path.join(outDir, '26-afrique-hub.png'), fullPage: true });
  logShot('26-afrique-hub.png', '/afrique — Hub Cinéma Africain');

  await page.goto('http://localhost:3000/categories', gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await autoScroll(page);
  await page.screenshot({ path: path.join(outDir, '27-categories-grid.png'), fullPage: true });
  logShot('27-categories-grid.png', '/categories — Grille visuelle des catégories');

  await page.goto('http://localhost:3000/search', gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  try {
    await page.fill('input[placeholder*="Films, s"]', 'banel');
    await page.waitForTimeout(1000);
  } catch (e) { console.warn('search page fill failed', e.message); }
  await autoScroll(page);
  await page.screenshot({ path: path.join(outDir, '28-search-results.png'), fullPage: true });
  logShot('28-search-results.png', '/search — Recherche avancée avec résultats');

  await page.goto('http://localhost:3000/movie/banel-adama', gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await autoScroll(page);
  await page.screenshot({ path: path.join(outDir, '29-film-detail.png'), fullPage: true });
  logShot('29-film-detail.png', '/movie/:id — Fiche film (hero + métadonnées + CTA)');

  await page.goto('http://localhost:3000/series/mdhm', gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await autoScroll(page);
  await page.screenshot({ path: path.join(outDir, '30-series-detail.png'), fullPage: true });
  logShot('30-series-detail.png', '/series/:id — Fiche série (saisons + épisodes)');

  // ---- Ma Liste (populated then empty) ----
  await page.goto('http://localhost:3000/ma-liste', gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await autoScroll(page);
  await page.screenshot({ path: path.join(outDir, '31-ma-liste-populated.png'), fullPage: true });
  logShot('31-ma-liste-populated.png', '/ma-liste — État peuplé');

  try {
    const minusBtns = page.locator('button[title*="Retirer"]');
    const minusCount = await minusBtns.count();
    for (let i = 0; i < minusCount; i++) {
      await minusBtns.first().click();
      await page.waitForTimeout(300);
    }
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, '31b-ma-liste-empty.png'), fullPage: true });
    logShot('31b-ma-liste-empty.png', '/ma-liste — État vide');
  } catch (e) { console.warn('ma-liste empty failed', e.message); }

  await page.goto('http://localhost:3000/profile', gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await autoScroll(page);
  await page.screenshot({ path: path.join(outDir, '32-profile.png'), fullPage: true });
  logShot('32-profile.png', '/profile — Page de profil complète');

  await page.goto('http://localhost:3000/login', gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, '33-login.png'), fullPage: true });
  logShot('33-login.png', '/login — Page de connexion');

  await page.goto('http://localhost:3000/register', gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, '34-register.png'), fullPage: true });
  logShot('34-register.png', '/register — Page d\'inscription');

  await page.goto('http://localhost:3000/terms', gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await autoScroll(page);
  await page.screenshot({ path: path.join(outDir, '35-terms.png'), fullPage: true });
  logShot('35-terms.png', '/terms — Conditions générales d\'utilisation');

  // ---- Video Player ----
  await page.goto('http://localhost:3000/watch/banel-adama');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, '36-video-player-intro.png') });
  logShot('36-video-player-intro.png', 'Lecteur vidéo — Carton de titre d\'ouverture');

  await page.waitForTimeout(3000);
  await page.mouse.move(500, 500);
  await page.waitForTimeout(600);
  await autoScroll(page);
  await page.screenshot({ path: path.join(outDir, '37-video-player-mid.png'), fullPage: true });
  logShot('37-video-player-mid.png', 'Lecteur vidéo — Lecture en cours, contrôles + suggestions "Vous aimerez aussi"');

  // ---- Admin back-office (bonus) ----
  try {
    await page.goto('http://localhost:3000/admin', gotoOpts);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(outDir, '38-admin-dashboard.png'), fullPage: true });
    logShot('38-admin-dashboard.png', '/admin — Tableau de bord back-office (catalogue, abonnements)');
  } catch (e) { console.warn('admin capture failed', e.message); }

  await page.goto('http://localhost:3000', gotoOpts);
  await page.waitForTimeout(800);

  await finalizeVideo(context, page, 'WASSA_Tour_Desktop_raw.webm');

  // =========================================================
  // MOBILE TOUR
  // =========================================================
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    recordVideo: { dir: videoRawDir, size: { width: 375, height: 812 } },
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();

  await mobilePage.goto('http://localhost:3000', gotoOpts);
  await mobilePage.evaluate(() => document.fonts.ready);
  await mobilePage.waitForTimeout(1500);
  await mobilePage.screenshot({ path: path.join(outDir, '39-mobile-hero.png') });
  logShot('39-mobile-hero.png', 'Mobile (375px) — Accueil, Hero');

  try {
    await mobilePage.click('[aria-label="Menu"]');
    await mobilePage.waitForTimeout(600);
    await mobilePage.screenshot({ path: path.join(outDir, '40-mobile-menu.png') });
    logShot('40-mobile-menu.png', 'Mobile (375px) — Menu de navigation ouvert');
    await mobilePage.click('[aria-label="Menu"]');
    await mobilePage.waitForTimeout(400);
  } catch (e) { console.warn('mobile menu failed', e.message); }

  await autoScroll(mobilePage);
  await mobilePage.screenshot({ path: path.join(outDir, '41-mobile-grid.png'), fullPage: true });
  logShot('41-mobile-grid.png', 'Mobile (375px) — Défilement complet de la page d\'accueil');

  await mobilePage.goto('http://localhost:3000/movies', gotoOpts);
  await mobilePage.evaluate(() => document.fonts.ready);
  await autoScroll(mobilePage);
  await mobilePage.screenshot({ path: path.join(outDir, '42-mobile-catalog.png'), fullPage: true });
  logShot('42-mobile-catalog.png', 'Mobile (375px) — Catalogue de films');

  await mobilePage.goto('http://localhost:3000/watch/banel-adama', gotoOpts);
  await mobilePage.waitForTimeout(3000);
  await mobilePage.mouse.move(100, 100);
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({ path: path.join(outDir, '43-mobile-player.png') });
  logShot('43-mobile-player.png', 'Mobile (375px) — Lecteur vidéo');

  await mobilePage.goto('http://localhost:3000', gotoOpts);
  await mobilePage.waitForTimeout(500);

  await finalizeVideo(mobileContext, mobilePage, 'WASSA_Tour_Mobile_raw.webm');

  await browser.close();

  fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  let md = '# WASSA Presentation Screenshots\n\n';
  manifest.forEach((m) => {
    md += `- **${m.filename}**: ${m.description}\n`;
  });
  fs.writeFileSync(path.join(outDir, 'manifest.md'), md);

  console.log('Tour complete. Screenshots + videos saved to presentation-assets/');
}

run().catch((e) => {
  console.error('FATAL:', e);
  process.exit(1);
});
