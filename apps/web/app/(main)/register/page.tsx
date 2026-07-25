"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BackButton } from "@/components/BackButton";
import { Check, Phone, ShieldCheck, ArrowRight, RefreshCw, AlertCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const COUNTRY_CODES = [
  { code: "+221", country: "Sénégal", flag: "🇸🇳" },
  { code: "+225", country: "Côte d'Ivoire", flag: "🇨🇮" },
  { code: "+223", country: "Mali", flag: "🇲🇱" },
  { code: "+224", country: "Guinée", flag: "🇬🇳" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+1", country: "États-Unis", flag: "🇺🇸" },
];

export default function RegisterPage() {
  const router = useRouter();

  // Wizard Step: 1 = Phone & OTP, 2 = Minimal Profile
  const [step, setStep] = useState<1 | 2>(1);

  // Step 1 State
  const [countryCode, setCountryCode] = useState("+221");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpError, setOtpError] = useState("");
  const [cooldown, setCooldown] = useState(0);

  // Step 2 State
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cooldown timer for OTP Resend
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim() || phoneNumber.length < 6) return;
    setOtpSent(true);
    setCooldown(30);
    setOtpError("");
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    // Accept 123456 or any 6-digit code for demo
    if (otpCode.length < 4) {
      setOtpError("Veuillez entrer un code à 6 chiffres.");
      return;
    }
    // Proceed to Step 2
    setStep(2);
  };

  const handleResendOtp = () => {
    if (cooldown > 0) return;
    setCooldown(30);
    setOtpError("");
    setOtpCode("");
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !birthDate || !termsAccepted) return;
    setIsSubmitting(true);

    setTimeout(() => {
      router.push("/");
    }, 800);
  };

  const isStep2Valid = fullName.trim().length > 1 && birthDate !== "" && termsAccepted;

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 px-4">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/saloum.jpg" 
          alt="WASSA Auth Background" 
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

        {/* 2-Step Progress Indicator */}
        <div className="mb-6 flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-sans font-bold text-xs ${
              step === 1 ? "bg-brand-primary text-black shadow-glow-primary" : "bg-green-600 text-white"
            }`}>
              {step > 1 ? <Check size={16} /> : "1"}
            </div>
            <span className={`text-xs font-sans font-semibold ${step === 1 ? "text-white" : "text-gray-400"}`}>
              Téléphone & OTP
            </span>
          </div>

          <div className="flex-1 h-0.5 bg-white/20 mx-3" />

          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-sans font-bold text-xs ${
              step === 2 ? "bg-brand-primary text-black shadow-glow-primary" : "bg-white/10 text-gray-400 border border-white/20"
            }`}>
              2
            </div>
            <span className={`text-xs font-sans font-semibold ${step === 2 ? "text-white" : "text-gray-400"}`}>
              Profil
            </span>
          </div>
        </div>

        {/* Frosted Glass Form Card */}
        <div className="relative z-10 w-full p-6 sm:p-10 bg-black/70 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl">
          <div className="mb-6">
            <BackButton variant="auth" />
          </div>

          <AnimatePresence mode="wait">
            {/* ============================================================ */}
            {/* STEP 1: PHONE & OTP VALIDATION                              */}
            {/* ============================================================ */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {!otpSent ? (
                  /* Screen 1A: Phone Number Input */
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
                      Créer un compte
                    </h1>
                    <p className="text-gray-400 font-sans text-xs sm:text-sm mb-6">
                      Entrez votre numéro de téléphone pour recevoir votre code de validation SMS.
                    </p>

                    <form onSubmit={handleSendOtp} className="space-y-5">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-300 uppercase tracking-wider ml-1 flex items-center gap-1.5">
                          <Phone size={14} className="text-brand-primary" />
                          Numéro de téléphone
                        </label>
                        <div className="flex gap-2">
                          {/* Country Code Selector */}
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

                          {/* Phone input */}
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
                        Continuer par SMS
                        <ArrowRight size={18} />
                      </button>
                    </form>
                  </div>
                ) : (
                  /* Screen 1B: OTP Code Input */
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
                      Code de vérification
                    </h1>
                    <p className="text-gray-400 font-sans text-xs sm:text-sm mb-4">
                      Saisissez le code SMS envoyé au <strong className="text-white">{countryCode} {phoneNumber}</strong>.
                    </p>

                    {/* Mock OTP Disclaimer Banner */}
                    <div className="mb-6 p-3 rounded-xl bg-brand-primary/10 border border-brand-primary/30 flex items-start gap-2.5 text-xs text-brand-primary">
                      <Info size={16} className="flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Mode Démo SMS :</strong> Entrez <strong>123456</strong> ou n'importe quel code à 6 chiffres pour valider.
                      </span>
                    </div>

                    <form onSubmit={handleVerifyOtp} className="space-y-5">
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
                          className="w-full bg-white/5 border border-white/10 text-white text-center tracking-[0.5em] text-2xl font-mono rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent placeholder:tracking-normal placeholder:text-gray-600"
                        />
                        {otpError && (
                          <p className="text-xs text-red-400 font-sans mt-1 flex items-center gap-1">
                            <AlertCircle size={14} />
                            {otpError}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={otpCode.length < 4}
                        className="w-full bg-brand-primary hover:bg-brand-hover disabled:opacity-50 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] shadow-glow-primary active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        Valider et Continuer
                        <ShieldCheck size={18} />
                      </button>

                      {/* Resend Code Section */}
                      <div className="pt-2 text-center">
                        <button
                          type="button"
                          onClick={handleResendOtp}
                          disabled={cooldown > 0}
                          className="text-xs font-sans text-gray-400 hover:text-white disabled:opacity-50 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <RefreshCw size={12} className={cooldown > 0 ? "animate-spin" : ""} />
                          {cooldown > 0 ? `Renvoyer le code (${cooldown}s)` : "Renvoyer le code"}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </motion.div>
            )}

            {/* ============================================================ */}
            {/* STEP 2: MINIMAL PROFILE INFO                                */}
            {/* ============================================================ */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
                  Vos informations
                </h1>
                <p className="text-gray-400 font-sans text-xs sm:text-sm mb-6">
                  Complétez votre profil pour finaliser la création de votre compte.
                </p>

                <form onSubmit={handleCreateAccount} className="space-y-5">
                  {/* Nom complet */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider ml-1">
                      Nom complet <span className="text-brand-primary">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ex: Babacar Ndiaye"
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent font-sans placeholder:text-gray-500"
                    />
                  </div>

                  {/* Date de naissance */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider ml-1">
                      Date de naissance <span className="text-brand-primary">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent font-sans"
                    />
                    <p className="text-[11px] text-gray-400 font-sans ml-1">
                      Utilisée pour le contrôle parental et la classification des films (16+/18+).
                    </p>
                  </div>

                  {/* Email Facultatif */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider ml-1">
                      Email <span className="text-gray-500 font-normal">(facultatif)</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nom@exemple.com"
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent font-sans placeholder:text-gray-500"
                    />
                  </div>

                  {/* Single CGU Checkbox with Link */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-white/20 bg-white/10 text-brand-primary focus:ring-brand-primary accent-[#FF6A00]"
                      />
                      <span className="text-xs text-gray-300 group-hover:text-white transition-colors leading-normal">
                        J'accepte les{" "}
                        <Link 
                          href="/terms" 
                          target="_blank" 
                          className="text-brand-primary underline hover:text-white transition-colors font-semibold"
                        >
                          conditions générales d'utilisation de la plateforme
                        </Link>{" "}
                        (incluant l'interdiction stricte de capture d'écran).
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!isStep2Valid || isSubmitting}
                    className="w-full bg-brand-primary hover:bg-brand-hover disabled:opacity-40 text-black font-bold py-4 rounded-xl mt-4 transition-all hover:scale-[1.02] shadow-glow-primary active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? "Création du compte..." : "Créer mon compte"}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              Déjà membre ?{" "}
              <Link href="/login" className="text-white font-bold hover:underline underline-offset-4 decoration-brand-primary">
                Identifiez-vous.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
