import { useState, useEffect, useRef } from 'react';
import { OPENING_SCENES, STATS, type Scene, type SceneChoice } from '@/data/gameData';
import TransformPanel from '@/components/TransformPanel';
import Icon from '@/components/ui/icon';

interface GameState {
  hp: number;
  mp: number;
  xp: number;
  gold: number;
  currentSceneId: string;
  history: { sceneTitle: string; choiceText: string; consequence: string }[];
  isDead: boolean;
  revivedCount: number;
}

const DIMENSION_LABELS: Record<string, { label: string; color: string }> = {
  astria: { label: 'Астрия', color: 'hsl(180 65% 55%)' },
  cybern: { label: 'Сайберн', color: 'hsl(210 90% 60%)' },
  necropolis: { label: 'Некрополис', color: 'hsl(270 60% 55%)' },
  edemia: { label: 'Эдемия', color: 'hsl(120 55% 45%)' },
  pustosh: { label: 'Пустошь', color: 'hsl(0 0% 45%)' },
  neutral: { label: 'Город-Лабиринт', color: 'hsl(42 78% 58%)' },
};

const MOOD_BG: Record<string, string> = {
  mystical: 'radial-gradient(ellipse at 50% 0%, hsl(270 40% 12% / 0.8), transparent 60%)',
  danger: 'radial-gradient(ellipse at 50% 0%, hsl(0 40% 12% / 0.8), transparent 60%)',
  calm: 'radial-gradient(ellipse at 50% 0%, hsl(220 40% 12% / 0.8), transparent 60%)',
  void: 'radial-gradient(ellipse at 50% 0%, hsl(0 0% 5% / 0.9), transparent 60%)',
};

interface FloatNumber {
  id: number;
  value: string;
  color: string;
  x: number;
}

