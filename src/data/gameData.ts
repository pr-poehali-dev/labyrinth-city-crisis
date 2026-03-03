export type Dimension = 'astria' | 'cybern' | 'necropolis' | 'edemia' | 'pustosh';

export interface Child {
  id: number;
  name: string;
  age: number;
  dimension: Dimension;
  forms: [string, string, string];
  description: string;
  status: 'found' | 'missing' | 'hidden';
  power: string;
  location?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  type: 'artifact' | 'scroll' | 'coin' | 'gem' | 'weapon' | 'relic';
  description: string;
  dimension?: Dimension;
  quantity: number;
  rarity: 'common' | 'rare' | 'legendary' | 'divine';
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'locked';
  dimension?: Dimension;
  reward?: string;
  progress?: number;
  maxProgress?: number;
}

export interface SceneChoice {
  id: string;
  text: string;
  consequence?: string;
  nextSceneId?: string;
  requiresItem?: string;
  effect?: {
    hp?: number;
    mp?: number;
    xp?: number;
    gold?: number;
    itemGain?: string;
  };
}

export interface Scene {
  id: string;
  title: string;
  text: string;
  dimension: Dimension | 'neutral';
  choices: SceneChoice[];
  backgroundMood?: 'mystical' | 'danger' | 'calm' | 'void';
}

