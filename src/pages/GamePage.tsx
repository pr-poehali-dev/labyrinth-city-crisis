import { useState } from 'react';
import { OPENING_SCENES, STATS, type Scene, type SceneChoice } from '@/data/gameData';
import Icon from '@/components/ui/icon';

interface GameState {
  hp: number;
  mp: number;
  xp: number;
  gold: number;
  currentSceneId: string;
  history: { sceneTitle: string; choiceText: string; consequence: string }[];
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

export default function GamePage() {
  const [gameState, setGameState] = useState<GameState>({
    hp: STATS.hp,
    mp: STATS.mp,
    xp: STATS.xp,
    gold: STATS.gold,
    currentSceneId: 'scene-balcony',
    history: [],
  });
  const [lastConsequence, setLastConsequence] = useState<string | null>(null);
  const [chosenChoice, setChosenChoice] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentScene: Scene = OPENING_SCENES.find(s => s.id === gameState.currentSceneId) || OPENING_SCENES[0];
  const dimInfo = DIMENSION_LABELS[currentScene.dimension] || DIMENSION_LABELS.neutral;

  const handleChoice = (choice: SceneChoice) => {
    if (isTransitioning || chosenChoice) return;
    setChosenChoice(choice.id);
    setLastConsequence(choice.consequence || null);

    const newState = { ...gameState };
    if (choice.effect) {
      if (choice.effect.hp) newState.hp = Math.max(0, Math.min(STATS.maxHp, newState.hp + choice.effect.hp));
      if (choice.effect.mp) newState.mp = Math.max(0, Math.min(STATS.maxMp, newState.mp + choice.effect.mp));
      if (choice.effect.xp) newState.xp += choice.effect.xp;
      if (choice.effect.gold) newState.gold += choice.effect.gold;
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

  return (
    <div className="min-h-screen labyrinth-bg relative" style={{ backgroundImage: MOOD_BG[currentScene.backgroundMood || 'mystical'] }}>

      {/* HUD статус */}
      <div className="sticky top-0 z-20 glass border-b border-border px-4 py-2">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <div className="flex items-center gap-2 flex-1">
            <span className="text-xs opacity-40 hidden sm:block">❤</span>
            <div className="hp-bar flex-1 max-w-24">
              <div className="hp-bar-fill" style={{ width: `${(gameState.hp / STATS.maxHp) * 100}%` }} />
            </div>
            <span className="text-xs opacity-60" style={{ color: 'hsl(0 75% 60%)' }}>{gameState.hp}</span>
          </div>
          <div className="flex items-center gap-2 flex-1">
            <span className="text-xs opacity-40 hidden sm:block">◈</span>
            <div className="hp-bar flex-1 max-w-24">
              <div className="mp-bar-fill" style={{ width: `${(gameState.mp / STATS.maxMp) * 100}%` }} />
            </div>
            <span className="text-xs opacity-60" style={{ color: 'hsl(220 80% 65%)' }}>{gameState.mp}</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Star" size={12} style={{ color: 'hsl(42 78% 58%)' }} />
            <span className="text-xs" style={{ color: 'hsl(42 78% 58%)' }}>{gameState.xp.toLocaleString()} XP</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs">🪙</span>
            <span className="text-xs opacity-60">{gameState.gold}</span>
          </div>
        </div>
      </div>

      <div className={`max-w-3xl mx-auto px-4 py-8 transition-opacity duration-400 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>

        {/* Измерение и заголовок сцены */}
        <div className="mb-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="badge-dimension text-xs"
              style={{ color: dimInfo.color, borderColor: dimInfo.color + '50' }}
            >
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
        {!chosenChoice && (
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
                    {choice.effect.xp && `+${choice.effect.xp} XP`}
                    {choice.effect.mp && choice.effect.mp < 0 && ` ${choice.effect.mp} MP`}
                    {choice.effect.hp && choice.effect.hp < 0 && ` ${choice.effect.hp} HP`}
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

        {/* История переходов */}
        {gameState.history.length > 0 && (
          <div className="mt-10">
            <div className="ornament-divider mb-4">
              <span className="text-xs opacity-30 tracking-widest uppercase">Хроника</span>
            </div>
            <div className="space-y-2">
              {gameState.history.slice(0, 5).map((entry, i) => (
                <div key={i} className="text-xs opacity-30 flex gap-2" style={{ fontFamily: 'Golos Text, sans-serif' }}>
                  <span className="text-gold opacity-50">◆</span>
                  <div>
                    <span className="opacity-50">{entry.sceneTitle}:</span> {entry.choiceText}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
