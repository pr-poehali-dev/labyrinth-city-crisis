import { useState } from 'react';

interface DimZone {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  glowColor: string;
  description: string;
  locations: string[];
  status: 'stable' | 'unstable' | 'critical';
  emoji: string;
  top: string;
  left: string;
}

const DIMENSIONS: DimZone[] = [
  {
    id: 'astria',
    name: 'Астрия',
    subtitle: 'Царство Стихий',
    color: 'hsl(180 65% 55%)',
    glowColor: 'hsl(180 65% 55% / 0.3)',
    description: 'Мир первозданных стихий — огня, воды, земли, воздуха и молнии. Здесь родились Кристаллы Стихий, хранящие равновесие природы.',
    locations: ['Кристальный квартал', 'Огненный квартал', 'Небесные шпили', 'Ледяные шпили', 'Звёздная башня'],
    status: 'unstable',
    emoji: '⚡',
    top: '15%',
    left: '20%',
  },
  {
    id: 'cybern',
    name: 'Сайберн',
    subtitle: 'Технологический Мир',
    color: 'hsl(210 90% 60%)',
    glowColor: 'hsl(210 90% 60% / 0.3)',
    description: 'Мир технологий и данных. Здесь Дата-ядра хранят законы мироздания, а Яромир был замечен в технологических верфях.',
    locations: ['Технологические верфи', 'Дата-центр', 'Квантовый архив', 'Механические башни'],
    status: 'stable',
    emoji: '⚙️',
    top: '15%',
    left: '60%',
  },
  {
    id: 'necropolis',
    name: 'Некрополис',
    subtitle: 'Мир Духов',
    color: 'hsl(270 60% 55%)',
    glowColor: 'hsl(270 60% 55% / 0.3)',
    description: 'Мир душ и потустороннего. Суверенные Души хранят память об ушедших мирах. Здесь появилась процессия с мертвенно-синим сиянием.',
    locations: ['Некрополис-квартал', 'Нижние кварталы', 'Сумеречный предел', 'Арена духов', 'Лаборатория Душ'],
    status: 'critical',
    emoji: '💀',
    top: '55%',
    left: '15%',
  },
  {
    id: 'edemia',
    name: 'Эдемия',
    subtitle: 'Живой Мир',
    color: 'hsl(120 55% 45%)',
    glowColor: 'hsl(120 55% 45% / 0.3)',
    description: 'Мир жизни и природы. Сердца Миров питают все живые измерения. Здесь стены покрыты светящимся мхом, а камни цветут.',
    locations: ['Эдемские сады', 'Лесной предел', 'Храм Жизни', 'Корневой лес', 'Башня Предвидения'],
    status: 'stable',
    emoji: '🌿',
    top: '55%',
    left: '55%',
  },
  {
    id: 'pustosh',
    name: 'Пустошь',
    subtitle: 'Мир Разломов',
    color: 'hsl(0 0% 45%)',
    glowColor: 'hsl(0 0% 45% / 0.2)',
    description: 'Мир разрушения и пустоты. Артефакты Разлома постепенно разъедают ткань реальности. Сейчас Пустошь распространяется в центр.',
    locations: ['Разломы реальности', 'Серые кварталы', 'Зона нестабильности'],
    status: 'critical',
    emoji: '🕳️',
    top: '38%',
    left: '38%',
  },
];

const STATUS_CONFIG = {
  stable: { label: 'Стабильно', color: 'hsl(120 55% 45%)' },
  unstable: { label: 'Нестабильно', color: 'hsl(42 78% 58%)' },
  critical: { label: 'Критично', color: 'hsl(0 60% 50%)' },
};

