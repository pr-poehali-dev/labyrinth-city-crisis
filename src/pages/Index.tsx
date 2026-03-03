import { useState } from 'react';
import HomePage from './HomePage';
import GamePage from './GamePage';
import CharactersPage from './CharactersPage';
import InventoryPage from './InventoryPage';
import MapPage from './MapPage';
import QuestsPage from './QuestsPage';
import StatsPage from './StatsPage';
import SavesPage from './SavesPage';
import Icon from '@/components/ui/icon';

type Page = 'home' | 'game' | 'characters' | 'inventory' | 'map' | 'quests' | 'stats' | 'saves';

const NAV_ITEMS: { id: Page; icon: string; label: string }[] = [
  { id: 'home', icon: 'Home', label: 'Главная' },
  { id: 'game', icon: 'Swords', label: 'Игра' },
  { id: 'characters', icon: 'Users', label: 'Персонажи' },
  { id: 'inventory', icon: 'Package', label: 'Инвентарь' },
  { id: 'map', icon: 'Map', label: 'Карта' },
  { id: 'quests', icon: 'ScrollText', label: 'Квесты' },
  { id: 'stats', icon: 'BarChart3', label: 'Статистика' },
  { id: 'saves', icon: 'Save', label: 'Сохранения' },
];

export default function Index() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigate = (page: string) => setCurrentPage(page as Page);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onNavigate={navigate} />;
      case 'game': return <GamePage />;
      case 'characters': return <CharactersPage />;
      case 'inventory': return <InventoryPage />;
      case 'map': return <MapPage />;
      case 'quests': return <QuestsPage />;
      case 'stats': return <StatsPage />;
      case 'saves': return <SavesPage />;
      default: return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen labyrinth-bg flex flex-col">
      {/* Верхняя навигация (десктоп) */}
      <nav className="hidden md:block sticky top-0 z-30 glass border-b border-border">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-1 py-1">
            <button
              onClick={() => navigate('home')}
              className="mr-3 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
            >
              <span style={{ fontSize: '16px' }}>🐉</span>
              <span className="text-xs text-glow-gold hidden lg:block" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '14px' }}>
                Город-Лабиринт
              </span>
            </button>
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`nav-item flex items-center gap-1.5 ${currentPage === item.id ? 'active' : ''}`}
              >
                <Icon name={item.icon} size={13} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Контент */}
      <main className="flex-1 pb-16 md:pb-0">
        {renderPage()}
      </main>

      {/* Нижняя навигация (мобайл) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 glass border-t border-border">
        <div className="flex">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 transition-all duration-150 ${currentPage === item.id ? 'opacity-100' : 'opacity-35'}`}
              style={{ color: currentPage === item.id ? 'hsl(42 78% 58%)' : undefined }}
            >
              <Icon name={item.icon} size={16} />
              <span style={{ fontSize: '9px', fontFamily: 'Golos Text, sans-serif' }}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
