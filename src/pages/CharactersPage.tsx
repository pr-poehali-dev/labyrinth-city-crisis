import { useState } from 'react';
import { CHILDREN, type Child, type Dimension } from '@/data/gameData';
import Icon from '@/components/ui/icon';

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

const DIM_EMOJIS: Record<Dimension, string> = {
  astria: '⚡',
  cybern: '⚙️',
  necropolis: '💀',
  edemia: '🌿',
  pustosh: '🕳️',
};

const STATUS_CONFIG = {
  found: { label: 'Найден', color: 'hsl(120 55% 45%)', icon: 'CheckCircle' },
  missing: { label: 'Пропал', color: 'hsl(0 60% 50%)', icon: 'HelpCircle' },
  hidden: { label: 'Скрыт', color: 'hsl(42 78% 58%)', icon: 'Eye' },
};

const YAROMIR = {
  name: 'Яромир',
  title: 'Супруг · Отец 23 детей',
  description: 'Древний бог, с которым Катя прожила бесчисленные эры. После катаклизма потерял память о семье. Замечен в технологических верфях Сайберна.',
  dimension: 'cybern' as Dimension,
  status: 'missing' as const,
  location: 'Технологические верфи',
};

export default function CharactersPage() {
  const [selected, setSelected] = useState<Child | null>(null);
  const [filter, setFilter] = useState<Dimension | 'all' | 'missing'>('all');

  const filtered = CHILDREN.filter(c => {
    if (filter === 'all') return true;
    if (filter === 'missing') return c.status === 'missing';
    return c.dimension === filter;
  });

  return (
    <div className="min-h-screen labyrinth-bg">
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Заголовок */}
        <div className="mb-8 animate-fade-in">
          <p className="text-xs tracking-[0.3em] uppercase opacity-30 mb-2">Семья</p>
          <h1 className="text-4xl text-glow-gold mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Персонажи
          </h1>
          <p className="text-sm opacity-40" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
            23 ребёнка, Яромир и скрытые тайны
          </p>
        </div>

        {/* Яромир */}
        <div className="magic-border rounded-lg p-5 mb-6 animate-fade-in delay-100"
          style={{ background: 'hsl(225 18% 9% / 0.9)', borderColor: DIM_COLORS.cybern + '40' }}>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: `radial-gradient(circle, ${DIM_COLORS.cybern}30, transparent)`,
                border: `1px solid ${DIM_COLORS.cybern}40`,
              }}>
              <span style={{ fontSize: '28px' }}>🌟</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <h3 className="text-xl text-glow-gold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {YAROMIR.name}
                </h3>
                <span className="badge-dimension text-xs"
                  style={{ color: DIM_COLORS.cybern, borderColor: DIM_COLORS.cybern + '40' }}>
                  {DIM_EMOJIS.cybern} {DIM_LABELS.cybern}
                </span>
                <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'hsl(0 60% 50% / 0.15)', color: 'hsl(0 60% 60%)' }}>
                  Потерял память
                </span>
              </div>
              <p className="text-xs opacity-40 mb-2" style={{ fontStyle: 'italic' }}>{YAROMIR.title}</p>
              <p className="text-xs opacity-60 leading-relaxed">{YAROMIR.description}</p>
              <p className="text-xs mt-2 opacity-40">📍 {YAROMIR.location}</p>
            </div>
          </div>
        </div>

        {/* Фильтры */}
        <div className="flex gap-2 mb-6 flex-wrap animate-fade-in delay-200">
          {[
            { id: 'all', label: 'Все (23)', color: 'hsl(42 78% 58%)' },
            { id: 'missing', label: '⚠ Пропавшие', color: 'hsl(0 60% 50%)' },
            ...Object.entries(DIM_LABELS).map(([id, label]) => ({
              id,
              label: `${DIM_EMOJIS[id as Dimension]} ${label}`,
              color: DIM_COLORS[id as Dimension],
            })),
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as Dimension | 'all' | 'missing')}
              className="text-xs px-3 py-1.5 rounded border transition-all duration-150"
              style={{
                borderColor: filter === f.id ? f.color + '80' : 'hsl(225 18% 18%)',
                background: filter === f.id ? f.color + '18' : 'transparent',
                color: filter === f.id ? f.color : 'hsl(45 20% 55%)',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Сетка персонажей */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {filtered.map((child, i) => {
            const dimColor = DIM_COLORS[child.dimension];
            const statusCfg = STATUS_CONFIG[child.status];
            return (
              <button
                key={child.id}
                onClick={() => setSelected(selected?.id === child.id ? null : child)}
                className="char-card text-left animate-fade-in"
                style={{
                  animationDelay: `${0.1 + i * 0.03}s`,
                  opacity: 0,
                  borderColor: selected?.id === child.id ? dimColor + '60' : undefined,
                  boxShadow: selected?.id === child.id ? `0 0 20px ${dimColor}20` : undefined,
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `radial-gradient(circle, ${dimColor}20, transparent)`,
                      border: `1px solid ${dimColor}30`,
                    }}>
                    <span style={{ fontSize: '18px' }}>{DIM_EMOJIS[child.dimension]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-medium" style={{ color: 'hsl(45 60% 88%)', fontFamily: 'Cormorant Garamond, serif', fontSize: '16px' }}>
                        {child.id}. {child.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs opacity-30">{child.age} лет</span>
                      <span className="text-xs" style={{ color: statusCfg.color }}>
                        ● {statusCfg.label}
                      </span>
                    </div>
                    <p className="text-xs opacity-40 truncate">{child.description}</p>
                  </div>
                </div>

                {/* Раскрытая карточка */}
                {selected?.id === child.id && (
                  <div className="mt-4 pt-4 border-t animate-fade-in" style={{ borderColor: dimColor + '20' }}>
                    <div className="mb-3">
                      <p className="text-xs opacity-30 mb-1 uppercase tracking-wider">Три воплощения</p>
                      {child.forms.map((form, fi) => (
                        <div key={fi} className="text-xs py-1 flex items-center gap-2">
                          <span style={{ color: dimColor, opacity: 0.7 }}>{['I', 'II', 'III'][fi]}</span>
                          <span className="opacity-70">{form}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mb-2">
                      <p className="text-xs opacity-30 mb-1 uppercase tracking-wider">Сила</p>
                      <p className="text-xs opacity-70">{child.power}</p>
                    </div>
                    {child.location && (
                      <p className="text-xs opacity-40">📍 {child.location}</p>
                    )}
                    {!child.location && child.status === 'missing' && (
                      <p className="text-xs" style={{ color: 'hsl(0 60% 50%)' }}>📍 Местонахождение неизвестно</p>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Скрытые близнецы */}
        <div className="mt-6 border rounded-lg p-5 animate-fade-in"
          style={{
            borderColor: 'hsl(42 78% 58% / 0.2)',
            background: 'hsl(42 78% 10% / 0.3)',
          }}>
          <div className="flex items-center gap-3">
            <span style={{ fontSize: '24px' }}>🔮</span>
            <div>
              <h3 className="text-base text-glow-gold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Близнецы — двое скрытых
              </h3>
              <p className="text-xs opacity-50 mt-1">
                Сокрыты самой Катей для защиты мирового равновесия. Даже Яромир не знает о них.
                Ярослав почувствовал их присутствие — возможно, они ключ к спасению измерений.
              </p>
              <p className="text-xs mt-2 opacity-30 italic">Квест «Тайна близнецов» — заблокирован</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