export const CHILDREN: Child[] = [
  { id: 1, name: 'Ярослав', age: 847, dimension: 'astria', forms: ['Страж Стихий', 'Повелитель Бурь', 'Дракон Небес'], description: 'Первый и старший, хранит золотые волосы отца', status: 'found', power: 'Управление стихиями', location: 'Центр Города-Лабиринта' },
  { id: 2, name: 'Мирон', age: 812, dimension: 'necropolis', forms: ['Некромант Теней', 'Суверен Душ', 'Страж Мёртвых'], description: 'Считался пропавшим, вернулся с процессией некромантов', status: 'found', power: 'Власть над душами', location: 'Нижние кварталы' },
  { id: 3, name: 'Светлана', age: 798, dimension: 'edemia', forms: ['Дева Цветов', 'Садовница Миров', 'Феникс Жизни'], description: 'Хранительница живых измерений', status: 'found', power: 'Исцеление и рост', location: 'Эдемские сады' },
  { id: 4, name: 'Кирилл', age: 776, dimension: 'cybern', forms: ['Технократ', 'Хакер Реальности', 'Кибер-Дракон'], description: 'Повелитель дата-ядер и технологий', status: 'found', power: 'Перепрограммирование материи', location: 'Технологические верфи' },
  { id: 5, name: 'Нина', age: 754, dimension: 'astria', forms: ['Кристаллический Маг', 'Хранительница Стихий', 'Радужный Дракон'], description: 'Властительница кристаллов стихий', status: 'found', power: 'Контроль кристаллов', location: 'Кристальный квартал' },
  { id: 6, name: 'Демьян', age: 732, dimension: 'pustosh', forms: ['Страж Разлома', 'Повелитель Пустоты', 'Чёрный Дракон'], description: 'Единственный из детей, принявший силу Пустоши', status: 'missing', power: 'Контроль разломов', location: undefined },
  { id: 7, name: 'Радмила', age: 710, dimension: 'necropolis', forms: ['Спиритуалист', 'Голос Умерших', 'Дух-Дракон'], description: 'Медиум между живыми и мёртвыми', status: 'found', power: 'Связь с потусторонним', location: 'Некрополис-квартал' },
  { id: 8, name: 'Всеволод', age: 695, dimension: 'cybern', forms: ['Инженер Порталов', 'Архитектор Пространства', 'Механо-Дракон'], description: 'Создатель межмировых переходов', status: 'missing', power: 'Создание порталов', location: undefined },
  { id: 9, name: 'Злата', age: 678, dimension: 'edemia', forms: ['Певица Лесов', 'Душа Природы', 'Зелёный Дракон'], description: 'Её песни пробуждают спящие миры', status: 'found', power: 'Пробуждение материи', location: 'Лесной предел' },
  { id: 10, name: 'Богдан', age: 661, dimension: 'astria', forms: ['Громовержец', 'Повелитель Молний', 'Небесный Дракон'], description: 'Управляет атмосферными явлениями', status: 'missing', power: 'Контроль погоды', location: undefined },
  { id: 11, name: 'Лада', age: 644, dimension: 'necropolis', forms: ['Владычица Теней', 'Хранительница Ночи', 'Теневой Дракон'], description: 'Стражница ночных путей', status: 'found', power: 'Манипуляция тенями', location: 'Сумеречный предел' },
  { id: 12, name: 'Горислав', age: 627, dimension: 'cybern', forms: ['Кодировщик Судьбы', 'Мастер Алгоритмов', 'Цифровой Дракон'], description: 'Способен переписать законы мироздания', status: 'missing', power: 'Изменение судьбы', location: undefined },
  { id: 13, name: 'Милена', age: 610, dimension: 'edemia', forms: ['Целительница', 'Хранительница Сердец', 'Золотой Дракон'], description: 'Её касание исцеляет даже душевные раны', status: 'found', power: 'Абсолютное исцеление', location: 'Храм Жизни' },
  { id: 14, name: 'Тарас', age: 593, dimension: 'astria', forms: ['Маг Огня', 'Первозданное Пламя', 'Красный Дракон'], description: 'Хранит в себе первый огонь мироздания', status: 'found', power: 'Первородное пламя', location: 'Огненный квартал' },
  { id: 15, name: 'Оксана', age: 576, dimension: 'pustosh', forms: ['Страж Равновесия', 'Поглотительница Хаоса', 'Серый Дракон'], description: 'Единственная кто может укротить Пустошь', status: 'missing', power: 'Поглощение хаоса', location: undefined },
  { id: 16, name: 'Руслан', age: 559, dimension: 'necropolis', forms: ['Воин Душ', 'Рыцарь Смерти', 'Костяной Дракон'], description: 'Непобедимый воин потустороннего', status: 'found', power: 'Боевая некромантия', location: 'Арена Некрополиса' },
  { id: 17, name: 'Вера', age: 542, dimension: 'edemia', forms: ['Пророчица', 'Видящая Пути', 'Хрустальный Дракон'], description: 'Видит все возможные будущие', status: 'found', power: 'Пророчество', location: 'Башня Предвидения' },
  { id: 18, name: 'Станислав', age: 525, dimension: 'cybern', forms: ['Создатель Миров', 'Генератор Реальности', 'Призрачный Дракон'], description: 'Может создавать карманные измерения', status: 'missing', power: 'Создание измерений', location: undefined },
  { id: 19, name: 'Полина', age: 508, dimension: 'astria', forms: ['Ледяная Дева', 'Хранительница Холода', 'Ледяной Дракон'], description: 'Управляет холодом и кристаллизацией', status: 'found', power: 'Абсолютный холод', location: 'Ледяные шпили' },
  { id: 20, name: 'Ромуальд', age: 491, dimension: 'pustosh', forms: ['Странник Пустоши', 'Проводник Разломов', 'Пустотный Дракон'], description: 'Единственный кто без вреда ходит сквозь разломы', status: 'missing', power: 'Хождение сквозь Пустошь', location: undefined },
  { id: 21, name: 'Дарья', age: 474, dimension: 'necropolis', forms: ['Алхимик Душ', 'Мастер Трансформации', 'Серебряный Дракон'], description: 'Может преобразовывать природу любого существа', status: 'found', power: 'Трансформация', location: 'Лаборатория Душ' },
  { id: 22, name: 'Велимир', age: 457, dimension: 'edemia', forms: ['Хранитель Корней', 'Древний Голос', 'Деревянный Дракон'], description: 'Связан со всеми корневыми системами мироздания', status: 'found', power: 'Связь с корнями мира', location: 'Корневой лес' },
  { id: 23, name: 'Людмила', age: 440, dimension: 'astria', forms: ['Дева Звёзд', 'Хранительница Созвездий', 'Звёздный Дракон'], description: 'Самая младшая из известных детей, связана со звёздами', status: 'found', power: 'Звёздная магия', location: 'Звёздная башня' },
];

