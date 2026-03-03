import { useState } from 'react';
import { INVENTORY, type InventoryItem, type Dimension } from '@/data/gameData';
import Icon from '@/components/ui/icon';

const RARITY_CONFIG = {
  common: { label: 'Обычный', color: 'hsl(45 20% 55%)' },
  rare: { label: 'Редкий', color: 'hsl(210 80% 60%)' },
  legendary: { label: 'Легендарный', color: 'hsl(42 78% 58%)' },
  divine: { label: 'Божественный', color: 'hsl(270 70% 70%)' },
};

const TYPE_ICONS: Record<string, string> = {
  artifact: 'Gem',
  scroll: 'ScrollText',
  coin: 'Coins',
  gem: 'Diamond',
  weapon: 'Swords',
  relic: 'Crown',
};

const TYPE_LABELS: Record<string, string> = {
  artifact: 'Артефакт',
  scroll: 'Свиток',
  coin: 'Монеты',
  gem: 'Самоцвет',
  weapon: 'Оружие',
  relic: 'Реликвия',
};

const DIM_COLORS: Record<Dimension, string> = {
  astria: 'hsl(180 65% 55%)',
  cybern: 'hsl(210 90% 60%)',
  necropolis: 'hsl(270 60% 55%)',
  edemia: 'hsl(120 55% 45%)',
  pustosh: 'hsl(0 0% 45%)',
};

const DIM_LABELS: Record<Dimension, string> = {
  astria: 'Астрия',
  cybern: 'Сайберн',
  necropolis: 'Некрополис',
  edemia: 'Эдемия',
  pustosh: 'Пустошь',
};

export default function InventoryPage() {
  const [selected, setSelected] = useState<InventoryItem | null>(null);

  const totalItems = INVENTORY.reduce((acc, i) => acc + i.quantity, 0);
  const legendaryCount = INVENTORY.filter(i => i.rarity === 'legendary' || i.rarity === 'divine').length;

  return (
    <div className="min-h-screen labyrinth-bg">
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Заголовок */}
        <div className="mb-8 animate-fade-in">
          <p className="text-xs tracking-[0.3em] uppercase opacity-30 mb-2">Хранилище</p>
          <h1 className="text-4xl text-glow-gold mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Инвентарь
          </h1>
          <div className="flex gap-6 text-sm opacity-50">
            <span>Предметов: {totalItems}</span>
            <span>Легендарных: {legendaryCount}</span>
            <span>🪙 2 300 монет</span>
          </div>
        </div>

        {/* Верхний блок монет */}
        <div className="grid grid-cols-2 gap-3 mb-6 animate-fade-in delay-100">
          <div className="border rounded-lg p-4" style={{ background: 'hsl(42 20% 9% / 0.8)', borderColor: 'hsl(42 78% 58% / 0.3)' }}>
            <div className="flex items-center gap-3">
              <span style={{ fontSize: '24px' }}>🪙</span>
              <div>
                <div className="text-2xl text-glow-gold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>2 300</div>
                <div className="text-xs opacity-40">Золотых монет всех эпох</div>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-4" style={{ background: 'hsl(220 20% 9% / 0.8)', borderColor: 'hsl(220 75% 55% / 0.3)' }}>
            <div className="flex items-center gap-3">
              <span style={{ fontSize: '24px' }}>💎</span>
              <div>
                <div className="text-2xl text-glow-sapphire" style={{ fontFamily: 'Cormorant Garamond, serif' }}>5</div>
                <div className="text-xs opacity-40">Сапфиров силы</div>
              </div>
            </div>
          </div>
        </div>

        {/* Список предметов */}
        <div className="space-y-2">
          {INVENTORY.map((item, i) => {
            const rarityCfg = RARITY_CONFIG[item.rarity];
            const dimColor = item.dimension ? DIM_COLORS[item.dimension] : 'hsl(45 20% 55%)';
            const isSelected = selected?.id === item.id;

            return (
              <div
                key={item.id}
                className="animate-fade-in"
                style={{ animationDelay: `${0.1 + i * 0.05}s`, opacity: 0 }}
              >
                <button
                  onClick={() => setSelected(isSelected ? null : item)}
                  className="w-full text-left rounded-lg border px-4 py-3 transition-all duration-200"
                  style={{
                    background: isSelected ? `${rarityCfg.color}08` : 'hsl(225 18% 9% / 0.7)',
                    borderColor: isSelected ? rarityCfg.color + '50' : 'hsl(225 18% 18%)',
                  }}
                  onMouseEnter={e => !isSelected && ((e.currentTarget as HTMLElement).style.borderColor = rarityCfg.color + '30')}
                  onMouseLeave={e => !isSelected && ((e.currentTarget as HTMLElement).style.borderColor = 'hsl(225 18% 18%)')}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${rarityCfg.color}15`,
                        border: `1px solid ${rarityCfg.color}30`,
                      }}>
                      <Icon name={TYPE_ICONS[item.type] || 'Package'} size={18} style={{ color: rarityCfg.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-sm font-medium" style={{ color: 'hsl(45 60% 88%)', fontFamily: 'Cormorant Garamond, serif', fontSize: '16px' }}>
                          {item.name}
                        </span>
                        <span className="text-xs" style={{ color: rarityCfg.color, opacity: 0.8 }}>
                          {rarityCfg.label}
                        </span>
                        {item.dimension && (
                          <span className="badge-dimension" style={{ color: dimColor, borderColor: dimColor + '40', fontSize: '9px' }}>
                            {DIM_LABELS[item.dimension]}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs opacity-40">{TYPE_LABELS[item.type]}</span>
                        {item.quantity > 1 && (
                          <span className="text-xs opacity-60">×{item.quantity}</span>
                        )}
                      </div>
                    </div>
                    <Icon name={isSelected ? 'ChevronUp' : 'ChevronDown'} size={14} className="opacity-30 flex-shrink-0" />
                  </div>
                </button>

                {isSelected && (
                  <div className="mx-1 rounded-b-lg border border-t-0 px-5 py-4 animate-fade-in"
                    style={{
                      background: `${rarityCfg.color}05`,
                      borderColor: rarityCfg.color + '30',
                    }}>
                    <p className="text-sm opacity-70 leading-relaxed" style={{ fontFamily: 'Golos Text, sans-serif' }}>
                      {item.description}
                    </p>
                    <div className="mt-3 flex gap-2">
                      <button className="text-xs px-3 py-1.5 rounded border transition-colors"
                        style={{ borderColor: rarityCfg.color + '40', color: rarityCfg.color, background: rarityCfg.color + '10' }}>
                        Использовать
                      </button>
                      <button className="text-xs px-3 py-1.5 rounded border transition-colors opacity-40"
                        style={{ borderColor: 'hsl(225 18% 25%)', color: 'hsl(45 20% 55%)' }}>
                        Изучить
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Слот для будущих предметов */}
        <div className="mt-4 border border-dashed rounded-lg p-6 text-center animate-fade-in"
          style={{ borderColor: 'hsl(225 18% 20%)', opacity: 0, animationDelay: '0.6s' }}>
          <Icon name="Plus" size={20} className="mx-auto mb-2 opacity-20" />
          <p className="text-xs opacity-20">Предметы появятся в ходе приключений</p>
        </div>
      </div>
    </div>
  );
}
