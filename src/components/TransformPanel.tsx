import { useState, useEffect } from 'react';
import { KATYA_FORMS, KATYA_FUSIONS, CHILD_FUSIONS, CHILDREN, type MysticForm, type FusionForm } from '@/data/gameData';
import Icon from '@/components/ui/icon';

interface TransformPanelProps {
  hp: number;
  mp: number;
  maxHp: number;
  maxMp: number;
  onTransform: (mpCost: number, hpBonus: number, mpBonus: number, formName: string, regenRate: number, regenType: 'hp' | 'mp' | 'both') => void;
  onRegenTick: (hpGain: number, mpGain: number) => void;
  activeFormId: string | null;
  onFormEnd: () => void;
}

type TabType = 'katya' | 'fusion' | 'children';

export default function TransformPanel({
  hp, mp, maxHp, maxMp, onTransform, onRegenTick, activeFormId, onFormEnd
}: TransformPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<TabType>('katya');
  const [selectedForms, setSelectedForms] = useState<string[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [regenAnim, setRegenAnim] = useState<{ hp: boolean; mp: boolean }>({ hp: false, mp: false });

  const activeForm = KATYA_FORMS.find(f => f.id === activeFormId);
  const activeFusion = KATYA_FUSIONS.find(f => f.id === activeFormId);
  const currentForm = activeForm || activeFusion;

  const showNotif = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2200);
  };

  useEffect(() => {
    if (!currentForm) return;
    const rate = currentForm.regenRate;
    const type = 'regenType' in currentForm ? currentForm.regenType : 'both';
    const interval = setInterval(() => {
      const hpGain = (type === 'hp' || type === 'both') ? Math.round(rate * 0.3) : 0;
      const mpGain = (type === 'mp' || type === 'both') ? Math.round(rate * 0.2) : 0;
      onRegenTick(hpGain, mpGain);
      if (hpGain > 0) { setRegenAnim(p => ({ ...p, hp: true })); setTimeout(() => setRegenAnim(p => ({ ...p, hp: false })), 400); }
      if (mpGain > 0) { setRegenAnim(p => ({ ...p, mp: true })); setTimeout(() => setRegenAnim(p => ({ ...p, mp: false })), 400); }
    }, 3000);
    return () => clearInterval(interval);
  }, [activeFormId, currentForm]);

  const toggleFormSelect = (id: string) => {
    setSelectedForms(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const activateSingleForm = (form: MysticForm) => {
    if (mp < form.mpCost) { showNotif('Недостаточно силы духа'); return; }
    onTransform(form.mpCost, form.bonuses.hp || 0, form.bonuses.mp || 0, form.name, form.regenRate, form.regenType);
    showNotif(`Трансформация: ${form.emoji} ${form.name}`);
    setIsOpen(false);
  };

  const activateFusion = (fusion: FusionForm) => {
    if (mp < fusion.mpCost) { showNotif('Недостаточно силы духа'); return; }
    const canActivate = fusion.isUltimate
      ? true
      : fusion.requiredForms.every(id => selectedForms.includes(id));
    if (!canActivate && !fusion.isUltimate) {
      showNotif(`Выберите формы: ${fusion.requiredForms.join(', ')}`);
      return;
    }
    onTransform(fusion.mpCost, fusion.bonuses.hp || 0, fusion.bonuses.mp || 0, fusion.name, fusion.regenRate, 'both');
    showNotif(`Слияние: ${fusion.emoji} ${fusion.name}!`);
    setSelectedForms([]);
    setIsOpen(false);
  };

  const activateChildFusion = (childId: number) => {
    const fusion = CHILD_FUSIONS[childId];
    if (!fusion) return;
    if (mp < fusion.mpCost) { showNotif('Недостаточно силы духа'); return; }
    onTransform(fusion.mpCost, 0, 0, fusion.name, fusion.regenRate, 'both');
    showNotif(`${fusion.emoji} ${fusion.name} — слияние форм!`);
    setIsOpen(false);
  };

  const deactivate = () => {
    onFormEnd();
    showNotif('Возврат в обычную форму');
  };

  const childrenWithFusion = CHILDREN.filter(c => CHILD_FUSIONS[c.id] && c.status === 'found');

  return (
    <>
      {/* Уведомление */}
      {notification && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg border animate-scale-in glass"
          style={{ borderColor: 'hsl(42 78% 58% / 0.5)', color: 'hsl(42 78% 75%)', fontSize: '13px', whiteSpace: 'nowrap' }}>
          {notification}
        </div>
      )}

      {/* Индикатор активной формы */}
      {currentForm && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-4 py-2 rounded-full glass border animate-fade-in"
          style={{ borderColor: ('color' in currentForm ? currentForm.color : 'hsl(42 78% 58%)') + '60' }}>
          <span style={{ fontSize: '18px' }}>{'emoji' in currentForm ? currentForm.emoji : '✨'}</span>
          <div>
            <div className="text-xs font-medium" style={{ color: 'color' in currentForm ? currentForm.color : 'hsl(42 78% 58%)' }}>
              {'name' in currentForm ? currentForm.name : ''}
            </div>
            <div className="text-xs opacity-40">
              Регенерация: +{currentForm.regenRate}
              {regenAnim.hp && <span className="ml-1 animate-fade-in" style={{ color: 'hsl(0 75% 60%)' }}>+❤</span>}
              {regenAnim.mp && <span className="ml-1 animate-fade-in" style={{ color: 'hsl(220 80% 65%)' }}>+◈</span>}
            </div>
          </div>
          <button onClick={deactivate}
            className="text-xs opacity-40 hover:opacity-80 transition-opacity ml-1"
            style={{ color: 'hsl(0 60% 55%)' }}>
            <Icon name="X" size={12} />
          </button>
        </div>
      )}

      {/* Кнопка трансформации */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200"
        style={{
          background: currentForm
            ? ('gradient' in currentForm ? currentForm.gradient : `radial-gradient(circle, ${'color' in currentForm ? currentForm.color : 'hsl(42 78% 58%)'}, hsl(225 18% 12%))`)
            : 'radial-gradient(circle, hsl(42 78% 40%), hsl(225 18% 12%))',
          border: `2px solid ${'color' in (currentForm || {}) ? (currentForm as MysticForm).color : 'hsl(42 78% 58%)'}60`,
          boxShadow: `0 0 20px ${'color' in (currentForm || {}) ? (currentForm as MysticForm).color : 'hsl(42 78% 58%)'}30`,
        }}
        title="Трансформация"
      >
        <span style={{ fontSize: '22px' }}>{currentForm ? ('emoji' in currentForm ? currentForm.emoji : '✨') : '🐉'}</span>
      </button>

      {/* Панель трансформации */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={() => setIsOpen(false)}>
          <div
            className="w-full max-w-2xl rounded-t-2xl border border-b-0 animate-fade-in overflow-hidden"
            style={{ background: 'hsl(222 22% 6%)', borderColor: 'hsl(42 78% 58% / 0.2)', maxHeight: '85vh' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Шапка */}
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border">
              <div>
                <h3 className="text-xl text-glow-gold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Трансформация
                </h3>
                <p className="text-xs opacity-40">Сила духа: {mp}/{maxMp}</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="opacity-30 hover:opacity-70 transition-opacity">
                <Icon name="X" size={18} />
              </button>
            </div>

            {/* Вкладки */}
            <div className="flex border-b border-border">
              {([
                ['katya', '🐉 Катя', '7 форм'],
                ['fusion', '✨ Слияние', 'комбо'],
                ['children', '👨‍👩‍👧 Дети', `${childrenWithFusion.length} героев`],
              ] as [TabType, string, string][]).map(([id, label, sub]) => (
                <button key={id} onClick={() => setTab(id)}
                  className="flex-1 py-3 text-xs transition-all duration-150"
                  style={{
                    color: tab === id ? 'hsl(42 78% 65%)' : 'hsl(45 20% 45%)',
                    borderBottom: tab === id ? '2px solid hsl(42 78% 58%)' : '2px solid transparent',
                    background: tab === id ? 'hsl(42 78% 58% / 0.05)' : 'transparent',
                  }}>
                  <div>{label}</div>
                  <div className="opacity-40 text-xs">{sub}</div>
                </button>
              ))}
            </div>

            <div className="overflow-y-auto" style={{ maxHeight: '55vh' }}>

              {/* Вкладка одиночных форм Кати */}
              {tab === 'katya' && (
                <div className="p-4">
                  <p className="text-xs opacity-30 mb-4 text-center italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    Семь мистических форм Первого из Небесных Драконов
                  </p>

                  {/* Регенерация при смерти */}
                  <div className="mb-4 px-4 py-3 rounded-lg border"
                    style={{ borderColor: 'hsl(0 60% 50% / 0.3)', background: 'hsl(0 60% 10% / 0.4)' }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span>🔥</span>
                      <span className="text-xs font-medium" style={{ color: 'hsl(25 90% 60%)', fontFamily: 'Cormorant Garamond, serif' }}>
                        Феникс Возрождения
                      </span>
                      <span className="text-xs opacity-40 ml-auto">Пассивно</span>
                    </div>
                    <p className="text-xs opacity-50">
                      При достижении 0 HP — автоматическое воскрешение с {hp <= 0 ? '50%' : Math.round((hp / maxHp) * 100) + '%'} жизни.
                      Феникс Солнца усиливает этот эффект.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {KATYA_FORMS.map(form => {
                      const isActive = activeFormId === form.id;
                      const canAfford = mp >= form.mpCost;
                      return (
                        <button
                          key={form.id}
                          onClick={() => isActive ? deactivate() : activateSingleForm(form)}
                          className="text-left px-4 py-3 rounded-lg border transition-all duration-150"
                          style={{
                            borderColor: isActive ? form.color + '80' : canAfford ? form.color + '30' : 'hsl(225 18% 18%)',
                            background: isActive ? form.color + '18' : 'hsl(225 18% 10%)',
                            opacity: canAfford ? 1 : 0.5,
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <span style={{ fontSize: '22px' }}>{form.emoji}</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                <span className="text-sm font-medium" style={{ color: form.color, fontFamily: 'Cormorant Garamond, serif', fontSize: '15px' }}>
                                  {form.name}
                                </span>
                                {isActive && <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: form.color + '25', color: form.color }}>Активна</span>}
                              </div>
                              <p className="text-xs opacity-50 leading-relaxed truncate">{form.description}</p>
                            </div>
                            <div className="text-right flex-shrink-0 ml-2">
                              <div className="text-xs" style={{ color: 'hsl(220 80% 65%)' }}>{form.mpCost} MP</div>
                              <div className="text-xs opacity-40">
                                +{form.regenRate}
                                {form.regenType === 'hp' ? '❤' : form.regenType === 'mp' ? '◈' : '❤◈'}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Вкладка слияния форм */}
              {tab === 'fusion' && (
                <div className="p-4">
                  <p className="text-xs opacity-30 mb-3 text-center italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    Объедините формы для слияния — выберите 3 одиночных формы ниже
                  </p>

                  {/* Выбор форм для слияния */}
                  <div className="mb-4">
                    <p className="text-xs opacity-40 mb-2 uppercase tracking-wider">Выберите формы ({selectedForms.length}/3):</p>
                    <div className="flex flex-wrap gap-2">
                      {KATYA_FORMS.map(form => (
                        <button key={form.id} onClick={() => toggleFormSelect(form.id)}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border transition-all duration-150 text-xs"
                          style={{
                            borderColor: selectedForms.includes(form.id) ? form.color + '80' : form.color + '25',
                            background: selectedForms.includes(form.id) ? form.color + '20' : 'hsl(225 18% 10%)',
                            color: selectedForms.includes(form.id) ? form.color : 'hsl(45 20% 50%)',
                          }}>
                          <span>{form.emoji}</span>
                          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '13px' }}>{form.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Варианты слияния */}
                  <div className="space-y-3">
                    {KATYA_FUSIONS.map(fusion => {
                      const isActive = activeFormId === fusion.id;
                      const canAfford = mp >= fusion.mpCost;
                      const formsSelected = fusion.isUltimate || fusion.requiredForms.every(id => selectedForms.includes(id));
                      return (
                        <button
                          key={fusion.id}
                          onClick={() => isActive ? deactivate() : activateFusion(fusion)}
                          className="w-full text-left px-4 py-4 rounded-xl border transition-all duration-200"
                          style={{
                            borderColor: isActive ? fusion.color + '80' : formsSelected && canAfford ? fusion.color + '50' : 'hsl(225 18% 18%)',
                            background: isActive ? fusion.color + '15' : 'hsl(225 18% 10%)',
                            opacity: canAfford ? 1 : 0.5,
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ background: fusion.gradient, boxShadow: `0 0 15px ${fusion.color}30` }}>
                              <span style={{ fontSize: '22px' }}>{fusion.emoji}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="text-base font-medium" style={{ color: fusion.color, fontFamily: 'Cormorant Garamond, serif', fontSize: '17px' }}>
                                  {fusion.name}
                                </span>
                                {fusion.isUltimate && <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'hsl(42 78% 58% / 0.2)', color: 'hsl(42 78% 70%)' }}>Ультимат</span>}
                                {isActive && <span className="text-xs px-2 py-0.5 rounded" style={{ background: fusion.color + '25', color: fusion.color }}>Активна</span>}
                              </div>
                              <p className="text-xs opacity-50 mb-2 leading-relaxed">{fusion.description}</p>
                              <div className="flex gap-3 text-xs">
                                <span style={{ color: 'hsl(220 80% 65%)' }}>{fusion.mpCost} MP</span>
                                <span className="opacity-40">|</span>
                                <span style={{ color: 'hsl(120 55% 55%)' }}>+{fusion.regenRate} регенерация</span>
                                {!formsSelected && !fusion.isUltimate && (
                                  <span style={{ color: 'hsl(42 78% 55%)' }}>← выберите формы</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Вкладка слияния детей */}
              {tab === 'children' && (
                <div className="p-4">
                  <p className="text-xs opacity-30 mb-4 text-center italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    Найденные дети могут объединить свои три формы
                  </p>
                  <div className="space-y-2">
                    {childrenWithFusion.map(child => {
                      const fusion = CHILD_FUSIONS[child.id]!;
                      return (
                        <button
                          key={child.id}
                          onClick={() => activateChildFusion(child.id)}
                          className="w-full text-left px-4 py-3 rounded-lg border transition-all duration-150"
                          style={{
                            borderColor: fusion.color + '35',
                            background: 'hsl(225 18% 10%)',
                            opacity: mp >= fusion.mpCost ? 1 : 0.5,
                          }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = fusion.color + '10'}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'hsl(225 18% 10%)'}
                        >
                          <div className="flex items-center gap-3">
                            <span style={{ fontSize: '20px' }}>{fusion.emoji}</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                <span className="text-xs opacity-40">{child.id}. {child.name} →</span>
                                <span className="text-sm" style={{ color: fusion.color, fontFamily: 'Cormorant Garamond, serif', fontSize: '15px' }}>
                                  {fusion.name}
                                </span>
                              </div>
                              <p className="text-xs opacity-40 truncate">{fusion.description}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="text-xs" style={{ color: 'hsl(220 80% 65%)' }}>{fusion.mpCost} MP</div>
                              <div className="text-xs opacity-30">+{fusion.regenRate}❤◈</div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Пропавшие с заблокированными формами */}
                  <div className="mt-4 p-3 rounded border border-dashed" style={{ borderColor: 'hsl(0 60% 50% / 0.2)' }}>
                    <p className="text-xs opacity-25 text-center">
                      7 детей пропали — их формы слияния недоступны
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