export default function MapPage() {
  const [selected, setSelected] = useState<DimZone | null>(null);

  return (
    <div className="min-h-screen labyrinth-bg">
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Заголовок */}
        <div className="mb-8 animate-fade-in">
          <p className="text-xs tracking-[0.3em] uppercase opacity-30 mb-2">Картография</p>
          <h1 className="text-4xl text-glow-gold mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Карта измерений
          </h1>
          <p className="text-sm opacity-40 italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Пять миров, слившихся в Город-Лабиринт
          </p>
        </div>

        {/* Визуальная карта */}
        <div className="relative mb-8 rounded-xl border animate-fade-in delay-100 overflow-hidden"
          style={{
            height: '380px',
            background: 'hsl(222 25% 5%)',
            borderColor: 'hsl(42 78% 58% / 0.2)',
            boxShadow: 'inset 0 0 80px hsl(222 25% 4%)',
          }}>

          {/* Фоновая сетка лабиринта */}
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'linear-gradient(hsl(42 78% 58%) 1px, transparent 1px), linear-gradient(90deg, hsl(42 78% 58%) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} />

          {/* Центральная точка слияния */}
          <div className="absolute" style={{ top: '42%', left: '42%', transform: 'translate(-50%, -50%)' }}>
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 rounded-full animate-pulse-glow flex items-center justify-center"
                style={{
                  background: 'radial-gradient(circle, hsl(42 78% 58% / 0.2), transparent)',
                  border: '1px solid hsl(42 78% 58% / 0.4)',
                  boxShadow: '0 0 30px hsl(42 78% 58% / 0.2)',
                }}>
                <span style={{ fontSize: '24px' }}>🌳</span>
              </div>
              {/* Лучи к измерениям */}
              {DIMENSIONS.map((dim) => (
                <div key={dim.id}
                  className="absolute w-px opacity-15"
                  style={{
                    height: '80px',
                    background: dim.color,
                    transformOrigin: 'top center',
                  }}
                />
              ))}
            </div>
            <p className="text-center text-xs mt-1 opacity-30" style={{ fontSize: '9px', whiteSpace: 'nowrap' }}>
              Дерево Слияния
            </p>
          </div>

          {/* Узлы измерений */}
          {DIMENSIONS.map((dim) => (
            <button
              key={dim.id}
              onClick={() => setSelected(selected?.id === dim.id ? null : dim)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
              style={{ top: dim.top, left: dim.left }}
            >
              <div
                className="relative flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200"
                style={{
                  background: selected?.id === dim.id ? dim.glowColor : `${dim.color}10`,
                  border: `1px solid ${dim.color}${selected?.id === dim.id ? '80' : '40'}`,
                  boxShadow: selected?.id === dim.id ? `0 0 20px ${dim.glowColor}` : undefined,
                  minWidth: '80px',
                }}
              >
                <span style={{ fontSize: '20px' }}>{dim.emoji}</span>
                <span className="text-xs font-medium" style={{ color: dim.color, fontFamily: 'Cormorant Garamond, serif', fontSize: '13px' }}>
                  {dim.name}
                </span>
                <div className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: STATUS_CONFIG[dim.status].color }} />
              </div>
            </button>
          ))}

          {/* Пять лун над картой */}
          <div className="absolute top-3 right-3 flex gap-2">
            {DIMENSIONS.map((dim) => (
              <div key={dim.id} className="w-3 h-3 rounded-full"
                style={{ background: dim.color, boxShadow: `0 0 6px ${dim.color}` }} />
            ))}
          </div>
        </div>

        {/* Панель информации о выбранном измерении */}
        {selected ? (
          <div className="magic-border rounded-lg p-5 mb-6 animate-scale-in"
            style={{ background: 'hsl(225 18% 9% / 0.9)', borderColor: selected.color + '40' }}>
            <div className="flex items-start gap-4">
              <div className="text-3xl">{selected.emoji}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <h3 className="text-2xl text-glow-gold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {selected.name}
                  </h3>
                  <span className="text-xs italic opacity-50" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {selected.subtitle}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded"
                    style={{
                      background: STATUS_CONFIG[selected.status].color + '20',
                      color: STATUS_CONFIG[selected.status].color,
                    }}>
                    {STATUS_CONFIG[selected.status].label}
                  </span>
                </div>
                <p className="text-sm opacity-60 leading-relaxed mb-4">{selected.description}</p>
                <div>
                  <p className="text-xs opacity-30 mb-2 uppercase tracking-wider">Известные локации</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.locations.map((loc) => (
                      <span key={loc} className="text-xs px-2 py-1 rounded border"
                        style={{ borderColor: selected.color + '30', color: selected.color + 'CC', background: selected.color + '0A' }}>
                        📍 {loc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 opacity-30 animate-fade-in">
            <p className="text-sm italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Нажмите на узел измерения, чтобы узнать подробнее
            </p>
          </div>
        )}

        {/* Статус всех измерений */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {DIMENSIONS.map((dim, i) => (
            <button
              key={dim.id}
              onClick={() => setSelected(selected?.id === dim.id ? null : dim)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-150 animate-fade-in text-left"
              style={{
                borderColor: selected?.id === dim.id ? dim.color + '60' : 'hsl(225 18% 18%)',
                background: selected?.id === dim.id ? dim.color + '08' : 'hsl(225 18% 9% / 0.5)',
                animationDelay: `${0.3 + i * 0.05}s`,
                opacity: 0,
              }}
            >
              <span style={{ fontSize: '16px' }}>{dim.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm" style={{ color: dim.color, fontFamily: 'Cormorant Garamond, serif' }}>{dim.name}</div>
                <div className="text-xs opacity-40">{dim.locations.length} локаций</div>
              </div>
              <div className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: STATUS_CONFIG[dim.status].color }} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
