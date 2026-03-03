import Icon from '@/components/ui/icon';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const FIVE_MOONS = [
  { color: '#7EC8C8', label: 'Астрия', dim: 'astria' },
  { color: '#5B9BD5', label: 'Сайберн', dim: 'cybern' },
  { color: '#9B72CF', label: 'Некрополис', dim: 'necropolis' },
  { color: '#5BA85B', label: 'Эдемия', dim: 'edemia' },
  { color: '#888888', label: 'Пустошь', dim: 'pustosh' },
];

const MENU_ITEMS = [
  { id: 'game', icon: 'Swords', label: 'Начать игру', desc: 'Вернуться в Город-Лабиринт', color: 'var(--gold)' },
  { id: 'characters', icon: 'Users', label: 'Персонажи', desc: '23 ребёнка + Яромир', color: 'hsl(220 75% 55%)' },
  { id: 'inventory', icon: 'Package', label: 'Инвентарь', desc: 'Артефакты и свитки', color: 'hsl(120 55% 45%)' },
  { id: 'map', icon: 'Map', label: 'Карта измерений', desc: 'Пять миров слились', color: 'hsl(180 65% 55%)' },
  { id: 'quests', icon: 'ScrollText', label: 'История квестов', desc: 'Разветвлённые пути', color: 'hsl(270 60% 55%)' },
  { id: 'stats', icon: 'BarChart3', label: 'Статистика', desc: 'Путь Небесного Дракона', color: 'hsl(42 78% 58%)' },
  { id: 'saves', icon: 'Save', label: 'Сохранения', desc: 'Хроники мультивселенной', color: 'hsl(0 60% 50%)' },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen labyrinth-bg relative overflow-hidden">
      {/* Фоновые орбы измерений */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, hsl(180 65% 55%), transparent)' }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 rounded-full opacity-8 blur-3xl"
          style={{ background: 'radial-gradient(circle, hsl(270 60% 55%), transparent)' }} />
        <div className="absolute top-[40%] right-[15%] w-64 h-64 rounded-full opacity-6 blur-3xl"
          style={{ background: 'radial-gradient(circle, hsl(42 78% 58%), transparent)' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-10">
        {/* Шапка */}
        <div className="text-center mb-10 animate-fade-in">
          {/* Пять лун */}
          <div className="flex justify-center gap-3 mb-6 animate-moons">
            {FIVE_MOONS.map((moon) => (
              <div key={moon.dim} className="flex flex-col items-center gap-1">
                <div
                  className="w-6 h-6 rounded-full animate-pulse-glow"
                  style={{
                    background: moon.color,
                    boxShadow: `0 0 12px ${moon.color}60, 0 0 4px ${moon.color}`,
                  }}
                />
                <span className="text-xs opacity-40" style={{ color: moon.color, fontSize: '9px' }}>
                  {moon.label}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs tracking-[0.3em] uppercase mb-3 opacity-40" style={{ fontFamily: 'Golos Text, sans-serif' }}>
            Призрачный Шёпот
          </p>
          <h1 className="text-5xl md:text-6xl font-light mb-2 text-glow-gold" style={{ fontFamily: 'Cormorant Garamond, serif', letterSpacing: '-0.01em' }}>
            Город-Лабиринт
          </h1>
          <p className="text-sm opacity-50 italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Где сходятся нити пяти измерений
          </p>

          <div className="ornament-divider mt-6 mb-8">
            <span>✦ ✦ ✦</span>
          </div>
        </div>

        {/* Карточка персонажа */}
        <div className="magic-border rounded-lg p-6 mb-8 animate-fade-in delay-200"
          style={{ background: 'hsl(225 18% 9% / 0.9)' }}>
          <div className="flex items-start gap-6">
            <div className="relative flex-shrink-0">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center animate-float"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, hsl(42 78% 65%), hsl(220 75% 45%))',
                  boxShadow: '0 0 30px hsl(42 78% 58% / 0.35), 0 0 60px hsl(220 75% 55% / 0.15)',
                }}
              >
                <span style={{ fontSize: '36px' }}>🐉</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-600 border-2 border-background flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl text-glow-gold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Катя</h2>
                <span className="badge-dimension text-xs" style={{ color: 'hsl(42 78% 58%)', borderColor: 'hsl(42 78% 58% / 0.4)', fontSize: '9px' }}>
                  99 ур.
                </span>
              </div>
              <p className="text-xs opacity-50 mb-3 italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Первый из Небесных Драконов · Владычица 23 форм магии
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="opacity-40">Жизнь</span>
                    <span style={{ color: 'hsl(0 75% 60%)' }}>9999/9999</span>
                  </div>
                  <div className="hp-bar"><div className="hp-bar-fill" style={{ width: '100%' }} /></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="opacity-40">Сила духа</span>
                    <span style={{ color: 'hsl(220 80% 65%)' }}>8750/9000</span>
                  </div>
                  <div className="hp-bar"><div className="mp-bar-fill" style={{ width: '97%' }} /></div>
                </div>
              </div>
            </div>
          </div>

          {/* Статус заданий */}
          <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-light text-glow-gold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>16/23</div>
              <div className="text-xs opacity-40">Детей найдено</div>
            </div>
            <div>
              <div className="text-xl font-light" style={{ color: 'hsl(270 60% 65%)', fontFamily: 'Cormorant Garamond, serif' }}>4</div>
              <div className="text-xs opacity-40">Активных квеста</div>
            </div>
            <div>
              <div className="text-xl font-light" style={{ color: 'hsl(0 60% 55%)', fontFamily: 'Cormorant Garamond, serif' }}>!</div>
              <div className="text-xs opacity-40">Пустошь растёт</div>
            </div>
          </div>
        </div>

        {/* Главное меню */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {MENU_ITEMS.map((item, i) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`animate-fade-in delay-${(i + 1) * 100} text-left rounded-lg px-5 py-4 transition-all duration-200 group border border-border hover:border-opacity-60`}
              style={{
                background: 'hsl(225 18% 9% / 0.7)',
                animationDelay: `${0.2 + i * 0.06}s`,
                opacity: 0,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = item.color + '60';
                (e.currentTarget as HTMLElement).style.background = 'hsl(225 18% 11% / 0.9)';
                (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = '';
                (e.currentTarget as HTMLElement).style.background = 'hsl(225 18% 9% / 0.7)';
                (e.currentTarget as HTMLElement).style.transform = '';
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: item.color + '18', border: `1px solid ${item.color}30` }}>
                  <Icon name={item.icon} size={18} style={{ color: item.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm mb-0.5" style={{ fontFamily: 'Golos Text, sans-serif', color: 'hsl(45 60% 88%)' }}>
                    {item.label}
                  </div>
                  <div className="text-xs opacity-40 truncate">{item.desc}</div>
                </div>
                <Icon name="ChevronRight" size={14} className="opacity-20 group-hover:opacity-60 transition-opacity" />
              </div>
            </button>
          ))}
        </div>

        {/* Футер */}
        <div className="text-center mt-10 opacity-20 text-xs" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Глава I · Призрачный шёпот Города-Лабиринта
        </div>
      </div>
    </div>
  );
}
