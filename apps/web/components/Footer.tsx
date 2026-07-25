"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Footer() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc = mounted && resolvedTheme === "light" 
    ? "/logo-color.png" 
    : "/logo-white.png";

  return (
    <footer className="w-full bg-secondary text-muted pt-20 pb-12 mt-auto transition-colors duration-300 border-t border-border">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          <div className="col-span-1 md:col-span-4">
            <img 
              src={logoSrc} 
              alt="WASSA Logo" 
              className="h-10 w-auto object-contain mb-6 transition-all duration-300 opacity-80" 
            />
            <p className="font-sans text-sm max-w-sm mb-8 leading-relaxed">
              WASSA est la première plateforme premium dédiée au rayonnement du cinéma sénégalais. 
              Le Sénégal vous suit partout.
            </p>
            <div className="flex gap-5 text-muted">
              <Link href="#" className="hover:text-brand-text hover:-translate-y-1 transition-all duration-300"><FaFacebook size={22} /></Link>
              <Link href="#" className="hover:text-brand-text hover:-translate-y-1 transition-all duration-300"><FaInstagram size={22} /></Link>
              <Link href="#" className="hover:text-brand-text hover:-translate-y-1 transition-all duration-300"><FaTwitter size={22} /></Link>
              <Link href="#" className="hover:text-brand-text hover:-translate-y-1 transition-all duration-300"><FaYoutube size={22} /></Link>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 md:col-start-7">
            <h4 className="text-foreground font-display font-bold tracking-wider uppercase text-xs mb-6 opacity-80">Explorer</h4>
            <ul className="space-y-4 font-sans text-sm">
              <li><Link href="/" className="hover:text-brand-text transition-colors">Accueil</Link></li>
              <li><Link href="/series" className="hover:text-brand-text transition-colors">Séries WASSA</Link></li>
              <li><Link href="/movies" className="hover:text-brand-text transition-colors">Films à l'affiche</Link></li>
              <li><Link href="/documentaires" className="hover:text-brand-text transition-colors">Documentaires</Link></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="text-foreground font-display font-bold tracking-wider uppercase text-xs mb-6 opacity-80">Mentions Légales</h4>
            <ul className="space-y-4 font-sans text-sm">
              <li><Link href="/terms" className="hover:text-brand-text transition-colors">Conditions d'utilisation</Link></li>
              <li><Link href="/privacy" className="hover:text-brand-text transition-colors">Confidentialité</Link></li>
              <li><Link href="/cookies" className="hover:text-brand-text transition-colors">Cookies</Link></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="text-foreground font-display font-bold tracking-wider uppercase text-xs mb-6 opacity-80">Assistance</h4>
            <ul className="space-y-4 font-sans text-sm">
              <li><Link href="/faq" className="hover:text-brand-text transition-colors">Centre d'aide</Link></li>
              <li><Link href="/contact" className="hover:text-brand-text transition-colors">Nous contacter</Link></li>
              <li><Link href="/devices" className="hover:text-brand-text transition-colors">Appareils supportés</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm font-sans gap-4">
          <p>&copy; {new Date().getFullYear()} WASSA. Tous droits réservés.</p>
          <div className="flex gap-6 text-xs">
            <span className="opacity-70">Fait avec ❤️ au Sénégal</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
