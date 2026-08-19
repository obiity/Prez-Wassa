"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

interface BackButtonProps {
  className?: string;
  variant?: "default" | "admin" | "auth";
}

export function BackButton({ className = "", variant = "default" }: BackButtonProps) {
  const router = useRouter();
  const { t } = useLanguage();

  if (variant === "auth") {
    return (
      <button
        onClick={() => router.back()}
        aria-label={t.common.back}
        className={`flex items-center text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-md ${className}`}
      >
        <ArrowLeft size={20} strokeWidth={1.5} />
      </button>
    );
  }

  if (variant === "admin") {
    return (
      <button
        onClick={() => router.back()}
        aria-label={t.common.back}
        className={`mr-4 p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-brand-primary dark:hover:text-brand-primary transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary ${className}`}
      >
        <ArrowLeft size={20} strokeWidth={2} />
      </button>
    );
  }

  return (
    <button
      onClick={() => router.back()}
      aria-label={t.common.back}
      className={`group flex items-center gap-2 text-muted hover:text-brand-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-full px-2 py-1 -ml-2 ${className}`}
    >
      <ArrowLeft size={24} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform duration-300" />
      <span className="hidden md:inline-block font-sans font-medium text-sm">{t.common.back}</span>
    </button>
  );
}
