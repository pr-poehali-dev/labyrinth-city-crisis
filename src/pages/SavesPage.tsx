import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface SaveSlot {
  id: number;
  name: string;
  chapter: string;
  scene: string;
  timestamp: string;
  playtime: string;
  xp: number;
  childrenFound: number;
  questsDone: number;
  isEmpty: boolean;
}

const INITIAL_SAVES: SaveSlot[] = [
  {
    id: 1,
    name: 'Автосохранение',
    chapter: 'Глава I',
    scene: 'Ярослав у порога',
    timestamp: '03.03.2026, 12:47',
    playtime: '0ч 23мин',
    xp: 125075,
    childrenFound: 16,
    questsDone: 0,
    isEmpty: false,
  },
  { id: 2, name: 'Слот 2', chapter: '', scene: '', timestamp: '', playtime: '', xp: 0, childrenFound: 0, questsDone: 0, isEmpty: true },
  { id: 3, name: 'Слот 3', chapter: '', scene: '', timestamp: '', playtime: '', xp: 0, childrenFound: 0, questsDone: 0, isEmpty: true },
  { id: 4, name: 'Слот 4', chapter: '', scene: '', timestamp: '', playtime: '', xp: 0, childrenFound: 0, questsDone: 0, isEmpty: true },
  { id: 5, name: 'Слот 5', chapter: '', scene: '', timestamp: '', playtime: '', xp: 0, childrenFound: 0, questsDone: 0, isEmpty: true },
];