export const INVENTORY: InventoryItem[] = [
  { id: 'ring', name: 'Фамильный перстень', type: 'relic', description: 'Перстень, связывающий всю семью через века. Упал при встрече с Ярославом.', rarity: 'divine', quantity: 1 },
  { id: 'scroll-oath', name: 'Свиток клятвы', type: 'scroll', description: 'Древний свиток с клятвой, произнесённой на свадьбе с Яромиром.', rarity: 'legendary', quantity: 1 },
  { id: 'gold-coin', name: 'Золотые монеты всех эпох', type: 'coin', description: 'Монеты из каждой эры существования мультивселенной.', rarity: 'rare', quantity: 23 },
  { id: 'sapphire', name: 'Сапфиры силы', type: 'gem', description: 'Камни, хранящие частицы древней силы Кати.', dimension: 'astria', rarity: 'legendary', quantity: 5 },
  { id: 'memory-scroll', name: 'Свитки памяти', type: 'scroll', description: 'Записи о каждом прожитом мгновении бескрайней истории.', rarity: 'rare', quantity: 12 },
  { id: 'crystal-astria', name: 'Кристалл Астрии', type: 'artifact', description: 'Кристалл стихий, позволяющий управлять природными силами.', dimension: 'astria', rarity: 'legendary', quantity: 1 },
  { id: 'data-core', name: 'Дата-ядро Сайберна', type: 'artifact', description: 'Технологический артефакт с записями всех алгоритмов реальности.', dimension: 'cybern', rarity: 'legendary', quantity: 1 },
  { id: 'rift-shard', name: 'Осколок Разлома', type: 'artifact', description: 'Фрагмент межпространственного разлома. Опасен, но необходим.', dimension: 'pustosh', rarity: 'rare', quantity: 3 },
];

export const QUESTS: Quest[] = [
  { id: 'main-1', title: 'Воссоединение', description: 'Найти Яромира в технологических верфях и вернуть ему память о семье.', status: 'active', reward: 'Восстановление союза', progress: 1, maxProgress: 5 },
  { id: 'main-2', title: 'Семеро пропавших', description: 'Разыскать семерых детей, исчезнувших в межпространственных разломах.', status: 'active', reward: 'Семья воссоединена', progress: 0, maxProgress: 7 },
  { id: 'main-3', title: 'Равновесие измерений', description: 'Остановить Пустошь от разрушения ткани реальности в центре Города-Лабиринта.', status: 'active', reward: 'Спасение мультивселенной', progress: 0, maxProgress: 3 },
  { id: 'main-4', title: 'Тайна близнецов', description: 'Раскрыть тайну о двух скрытых детях, о которых не знает даже Яромир.', status: 'locked', reward: 'Истинное равновесие', progress: 0, maxProgress: 1 },
  { id: 'side-1', title: 'Дерево Слияния', description: 'Исследовать странное металлическое дерево на центральном перекрёстке.', status: 'active', reward: 'Доступ к точке слияния', progress: 0, maxProgress: 1 },
  { id: 'side-2', title: 'Колокольный призыв', description: 'Выяснить, откуда доносится звон свадебных колоколов.', status: 'active', dimension: 'necropolis', reward: 'Ключ к прошлому', progress: 0, maxProgress: 1 },
  { id: 'side-3', title: 'Повозка некромантов', description: 'Узнать, что находится в пульсирующей повозке с мертвенно-синим сиянием.', status: 'active', dimension: 'necropolis', reward: 'Артефакт Некрополиса', progress: 0, maxProgress: 2 },
  { id: 'side-4', title: 'Манускрипт Ярослава', description: 'Прочесть письмена в манускрипте, меняющем цвет, который принёс Ярослав.', status: 'active', dimension: 'astria', reward: 'Знание о разломе', progress: 0, maxProgress: 1 },
];

