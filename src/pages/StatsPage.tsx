import { STATS, CHILDREN } from '@/data/gameData';
import Icon from '@/components/ui/icon';

const ATTRIBUTES = [
  { key: 'strength', label: 'Сила', icon: 'Sword', color: 'hsl(0 60% 50%)' },
  { key: 'wisdom', label: 'Мудрость', icon: 'Brain', color: 'hsl(270 60% 65%)' },
  { key: 'magic', label: 'Магия', icon: 'Sparkles', color: 'hsl(220 75% 65%)' },
  { key: 'agility', label: 'Ловкость', icon: 'Wind', color: 'hsl(180 65% 55%)' },
  { key: 'endurance', label: 'Выносливость', icon: 'Shield', color: 'hsl(42 78% 58%)' },
  { key: 'charisma', label: 'Харизма', icon: 'Star', color: 'hsl(340 65% 60%)' },
];

const MAGIC_FORMS = [
  { name: 'Стихии Астрии', dim: 'astria', color: 'hsl(180 65% 55%)' },
  { name: 'Технологии Сайберна', dim: 'cybern', color: 'hsl(210 90% 60%)' },
  { name: 'Некромантия', dim: 'necropolis', color: 'hsl(270 60% 55%)' },
  { name: 'Природная магия', dim: 'edemia', color: 'hsl(120 55% 45%)' },
  { name: 'Пустотная сила', dim: 'pustosh', color: 'hsl(0 0% 45%)' },
  { name: 'Огонь', dim: 'astria', color: 'hsl(15 80% 55%)' },
  { name: 'Лёд', dim: 'astria', color: 'hsl(200 80% 60%)' },
  { name: 'Молния', dim: 'astria', color: 'hsl(55 90% 60%)' },
  { name: 'Тени', dim: 'necropolis', color: 'hsl(260 50% 45%)' },
  { name: 'Исцеление', dim: 'edemia', color: 'hsl(150 60% 50%)' },
  { name: 'Пророчество', dim: 'astria', color: 'hsl(300 50% 60%)' },
  { name: 'Алхимия душ', dim: 'necropolis', color: 'hsl(280 65% 55%)' },
  { name: 'Манипуляция временем', dim: 'cybern', color: 'hsl(195 75% 55%)' },
  { name: 'Звёздная магия', dim: 'astria', color: 'hsl(240 60% 70%)' },
  { name: 'Корневые сети', dim: 'edemia', color: 'hsl(100 55% 40%)' },
  { name: 'Духовная трансформация', dim: 'necropolis', color: 'hsl(290 55% 55%)' },
  { name: 'Создание порталов', dim: 'cybern', color: 'hsl(220 70% 58%)' },
  { name: 'Контроль погоды', dim: 'astria', color: 'hsl(60 70% 55%)' },
  { name: 'Поглощение хаоса', dim: 'pustosh', color: 'hsl(0 0% 40%)' },
  { name: 'Цифровое кодирование', dim: 'cybern', color: 'hsl(200 80% 55%)' },
  { name: 'Первородное пламя', dim: 'astria', color: 'hsl(25 85% 55%)' },
  { name: 'Звук пробуждения', dim: 'edemia', color: 'hsl(85 60% 50%)' },
  { name: 'Абсолютное равновесие', dim: 'neutral', color: 'hsl(42 78% 58%)' },
];

