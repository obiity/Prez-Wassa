"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutDashboard, Film, Tv, Users, CreditCard, FolderTree, BarChart3, Settings, LogOut, Plus, Search, MoreVertical } from "lucide-react";
import { BackButton } from "@/components/BackButton";
import { EXCLUSIVES_MOVIES, TRENDING_MOVIES } from "@/lib/data";

const MENU_ITEMS = [
  { id: "stats", label: "Tableau de Bord", icon: LayoutDashboard },
  { id: "films", label: "Gestion des Films", icon: Film },
  { id: "series", label: "Gestion des Séries", icon: Tv },
  { id: "categories", label: "Catégories", icon: FolderTree },
  { id: "users", label: "Utilisateurs", icon: Users },
  { id: "subs", label: "Abonnements", icon: CreditCard },
  { id: "analytics", label: "Statistiques", icon: BarChart3 },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("stats");
  const allMovies = [...EXCLUSIVES_MOVIES, ...TRENDING_MOVIES];

  return (
    <div className="min-h-screen bg-[#f4f5f7] dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 flex font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white dark:bg-[#121212] border-r border-gray-200 dark:border-white/10 flex flex-col hidden md:flex sticky top-0 h-screen">
        <div className="h-20 flex items-center px-6 border-b border-gray-200 dark:border-white/10">
          <Link href="/">
            <img src="/logo-color.png" alt="WASSA Admin" className="h-8 dark:hidden" />
            <img src="/logo-white.png" alt="WASSA Admin" className="h-8 hidden dark:block" />
          </Link>
          <span className="ml-2 text-[10px] font-bold tracking-widest text-brand-primary uppercase">Admin</span>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          {MENU_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id 
                  ? "bg-brand-primary/10 text-brand-primary dark:bg-brand-primary/20" 
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-white/10">
          <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors">
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen max-w-full overflow-hidden">
        
        {/* Top Header */}
        <header className="h-20 bg-white dark:bg-[#121212] border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center">
            <BackButton variant="admin" />
            <h1 className="text-xl font-bold">{MENU_ITEMS.find(i => i.id === activeTab)?.label}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Rechercher..." className="pl-9 pr-4 py-2 rounded-full bg-gray-100 dark:bg-white/5 border-none text-sm outline-none focus:ring-2 focus:ring-brand-primary w-64" />
            </div>
            <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-black font-bold text-xs">
              AD
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-8 overflow-auto">
          
          {activeTab === "stats" && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                  <div className="text-gray-500 text-sm mb-1 font-medium">Abonnés Actifs</div>
                  <div className="text-3xl font-bold">12,450</div>
                  <div className="text-green-500 text-xs mt-2 font-bold">+15% ce mois</div>
                </div>
                <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                  <div className="text-gray-500 text-sm mb-1 font-medium">Films au catalogue</div>
                  <div className="text-3xl font-bold">142</div>
                  <div className="text-brand-primary text-xs mt-2 font-bold">+5 nouveaux</div>
                </div>
                <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                  <div className="text-gray-500 text-sm mb-1 font-medium">Séries au catalogue</div>
                  <div className="text-3xl font-bold">28</div>
                </div>
                <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                  <div className="text-gray-500 text-sm mb-1 font-medium">Revenus (Mensuel)</div>
                  <div className="text-3xl font-bold">61M FCFA</div>
                  <div className="text-green-500 text-xs mt-2 font-bold">+8% ce mois</div>
                </div>
              </div>

              {/* Chart Placeholder */}
              <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm h-80 flex flex-col">
                <h3 className="font-bold mb-4">Évolution des abonnements (2024)</h3>
                <div className="flex-1 flex items-end gap-2 p-4 border-l border-b border-gray-200 dark:border-white/10">
                  {/* Mock Bar Chart */}
                  {[40, 55, 45, 70, 65, 80, 95, 85].map((height, i) => (
                    <div key={i} className="flex-1 bg-brand-primary/80 hover:bg-brand-primary rounded-t-sm transition-all" style={{ height: `${height}%` }}></div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "films" && (
            <div className="bg-white dark:bg-[#121212] rounded-xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-white/10 flex justify-between items-center">
                <h2 className="font-bold">Catalogue Films</h2>
                <button className="bg-brand-primary hover:bg-brand-hover text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                  <Plus size={16} /> Ajouter un film
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-white/10">
                    <tr>
                      <th className="px-6 py-4 font-medium">Titre</th>
                      <th className="px-6 py-4 font-medium">Genre</th>
                      <th className="px-6 py-4 font-medium">Année</th>
                      <th className="px-6 py-4 font-medium">Vues</th>
                      <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allMovies.slice(0, 10).map((movie, idx) => (
                      <tr key={idx} className="border-b border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5">
                        <td className="px-6 py-4 flex items-center gap-3">
                          <img src={movie.imageUrl} alt="" className="w-10 h-14 object-cover rounded bg-gray-200" />
                          <span className="font-medium">{movie.title}</span>
                        </td>
                        <td className="px-6 py-4">{movie.genres[0]}</td>
                        <td className="px-6 py-4">{movie.year || "N/A"}</td>
                        <td className="px-6 py-4">{(Math.random() * 10000).toFixed(0)}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-gray-400 hover:text-brand-primary"><MoreVertical size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-gray-200 dark:border-white/10 text-center text-sm text-gray-500">
                Affichage de 10 sur {allMovies.length} films
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {["series", "categories", "users", "subs", "analytics"].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Settings size={48} className="mb-4 opacity-20" />
              <p>Module en cours de développement.</p>
              <p className="text-sm mt-2">Les données réelles seront connectées ultérieurement.</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