export default function GamePage() {
  const [gameState, setGameState] = useState<GameState>({
    hp: STATS.hp,
    mp: STATS.mp,
    xp: STATS.xp,
    gold: STATS.gold,
    currentSceneId: 'scene-balcony',
    history: [],
    isDead: false,
    revivedCount: 0,
  });
  const [lastConsequence, setLastConsequence] = useState<string | null>(null);
  const [chosenChoice, setChosenChoice] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeFormId, setActiveFormId] = useState<string | null>(null);
  const [floatNumbers, setFloatNumbers] = useState<FloatNumber[]>([]);
  const [deathScreen, setDeathScreen] = useState(false);
  const [reviveAnim, setReviveAnim] = useState(false);
  const floatIdRef = useRef(0);

  const currentScene: Scene = OPENING_SCENES.find(s => s.id === gameState.currentSceneId) || OPENING_SCENES[0];
  const dimInfo = DIMENSION_LABELS[currentScene.dimension] || DIMENSION_LABELS.neutral;

  const addFloat = (value: string, color: string) => {
    const id = ++floatIdRef.current;
    const x = 30 + Math.random() * 40;
    setFloatNumbers(prev => [...prev, { id, value, color, x }]);
    setTimeout(() => setFloatNumbers(prev => prev.filter(f => f.id !== id)), 1500);
  };

  const handleDeath = () => {
    setDeathScreen(true);
    setTimeout(() => {
      setReviveAnim(true);
      setTimeout(() => {
        const revivedHp = Math.round(STATS.maxHp * 0.5);
        setGameState(prev => ({
          ...prev,
          hp: revivedHp,
          isDead: false,
          revivedCount: prev.revivedCount + 1,
        }));
        setDeathScreen(false);
        setReviveAnim(false);
        addFloat(`+${revivedHp} Возрождение!`, 'hsl(25 90% 65%)');
      }, 1500);
    }, 2500);
  };

  const handleTransform = (mpCost: number, hpBonus: number, mpBonus: number, formName: string, regenRate: number, regenType: 'hp' | 'mp' | 'both') => {
    setGameState(prev => {
      const newMp = Math.max(0, prev.mp - mpCost);
      const newHp = Math.min(STATS.maxHp, prev.hp + hpBonus);
      const newMpFinal = Math.min(STATS.maxMp, newMp + mpBonus);
      if (hpBonus > 0) addFloat(`+${hpBonus} HP`, 'hsl(120 55% 55%)');
      if (mpBonus > 0) addFloat(`+${mpBonus} MP`, 'hsl(220 80% 65%)');
      return { ...prev, hp: newHp, mp: newMpFinal };
    });
    setActiveFormId(formName);
  };

  const handleRegenTick = (hpGain: number, mpGain: number) => {
    setGameState(prev => {
      if (prev.isDead) return prev;
      const newHp = Math.min(STATS.maxHp, prev.hp + hpGain);
      const newMp = Math.min(STATS.maxMp, prev.mp + mpGain);
      if (hpGain > 0 && prev.hp < STATS.maxHp) addFloat(`+${hpGain}`, 'hsl(0 70% 60%)');
      if (mpGain > 0 && prev.mp < STATS.maxMp) addFloat(`+${mpGain}`, 'hsl(220 80% 65%)');
      return { ...prev, hp: newHp, mp: newMp };
    });
  };

  const handleFormEnd = () => {
    setActiveFormId(null);
  };

  useEffect(() => {
    if (gameState.hp <= 0 && !gameState.isDead && !deathScreen) {
      setGameState(prev => ({ ...prev, isDead: true }));
      handleDeath();
    }
  }, [gameState.hp]);

  const handleChoice = (choice: SceneChoice) => {
    if (isTransitioning || chosenChoice || gameState.isDead) return;
    setChosenChoice(choice.id);
    setLastConsequence(choice.consequence || null);

    const newState = { ...gameState };
    if (choice.effect) {
      if (choice.effect.hp) {
        newState.hp = Math.max(0, Math.min(STATS.maxHp, newState.hp + choice.effect.hp));
        addFloat(`${choice.effect.hp > 0 ? '+' : ''}${choice.effect.hp} HP`, choice.effect.hp > 0 ? 'hsl(120 55% 55%)' : 'hsl(0 70% 55%)');
      }
      if (choice.effect.mp) {
        newState.mp = Math.max(0, Math.min(STATS.maxMp, newState.mp + choice.effect.mp));
        addFloat(`${choice.effect.mp > 0 ? '+' : ''}${choice.effect.mp} MP`, choice.effect.mp > 0 ? 'hsl(220 80% 65%)' : 'hsl(270 60% 55%)');
      }
      if (choice.effect.xp) {
        newState.xp += choice.effect.xp;
        addFloat(`+${choice.effect.xp} XP`, 'hsl(42 78% 65%)');
      }
      if (choice.effect.gold) {
        newState.gold += choice.effect.gold;
        addFloat(`+${choice.effect.gold}🪙`, 'hsl(42 78% 65%)');
      }
    }

    newState.history = [
      { sceneTitle: currentScene.title, choiceText: choice.text, consequence: choice.consequence || '' },
      ...newState.history.slice(0, 19),
    ];

    setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        if (choice.nextSceneId) newState.currentSceneId = choice.nextSceneId;
        setGameState(newState);
        setLastConsequence(null);
        setChosenChoice(null);
        setIsTransitioning(false);
      }, 400);
    }, 1800);
  };

  const hpPercent = (gameState.hp / STATS.maxHp) * 100;
  const mpPercent = (gameState.mp / STATS.maxMp) * 100;
  const xpPercent = ((gameState.xp - STATS.xp) / (STATS.nextLevelXp - STATS.xp) + 1) * 50;

  return (
    <div className="min-h-screen labyrinth-bg relative" style={{ backgroundImage: MOOD_BG[currentScene.backgroundMood || 'mystical'] }}>

      {/* Плавающие числа урона/восстановления */}
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
        {floatNumbers.map(f => (
          <div key={f.id}
            className="absolute text-sm font-bold"
            style={{
              top: '15%',
              left: `${f.x}%`,
              color: f.color,
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '16px',
              textShadow: `0 0 10px ${f.color}`,
              animation: 'float-up 1.5s ease-out forwards',
            }}>
            {f.value}
          </div>
        ))}
      </div>

      {/* Экран смерти и воскрешения */}
      {deathScreen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: 'hsl(0 0% 3% / 0.97)' }}>
          {!reviveAnim ? (
            <div className="text-center animate-fade-in">
              <div className="text-6xl mb-4 animate-pulse">🔥</div>
              <h2 className="text-3xl text-glow-gold mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Катя пала в бою
              </h2>
              <p className="text-sm opacity-50 italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Но Феникс не умирает дважды...
              </p>
              <div className="mt-6 flex gap-1 justify-center">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-2 h-2 rounded-full animate-pulse-glow"
                    style={{ background: 'hsl(25 90% 55%)', animationDelay: `${i * 0.3}s` }} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center animate-scale-in">
              <div className="text-7xl mb-4">✨</div>
              <h2 className="text-4xl text-glow-gold mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Возрождение
              </h2>
              <p className="text-sm" style={{ color: 'hsl(25 90% 65%)', fontFamily: 'Cormorant Garamond, serif' }}>
                Феникс восстаёт из пепла
              </p>
              {gameState.revivedCount > 0 && (
                <p className="text-xs opacity-30 mt-2">Возрождений: {gameState.revivedCount + 1}</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* HUD статус */}
      <div className="sticky top-0 z-20 glass border-b border-border px-4 py-2">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-1.5">
            {/* HP */}
            <div className="flex items-center gap-1.5 flex-1">
              <span className="text-xs" style={{ color: 'hsl(0 75% 60%)' }}>❤</span>
              <div className="hp-bar flex-1">
                <div className="hp-bar-fill transition-all duration-500"
                  style={{ width: `${hpPercent}%`, opacity: hpPercent < 20 ? '0.6' : '1' }} />
              </div>
              <span className="text-xs w-14 text-right" style={{ color: 'hsl(0 75% 60%)', fontSize: '11px' }}>
                {gameState.hp}
              </span>
            </div>
            {/* MP */}
            <div className="flex items-center gap-1.5 flex-1">
              <span className="text-xs" style={{ color: 'hsl(220 80% 65%)' }}>◈</span>
              <div className="hp-bar flex-1">
                <div className="mp-bar-fill transition-all duration-500" style={{ width: `${mpPercent}%` }} />
              </div>
              <span className="text-xs w-14 text-right" style={{ color: 'hsl(220 80% 65%)', fontSize: '11px' }}>
                {gameState.mp}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* XP */}
            <div className="flex items-center gap-1.5 flex-1">
              <span className="text-xs opacity-30">XP</span>
              <div className="hp-bar flex-1">
                <div className="xp-bar-fill transition-all duration-500" style={{ width: `${Math.min(100, xpPercent)}%` }} />
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs opacity-50">
              <span>🪙 {gameState.gold}</span>
              {activeFormId && (
                <span style={{ color: 'hsl(42 78% 65%)' }}>✦ {activeFormId}</span>
              )}
              {gameState.revivedCount > 0 && (
                <span style={{ color: 'hsl(25 90% 60%)' }}>🔥×{gameState.revivedCount}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={`max-w-3xl mx-auto px-4 py-8 pb-28 transition-opacity duration-400 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>

        {/* Измерение и заголовок сцены */}
        <div className="mb-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-3">
            <span className="badge-dimension text-xs" style={{ color: dimInfo.color, borderColor: dimInfo.color + '50' }}>
              {dimInfo.label}
            </span>
            <div className="ornament-divider flex-1" style={{ color: dimInfo.color + '40' }}>
              <span style={{ fontSize: '8px' }}>✦</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl text-glow-gold mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {currentScene.title}
          </h2>
        </div>

        {/* Текст сцены */}
        <div className="magic-border rounded-lg p-6 mb-6 animate-fade-in"
          style={{ background: 'hsl(225 18% 8% / 0.85)' }}>
          {currentScene.text.split('\n\n').map((para, i) => (
            <p key={i} className={`text-sm leading-relaxed opacity-85 ${i > 0 ? 'mt-4' : ''}`}
              style={{ fontFamily: 'Golos Text, sans-serif', lineHeight: '1.8' }}>
              {para}
            </p>
          ))}
        </div>

        {/* Последствие выбора */}
        {lastConsequence && (
          <div className="mb-6 px-4 py-3 rounded border animate-scale-in"
            style={{
              borderColor: dimInfo.color + '40',
              background: dimInfo.color + '0D',
              borderLeft: `3px solid ${dimInfo.color}`,
            }}>
            <p className="text-sm italic opacity-80" style={{ fontFamily: 'Cormorant Garamond, serif', color: dimInfo.color }}>
              {lastConsequence}
            </p>
          </div>
        )}

        {/* Выборы */}
        {!chosenChoice && !gameState.isDead && (
          <div className="space-y-3 animate-fade-in">
            <p className="text-xs opacity-30 mb-4 tracking-widest uppercase" style={{ fontFamily: 'Golos Text, sans-serif' }}>
              Выберите действие
            </p>
            {currentScene.choices.map((choice, i) => (
              <button
                key={choice.id}
                onClick={() => handleChoice(choice)}
                className="choice-btn animate-fade-in"
                style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
              >
                <span className="opacity-30 text-xs mr-2">{i + 1}.</span>
                {choice.text}
                {choice.requiresItem && (
                  <span className="ml-2 text-xs opacity-40">[требует предмет]</span>
                )}
                {choice.effect && (
                  <span className="float-right text-xs opacity-30 ml-4">
                    {choice.effect.xp ? `+${choice.effect.xp} XP ` : ''}
                    {choice.effect.mp && choice.effect.mp < 0 ? `${choice.effect.mp} MP ` : ''}
                    {choice.effect.hp && choice.effect.hp < 0 ? `${choice.effect.hp} HP ` : ''}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {chosenChoice && !lastConsequence && (
          <div className="text-center py-8 opacity-40">
            <div className="text-2xl animate-pulse-glow">✦</div>
          </div>
        )}

        {/* Хроника */}
        {gameState.history.length > 0 && (
          <div className="mt-10">
            <div className="ornament-divider mb-4">
              <span className="text-xs opacity-30 tracking-widest uppercase">Хроника</span>
            </div>
            <div className="space-y-2">
              {gameState.history.slice(0, 5).map((entry, i) => (
                <div key={i} className="text-xs opacity-30 flex gap-2">
                  <span style={{ color: 'hsl(42 78% 58%)', opacity: 0.5 }}>◆</span>
                  <div>
                    <span className="opacity-50">{entry.sceneTitle}:</span> {entry.choiceText}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Панель трансформации */}
      <TransformPanel
        hp={gameState.hp}
        mp={gameState.mp}
        maxHp={STATS.maxHp}
        maxMp={STATS.maxMp}
        onTransform={handleTransform}
        onRegenTick={handleRegenTick}
        activeFormId={activeFormId}
        onFormEnd={handleFormEnd}
      />

      <style>{`
        @keyframes float-up {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-50px); }
        }
      `}</style>
    </div>
  );
}
