"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "fr" | "en";

export interface Translations {
  nav: {
    home: string;
    liveTv: string;
    series: string;
    movies: string;
    podcasts: string;
    documentaries: string;
    africa: string;
    myList: string;
    categories: string;
    subscribe: string;
    search: string;
    searchPlaceholder: string;
    noResults: string;
    advancedSearch: string;
    notifications: string;
    notificationsTitle: string;
    newContentAdded: string;
    timeAgo: string;
    account: string;
    profile: string;
    manageSubscription: string;
    signOut: string;
    signIn: string;
    menu: string;
    closeSearch: string;
  };
  hero: {
    featured: string;
    watch: string;
    moreInfo: string;
    topVod: string;
    liveNow: string;
    viewers: string;
    watchLive: string;
    unmute: string;
    mute: string;
    mixedRowTitle: string;
    mixedRowTagline: string;
    mixedRowBadge: string;
  };
  categories: {
    viewAll: string;
    exclusivesTitle: string;
    exclusivesTagline: string;
    trendingTitle: string;
    trendingTagline: string;
    classicsTitle: string;
    classicsTagline: string;
    seriesTitle: string;
    seriesTagline: string;
  };
  movieCard: {
    serie: string;
    season: string;
    addToList: string;
    removeFromList: string;
    watch: string;
  };
  africanCinema: {
    hubBadge: string;
    title: string;
    description: string;
    viewAll: string;
    regions: {
      nollywood: { label: string; tagline: string };
      ivoirian: { label: string; tagline: string };
      malian: { label: string; tagline: string };
      northAfrica: { label: string; tagline: string };
      panafrican: { label: string; tagline: string };
    };
  };
  howItWorks: {
    badge: string;
    title: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  manifesto: {
    badge: string;
    titleMain: string;
    titleSub: string;
    p1: string;
    p2: string;
  };
  pricing: {
    badge: string;
    title: string;
    description: string;
    autoRenew: string;
    active: string;
    inactive: string;
    monthlyBenefit: string;
    oneTimeBenefit: string;
    popularBadge: string;
    plans: {
      mobile: { name: string; price: string; billing: string; description: string; btn: string; features: string[] };
      standard: { name: string; price: string; billing: string; description: string; btn: string; features: string[] };
      premium: { name: string; price: string; billing: string; description: string; btn: string; features: string[] };
    };
  };
  tv: {
    title: string;
    subtitle: string;
    channelsTitle: string;
    scheduleTitle: string;
    liveBadge: string;
    viewers: string;
    watchLive: string;
    currentProgram: string;
    nextProgram: string;
    statusEnded: string;
    statusOngoing: string;
    statusUpcoming: string;
  };
  catalog: {
    moviesTitle: string;
    moviesSubtitle: string;
    seriesTitle: string;
    seriesSubtitle: string;
    allGenres: string;
    genreLabel: string;
    sortBy: string;
    popular: string;
    newest: string;
    az: string;
    noResultsTitle: string;
    noResultsDesc: string;
    resetFilters: string;
  };
  myList: {
    title: string;
    emptyTitle: string;
    emptyDesc: string;
    browseCatalog: string;
  };
  search: {
    title: string;
    subtitle: string;
    inputPlaceholder: string;
    filtersLabel: string;
    director: string;
    year: string;
    country: string;
    allCountries: string;
    trendingTitles: string;
    noResultsTitle: string;
    noResultsDesc: (q: string) => string;
  };
  documentaries: {
    title: string;
    subtitle: string;
  };
  podcasts: {
    title: string;
    subtitle: string;
    listen: string;
    episodes: string;
  };
  detail: {
    match: string;
    watch: string;
    watchSeason1: string;
    trailer: string;
    addToList: string;
    rate: string;
    share: string;
    episodesTab: string;
    detailsTab: string;
    fullSynopsis: string;
    languagesSubtitles: string;
    audioLang: string;
    subLang: string;
    cast: string;
    director: string;
    classification: string;
    notSpecified: string;
    noEpisodes: string;
    season: string;
  };
  watch: {
    youMayAlsoLike: string;
  };
  categoriesPage: {
    title: string;
    subtitle: string;
    items: {
      movies: { title: string; subtitle: string };
      series: { title: string; subtitle: string };
      podcasts: { title: string; subtitle: string };
      classics: { title: string; subtitle: string };
      nollywood: { title: string; subtitle: string };
      ivoirian: { title: string; subtitle: string };
      malian: { title: string; subtitle: string };
      northAfrica: { title: string; subtitle: string };
      drama: { title: string; subtitle: string };
    };
  };
  footer: {
    slogan: string;
    explore: string;
    legal: string;
    support: string;
    home: string;
    series: string;
    movies: string;
    podcasts: string;
    documentaries: string;
    terms: string;
    privacy: string;
    cookies: string;
    faq: string;
    contact: string;
    devices: string;
    copyright: string;
  };
  common: {
    switchLanguage: string;
    french: string;
    english: string;
    back: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  fr: {
    nav: {
      home: "Accueil",
      liveTv: "TV Direct",
      series: "Séries",
      movies: "Films",
      podcasts: "Podcasts",
      documentaries: "Documentaires",
      africa: "Afrique",
      myList: "Ma Liste",
      categories: "Catégories",
      subscribe: "S'abonner",
      search: "Recherche",
      searchPlaceholder: "Films, séries...",
      noResults: "Aucun résultat pour",
      advancedSearch: "Recherche avancée",
      notifications: "Notifications",
      notificationsTitle: "Notifications",
      newContentAdded: "Nouveau contenu ajouté à Nouveautés Exclusives",
      timeAgo: "Il y a 2 heures",
      account: "Mon Compte",
      profile: "Profil",
      manageSubscription: "Gérer mon abonnement",
      signOut: "Se déconnecter",
      signIn: "Se connecter",
      menu: "Menu",
      closeSearch: "Fermer la recherche",
    },
    hero: {
      featured: "En vedette",
      watch: "Regarder",
      moreInfo: "Plus d'informations",
      topVod: "À La Une VOD",
      liveNow: "EN DIRECT",
      viewers: "spectateurs",
      watchLive: "Regarder en direct",
      unmute: "Activer le son",
      mute: "Désactiver le son",
      mixedRowTitle: "Sélection En Direct & À la Une",
      mixedRowTagline: "Vos directs TV et contenus phares du jour en temps réel",
      mixedRowBadge: "4 programmes phares",
    },
    categories: {
      viewAll: "Voir tout",
      exclusivesTitle: "Nouveautés Exclusives",
      exclusivesTagline: "Les dernières pépites et avant-premières en exclusivité sur WASSA",
      trendingTitle: "Films Tendances",
      trendingTagline: "Les œuvres plébiscitées par les spectateurs en ce moment",
      classicsTitle: "Classiques Sénégalais",
      classicsTagline: "Le patrimoine du cinéma sénégalais, restauré pour vous",
      seriesTitle: "Séries Originales WASSA",
      seriesTagline: "Les productions originales au cœur de la culture sénégalaise",
    },
    movieCard: {
      serie: "SÉRIE",
      season: "Saison",
      addToList: "Ajouter à Ma Liste",
      removeFromList: "Retirer de Ma Liste",
      watch: "Regarder",
    },
    africanCinema: {
      hubBadge: "Hub Panafricain",
      title: "Explorez le cinéma africain",
      description: "Découvrez les œuvres majeures des grandes industries cinématographiques du continent.",
      viewAll: "Voir tout le catalogue",
      regions: {
        nollywood: { label: "Nollywood (Nigeria)", tagline: "L'énergie et l'audace de la première industrie cinématographique d'Afrique" },
        ivoirian: { label: "Cinéma Ivoirien", tagline: "Humour, comédies urbaines et drames captivants d'Abidjan" },
        malian: { label: "Cinéma Malien", tagline: "Les récits poétiques et engagés des grands maîtres maliens" },
        northAfrica: { label: "Afrique du Nord", tagline: "Cinéma d'auteur et histoires intenses du Maghreb" },
        panafrican: { label: "Panorama Panafricain", tagline: "Une sélection vibrante des meilleurs longs-métrages du continent" },
      },
    },
    howItWorks: {
      badge: "Comment ça marche",
      title: "Le cinéma à portée de main, où que vous soyez.",
      step1Title: "1. S'abonner",
      step1Desc: "Créez votre compte en quelques clics et choisissez l'offre qui correspond à vos besoins. Pas d'engagement à long terme, résiliez quand vous voulez.",
      step2Title: "2. Choisir votre contenu",
      step2Desc: "Explorez notre catalogue exclusif de films, séries et documentaires sénégalais. Téléchargez vos favoris pour les regarder hors connexion lors de vos déplacements.",
      step3Title: "3. Regarder partout",
      step3Desc: "Profitez d'une qualité allant jusqu'à la 4K Ultra HD sur votre téléviseur, votre ordinateur, votre tablette ou votre smartphone. Le Sénégal vous suit partout.",
    },
    manifesto: {
      badge: "Pourquoi WASSA",
      titleMain: "Le cinéma sénégalais,",
      titleSub: "sans frontières.",
      p1: "Nous avons créé WASSA avec une mission simple : le Sénégal au cœur, l'Afrique en horizon. Si notre ancrage et notre passion première restent les productions sénégalaises, nous voulons offrir une vitrine à toute la richesse du cinéma africain.",
      p2: "Valoriser nos créateurs locaux, raconter nos propres histoires avec authenticité, et reconnecter la diaspora avec sa culture. Bienvenue chez vous.",
    },
    pricing: {
      badge: "Tarifs",
      title: "Choisissez votre abonnement",
      description: "Découvrez nos offres adaptées à tous les budgets. Sans engagement, annulez à tout moment.",
      autoRenew: "Renouvellement automatique :",
      active: "Activé",
      inactive: "Désactivé",
      monthlyBenefit: "Paiement mensuel sans interruption",
      oneTimeBenefit: "Paiement unique sans reconduction",
      popularBadge: "Le plus populaire",
      plans: {
        mobile: {
          name: "Mobile",
          price: "2 000 FCFA",
          billing: "/ mois",
          description: "Idéal pour regarder vos films et séries préférés directement sur votre smartphone.",
          btn: "S'abonner",
          features: [
            "Qualité vidéo Bonne (720p)",
            "1 écran smartphone/tablette",
            "Téléchargements hors ligne",
            "Renouvellement automatique flexible",
            "Avec publicités",
            "Catalogue standard",
          ],
        },
        standard: {
          name: "Standard",
          price: "4 000 FCFA",
          billing: "/ mois",
          description: "L'expérience idéale pour profiter de nos contenus en haute définition.",
          btn: "Choisir Standard",
          features: [
            "Qualité vidéo Excellente (1080p)",
            "2 écrans en simultané",
            "Téléchargements hors ligne",
            "Renouvellement automatique flexible",
            "Sans publicités",
            "Accès aux WASSA Originals",
          ],
        },
        premium: {
          name: "Premium",
          price: "6 500 FCFA",
          billing: "/ mois",
          description: "La meilleure qualité vidéo pour toute la famille, sans compromis.",
          btn: "S'abonner",
          features: [
            "Qualité vidéo Exceptionnelle (4K+HDR)",
            "4 écrans en simultané",
            "Téléchargements hors ligne",
            "Renouvellement automatique flexible",
            "Sans publicités",
            "Accès aux WASSA Originals en avant-première",
          ],
        },
      },
    },
    tv: {
      title: "Télévision en Direct",
      subtitle: "Accédez en direct aux grandes chaînes de télévision sénégalaises et africaines",
      channelsTitle: "Chaînes en Direct",
      scheduleTitle: "Guide des Programmes du Jour",
      liveBadge: "EN DIRECT",
      viewers: "spectateurs",
      watchLive: "Regarder le Direct",
      currentProgram: "En ce moment :",
      nextProgram: "À suivre :",
      statusEnded: "Terminé",
      statusOngoing: "En cours",
      statusUpcoming: "À venir",
    },
    catalog: {
      moviesTitle: "Tous les Films",
      moviesSubtitle: "Tout le catalogue du cinéma sénégalais et africain réuni sur WASSA",
      seriesTitle: "Toutes les Séries",
      seriesSubtitle: "Les grandes sagas dramatiques et comédies captivantes d'Afrique",
      allGenres: "Tous",
      genreLabel: "Genre",
      sortBy: "Trier par",
      popular: "Populaire",
      newest: "Nouveauté",
      az: "A-Z",
      noResultsTitle: "Aucun résultat trouvé",
      noResultsDesc: "Essayez de modifier vos filtres pour voir plus de contenu.",
      resetFilters: "Réinitialiser les filtres",
    },
    myList: {
      title: "Ma Liste",
      emptyTitle: "Votre liste est vide pour l'instant",
      emptyDesc: "Ajoutez des films et séries en appuyant sur + où que vous les trouviez, pour les retrouver facilement ici.",
      browseCatalog: "Parcourir le catalogue",
    },
    search: {
      title: "Recherche",
      subtitle: "Trouvez vos films, séries et acteurs préférés.",
      inputPlaceholder: "Films, séries, acteurs, réalisateurs...",
      filtersLabel: "Filtres avancés",
      director: "Réalisateur",
      year: "Année",
      country: "Pays / Région",
      allCountries: "Tous les pays",
      trendingTitles: "Titres Tendances",
      noResultsTitle: "Aucun résultat trouvé",
      noResultsDesc: (q: string) => `Nous n'avons trouvé aucun film ou série correspondant à "${q}". Essayez de modifier vos termes de recherche.`,
    },
    documentaries: {
      title: "Documentaires",
      subtitle: "Explorez l'histoire, la culture, les grandes figures et les récits authentiques d'Afrique.",
    },
    podcasts: {
      title: "Podcasts WASSA",
      subtitle: "Écoutez des entretiens exclusifs, des débats culturels et des récits passionnants.",
      listen: "Écouter l'épisode",
      episodes: "épisodes",
    },
    detail: {
      match: "Recommandé",
      watch: "Regarder",
      watchSeason1: "Regarder la Saison 1",
      trailer: "Bande-annonce",
      addToList: "Ajouter à ma liste",
      rate: "Évaluer",
      share: "Partager",
      episodesTab: "Épisodes",
      detailsTab: "Détails & Casting",
      fullSynopsis: "Synopsis Complet",
      languagesSubtitles: "Langues & Sous-titres",
      audioLang: "Audio : Wolof, Français",
      subLang: "Sous-titres : Français, Anglais",
      cast: "Casting",
      director: "Réalisation",
      classification: "Classification",
      notSpecified: "Non renseigné",
      noEpisodes: "Aucun épisode n'est disponible pour le moment.",
      season: "Saison",
    },
    watch: {
      youMayAlsoLike: "Vous aimerez aussi",
    },
    categoriesPage: {
      title: "Catégories",
      subtitle: "Parcourez nos collections thématiques et laissez-vous porter par la diversité des œuvres.",
      items: {
        movies: { title: "Films", subtitle: "Le meilleur du cinéma africain." },
        series: { title: "Séries", subtitle: "Des histoires captivantes, épisode après épisode." },
        podcasts: { title: "Podcasts", subtitle: "Émissions audio, débats et récits passionnants du Sénégal." },
        classics: { title: "Classiques Sénégalais", subtitle: "Les œuvres fondatrices de notre patrimoine." },
        nollywood: { title: "Nollywood", subtitle: "Le géant du cinéma africain." },
        ivoirian: { title: "Cinéma Ivoirien", subtitle: "Humour et drame depuis Abidjan." },
        malian: { title: "Cinéma Malien", subtitle: "Poésie et traditions." },
        northAfrica: { title: "Afrique du Nord", subtitle: "Le cinéma maghrébin et égyptien." },
        drama: { title: "Drame", subtitle: "Émotions fortes." },
      },
    },
    footer: {
      slogan: "WASSA est la première plateforme premium dédiée au rayonnement du cinéma Africain. L'Afrique vous suit partout.",
      explore: "Explorer",
      legal: "Mentions Légales",
      support: "Assistance",
      home: "Accueil",
      series: "Séries WASSA",
      movies: "Films à l'affiche",
      podcasts: "Podcasts",
      documentaries: "Documentaires",
      terms: "Conditions d'utilisation",
      privacy: "Confidentialité",
      cookies: "Cookies",
      faq: "Centre d'aide",
      contact: "Nous contacter",
      devices: "Appareils supportés",
      copyright: "Tous droits réservés.",
    },
    common: {
      switchLanguage: "Changer de langue",
      french: "Français",
      english: "English",
      back: "Retour",
    },
  },
  en: {
    nav: {
      home: "Home",
      liveTv: "Live TV",
      series: "Series",
      movies: "Movies",
      podcasts: "Podcasts",
      documentaries: "Documentaries",
      africa: "Africa",
      myList: "My List",
      categories: "Categories",
      subscribe: "Subscribe",
      search: "Search",
      searchPlaceholder: "Movies, series...",
      noResults: "No results for",
      advancedSearch: "Advanced search",
      notifications: "Notifications",
      notificationsTitle: "Notifications",
      newContentAdded: "New content added to Exclusive Releases",
      timeAgo: "2 hours ago",
      account: "My Account",
      profile: "Profile",
      manageSubscription: "Manage subscription",
      signOut: "Sign out",
      signIn: "Sign in",
      menu: "Menu",
      closeSearch: "Close search",
    },
    hero: {
      featured: "Featured",
      watch: "Watch Now",
      moreInfo: "More Info",
      topVod: "Featured VOD",
      liveNow: "LIVE",
      viewers: "viewers",
      watchLive: "Watch Live",
      unmute: "Unmute",
      mute: "Mute",
      mixedRowTitle: "Live & Featured Selection",
      mixedRowTagline: "Your live TV streams and top daily highlights in real-time",
      mixedRowBadge: "4 top programs",
    },
    categories: {
      viewAll: "View all",
      exclusivesTitle: "Exclusive Releases",
      exclusivesTagline: "The latest gems and exclusive premieres on WASSA",
      trendingTitle: "Trending Movies",
      trendingTagline: "Top picks loved by audiences right now",
      classicsTitle: "Senegalese Classics",
      classicsTagline: "The heritage of Senegalese cinema, restored for you",
      seriesTitle: "WASSA Original Series",
      seriesTagline: "Original productions celebrating authentic African storytelling",
    },
    movieCard: {
      serie: "SERIES",
      season: "Season",
      addToList: "Add to My List",
      removeFromList: "Remove from My List",
      watch: "Watch",
    },
    africanCinema: {
      hubBadge: "Pan-African Hub",
      title: "Explore African Cinema",
      description: "Discover acclaimed masterworks from the continent's leading film industries.",
      viewAll: "Browse entire catalog",
      regions: {
        nollywood: { label: "Nollywood (Nigeria)", tagline: "The bold energy and flair of Africa's largest film industry" },
        ivoirian: { label: "Ivorian Cinema", tagline: "Humor, vibrant urban comedies, and gripping dramas from Abidjan" },
        malian: { label: "Malian Cinema", tagline: "Poetic and visionary narratives by Mali's great masters" },
        northAfrica: { label: "North Africa", tagline: "Auteur cinema and powerful stories from the Maghreb" },
        panafrican: { label: "Pan-African Panorama", tagline: "A vibrant selection of the continent's finest feature films" },
      },
    },
    howItWorks: {
      badge: "How it works",
      title: "Cinema at your fingertips, wherever you are.",
      step1Title: "1. Subscribe",
      step1Desc: "Create your account in a few clicks and choose the plan that suits your needs. No long-term commitment, cancel anytime.",
      step2Title: "2. Choose your content",
      step2Desc: "Explore our exclusive catalog of Senegalese films, series, and documentaries. Download your favorites to watch offline on the go.",
      step3Title: "3. Stream everywhere",
      step3Desc: "Enjoy up to 4K Ultra HD on your TV, computer, tablet, or smartphone. Senegal follows you everywhere.",
    },
    manifesto: {
      badge: "Why WASSA",
      titleMain: "Senegalese cinema,",
      titleSub: "without borders.",
      p1: "We created WASSA with a singular mission: Senegal at heart, Africa on the horizon. While our roots and primary passion remain Senegalese productions, we aim to showcase the full richness of African cinema.",
      p2: "Empowering local creators, telling our own stories with authenticity, and reconnecting the diaspora with its heritage. Welcome home.",
    },
    pricing: {
      badge: "Pricing Plans",
      title: "Choose your subscription",
      description: "Explore flexible plans tailored to every budget. No commitment, cancel anytime.",
      autoRenew: "Auto-renewal:",
      active: "Active",
      inactive: "Disabled",
      monthlyBenefit: "Continuous uninterrupted monthly billing",
      oneTimeBenefit: "One-time payment without automatic renewal",
      popularBadge: "Most Popular",
      plans: {
        mobile: {
          name: "Mobile",
          price: "2,000 FCFA",
          billing: "/ month",
          description: "Perfect for streaming your favorite movies and series directly on your smartphone.",
          btn: "Subscribe",
          features: [
            "Good video quality (720p)",
            "1 smartphone/tablet screen",
            "Offline downloads",
            "Flexible auto-renewal",
            "Ad-supported",
            "Standard catalog access",
          ],
        },
        standard: {
          name: "Standard",
          price: "4,000 FCFA",
          billing: "/ month",
          description: "The ideal HD experience for enjoying top content with family and friends.",
          btn: "Choose Standard",
          features: [
            "Excellent video quality (1080p Full HD)",
            "2 simultaneous screens",
            "Offline downloads",
            "Flexible auto-renewal",
            "Ad-free streaming",
            "Full access to WASSA Originals",
          ],
        },
        premium: {
          name: "Premium",
          price: "6,500 FCFA",
          billing: "/ month",
          description: "The ultimate 4K Ultra HD cinematic experience with zero compromises.",
          btn: "Subscribe",
          features: [
            "Exceptional quality (4K Ultra HD + HDR)",
            "4 simultaneous screens",
            "Offline downloads",
            "Flexible auto-renewal",
            "Ad-free streaming",
            "Early access to WASSA Originals premieres",
          ],
        },
      },
    },
    tv: {
      title: "Live Television",
      subtitle: "Stream major Senegalese and African television channels live 24/7",
      channelsTitle: "Live Channels",
      scheduleTitle: "Today's TV Guide & Schedule",
      liveBadge: "LIVE",
      viewers: "viewers",
      watchLive: "Watch Live Stream",
      currentProgram: "Now Playing:",
      nextProgram: "Up Next:",
      statusEnded: "Ended",
      statusOngoing: "Live Now",
      statusUpcoming: "Upcoming",
    },
    catalog: {
      moviesTitle: "All Movies",
      moviesSubtitle: "The complete catalog of Senegalese and African cinema on WASSA",
      seriesTitle: "All Series",
      seriesSubtitle: "Gripping dramatic sagas and hilarious urban comedies from Africa",
      allGenres: "All",
      genreLabel: "Genre",
      sortBy: "Sort by",
      popular: "Popular",
      newest: "Newest",
      az: "A-Z",
      noResultsTitle: "No results found",
      noResultsDesc: "Try adjusting your filters to discover more content.",
      resetFilters: "Reset filters",
    },
    myList: {
      title: "My List",
      emptyTitle: "Your list is currently empty",
      emptyDesc: "Save your favorite movies and series with the + button to quickly find and stream them here.",
      browseCatalog: "Browse Catalog",
    },
    search: {
      title: "Search",
      subtitle: "Find your favorite movies, series, actors, and directors.",
      inputPlaceholder: "Movies, series, actors, directors...",
      filtersLabel: "Advanced Filters",
      director: "Director",
      year: "Year",
      country: "Country / Region",
      allCountries: "All countries",
      trendingTitles: "Trending Titles",
      noResultsTitle: "No results found",
      noResultsDesc: (q: string) => `We couldn't find any movies or series matching "${q}". Try adjusting your search query.`,
    },
    documentaries: {
      title: "Documentaries",
      subtitle: "Explore African history, culture, inspiring figures, and authentic heritage.",
    },
    podcasts: {
      title: "WASSA Podcasts",
      subtitle: "Listen to exclusive interviews, cultural dialogues, and inspiring stories.",
      listen: "Listen to Episode",
      episodes: "episodes",
    },
    detail: {
      match: "Match",
      watch: "Watch Now",
      watchSeason1: "Watch Season 1",
      trailer: "Trailer",
      addToList: "Add to My List",
      rate: "Rate",
      share: "Share",
      episodesTab: "Episodes",
      detailsTab: "Details & Cast",
      fullSynopsis: "Full Synopsis",
      languagesSubtitles: "Languages & Subtitles",
      audioLang: "Audio: Wolof, French",
      subLang: "Subtitles: French, English",
      cast: "Cast",
      director: "Director",
      classification: "Age Rating",
      notSpecified: "Not specified",
      noEpisodes: "No episodes available at the moment.",
      season: "Season",
    },
    watch: {
      youMayAlsoLike: "You may also like",
    },
    categoriesPage: {
      title: "Categories",
      subtitle: "Browse our thematic collections and immerse yourself in rich storytelling.",
      items: {
        movies: { title: "Movies", subtitle: "The finest in African cinema." },
        series: { title: "Series", subtitle: "Gripping stories, episode after episode." },
        podcasts: { title: "Podcasts", subtitle: "Audio talk shows, cultural debates, and stories." },
        classics: { title: "Senegalese Classics", subtitle: "Foundational masterworks of African cinema." },
        nollywood: { title: "Nollywood", subtitle: "The African cinema powerhouse." },
        ivoirian: { title: "Ivorian Cinema", subtitle: "Humor and dramas direct from Abidjan." },
        malian: { title: "Malian Cinema", subtitle: "Poetry and rich traditions." },
        northAfrica: { title: "North Africa", subtitle: "Maghreb and Egyptian cinema." },
        drama: { title: "Drama", subtitle: "Powerful emotions." },
      },
    },
    footer: {
      slogan: "WASSA is the premier streaming platform dedicated to celebrating African cinema worldwide. Africa follows you everywhere.",
      explore: "Explore",
      legal: "Legal",
      support: "Support",
      home: "Home",
      series: "WASSA Series",
      movies: "Featured Movies",
      podcasts: "Podcasts",
      documentaries: "Documentaries",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
      cookies: "Cookie Policy",
      faq: "Help Center",
      contact: "Contact Us",
      devices: "Supported Devices",
      copyright: "All rights reserved.",
    },
    common: {
      switchLanguage: "Switch language",
      french: "Français",
      english: "English",
      back: "Back",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedLang = localStorage.getItem("wassa_lang") as Language | null;
      if (storedLang === "fr" || storedLang === "en") {
        setLanguageState(storedLang);
        document.documentElement.lang = storedLang;
      } else {
        const browserLang = navigator.language.startsWith("en") ? "en" : "fr";
        setLanguageState(browserLang);
        document.documentElement.lang = browserLang;
      }
    } catch (e) {
      console.error("Failed to load language", e);
    }
    setIsLoaded(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("wassa_lang", lang);
      document.documentElement.lang = lang;
    } catch (e) {
      console.error("Failed to save language", e);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "en" : "fr");
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t: TRANSLATIONS[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