export const OPENING_SCENES: Scene[] = [
  {
    id: 'scene-balcony',
    title: 'Балкон на рассвете',
    text: 'Туман, смешивающий свечение техномагических контуров Сайберна и переливы духовной энергии Некрополиса, укутывает Город-Лабиринт. Ты стоишь на балконе своего дома — там, где архитектура Астрии плавно переходит в живую материю Эдемии. Стены покрыты светящимся мхом, воздух наполнен ароматом цветущих камней.\n\nВ нижних кварталах раздаётся шум — процессия некромантов сопровождает повозку с мертвенно-синим сиянием. И среди них ты замечаешь знакомую фигуру.',
    dimension: 'neutral',
    backgroundMood: 'mystical',
    choices: [
      { id: 'c1', text: 'Вглядеться в фигуру среди некромантов', consequence: 'Ты узнаёшь Мирона — своего пятнадцатого сына, которого считала пропавшим в разломе много веков назад.', nextSceneId: 'scene-miron', effect: { xp: 10 } },
      { id: 'c2', text: 'Прислушаться к шёпоту Пустоши внутри', consequence: 'Твоё чутьё предупреждает: равновесие измерений хрупко как никогда.', nextSceneId: 'scene-void-sense', effect: { mp: -5, xp: 15 } },
      { id: 'c3', text: 'Спуститься вниз и открыть дверь', consequence: 'На пороге стоит Ярослав — взволнованный, с потускневшими золотыми волосами.', nextSceneId: 'scene-yaroslav', effect: { xp: 10 } },
    ],
  },
  {
    id: 'scene-miron',
    title: 'Возвращение Мирона',
    text: 'Среди некромантов в тёмных одеждах ты чётко видишь Мирона. Его силуэт неизменен — тот же уверенный шаг, та же осанка, что ты помнишь из тысячелетий назад. Но что-то в нём изменилось. Он чувствует твой взгляд и поднимает голову.\n\nВаши взгляды встречаются через расстояние. Он не улыбается. Он просто смотрит — как будто видит тебя впервые, и в то же время как будто знал, что найдёт тебя именно здесь.',
    dimension: 'necropolis',
    backgroundMood: 'mystical',
    choices: [
      { id: 'c1', text: 'Позвать его по имени', consequence: 'Твой голос разрезает туман. Мирон замирает. Некроманты беспокойно переглядываются.', nextSceneId: 'scene-yaroslav', effect: { xp: 20 } },
      { id: 'c2', text: 'Наблюдать молча, не выдавая себя', consequence: 'Ты следишь за процессией. Повозка приближается к центру города. Что-то в ней живое — и хочет выйти.', nextSceneId: 'scene-void-sense', effect: { xp: 15 } },
      { id: 'c3', text: 'Использовать магию Некрополиса чтобы услышать его мысли', consequence: 'Сквозь связь измерений ты слышишь обрывок: "...она здесь... нужно успеть до того, как дерево проснётся..."', nextSceneId: 'scene-yaroslav', effect: { mp: -15, xp: 25 } },
    ],
  },
  {
    id: 'scene-void-sense',
    title: 'Голос Пустоши',
    text: 'Пустошь разъедает ткань реальности в самом центре Города-Лабиринта. Ты чувствуешь это всем своим существом — древним, как само мироздание. Пять измерений, слившихся воедино, пытаются разойтись обратно.\n\nЕсли это случится, катастрофа поглотит всех обитателей Города-Лабиринта. Всех, кого ты любишь. Всех, кого ты ищешь.\n\nЗемля под ногами вздрагивает. Из трещины в мостовой поднимается тонкий столб дыма — принимая форму силуэта мифической птицы.',
    dimension: 'pustosh',
    backgroundMood: 'void',
    choices: [
      { id: 'c1', text: 'Принять форму мифической птицы — частично раскрыть силу', consequence: 'Твоя аура вспыхивает на мгновение. Несколько прохожих оглядываются в испуге.', nextSceneId: 'scene-yaroslav', effect: { mp: -20, xp: 30, hp: -5 } },
      { id: 'c2', text: 'Подавить силу — остаться незамеченной', consequence: 'Ценой усилия ты сдерживаешь природу. Пустошь отступает, но ненадолго.', nextSceneId: 'scene-yaroslav', effect: { mp: -30, xp: 20 } },
      { id: 'c3', text: 'Позволить земле говорить — слушать вибрации', consequence: 'Ты слышишь пять лун — они появятся на небе. Астральное отражение надвигающегося кризиса.', nextSceneId: 'scene-yaroslav', effect: { xp: 35 } },
    ],
  },
  {
    id: 'scene-yaroslav',
    title: 'Ярослав у порога',
    text: 'В дверь стучат. На пороге — Ярослав. Его золотые волосы, обычно переливающиеся светом, потускнели. В руках — старинный манускрипт с письменами, меняющими цвет. Его глаза ищут твои.\n\n— Мать, — взволнованно произносит он. — Я видел отца в районе технологических верфей. Но что-то случилось с его сущностью. Он не узнал меня.\n\nПяти лун ещё нет на небе. Но ты знаешь — они появятся. Этого никогда прежде не случалось.',
    dimension: 'astria',
    backgroundMood: 'danger',
    choices: [
      { id: 'c1', text: '"Нам нужно найти отца прямо сейчас"', consequence: 'Ярослав кивает, сжимая манускрипт. Вы выходите в туманные улицы Города-Лабиринта.', nextSceneId: 'scene-labyrinth-streets', effect: { xp: 20 } },
      { id: 'c2', text: 'Прочитать манускрипт с меняющимися письменами', consequence: 'Письмена складываются в предупреждение: "Дерево проснётся при пяти лунах. Ключ — двое скрытых."', nextSceneId: 'scene-labyrinth-streets', effect: { xp: 30 }, requiresItem: 'scroll-oath' },
      { id: 'c3', text: '"Ты чувствуешь присутствие своих братьев и сестёр?"', consequence: '"Да... и близнецов," — неожиданно произносит Ярослав, удивляясь своим словам. — "Откуда я это знаю?"', nextSceneId: 'scene-labyrinth-streets', effect: { xp: 40 } },
    ],
  },
  {
    id: 'scene-labyrinth-streets',
    title: 'Улицы Лабиринта',
    text: 'Вы спускаетесь по улице к центру города. Здания начинают медленно меняться — кирпичные стены превращаются в стекло, затем в дерево, металл, и наконец в нечто без формы и сути. Пустошь становится сильнее.\n\nНа небе появляются пять лун разных оттенков. Чего никогда прежде не случалось. Над городом раздаётся колокольный звон — такой же, каким звонили колокола в час твоей свадьбы с Яромиром.\n\nВпереди, на центральном перекрёстке, возвышается огромное дерево с ветвями из голубого металла и корнями из светящегося камня. Его листья — как маленькие экраны, на которых мелькают образы из всех пяти измерений.',
    dimension: 'neutral',
    backgroundMood: 'mystical',
    choices: [
      { id: 'c1', text: 'Подойти к Дереву Слияния и коснуться его', consequence: 'Твои пять источников силы резонируют. Дерево узнаёт тебя — и открывает путь.', nextSceneId: 'scene-balcony', effect: { xp: 50, mp: -30 } },
      { id: 'c2', text: 'Направиться к технологическим верфям искать Яромира', consequence: 'Это разумно. Сначала семья — потом кризис.', nextSceneId: 'scene-balcony', effect: { xp: 30 } },
      { id: 'c3', text: 'Проследовать за процессией некромантов', consequence: 'Повозка ведёт вас глубже в нижние кварталы. Там скрыта часть ответа.', nextSceneId: 'scene-balcony', effect: { xp: 35 } },
    ],
  },
];

