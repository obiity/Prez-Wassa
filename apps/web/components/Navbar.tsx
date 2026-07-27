"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { Search, Bell, User, LogOut, Settings, List, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { EXCLUSIVES_MOVIES, TRENDING_MOVIES, CLASSIC_MOVIES, WASSA_SERIES, NOLLYWOOD_MOVIES, IVOIRIAN_MOVIES, MALIAN_MOVIES, NORTH_AFRICAN_MOVIES, PANAFRICAN_MOVIES, DOCUMENTARIES } from "@/lib/data";

const ALL_CONTENT = [
  ...EXCLUSIVES_MOVIES,
  ...TRENDING_MOVIES,
  ...CLASSIC_MOVIES,
  ...WASSA_SERIES,
  ...NOLLYWOOD_MOVIES,
  ...IVOIRIAN_MOVIES,
  ...MALIAN_MOVIES,
  ...NORTH_AFRICAN_MOVIES,
  ...PANAFRICAN_MOVIES,
  ...DOCUMENTARIES
];

const iconButtonClass = "relative w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-full text-black dark:text-white hover:bg-brand-primary/10 hover:text-brand-primary dark:hover:bg-brand-primary/20 dark:hover:text-brand-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-primary";
const iconSizeClass = "w-5 h-5 md:w-[22px] md:h-[22px]";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // New state for dropdowns
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Fake auth state to handle both logged-in and guest flows
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  const router = useRouter();
  const notifRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return ALL_CONTENT.filter(item => {
      return item.title.toLowerCase().includes(q) || item.genres.some(g => g.toLowerCase().includes(q));
    }).slice(0, 5);
  }, [searchQuery]);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsNotificationsOpen(false);
        setIsAccountMenuOpen(false);
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  const handleLogoOrHomeClick = (e: React.MouseEvent) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const logoSrc = mounted && resolvedTheme === "light" 
    ? "/logo-color.png" 
    : "/logo-white.png";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-secondary/80 backdrop-blur-xl shadow-2xl" 
          : "bg-gradient-to-b from-white/90 via-white/40 to-transparent dark:from-black/90 dark:via-black/40 dark:to-transparent"
      }`}
    >
      <div className="relative z-50 max-w-[1600px] mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-12">
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden ${iconButtonClass}`}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <X className={iconSizeClass} strokeWidth={2} />
            ) : (
              <Menu className={iconSizeClass} strokeWidth={2} />
            )}
          </button>

          <Link href="/" onClick={handleLogoOrHomeClick}>
            <img 
              src={logoSrc} 
              alt="WASSA Logo" 
              className="h-9 md:h-11 w-auto object-contain transition-all duration-300" 
            />
          </Link>

          <div className="hidden md:flex items-center gap-8 text-[15px] font-sans font-medium text-muted">
            <Link href="/" onClick={handleLogoOrHomeClick} className="hover:text-foreground hover:scale-105 transition-all">Accueil</Link>
            <Link href="/tv" className="hover:text-foreground hover:scale-105 transition-all flex items-center gap-1.5 font-semibold text-foreground">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              TV Direct
            </Link>
            <Link href="/series" className="hover:text-foreground hover:scale-105 transition-all">Séries</Link>
            <Link href="/movies" className="hover:text-foreground hover:scale-105 transition-all">Films</Link>
            <Link href="/documentaires" className="hover:text-foreground hover:scale-105 transition-all">Documentaires</Link>
            <Link href="/afrique" className="hover:text-foreground hover:scale-105 transition-all">Afrique</Link>
            <Link href="/ma-liste" className="hover:text-foreground hover:scale-105 transition-all">Ma Liste</Link>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
          {/* 1. Search (Aligned Inline with Header) */}
          <div className="relative flex items-center" ref={searchRef}>
            <AnimatePresence mode="wait">
              {!isSearchOpen ? (
                <motion.button 
                  key="search-btn"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setIsSearchOpen(true)}
                  className={iconButtonClass} 
                  aria-label="Recherche"
                >
                  <Search className={iconSizeClass} strokeWidth={2} />
                </motion.button>
              ) : (
                <motion.form 
                  key="search-bar"
                  initial={{ opacity: 0, scaleX: 0.8 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  exit={{ opacity: 0, scaleX: 0.8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex items-center gap-2 h-10 md:h-11 bg-white/90 dark:bg-[#121212] border border-gray-200 dark:border-white/20 rounded-full px-3.5 shadow-md w-[180px] sm:w-[240px] md:w-[280px] focus-within:border-brand-primary focus-within:ring-1 focus-within:ring-brand-primary"
                  onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) { router.push(`/search?q=${encodeURIComponent(searchQuery)}`); setIsSearchOpen(false); } }}
                >
                  <Search className="w-4 h-4 text-brand-primary shrink-0" />
                  <input 
                    autoFocus
                    type="text" 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Films, séries..."
                    className="w-full bg-transparent border-none outline-none text-xs md:text-sm text-foreground placeholder:text-muted/60 font-sans"
                  />
                  <button 
                    type="button" 
                    onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                    className="text-muted hover:text-foreground shrink-0 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                    aria-label="Fermer la recherche"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
            
            {/* Search Dropdown Overlay */}
            <AnimatePresence>
              {isSearchOpen && searchQuery.trim().length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="fixed left-4 right-4 top-24 sm:absolute sm:right-0 sm:top-full sm:mt-2 w-auto sm:w-80 md:w-96 max-w-md mx-auto sm:mx-0 bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
                >
                  {searchResults.length > 0 ? (
                    <div className="max-h-[60vh] overflow-y-auto py-2">
                      {searchResults.map(result => (
                        <Link 
                          key={result.id} 
                          href={`/${result.type === 'serie' ? 'series' : 'movie'}/${result.id}`}
                          onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                        >
                          <img src={result.imageUrl} alt={result.title} className="w-12 h-16 object-cover rounded" />
                          <div>
                            <p className="text-sm font-medium text-foreground line-clamp-1">{result.title}</p>
                            <p className="text-xs text-muted">{result.year} • {result.genres.slice(0,2).join(", ")}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-6 text-center text-sm text-muted">
                      Aucun résultat pour "{searchQuery}"
                    </div>
                  )}
                  
                  {/* Footer link to advanced search */}
                  <div className="border-t border-gray-100 dark:border-white/10 p-2">
                    <Link 
                      href={`/search?q=${encodeURIComponent(searchQuery)}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="block text-center text-xs text-brand-primary font-medium hover:underline py-1"
                    >
                      Recherche avancée
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 2. Theme Toggle */}
          <ThemeSwitcher />

          {/* 3. Notifications */}
          <div className="relative" ref={notifRef}>
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className={iconButtonClass} 
              aria-label="Notifications"
            >
              <Bell className={iconSizeClass} strokeWidth={2} />
              {/* Unread badge */}
              <span className="absolute top-1 right-1 md:top-2 md:right-2 w-2 h-2 md:w-2.5 md:h-2.5 bg-brand-primary rounded-full border-2 border-white dark:border-[#121212]"></span>
            </button>
            
            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="fixed left-4 right-4 top-24 sm:absolute sm:top-full sm:left-auto sm:right-0 sm:mt-2 w-auto sm:w-80 max-w-sm mx-auto sm:mx-0 bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-gray-100 dark:border-white/10 flex justify-between items-center">
                    <h3 className="font-semibold text-foreground">Notifications</h3>
                    <span className="text-xs text-brand-primary bg-brand-primary/10 px-2 py-1 rounded-full font-medium">1 nouvelle</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto p-2">
                    <div className="p-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer flex gap-3 items-start">
                      <div className="w-2 h-2 mt-2 rounded-full bg-brand-primary shrink-0 shadow-[0_0_8px_rgba(255,106,0,0.8)]"></div>
                      <div>
                        <p className="text-sm text-foreground font-medium mb-1">Nouveau contenu ajouté à Nouveautés Exclusives</p>
                        <p className="text-xs text-muted">Il y a 2 heures</p>
                        <p className="text-[10px] text-gray-400 mt-1 italic">(Donnée fictive)</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Persistent "S'abonner" CTA */}
          <Link
            href="/#tarifs"
            className="hidden sm:inline-flex px-6 py-2.5 md:px-8 md:py-3 text-sm md:text-base font-extrabold font-sans rounded-full bg-brand-primary text-black hover:bg-brand-hover transition-all shadow-glow-primary hover:shadow-[0_0_20px_rgba(255,106,0,0.6)] hover:scale-105 active:scale-95 flex-shrink-0 tracking-wide"
          >
            S'abonner
          </Link>

          {/* 4. Account */}
          <div className="relative" ref={accountRef}>
            <button 
              onClick={() => {
                if (isLoggedIn) {
                  setIsAccountMenuOpen(!isAccountMenuOpen);
                } else {
                  router.push("/login");
                }
              }}
              className={iconButtonClass} 
              aria-label="Profil"
            >
              <User className={iconSizeClass} strokeWidth={2} />
            </button>

            <AnimatePresence>
              {isAccountMenuOpen && isLoggedIn && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 py-2"
                >
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-white/10 mb-1">
                    <p className="text-sm font-semibold text-foreground">Mon Compte</p>
                    <p className="text-xs text-muted truncate">utilisateur@wassa.sn</p>
                  </div>
                  <div className="flex flex-col">
                    <Link 
                      href="/profile" 
                      onClick={() => setIsAccountMenuOpen(false)}
                      className="px-4 py-2.5 text-sm text-foreground hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-3 transition-colors focus:bg-gray-50 dark:focus:bg-white/5 outline-none"
                    >
                      <User className="w-4 h-4 text-muted-foreground" /> Profil
                    </Link>
                    <Link 
                      href="/ma-liste" 
                      onClick={() => setIsAccountMenuOpen(false)}
                      className="px-4 py-2.5 text-sm text-foreground hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-3 transition-colors focus:bg-gray-50 dark:focus:bg-white/5 outline-none"
                    >
                      <List className="w-4 h-4 text-muted-foreground" /> Ma Liste
                    </Link>
                    <Link 
                      href="#" 
                      onClick={() => setIsAccountMenuOpen(false)}
                      className="px-4 py-2.5 text-sm text-foreground hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-3 transition-colors focus:bg-gray-50 dark:focus:bg-white/5 outline-none"
                    >
                      <Settings className="w-4 h-4 text-muted-foreground" /> Gérer mon abonnement
                    </Link>
                    <div className="h-px bg-gray-100 dark:bg-white/10 my-1"></div>
                    <button 
                      onClick={() => {
                        setIsLoggedIn(false);
                        setIsAccountMenuOpen(false);
                        router.push("/login");
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-3 transition-colors focus:bg-red-50 dark:focus:bg-red-500/10 outline-none"
                    >
                      <LogOut className="w-4 h-4" /> Se déconnecter
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-screen h-[100dvh] z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="absolute left-0 top-0 h-full w-[80%] max-w-sm bg-white dark:bg-[#0a0a0a] shadow-2xl flex flex-col pt-28 pb-8 px-8 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-6 text-xl font-medium text-foreground">
                <Link href="/" onClick={(e) => { handleLogoOrHomeClick(e); setIsMobileMenuOpen(false); }} className="hover:text-brand-primary transition-colors">Accueil</Link>
                <Link href="/tv" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-primary transition-colors flex items-center gap-2 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                  TV en Direct
                </Link>
                <Link href="/series" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-primary transition-colors">Séries</Link>
                <Link href="/movies" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-primary transition-colors">Films</Link>
                <Link href="/documentaires" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-primary transition-colors">Documentaires</Link>
                <Link href="/afrique" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-primary transition-colors">Afrique</Link>
                <Link href="/categories" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-primary transition-colors">Catégories</Link>
                
                <div className="h-px bg-gray-200 dark:bg-white/10 my-2"></div>

                <Link 
                  href="/#tarifs" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="w-full text-center py-3 px-6 rounded-full bg-brand-primary text-black font-extrabold text-base uppercase tracking-wider shadow-glow-primary hover:bg-brand-hover transition-all"
                >
                  S'abonner
                </Link>
                
                <Link href="/ma-liste" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-primary transition-colors">Ma Liste</Link>
                
                {isLoggedIn ? (
                  <>
                    <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-primary transition-colors">Profil</Link>
                    <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-primary transition-colors">Gérer mon abonnement</Link>
                    <button 
                      onClick={() => { setIsLoggedIn(false); setIsMobileMenuOpen(false); router.push("/login"); }}
                      className="text-left text-red-600 dark:text-red-500 hover:text-red-700 transition-colors"
                    >
                      Se déconnecter
                    </button>
                  </>
                ) : (
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-primary transition-colors">Se connecter</Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
