import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const assetsDir = path.resolve('../../presentation-assets');
const manifestPath = path.join(assetsDir, 'manifest.json');
const outPdf = path.join(assetsDir, 'WASSA_Presentation_Premium.pdf');

if (!fs.existsSync(manifestPath)) {
  console.error("manifest.json introuvable ! Exécutez d'abord capture.js.");
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Read the logo
const logoPath = path.resolve('public/logo-white.png');
let logoBase64 = '';
if (fs.existsSync(logoPath)) {
  logoBase64 = fs.readFileSync(logoPath).toString('base64');
}
const logoSrc = `data:image/png;base64,${logoBase64}`;

// Read the closing mockup (laptop/tablet/phone) image
const mockupPath = path.resolve('public/Mockup1.png');
let mockupBase64 = '';
if (fs.existsSync(mockupPath)) {
  mockupBase64 = fs.readFileSync(mockupPath).toString('base64');
}
const mockupSrc = `data:image/png;base64,${mockupBase64}`;

// Générer le HTML
let htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Présentation WASSA</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
    
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', -apple-system, sans-serif;
      background-color: #050505;
      color: #FFFFFF;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    .page {
      width: 1920px;
      height: 1080px;
      page-break-after: always;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    /* Cover Page */
    .cover {
      background: radial-gradient(circle at center, rgba(255,106,0,0.15) 0%, rgba(5,5,5,1) 60%), #050505;
      align-items: center;
      justify-content: center;
    }
    
    .cover-logo {
      width: 500px;
      margin-bottom: 40px;
      filter: drop-shadow(0 20px 40px rgba(255, 106, 0, 0.2));
    }
    
    .cover h2 {
      font-size: 42px;
      font-weight: 300;
      letter-spacing: 2px;
      margin: 0;
      color: rgba(255, 255, 255, 0.8);
      text-transform: uppercase;
    }
    
    .cover .accent-line {
      width: 80px;
      height: 4px;
      background: linear-gradient(90deg, #FF8A00, #E65100);
      margin-top: 40px;
      border-radius: 2px;
    }

    /* Closing Page */
    .closing {
      background: linear-gradient(135deg, #FFB347 0%, #FF8A00 45%, #E63900 100%);
      align-items: center;
      justify-content: center;
    }

    .closing-mockup {
      max-width: 1400px;
      max-height: 640px;
      width: auto;
      height: auto;
      object-fit: contain;
      filter: drop-shadow(0 40px 80px rgba(0,0,0,0.35));
    }

    .closing-logo {
      height: 70px;
      margin-top: 20px;
    }

    .closing-slogan {
      font-size: 22px;
      font-weight: 600;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: rgba(255,255,255,0.95);
      margin-top: 14px;
      border-top: 1px solid rgba(255,255,255,0.6);
      padding-top: 14px;
    }

    /* Standard Slide */
    .slide {
      background-color: #050505;
      padding: 60px 80px;
    }
    
    /* Subtle background grid/glow for depth */
    .slide::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: radial-gradient(circle at top right, rgba(255,106,0,0.03) 0%, transparent 50%);
      pointer-events: none;
      z-index: 0;
    }
    
    .slide-content-wrapper {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .slide-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 50px;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      padding-bottom: 30px;
    }

    .slide-header-left {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .slide-icon-box {
      width: 12px;
      height: 40px;
      background: linear-gradient(180deg, #FF8A00, #E65100);
      border-radius: 4px;
    }

    .slide-title {
      font-size: 38px;
      font-weight: 600;
      color: #FFFFFF;
      margin: 0;
      letter-spacing: -0.5px;
    }
    
    .slide-logo {
      height: 36px;
      opacity: 0.6;
    }
    
    .image-container {
      flex: 1;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #000000;
      border-radius: 20px;
      border: 1px solid rgba(255,255,255,0.05);
      box-shadow: 0 40px 100px rgba(0,0,0,0.8), 0 0 60px rgba(255, 106, 0, 0.05);
      overflow: hidden;
      position: relative;
    }

    .image-container img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      /* if image is smaller, it's centered, if bigger, it fits. */
    }
    
    /* Footer */
    .footer {
      margin-top: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
      color: rgba(255,255,255,0.3);
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }
  </style>
</head>
<body>

  <!-- Page de couverture -->
  <div class="page cover">
    <img src="${logoSrc}" class="cover-logo" alt="WASSA Logo" />
    <h2>Le Sénégal vous suit partout.</h2>
    <div class="accent-line"></div>
  </div>
`;

let pageNum = 1;
manifest.forEach((item, index) => {
  const imagePath = path.join(assetsDir, item.filename);
  if (fs.existsSync(imagePath)) {
    const imgData = fs.readFileSync(imagePath).toString('base64');
    const ext = item.filename.split('.').pop();
    const imgSrc = `data:image/${ext};base64,${imgData}`;
    
    htmlContent += `
      <div class="page slide">
        <div class="slide-content-wrapper">
          <div class="slide-header">
            <div class="slide-header-left">
              <div class="slide-icon-box"></div>
              <h2 class="slide-title">${item.description}</h2>
            </div>
            <img src="${logoSrc}" class="slide-logo" alt="Wassa" />
          </div>
          
          <div class="image-container">
            <img src="${imgSrc}" alt="${item.description}" />
          </div>
          
          <div class="footer">
            <span>Interface Overview — 2026</span>
            <span>Page ${String(pageNum).padStart(2, '0')}</span>
          </div>
        </div>
      </div>
    `;
    pageNum++;
  }
});

// Page de clôture
htmlContent += `
  <div class="page closing">
    <img src="${mockupSrc}" class="closing-mockup" alt="WASSA sur tous les écrans" />
    <img src="${logoSrc}" class="closing-logo" alt="WASSA Logo" style="filter: brightness(0) invert(1);" />
    <div class="closing-slogan">Le Sénégal vous suit partout</div>
  </div>
`;

htmlContent += `
</body>
</html>
`;

async function generatePdf() {
  console.log('Génération du PDF en cours...');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Charger le HTML directement en mémoire (évite tout problème d'encodage
  // lié à la lecture d'un fichier local via file://, qui corrompait les
  // accents français - é/è/ê rendus en mojibake "Ã©" etc.)
  await page.setContent(htmlContent, { waitUntil: 'networkidle' });

  // Générer le PDF (1920x1080 = format 16:9)
  await page.pdf({
    path: outPdf,
    width: '1920px',
    height: '1080px',
    printBackground: true,
    pageRanges: '' // toutes les pages
  });

  await browser.close();

  console.log('PDF généré avec succès :', outPdf);
}

generatePdf().catch(console.error);