export interface MysticForm {
  id: string;
  name: string;
  description: string;
  color: string;
  emoji: string;
  dimension: Dimension | 'divine';
  mpCost: number;
  bonuses: { hp?: number; mp?: number; strength?: number; magic?: number };
  regenRate: number;
  regenType: 'hp' | 'mp' | 'both';
}

export interface FusionForm {
  id: string;
  name: string;
  description: string;
  requiredForms: string[];
  color: string;
  gradient: string;
  emoji: string;
  mpCost: number;
  bonuses: { hp?: number; mp?: number; strength?: number; magic?: number };
  regenRate: number;
  isUltimate?: boolean;
}

export const KATYA_FORMS: MysticForm[] = [
  {
    id: 'dragon-sky',
    name: 'Небесный Дракон',
    description: 'Первозданная форма — величественный дракон небес с золотой чешуёй. Регенерирует жизнь каждые несколько секунд.',
    color: 'hsl(42 78% 58%)',
    emoji: '🐉',
    dimension: 'astria',
    mpCost: 50,
    bonuses: { strength: 30, hp: 2000 },
    regenRate: 150,
    regenType: 'hp',
  },
  {
    id: 'qilin',
    name: 'Цилинь',
    description: 'Священное существо, несущее мир. Мощная регенерация духовной силы, исцеляет союзников.',
    color: 'hsl(120 55% 50%)',
    emoji: '🦄',
    dimension: 'edemia',
    mpCost: 40,
    bonuses: { magic: 25, mp: 1500 },
    regenRate: 200,
    regenType: 'mp',
  },
  {
    id: 'phoenix-sun',
    name: 'Феникс Солнца',
    description: 'Птица возрождения. При смерти — автоматически воскрешает с 50% жизни.',
    color: 'hsl(25 90% 55%)',
    emoji: '🔥',
    dimension: 'astria',
    mpCost: 60,
    bonuses: { hp: 3000, magic: 20 },
    regenRate: 100,
    regenType: 'both',
  },
  {
    id: 'phoenix-moon',
    name: 'Феникс Луны',
    description: 'Лунная птица теней. Восстанавливает силу духа в бою, неуязвима для тёмной магии.',
    color: 'hsl(240 60% 65%)',
    emoji: '🌙',
    dimension: 'necropolis',
    mpCost: 45,
    bonuses: { mp: 2000, magic: 30 },
    regenRate: 180,
    regenType: 'mp',
  },
  {
    id: 'phoenix-storm',
    name: 'Феникс Бури',
    description: 'Повелитель молний и вихрей. Высокая атака, средняя регенерация жизни.',
    color: 'hsl(55 85% 55%)',
    emoji: '⚡',
    dimension: 'astria',
    mpCost: 55,
    bonuses: { strength: 40, hp: 1000 },
    regenRate: 80,
    regenType: 'hp',
  },
  {
    id: 'phoenix-void',
    name: 'Феникс Пустоши',
    description: 'Птица пустоты, поглощающая хаос. Превращает урон в восстановление силы духа.',
    color: 'hsl(0 0% 50%)',
    emoji: '🕳️',
    dimension: 'pustosh',
    mpCost: 70,
    bonuses: { magic: 45, mp: 2500 },
    regenRate: 250,
    regenType: 'mp',
  },
  {
    id: 'phoenix-life',
    name: 'Феникс Жизни',
    description: 'Птица вечного возрождения. Непрерывная регенерация жизни и духа одновременно.',
    color: 'hsl(150 65% 50%)',
    emoji: '🌿',
    dimension: 'edemia',
    mpCost: 65,
    bonuses: { hp: 2500, mp: 1000 },
    regenRate: 300,
    regenType: 'both',
  },
];

