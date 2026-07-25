# WASSA

> **Le Sénégal vous suit partout.**

---

# PROJECT OVERVIEW

## Présentation

**WASSA** est une plateforme de streaming premium entièrement dédiée aux films, séries, documentaires et contenus audiovisuels sénégalais.

La plateforme a pour mission de promouvoir le cinéma sénégalais auprès du public local et de la diaspora, grâce à une expérience utilisateur moderne, rapide et immersive.

WASSA ne doit pas être une copie de Netflix. Elle possède sa propre identité visuelle inspirée de la culture sénégalaise et de son logo.

---

# OBJECTIFS

Créer la meilleure plateforme de streaming sénégalaise.

L'expérience doit être :

- Premium
- Moderne
- Très rapide
- Élégante
- Intuitive
- Responsive
- Accessible

L'utilisateur doit pouvoir découvrir, rechercher et regarder facilement des films et séries sénégalais sur tous les appareils.

---

# IDENTITÉ DE MARQUE

## Nom

**WASSA**

## Slogan

**Le Sénégal vous suit partout.**

## Valeurs

- Culture
- Authenticité
- Innovation
- Excellence
- Simplicité
- Modernité

---

# DIRECTION ARTISTIQUE

Le design doit être haut de gamme.

Inspirations :

- Apple TV+
- Disney+
- Prime Video
- MUBI

⚠️ Ne pas reproduire l'identité graphique de Netflix.

Créer une identité unique propre à WASSA.

Le noir doit mettre les affiches des films en valeur.

Les couleurs officielles doivent être celles du logo WASSA.

---

# PALETTE DE COULEURS OFFICIELLE

## Orange principal

```
#FF6A00
```

## Orange clair

```
#FF8A00
```

## Orange profond

```
#E65100
```

## Brun WASSA

```
#8B4300
```

## Noir

```
#000000
```

## Gris très sombre

```
#121212
```

## Gris secondaire

```
#232323
```

## Blanc

```
#FFFFFF
```

---

# DÉGRADÉ OFFICIEL

```css
background: linear-gradient(
135deg,
#FF8A00 0%,
#FF6A00 45%,
#E65100 100%
);
```

---

# LOGO

Utiliser principalement la version blanche du logo sur les fonds sombres.

Respecter :

- les proportions
- les couleurs
- les marges de sécurité
- aucune déformation
- aucune rotation
- aucune modification

---

# TYPOGRAPHIE

Police moderne.

Priorité :

- Inter
- Poppins

Titres :

Bold

Textes :

Regular

Interface :

Medium

---

# STYLE UI

Coins arrondis :

12 à 16 px

Animations :

douces

Effets :

subtils

Aucune animation agressive.

---

# BOUTONS

## Primaire

Fond :

Orange WASSA

Texte :

Blanc

Hover :

- léger agrandissement
- glow orange
- transition fluide

---

## Secondaire

Fond transparent

Bordure orange

Texte orange

---

# NAVIGATION

Navbar fixe.

Fond :

Noir semi-transparent.

Effet :

Blur.

Menu :

- Accueil
- Films
- Séries
- Catégories
- Nouveautés
- Ma liste

À droite :

- Recherche
- Notifications
- Profil

---

# PAGE D'ACCUEIL

La page d'accueil doit comporter :

## Hero Banner

Grand film mis en avant.

Affiche plein écran.

Gradient noir pour améliorer la lisibilité.

Informations :

- Titre
- Synopsis
- Genres
- Durée
- Année
- Classification

Boutons :

▶ Regarder

ℹ Plus d'informations

---

## Rangées de contenus

Créer plusieurs sections :

- Tendances
- Nouveautés
- Les plus populaires
- Films
- Séries
- Comédie
- Action
- Drame
- Romance
- Thriller
- Famille
- Documentaires
- Classiques
- Exclusivités WASSA

---

# CARTES DES FILMS

Format :

Poster vertical.

Ratio :

2:3

Coins :

16 px

Hover :

- Zoom léger
- Glow orange
- Affichage des actions

