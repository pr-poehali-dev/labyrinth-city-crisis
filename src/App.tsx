import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Icon from "@/components/ui/icon";

import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import CharactersPage from "./pages/CharactersPage";
import InventoryPage from "./pages/InventoryPage";
import MapPage from "./pages/MapPage";
import QuestsPage from "./pages/QuestsPage";
import StatsPage from "./pages/StatsPage";
import SavesPage from "./pages/SavesPage";

const queryClient = new QueryClient();

type Page = "home" | "game" | "characters" | "inventory" | "map" | "quests" | "stats" | "saves";

const NAV_ITEMS: { id: Page; icon: string; label: string }[] = [
  { id: "home", icon: "Home", label: "Главная" },
  { id: "game", icon: "Swords", label: "Игра" },
  { id: "characters", icon: "Users", label: "Персонажи" },
  { id: "inventory", icon: "Package", label: "Инвентарь" },
  { id: "map", icon: "Map", label: "Карта" },
  { id: "quests", icon: "ScrollText", label: "История" },
  { id: "stats", icon: "BarChart3", label: "Статистика" },
  { id: "saves", icon: "Save", label: "Сохранения" },
];

function Layout({ current, onNavigate, children }: {
  current: Page;
  onNavigate: (p: Page) => void;
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "hsl(222 20% 6%)" }}>
      {/* Топ-навигация */}
      <header className="sticky top-0 z-30 glass border-b border-border">
        <div className="max-w-5xl mx-auto px-4 h-12 flex items-center justify-between">
          {/* Лого */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 group"
          >
            <span className="text-lg animate-pulse-glow" style={{ animationDuration: "3s" }}>🐉</span>
            <span className="text-sm hidden sm:block text-glow-gold"
              style={{ fontFamily: "Cormorant Garamond, serif", letterSpacing: "0.05em" }}>
              Город-Лабиринт
            </span>
          </button>

          {/* Десктоп навигация */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`nav-item flex items-center gap-1.5 ${current === item.id ? "active" : ""}`}
              >
                <Icon name={item.icon} size={13} />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Мобильное меню */}
          <button
            className="md:hidden p-2 rounded opacity-60 hover:opacity-100 transition-opacity"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={18} />
          </button>
        </div>

        {/* Мобильное выпадающее меню */}
        {menuOpen && (
          <div className="md:hidden border-t border-border animate-fade-in"
            style={{ background: "hsl(225 18% 7%)" }}>
            <div className="max-w-5xl mx-auto px-4 py-3 grid grid-cols-4 gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { onNavigate(item.id); setMenuOpen(false); }}
                  className={`flex flex-col items-center gap-1 py-3 px-2 rounded transition-all duration-150 ${current === item.id ? "active" : ""}`}
                  style={{
                    background: current === item.id ? "hsl(42 78% 58% / 0.1)" : "transparent",
                    color: current === item.id ? "hsl(42 78% 58%)" : "hsl(45 20% 55%)",
                  }}
                >
                  <Icon name={item.icon} size={18} />
                  <span className="text-xs" style={{ fontFamily: "Golos Text, sans-serif" }}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Контент */}
      <main className="flex-1">
        {children}
      </main>

      {/* Мобильный нижний бар */}
      <nav className="md:hidden sticky bottom-0 z-30 glass border-t border-border">
        <div className="grid grid-cols-8 px-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center gap-0.5 py-2 transition-all duration-150"
              style={{
                color: current === item.id ? "hsl(42 78% 58%)" : "hsl(45 20% 35%)",
              }}
            >
              <Icon name={item.icon} size={16} />
              <span style={{ fontSize: "8px", fontFamily: "Golos Text, sans-serif" }}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

const App = () => {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const navigate = (page: string) => setCurrentPage(page as Page);

  const renderPage = () => {
    switch (currentPage) {
      case "home": return <HomePage onNavigate={navigate} />;
      case "game": return <GamePage />;
      case "characters": return <CharactersPage />;
      case "inventory": return <InventoryPage />;
      case "map": return <MapPage />;
      case "quests": return <QuestsPage />;
      case "stats": return <StatsPage />;
      case "saves": return <SavesPage />;
      default: return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Layout current={currentPage} onNavigate={(p) => setCurrentPage(p)}>
          {renderPage()}
        </Layout>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
