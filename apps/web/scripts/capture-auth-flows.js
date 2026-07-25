import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('../../presentation-assets');

let manifest = [];
const manifestPath = path.join(outDir, 'manifest.json');
if (fs.existsSync(manifestPath)) {
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
}

function logShot(filename, description) {
  console.log('Captured:', filename);
  manifest = manifest.filter((m) => m.filename !== filename);
  manifest.push({ filename, description });
}

const gotoOpts = { waitUntil: 'networkidle', timeout: 30000 };

async function run() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await context.newPage();

  await page.goto('http://localhost:3000', gotoOpts);
  await page.evaluate(() => localStorage.setItem('theme', 'dark'));
  await page.reload(gotoOpts);
  await page.evaluate(() => document.fonts.ready);

  // =========================================================
  // Re-verify header dropdowns fresh (search / notifications / account)
  // =========================================================
  const clipRegion = { x: 0, y: 0, width: 1440, height: 450 };
  try {
    await page.click('[aria-label="Recherche"]');
    await page.waitForTimeout(500);
    await page.fill('input[placeholder="Films, séries..."]', 'banel');
    await page.waitForTimeout(900);
    await page.screenshot({ path: path.join(outDir, '17c-header-search-results.png'), clip: clipRegion });
    logShot('17c-header-search-results.png', 'Header — Résultats de recherche en direct (dropdown)');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
  } catch (e) { console.warn('search recapture failed', e.message); }

  try {
    await page.click('[aria-label="Notifications"]');
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outDir, '18-header-notifications.png'), clip: clipRegion });
    logShot('18-header-notifications.png', 'Header — Dropdown Notifications');
    await page.mouse.click(700, 600);
    await page.waitForTimeout(400);
  } catch (e) { console.warn('notifications recapture failed', e.message); }

  try {
    await page.click('[aria-label="Profil"]');
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outDir, '19-header-account-menu.png'), clip: clipRegion });
    logShot('19-header-account-menu.png', 'Header — Menu Compte (Profil, Ma Liste, Déconnexion)');
    await page.mouse.click(700, 600);
    await page.waitForTimeout(400);
  } catch (e) { console.warn('account menu recapture failed', e.message); }

  // =========================================================
  // REGISTER SIMULATION (2-step wizard: Phone/OTP -> Profile)
  // =========================================================
  await page.goto('http://localhost:3000/register', gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);

  // Step 1: enter phone number
  await page.fill('input[type="tel"]', '77 123 45 67');
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, '44-register-step1-phone.png') });
  logShot('44-register-step1-phone.png', "Inscription — Étape 1 : saisie du numéro de téléphone");

  await page.click('button[type="submit"]');
  await page.waitForTimeout(600);

  // Step 1b: OTP screen
  await page.fill('input[maxlength="6"]', '123456');
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, '45-register-step1b-otp.png') });
  logShot('45-register-step1b-otp.png', "Inscription — Étape 1 : vérification du code SMS (mode démo)");

  await page.click('button[type="submit"]');
  await page.waitForTimeout(800);

  // Step 2: profile info
  await page.fill('input[placeholder="Ex: Babacar Ndiaye"]', 'Aminata Diop');
  await page.fill('input[type="date"]', '1998-04-12');
  await page.fill('input[placeholder="nom@exemple.com"]', 'aminata.diop@example.com');
  await page.check('input[type="checkbox"]');
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, '46-register-step2-profile.png') });
  logShot('46-register-step2-profile.png', 'Inscription — Étape 2 : profil complété (nom, date de naissance, CGU acceptées)');

  await page.click('button[type="submit"]');
  await page.waitForTimeout(1500); // 800ms simulated delay + redirect + page settle
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(outDir, '47-register-success-home.png') });
  logShot('47-register-success-home.png', "Inscription — Compte créé, redirection automatique vers l'accueil");

  // =========================================================
  // LOGIN SIMULATION — Email & Password method
  // =========================================================
  await page.goto('http://localhost:3000/login', gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);

  await page.click('text=Email & Pass');
  await page.waitForTimeout(400);
  await page.fill('input[type="email"]', 'aminata.diop@example.com');
  await page.fill('input[type="password"]', 'MotDePasse123!');
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(outDir, '48-login-email-filled.png') });
  logShot('48-login-email-filled.png', 'Connexion — Onglet Email & Mot de passe rempli');

  await page.click('button[type="submit"]');
  await page.waitForTimeout(1000);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(outDir, '49-login-email-success-home.png') });
  logShot('49-login-email-success-home.png', "Connexion réussie (Email) — Redirection vers l'accueil");

  // =========================================================
  // LOGIN SIMULATION — Phone / SMS OTP method
  // =========================================================
  await page.goto('http://localhost:3000/login', gotoOpts);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);

  await page.fill('input[type="tel"]', '77 123 45 67');
  await page.waitForTimeout(300);
  await page.click('button[type="submit"]');
  await page.waitForTimeout(600);
  await page.fill('input[maxlength="6"]', '123456');
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, '50-login-phone-otp.png') });
  logShot('50-login-phone-otp.png', 'Connexion — Onglet Téléphone : code SMS saisi (mode démo)');

  await page.click('button[type="submit"]');
  await page.waitForTimeout(1000);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(outDir, '51-login-phone-success-home.png') });
  logShot('51-login-phone-success-home.png', "Connexion réussie (Téléphone/SMS) — Redirection vers l'accueil");

  await browser.close();

  manifest.sort((a, b) => a.filename.localeCompare(b.filename, undefined, { numeric: true }));
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  let md = '# WASSA Presentation Screenshots\n\n';
  manifest.forEach((m) => { md += `- **${m.filename}**: ${m.description}\n`; });
  fs.writeFileSync(path.join(outDir, 'manifest.md'), md);

  console.log('Auth flow simulation + dropdown refresh complete.');
}

run().catch((e) => {
  console.error('FATAL:', e);
  process.exit(1);
});
