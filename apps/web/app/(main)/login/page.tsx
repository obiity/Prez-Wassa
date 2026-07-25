"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BackButton } from "@/components/BackButton";
import { Phone, Mail, ShieldCheck, ArrowRight, RefreshCw, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const COUNTRY_CODES = [
  { code: "+221", country: "Sénégal", flag: "🇸🇳" },
  { code: "+225", country: "Côte d'Ivoire", flag: "🇨🇮" },
  { code: "+223", country: "Mali", flag: "🇲🇱" },
  { code: "+224", country: "Guinée", flag: "🇬🇳" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+1", country: "États-Unis", flag: "🇺🇸" },
];

export default function LoginPage() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");

  // Phone state
  const [countryCode, setCountryCode] = useState("+221");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [cooldown, setCooldown] = useState(0);

  // Email state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;
    setOtpSent(true);
    setCooldown(30);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 px-4">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/saloum.jpg" 
          alt="WASSA Login Background" 
          className="w-full h-full object-cover scale-[1.05] filter blur-sm brightness-40"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link href="/">
            <span className="font-display font-bold text-4xl text-brand-primary tracking-tight">WASSA</span>
          </Link>
        </div>

        {/* Frosted Glass Form Card */}
        <div className="relative z-10 w-full p-6 sm:p-10 bg-black/70 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl">
          <div className="mb-6">
            <BackButton variant="auth" />
          </div>

          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
              S'identifier
            </h1>
            <p className="text-gray-400 font-sans text-xs sm:text-sm">
              Accédez à vos films, séries et direct TV sur WASSA.
            </p>
          </div>

          {/* Toggle Login Method Tabs */}
          <div className="flex p-1 rounded-xl bg-white/5 border border-white/10 mb-6">
            <button
              onClick={() => { setLoginMethod("phone"); setOtpSent(false); }}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                loginMethod === "phone" ? "bg-brand-primary text-black shadow-sm" : "text-gray-400 hover:text-white"
              }`}
            >
              <Phone size={14} />
              Téléphone (SMS)
            </button>
            <button
              onClick={() => setLoginMethod("email")}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                loginMethod === "email" ? "bg-brand-primary text-black shadow-sm" : "text-gray-400 hover:text-white"
              }`}
            >
              <Mail size={14} />
              Email & Pass
            </button>
          </div>

          <AnimatePresence mode="wait">
            {/* Phone Login Form */}
            {loginMethod === "phone" && (
              <motion.div
                key="phone-login"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-300 uppercase tracking-wider ml-1 flex items-center gap-1.5">
                        <Phone size={14} className="text-brand-primary" />
                        Numéro de téléphone
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="bg-white/10 border border-white/20 text-white rounded-xl px-3 py-4 text-sm font-sans outline-none focus:ring-2 focus:ring-brand-primary"
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code} className="bg-black text-white">
                              {c.flag} {c.code}
                            </option>
                          ))}
                        </select>

                        <input
                          type="tel"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="77 123 45 67"
                          className="flex-1 bg-white/5 border border-white/10 text-white text-base rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent font-sans placeholder:text-gray-500"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!phoneNumber.trim()}
                      className="w-full bg-brand-primary hover:bg-brand-hover disabled:opacity-50 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] shadow-glow-primary active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Recevoir le code SMS
                      <ArrowRight size={18} />
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-5">
                    <div className="p-3 rounded-xl bg-brand-primary/10 border border-brand-primary/30 flex items-start gap-2 text-xs text-brand-primary mb-2">
                      <Info size={16} className="flex-shrink-0 mt-0.5" />
                      <span>Code SMS envoyé au <strong>{countryCode} {phoneNumber}</strong>. (Entrez <strong>123456</strong> en démo).</span>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-300 uppercase tracking-wider ml-1">
                        Code SMS (6 chiffres)
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        autoFocus
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                        placeholder="123456"
                        className="w-full bg-white/5 border border-white/10 text-white text-center tracking-[0.5em] text-2xl font-mono rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-brand-primary font-sans"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={otpCode.length < 4}
                      className="w-full bg-brand-primary hover:bg-brand-hover disabled:opacity-50 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] shadow-glow-primary active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Connexion
                      <ShieldCheck size={18} />
                    </button>
                  </form>
                )}
              </motion.div>
            )}

            {/* Email Login Form */}
            {loginMethod === "email" && (
              <motion.div
                key="email-login"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <form onSubmit={handleEmailLogin} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider ml-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nom@exemple.com"
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-brand-primary font-sans placeholder:text-gray-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider ml-1">
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-brand-primary font-sans placeholder:text-gray-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-primary hover:bg-brand-hover text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] shadow-glow-primary active:scale-95 cursor-pointer"
                  >
                    Se connecter
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              Nouveau sur WASSA ?{" "}
              <Link href="/register" className="text-white font-bold hover:underline underline-offset-4 decoration-brand-primary">
                Inscrivez-vous maintenant.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