export const KATYA_FUSIONS: FusionForm[] = [
  {
    id: 'trinity-light',
    name: 'Триединство Света',
    description: 'Слияние Небесного Дракона, Цилиня и Феникса Солнца. Непрерывное исцеление и щит от урона.',
    requiredForms: ['dragon-sky', 'qilin', 'phoenix-sun'],
    color: 'hsl(42 78% 65%)',
    gradient: 'linear-gradient(135deg, hsl(42 78% 55%), hsl(120 55% 50%), hsl(25 90% 55%))',
    emoji: '✨',
    mpCost: 120,
    bonuses: { hp: 5000, magic: 50, strength: 30 },
    regenRate: 500,
  },
  {
    id: 'trinity-shadow',
    name: 'Триединство Теней',
    description: 'Слияние Феникса Луны, Пустоши и Бури. Неуязвимость к магии, восстановление через поглощение атак.',
    requiredForms: ['phoenix-moon', 'phoenix-void', 'phoenix-storm'],
    color: 'hsl(270 60% 60%)',
    gradient: 'linear-gradient(135deg, hsl(240 60% 55%), hsl(0 0% 40%), hsl(55 85% 50%))',
    emoji: '🌑',
    mpCost: 140,
    bonuses: { mp: 5000, magic: 60, strength: 20 },
    regenRate: 600,
  },
  {
    id: 'full-ascension',
    name: 'Полное Вознесение',
    description: 'Объединение всех семи форм. Истинная сущность Кати — Первого из Небесных Драконов. Бессмертие на время трансформации.',
    requiredForms: ['dragon-sky', 'qilin', 'phoenix-sun', 'phoenix-moon', 'phoenix-storm', 'phoenix-void', 'phoenix-life'],
    color: 'hsl(42 78% 70%)',
    gradient: 'linear-gradient(135deg, hsl(42 78% 58%), hsl(270 60% 55%), hsl(120 55% 50%), hsl(210 90% 60%), hsl(0 0% 50%))',
    emoji: '🌟',
    mpCost: 400,
    bonuses: { hp: 9999, mp: 9000, magic: 99, strength: 99 },
    regenRate: 999,
    isUltimate: true,
  },
];

