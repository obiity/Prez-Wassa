import Link from "next/link";
import { BackButton } from "@/components/BackButton";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-28 pb-20 px-6 md:px-12 max-w-4xl mx-auto relative transition-colors duration-300">
      <div className="absolute inset-0 z-0 senegal-pattern pointer-events-none"></div>

      <div className="relative z-10">
        <div className="mb-8">
          <BackButton />
        </div>

        <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-xl space-y-8">
          <div className="border-b border-border pb-6">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Conditions Générales d'Utilisation (CGU)
            </h1>
            <p className="text-sm text-muted font-sans">
              Dernière mise à jour : 24 Juillet 2026 • Plateforme WASSA
            </p>
          </div>

          <section className="space-y-4 font-sans text-sm md:text-base leading-relaxed text-foreground/90">
            <h2 className="text-xl font-bold text-foreground">Article 1 — Objet</h2>
            <p>
              Les présentes Conditions Générales d'Utilisation régissent l'accès et l'utilisation de la plateforme de streaming WASSA. Tout accès ou création de compte implique l'acceptation sans réserve des présentes conditions.
            </p>

            <h2 className="text-xl font-bold text-foreground">Article 2 — Inscription et Sécurité du Compte</h2>
            <p>
              L'inscription s'effectue au moyen d'un numéro de téléphone valide vérifié par un code SMS à usage unique (OTP). L'utilisateur s'engage à fournir des informations exactes (Nom, Date de naissance pour la classification des contenus) et à préserver la confidentialité de ses identifiants.
            </p>

            <h2 className="text-xl font-bold text-foreground">Article 3 — Classification et Contrôle Parental</h2>
            <p>
              La date de naissance demandée lors de l'inscription est exclusivement utilisée pour restreindre l'accès aux œuvres classées 16+ et 18+ conformément aux réglementations en vigueur.
            </p>

            {/* CRITICAL LEGAL CLAUSE HIGHLIGHTED */}
            <div className="p-6 rounded-2xl bg-red-600/10 border border-red-600/30 space-y-3">
              <h2 className="text-lg md:text-xl font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                ⚠️ Article 6 — Interdiction d'Enregistrement d'Écran et Poursuites Judiciaires
              </h2>
              <p className="text-sm text-foreground font-medium">
                Toute tentative d'enregistrement d'écran, de capture vidéo, d'extraction de flux vidéo (ripping), de contournement des verrous numériques (DRM) ou de redistribution non autorisée du catalogue WASSA est <strong>strictement interdite</strong>.
              </p>
              <p className="text-xs text-muted">
                Les œuvres proposées sur WASSA sont protégées par le droit d'auteur. Tout manquement entraînera la suspension immédiate du compte et fera l'objet de poursuites pénales et civiles devant les juridictions compétentes.
              </p>
            </div>

            <h2 className="text-xl font-bold text-foreground">Article 7 — Résiliation</h2>
            <p>
              L'utilisateur peut supprimer son compte à tout moment depuis son espace profil. WASSA se réserve le droit de suspendre tout compte en cas d'infraction aux CGU.
            </p>
          </section>

          <div className="pt-6 border-t border-border flex justify-end">
            <Link
              href="/register"
              className="px-6 py-3 rounded-full bg-brand-primary text-black font-bold text-sm hover:bg-brand-hover transition-all"
            >
              Retour à l'inscription
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