export default function StatsPage() {
  const foundCount = CHILDREN.filter(c => c.status === 'found').length;
  const missingCount = CHILDREN.filter(c => c.status === 'missing').length;

  return (
    <div className="min-h-screen labyrinth-bg">
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Заголовок */}
        <div className="mb-8 animate-fade-in">
          <p className="text-xs tracking-[0.3em] uppercase opacity-30 mb-2">Хроника силы</p>
          <h1 className="text-4xl text-glow-gold mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Статистика
          </h1>
          <p className="text-sm opacity-40 italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Путь Первого из Небесных Драконов
          </p>
        </div>

        {/* Верхний блок */}
        <div className="magic-border rounded-xl p-6 mb-6 animate-fade-in delay-100"
          style={{ background: 'hsl(225 18% 9% / 0.9)' }}>
          <div className="flex items-start gap-6 mb-6">
            <div className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0 animate-float"
              style={{
                background: 'radial-gradient(circle at 30% 30%, hsl(42 78% 65%), hsl(220 75% 45%))',
                boxShadow: '0 0 30px hsl(42 78% 58% / 0.35), 0 0 60px hsl(220 75% 55% / 0.15)',
              }}>
              <span style={{ fontSize: '36px' }}>🐉</span>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl text-glow-gold mb-0.5" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {STATS.name}
              </h2>
              <p className="text-sm opacity-50 italic mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {STATS.title}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="opacity-40">Жизнь</span>
                    <span style={{ color: 'hsl(0 75% 60%)' }}>{STATS.hp}/{STATS.maxHp}</span>
                  </div>
                  <div className="hp-bar"><div className="hp-bar-fill" style={{ width: '100%' }} /></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="opacity-40">Сила духа</span>
                    <span style={{ color: 'hsl(220 80% 65%)' }}>{STATS.mp}/{STATS.maxMp}</span>
                  </div>
                  <div className="hp-bar"><div className="mp-bar-fill" style={{ width: '97%' }} /></div>
                </div>
                <div className="col-span-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="opacity-40">Опыт</span>
                    <span style={{ color: 'hsl(42 78% 58%)' }}>{STATS.xp.toLocaleString()} / {STATS.nextLevelXp.toLocaleString()}</span>
                  </div>
                  <div className="hp-bar"><div className="xp-bar-fill" style={{ width: `${(STATS.xp / STATS.nextLevelXp) * 100}%` }} /></div>
                </div>
              </div>
            </div>
          </div>

          {/* Цифры */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 pt-4 border-t border-border text-center">
            {[
              { val: STATS.level, label: 'Уровень' },
              { val: STATS.forms, label: 'Форм магии' },
              { val: STATS.battlesWon, label: 'Побед' },
              { val: STATS.dimensionsVisited, label: 'Измерений' },
              { val: STATS.gold, label: 'Золото' },
              { val: STATS.age, label: 'Возраст' },
            ].map(({ val, label }) => (
              <div key={label}>
                <div className="text-xl font-light text-glow-gold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{val}</div>
                <div className="text-xs opacity-30 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Атрибуты */}
        <div className="rounded-lg border p-5 mb-5 animate-fade-in delay-200"
          style={{ background: 'hsl(225 18% 9% / 0.8)', borderColor: 'hsl(225 18% 18%)' }}>
          <h3 className="text-xl text-glow-gold mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Атрибуты
          </h3>
          <div className="space-y-3">
            {ATTRIBUTES.map(({ key, label, icon, color }) => {
              const val = STATS.attributes[key as keyof typeof STATS.attributes];
              return (
                <div key={key} className="flex items-center gap-4">
                  <Icon name={icon} size={14} style={{ color, opacity: 0.7 }} />
                  <span className="text-xs w-24 opacity-60" style={{ fontFamily: 'Golos Text, sans-serif' }}>{label}</span>
                  <div className="hp-bar flex-1">
                    <div style={{ height: '100%', background: color, width: `${val}%`, borderRadius: '3px', transition: 'width 0.8s ease' }} />
                  </div>
                  <span className="text-xs w-6 text-right opacity-60">{val}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Детей */}
        <div className="grid grid-cols-2 gap-3 mb-5 animate-fade-in delay-300">
          <div className="rounded-lg border p-4" style={{ background: 'hsl(120 18% 9% / 0.8)', borderColor: 'hsl(120 55% 45% / 0.3)' }}>
            <div className="text-3xl text-center mb-1" style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(120 55% 50%)' }}>
              {foundCount}
            </div>
            <p className="text-xs text-center opacity-40">Детей рядом</p>
          </div>
          <div className="rounded-lg border p-4" style={{ background: 'hsl(0 18% 9% / 0.8)', borderColor: 'hsl(0 60% 50% / 0.3)' }}>
            <div className="text-3xl text-center mb-1" style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(0 60% 55%)' }}>
              {missingCount}
            </div>
            <p className="text-xs text-center opacity-40">Детей пропавших</p>
          </div>
        </div>

        {/* 23 формы магии */}
        <div className="rounded-lg border p-5 animate-fade-in delay-400"
          style={{ background: 'hsl(225 18% 9% / 0.8)', borderColor: 'hsl(225 18% 18%)' }}>
          <h3 className="text-xl text-glow-gold mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            23 Формы магии
          </h3>
          <div className="flex flex-wrap gap-2">
            {MAGIC_FORMS.map((magic, i) => (
              <span key={i}
                className="text-xs px-2.5 py-1 rounded border"
                style={{
                  borderColor: magic.color + '40',
                  color: magic.color,
                  background: magic.color + '10',
                  fontFamily: 'Golos Text, sans-serif',
                }}>
                {magic.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
