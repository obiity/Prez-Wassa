"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

export function Footer() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

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
              {t.footer.slogan}
            </p>
            <div className="flex gap-5 text-muted">
              <Link href="#" className="hover:text-brand-text hover:-translate-y-1 transition-all duration-300"><FaFacebook size={22} /></Link>
              <Link href="#" className="hover:text-brand-text hover:-translate-y-1 transition-all duration-300"><FaInstagram size={22} /></Link>
              <Link href="#" className="hover:text-brand-text hover:-translate-y-1 transition-all duration-300"><FaTwitter size={22} /></Link>
              <Link href="#" className="hover:text-brand-text hover:-translate-y-1 transition-all duration-300"><FaYoutube size={22} /></Link>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 md:col-start-7">
            <h4 className="text-foreground font-display font-bold tracking-wider uppercase text-xs mb-6 opacity-80">{t.footer.explore}</h4>
            <ul className="space-y-4 font-sans text-sm">
              <li><Link href="/" className="hover:text-brand-text transition-colors">{t.footer.home}</Link></li>
              <li><Link href="/series" className="hover:text-brand-text transition-colors">{t.footer.series}</Link></li>
              <li><Link href="/movies" className="hover:text-brand-text transition-colors">{t.footer.movies}</Link></li>
              <li><Link href="/podcasts" className="hover:text-brand-text transition-colors">{t.footer.podcasts}</Link></li>
              <li><Link href="/documentaires" className="hover:text-brand-text transition-colors">{t.footer.documentaries}</Link></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="text-foreground font-display font-bold tracking-wider uppercase text-xs mb-6 opacity-80">{t.footer.legal}</h4>
            <ul className="space-y-4 font-sans text-sm">
              <li><Link href="/terms" className="hover:text-brand-text transition-colors">{t.footer.terms}</Link></li>
              <li><Link href="/privacy" className="hover:text-brand-text transition-colors">{t.footer.privacy}</Link></li>
              <li><Link href="/cookies" className="hover:text-brand-text transition-colors">{t.footer.cookies}</Link></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="text-foreground font-display font-bold tracking-wider uppercase text-xs mb-6 opacity-80">{t.footer.support}</h4>
            <ul className="space-y-4 font-sans text-sm">
              <li><Link href="/faq" className="hover:text-brand-text transition-colors">{t.footer.faq}</Link></li>
              <li><Link href="/contact" className="hover:text-brand-text transition-colors">{t.footer.contact}</Link></li>
              <li><Link href="/devices" className="hover:text-brand-text transition-colors">{t.footer.devices}</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm font-sans gap-4">
          <p>&copy; {new Date().getFullYear()} WASSA. {t.footer.copyright}</p>
        </div>

      </div>
    </footer>
  );
}