export const CHILD_FUSIONS: Record<number, { name: string; emoji: string; color: string; description: string; mpCost: number; regenRate: number }> = {
  1: { name: 'Владыка Небесных Стихий', emoji: '🌪️', color: 'hsl(180 65% 55%)', description: 'Слияние трёх форм Ярослава — неостановимая буря стихий', mpCost: 80, regenRate: 200 },
  2: { name: 'Архонт Мёртвых', emoji: '💀', color: 'hsl(270 60% 55%)', description: 'Слияние трёх форм Мирона — повелитель жизни и смерти', mpCost: 90, regenRate: 180 },
  3: { name: 'Вечный Феникс Жизни', emoji: '🌺', color: 'hsl(120 55% 45%)', description: 'Слияние трёх форм Светланы — возрождение бесконечно', mpCost: 75, regenRate: 250 },
  4: { name: 'Кибер-Дракон Хаоса', emoji: '🤖', color: 'hsl(210 90% 60%)', description: 'Слияние трёх форм Кирилла — переписывает реальность', mpCost: 100, regenRate: 150 },
  14: { name: 'Первозданный Огонь', emoji: '🔥', color: 'hsl(15 80% 55%)', description: 'Слияние трёх форм Тараса — пламя до начала времён', mpCost: 85, regenRate: 120 },
  16: { name: 'Рыцарь Вечной Смерти', emoji: '⚔️', color: 'hsl(290 55% 55%)', description: 'Слияние трёх форм Руслана — непобедим в бою', mpCost: 95, regenRate: 100 },
  21: { name: 'Великая Алхимик', emoji: '⚗️', color: 'hsl(280 65% 55%)', description: 'Слияние трёх форм Дарьи — трансформирует любую сущность', mpCost: 85, regenRate: 220 },
};

export const STATS = {
  name: 'Катя',
  title: 'Первый из Небесных Драконов',
  level: 99,
  hp: 9999,
  maxHp: 9999,
  mp: 8750,
  maxMp: 9000,
  xp: 125000,
  nextLevelXp: 150000,
  age: 'Вечная',
  forms: 23,
  childrenFound: 16,
  childrenMissing: 7,
  magicsKnown: 23,
  dimensionsVisited: 5,
  questsCompleted: 0,
  battlesWon: 142,
  gold: 2300,
  attributes: {
    strength: 85,
    wisdom: 99,
    magic: 99,
    agility: 72,
    endurance: 90,
    charisma: 95,
  },
};