import fs from 'fs';
import path from 'path';

const publicDir = 'd:\\Wassa\\apps\\web\\public';

const fileMappings = {
  "Atlantique.jpeg": "atlantique.jpeg",
  "Baabel.jpg": "baabel.jpg",
  "Banel & Adama2.jpg": "banel-et-adama.jpg",
  "Borom-Sarret.jpeg": "borom-sarret.jpeg",
  "Camp Thiaroye.jpg": "camp-de-thiaroye.jpg",
  "Ceddo.jpeg": "ceddo.jpeg",
  "Dahomey.jpg": "dahomey.jpg",
  "Demba.jpg": "demba.jpg",
  "Des étoiles.jpg": "des-etoiles.jpg",
  "Félicité.jpg": "felicite.jpg",
  "GOLDEN.jpg": "golden.jpg",
  "Guélwar.jpg": "guelwaar.jpg",
  "Hyènes.jpeg": "hyenes.jpeg",
  "Karma.jpg": "karma.jpg",
  "Karmen Gei.jpg": "karmen-gei.jpg",
  "L'absence.jpg": "labsence.jpg",
  "La Noire De.jpg": "la-noire-de.jpg",
  "Le Franc.jpg": "le-franc.jpg",
  "Le Mandat.jpg": "le-mandat.jpg",
  "Le Pere de Nafi.jpg": "le-pere-de-nafi.jpg",
  "Le mouton de Sada.jpg": "le-mouton-de-sada.jpg",
  "Madame brouette.jpg": "madame-brouette.jpg",
  "Maitresse d'un homme marié.jpg": "maitresse-dun-homme-marie.jpg",
  "Moolaadé.jpg": "moolaade.jpg",
  "Sakho & Mangane.jpg": "sakho-et-mangane.jpg",
  "Saloum.jpg": "saloum.jpg",
  "Tableau-ferraille.jpg": "tableau-ferraille.jpg",
  "Tey (Aujourd'hui).jpg": "tey-aujourdhui.jpg",
  "Tirailleurs.jpg": "tirailleurs.jpg",
  "Touki Bouki.jpg": "touki-bouki.jpg",
  "Un Café Avec.png": "un-cafe-avec.png",
  "Un-transport-en-commun.jpg": "un-transport-en-commun.jpg",
  "Wara.jpg": "wara.jpg",
  "Wiri Wiri.jpg": "wiri-wiri.jpg",
  "Xala.jpg": "xala.jpg",
  "Xalé.png": "xale.png",
  "Yao.jpg": "yao.jpg",
  "idoles.png": "idoles.png",
  "images-original.jpg": "la-pirogue.jpg",
  "infidele.png": "infideles.png"
};

for (const [oldName, newName] of Object.entries(fileMappings)) {
  const oldPath = path.join(publicDir, oldName);
  const newPath = path.join(publicDir, newName);
  
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: "${oldName}" -> "${newName}"`);
  } else {
    console.warn(`File not found: "${oldName}"`);
  }
}

console.log("Renaming complete.");