Actions :

- Lire
- Ajouter à ma liste
- Informations

---

# RECHERCHE

Recherche instantanée.

Recherche par :

- titre
- acteur
- réalisateur
- catégorie
- année

Suggestions automatiques.

---

# PAGE FILM

Chaque film contient :

- Affiche
- Bande-annonce
- Synopsis
- Durée
- Année
- Genres
- Réalisateur
- Acteurs
- Pays
- Langues
- Sous-titres
- Note
- Recommandations

Bouton principal :

▶ Regarder

---

# PAGE SÉRIE

Afficher :

- Saisons
- Épisodes
- Durée
- Résumé
- Lecture automatique de l'épisode suivant
- Continuer la lecture

---

# LECTEUR VIDÉO

Fonctionnalités :

- Lecture
- Pause
- Plein écran
- Sous-titres
- Choix de la qualité
- Sélection de la langue
- Avance rapide
- Retour rapide
- Reprendre la lecture
- Contrôle du volume
- Vitesse de lecture

Compatible HLS.

---

# ESPACE UTILISATEUR

Chaque utilisateur possède :

- Photo
- Nom
- Email
- Historique
- Continuer à regarder
- Ma liste
- Paramètres
- Abonnement

---

# AUTHENTIFICATION

Pages :

- Connexion
- Inscription
- Mot de passe oublié

Connexion possible via :

- Email
- Google (optionnel)

---

# ADMINISTRATION

Dashboard complet.

Gestion :

- Films
- Séries
- Catégories
- Utilisateurs
- Abonnements
- Bannières
- Statistiques
- Analytics

---

# PERFORMANCES

Objectifs :

- Lighthouse supérieur à 95
- Lazy Loading
- Images optimisées
- Streaming rapide
- Cache intelligent

---

# SEO

Optimiser :

- Meta Title
- Meta Description
- Open Graph
- Twitter Cards
- Sitemap
- Robots.txt
- URLs propres

---

# RESPONSIVE

Compatible :

- Mobile
- Tablette
- Laptop
- Desktop
- Smart TV (mise en page adaptable)

---

# ACCESSIBILITÉ

Respecter les standards WCAG.

Prévoir :

- navigation clavier
- contraste élevé
- textes lisibles
- attributs ARIA
- focus visible

---

# TECHNOLOGIES RECOMMANDÉES

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion

## Backend

- NestJS

## Base de données

- PostgreSQL

## ORM

- Prisma

## Authentification

- JWT
- OAuth

## Stockage

- AWS S3 ou stockage compatible S3

## Streaming

- HLS
- MPEG-DASH

## Paiement (si abonnement)

- Stripe
- Wave
- Orange Money

---

# STRUCTURE DES PAGES

```
/
├── Accueil
├── Films
├── Séries
├── Catégories
├── Nouveautés
├── Recherche
├── Détails d'un film
├── Détails d'une série
├── Continuer à regarder
├── Ma liste
├── Profil
├── Paramètres
├── Connexion
├── Inscription
├── Mot de passe oublié
└── Administration
```

---

# MICRO-ANIMATIONS

Utiliser des animations discrètes :

- Fade In
- Scale
- Hover
- Smooth Scroll
- Skeleton Loading
- Transitions fluides

---

# EXPÉRIENCE UTILISATEUR

L'utilisateur doit ressentir :

- une plateforme premium
- une navigation fluide
- un chargement rapide
- une mise en avant des œuvres sénégalaises
- une identité visuelle chaleureuse et moderne

Chaque interaction doit être simple, intuitive et élégante.

---

# RÈGLES IMPORTANTES

- Respecter strictement les couleurs du logo WASSA.
- Utiliser principalement le logo blanc sur les fonds sombres.
- Ne jamais copier le design de Netflix.
- Concevoir une identité graphique originale inspirée de la culture sénégalaise.
- Privilégier des animations sobres et des performances élevées.
- L'interface doit être immersive, moderne et orientée vers la découverte des contenus.

---

© WASSA — **Le Sénégal vous suit partout.**