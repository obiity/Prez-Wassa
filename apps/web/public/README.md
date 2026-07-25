# Conventions des Ressources Publiques (Assets)

Ce dossier contient toutes les ressources statiques de l'application WASSA, notamment les affiches de films et séries.

## ⚠️ RÈGLE STRICTE DE NOMMAGE DES AFFICHES (POSTERS)

Pour éviter tout bug de collision ou d'écrasement de fichiers (où plusieurs films pointeraient vers la même affiche), **la convention suivante doit être impérativement respectée pour tout nouvel ajout** :

1. **Format Kebab-Case** : Le nom du fichier doit être une version "slugifiée" du titre exact de l'œuvre.
   - Tout en minuscules.
   - Les espaces sont remplacés par des tirets (`-`).
   - Les caractères spéciaux, accents et apostrophes doivent être retirés.
   - **Exemples :**
     - *Living in Bondage* ➔ `living-in-bondage.jpg`
     - *Le Miracle du Saint Inconnu* ➔ `le-miracle-du-saint-inconnu.jpg`
     - *A peine j'ouvre les yeux* ➔ `a-peine-jouvre-les-yeux.jpg`

2. **Unicité Absolue** : Aucun film ou série ne doit partager un fichier image générique (ex: `placeholder.jpg` ou `default.png`). Chaque titre doit posséder son propre fichier, même s'il s'agit d'une image temporaire générée.

3. **Liaison CMS / Data** : Le chemin défini dans `imageUrl` au niveau des données (ex: `page.tsx` ou CMS) doit strictement correspondre à ce nom unique : `imageUrl: "/slug-du-film.jpg"`.

Le non-respect de cette règle entraînera des écrasements lors du déploiement ou des conflits d'affichage dans le catalogue.
