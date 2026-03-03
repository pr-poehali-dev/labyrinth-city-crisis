import { useState } from 'react';
import { QUESTS, type Quest, type Dimension } from '@/data/gameData';
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

const STATUS_CONFIG = {
  active: { label: 'Активный', color: 'hsl(42 78% 58%)', icon: 'Circle' },
  completed: { label: 'Завершён', color: 'hsl(120 55% 45%)', icon: 'CheckCircle' },
  locked: { label: 'Заблокирован', color: 'hsl(225 18% 35%)', icon: 'Lock' },
};

const MAIN_IDS = ['main-1', 'main-2', 'main-3', 'main-4'];

export default function QuestsPage() {
  const [selected, setSelected] = useState<Quest | null>(null);
  const [tab, setTab] = useState<'main' | 'side'>('main');

  const mainQuests = QUESTS.filter(q => MAIN_IDS.includes(q.id));
  const sideQuests = QUESTS.filter(q => !MAIN_IDS.includes(q.id));
  const displayed = tab === 'main' ? mainQuests : sideQuests;

  const activeCount = QUESTS.filter(q => q.status === 'active').length;
  const completedCount = QUESTS.filter(q => q.status === 'completed').length;

  return (
    <div className="min-h-screen labyrinth-bg">
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Заголовок */}
        <div className="mb-8 animate-fade-in">
          <p className="text-xs tracking-[0.3em] uppercase opacity-30 mb-2">Летопись</p>
          <h1 className="text-4xl text-glow-gold mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            История квестов
          </h1>
          <div className="flex gap-5 text-sm opacity-50">
            <span>Активных: {activeCount}</span>
            <span>Завершённых: {completedCount}</span>
          </div>
        </div>

        {/* Вкладки */}
        <div className="flex gap-1 mb-6 p-1 rounded-lg border border-border animate-fade-in delay-100"
          style={{ background: 'hsl(225 18% 7%)', width: 'fit-content' }}>
          {([['main', 'Основные'], ['side', 'Побочные']] as [string, string][]).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id as 'main' | 'side')}
              className="px-4 py-2 rounded text-sm transition-all duration-150"
              style={{
                background: tab === id ? 'hsl(225 18% 14%)' : 'transparent',
                color: tab === id ? 'hsl(42 78% 58%)' : 'hsl(45 20% 55%)',
                borderBottom: tab === id ? '1px solid hsl(42 78% 58% / 0.5)' : '1px solid transparent',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Список квестов */}
        <div className="space-y-3">
          {displayed.map((quest, i) => {
            const statusCfg = STATUS_CONFIG[quest.status];
            const dimColor = quest.dimension ? DIM_COLORS[quest.dimension] : 'hsl(42 78% 58%)';
            const isSelected = selected?.id === quest.id;
            const progress = quest.progress !== undefined && quest.maxProgress
              ? (quest.progress / quest.maxProgress) * 100
              : 0;

            return (
              <div key={quest.id}
                className="animate-fade-in"
                style={{ animationDelay: `${0.1 + i * 0.07}s`, opacity: 0 }}>
                <button
                  onClick={() => quest.status !== 'locked' && setSelected(isSelected ? null : quest)}
                  className="w-full text-left rounded-lg border px-5 py-4 transition-all duration-200"
                  style={{
                    background: isSelected ? `${statusCfg.color}08` : 'hsl(225 18% 9% / 0.8)',
                    borderColor: isSelected ? statusCfg.color + '50' : 'hsl(225 18% 18%)',
                    opacity: quest.status === 'locked' ? 0.5 : 1,
                    cursor: quest.status === 'locked' ? 'not-allowed' : 'pointer',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-0.5">
                      <Icon name={statusCfg.icon} size={16} style={{ color: statusCfg.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-1 flex-wrap">
                        <span className="text-base font-medium" style={{ color: 'hsl(45 60% 88%)', fontFamily: 'Cormorant Garamond, serif', fontSize: '18px' }}>
                          {quest.title}
                        </span>
                        <span className="text-xs mt-0.5" style={{ color: statusCfg.color, opacity: 0.8 }}>
                          {statusCfg.label}
                        </span>
                        {quest.dimension && (
                          <span className="badge-dimension text-xs mt-0.5"
                            style={{ color: dimColor, borderColor: dimColor + '40', fontSize: '9px' }}>
                            {DIM_LABELS[quest.dimension]}
                          </span>
                        )}
                      </div>
                      <p className="text-xs opacity-50 mb-2 leading-relaxed">{quest.description}</p>

                      {/* Прогресс */}
                      {quest.maxProgress && quest.maxProgress > 0 && (
                        <div className="flex items-center gap-3">
                          <div className="hp-bar flex-1 max-w-40">
                            <div className="xp-bar-fill" style={{ width: `${progress}%` }} />
                          </div>
                          <span className="text-xs opacity-30">{quest.progress}/{quest.maxProgress}</span>
                        </div>
                      )}
                    </div>
                    {quest.status !== 'locked' && (
                      <Icon name={isSelected ? 'ChevronUp' : 'ChevronDown'} size={14} className="opacity-20 flex-shrink-0 mt-1" />
                    )}
                  </div>
                </button>

                {/* Раскрытые детали */}
                {isSelected && quest.status !== 'locked' && (
                  <div className="mx-1 rounded-b-lg border border-t-0 px-5 py-4 animate-fade-in"
                    style={{
                      background: `${statusCfg.color}05`,
                      borderColor: statusCfg.color + '25',
                    }}>
                    <div className="flex items-center gap-2 mb-3">
                      <Icon name="Gift" size={14} style={{ color: 'hsl(42 78% 58%)' }} />
                      <span className="text-xs opacity-30 uppercase tracking-wider">Награда</span>
                    </div>
                    <p className="text-sm" style={{ color: 'hsl(42 78% 65%)', fontFamily: 'Cormorant Garamond, serif' }}>
                      {quest.reward}
                    </p>

                    {/* Связанные шаги для основных квестов */}
                    {MAIN_IDS.includes(quest.id) && (
                      <div className="mt-4">
                        <p className="text-xs opacity-30 mb-2 uppercase tracking-wider">Связан с</p>
                        <div className="space-y-1">
                          {quest.id === 'main-1' && (
                            <p className="text-xs opacity-50">→ Найти Яромира в технологических верфях</p>
                          )}
                          {quest.id === 'main-2' && (
                            <>
                              <p className="text-xs opacity-50">→ Демьян, Всеволод, Богдан (пропали в разломах)</p>
                              <p className="text-xs opacity-50">→ Горислав, Станислав, Оксана, Ромуальд</p>
                            </>
                          )}
                          {quest.id === 'main-3' && (
                            <>
                              <p className="text-xs opacity-50">→ Исследовать Дерево Слияния</p>
                              <p className="text-xs opacity-50">→ Остановить расширение Пустоши</p>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Заблокированный квест */}
        <div className="mt-6 text-center p-5 rounded-lg border border-dashed animate-fade-in"
          style={{ borderColor: 'hsl(225 18% 20%)', opacity: 0, animationDelay: '0.7s' }}>
          <Icon name="Lock" size={16} className="mx-auto mb-2 opacity-20" />
          <p className="text-xs opacity-20 italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Новые квесты откроются по мере развития событий
          </p>
        </div>
      </div>
    </div>
  );
}