export default function SavesPage() {
  const [saves, setSaves] = useState<SaveSlot[]>(INITIAL_SAVES);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotif = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  };

  const handleSave = (slot: SaveSlot) => {
    const updated = saves.map(s => s.id === slot.id
      ? {
        ...s,
        name: slot.id === 1 ? 'Автосохранение' : `Слот ${slot.id}`,
        chapter: 'Глава I',
        scene: 'Ярослав у порога',
        timestamp: new Date().toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        playtime: '0ч 23мин',
        xp: 125075,
        childrenFound: 16,
        questsDone: 0,
        isEmpty: false,
      }
      : s
    );
    setSaves(updated);
    showNotif(`Игра сохранена в «${slot.name}»`);
  };

  const handleDelete = (slot: SaveSlot) => {
    const updated = saves.map(s => s.id === slot.id
      ? { ...s, isEmpty: true, chapter: '', scene: '', timestamp: '', playtime: '', xp: 0, childrenFound: 0, questsDone: 0 }
      : s
    );
    setSaves(updated);
    showNotif('Сохранение удалено');
  };

  return (
    <div className="min-h-screen labyrinth-bg">
      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Заголовок */}
        <div className="mb-8 animate-fade-in">
          <p className="text-xs tracking-[0.3em] uppercase opacity-30 mb-2">Хроники</p>
          <h1 className="text-4xl text-glow-gold mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Сохранения
          </h1>
          <p className="text-sm opacity-40 italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Записи о странствиях сквозь измерения
          </p>
        </div>

        {/* Уведомление */}
        {notification && (
          <div className="mb-4 px-4 py-3 rounded border animate-scale-in"
            style={{ borderColor: 'hsl(42 78% 58% / 0.4)', background: 'hsl(42 78% 10% / 0.6)', borderLeft: '3px solid hsl(42 78% 58%)' }}>
            <p className="text-sm" style={{ color: 'hsl(42 78% 70%)' }}>✦ {notification}</p>
          </div>
        )}

        {/* Слоты */}
        <div className="space-y-4">
          {saves.map((slot, i) => (
            <div
              key={slot.id}
              className="animate-fade-in rounded-xl border overflow-hidden transition-all duration-200"
              style={{
                animationDelay: `${0.1 + i * 0.07}s`,
                opacity: 0,
                borderColor: slot.isEmpty ? 'hsl(225 18% 18%)' : 'hsl(42 78% 58% / 0.25)',
                background: slot.isEmpty ? 'hsl(225 18% 8% / 0.5)' : 'hsl(225 18% 9% / 0.9)',
              }}
            >
              {slot.isEmpty ? (
                /* Пустой слот */
                <button
                  onClick={() => handleSave(slot)}
                  className="w-full flex items-center justify-center gap-3 py-8 transition-all duration-150 group"
                  style={{ color: 'hsl(45 20% 35%)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'hsl(225 18% 11%)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = ''}
                >
                  <Icon name="Plus" size={16} className="opacity-40 group-hover:opacity-70 transition-opacity" />
                  <span className="text-sm opacity-40 group-hover:opacity-70 transition-opacity" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {slot.name} — пусто
                  </span>
                </button>
              ) : (
                /* Заполненный слот */
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: 'hsl(42 78% 58% / 0.12)', border: '1px solid hsl(42 78% 58% / 0.3)' }}>
                        <span style={{ fontSize: '22px' }}>🐉</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-base font-medium" style={{ color: 'hsl(45 60% 88%)', fontFamily: 'Cormorant Garamond, serif', fontSize: '18px' }}>
                            {slot.name}
                          </span>
                          {slot.id === 1 && (
                            <span className="text-xs px-2 py-0.5 rounded"
                              style={{ background: 'hsl(42 78% 58% / 0.15)', color: 'hsl(42 78% 65%)' }}>
                              Авто
                            </span>
                          )}
                        </div>
                        <div className="text-xs opacity-40 mb-1" style={{ fontStyle: 'italic' }}>
                          {slot.chapter} · {slot.scene}
                        </div>
                        <div className="text-xs opacity-25">{slot.timestamp} · {slot.playtime}</div>
                      </div>
                    </div>
                  </div>

                  {/* Мини-статы */}
                  <div className="grid grid-cols-3 gap-3 mb-4 pt-3 border-t border-border text-center">
                    <div>
                      <div className="text-sm text-glow-gold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        {slot.xp.toLocaleString()}
                      </div>
                      <div className="text-xs opacity-30">XP</div>
                    </div>
                    <div>
                      <div className="text-sm" style={{ color: 'hsl(120 55% 50%)', fontFamily: 'Cormorant Garamond, serif' }}>
                        {slot.childrenFound}/23
                      </div>
                      <div className="text-xs opacity-30">Детей</div>
                    </div>
                    <div>
                      <div className="text-sm" style={{ color: 'hsl(220 75% 60%)', fontFamily: 'Cormorant Garamond, serif' }}>
                        {slot.questsDone}
                      </div>
                      <div className="text-xs opacity-30">Квестов</div>
                    </div>
                  </div>

                  {/* Кнопки */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => showNotif('Загрузка сохранения...')}
                      className="flex-1 py-2 px-4 rounded text-sm transition-all duration-150"
                      style={{
                        background: 'hsl(42 78% 58% / 0.15)',
                        border: '1px solid hsl(42 78% 58% / 0.4)',
                        color: 'hsl(42 78% 70%)',
                      }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'hsl(42 78% 58% / 0.25)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'hsl(42 78% 58% / 0.15)'}
                    >
                      Загрузить
                    </button>
                    <button
                      onClick={() => handleSave(slot)}
                      className="py-2 px-4 rounded text-sm transition-all duration-150"
                      style={{
                        background: 'hsl(220 75% 55% / 0.12)',
                        border: '1px solid hsl(220 75% 55% / 0.35)',
                        color: 'hsl(220 75% 70%)',
                      }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'hsl(220 75% 55% / 0.2)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'hsl(220 75% 55% / 0.12)'}
                    >
                      Перезаписать
                    </button>
                    {slot.id !== 1 && (
                      <button
                        onClick={() => handleDelete(slot)}
                        className="py-2 px-3 rounded text-sm transition-all duration-150"
                        style={{
                          background: 'hsl(0 60% 50% / 0.1)',
                          border: '1px solid hsl(0 60% 50% / 0.3)',
                          color: 'hsl(0 60% 60%)',
                        }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'hsl(0 60% 50% / 0.2)'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'hsl(0 60% 50% / 0.1)'}
                      >
                        <Icon name="Trash2" size={14} />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-xs opacity-20 mt-8 italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Каждая запись — хроника странствий сквозь пять измерений
        </p>
      </div>
    </div>
  );
}
