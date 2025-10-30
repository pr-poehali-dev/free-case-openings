import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

interface Item {
  id: string;
  name: string;
  rarity: Rarity;
  image: string;
  price: number;
}

interface CaseType {
  id: string;
  name: string;
  description: string;
  rarity: Rarity;
  price: number;
  items: Item[];
}

const skin1 = 'https://cdn.poehali.dev/projects/95b577c9-3270-491e-baea-12945f5e5799/files/142152cc-24c7-4b2c-8461-a20ddb85448f.jpg';
const skin2 = 'https://cdn.poehali.dev/projects/95b577c9-3270-491e-baea-12945f5e5799/files/af749959-76b3-4be4-a6e1-1246e814f6ee.jpg';
const skin3 = 'https://cdn.poehali.dev/projects/95b577c9-3270-491e-baea-12945f5e5799/files/b771e327-6a26-4b16-8030-d4038ba605f0.jpg';
const skin4 = 'https://cdn.poehali.dev/projects/95b577c9-3270-491e-baea-12945f5e5799/files/c2f07c70-cdfd-47ec-85a5-5588b162c759.jpg';
const skin5 = 'https://cdn.poehali.dev/projects/95b577c9-3270-491e-baea-12945f5e5799/files/bfe98807-3fa5-4a06-8d37-23c0b85fdf81.jpg';
const skin6 = 'https://cdn.poehali.dev/projects/95b577c9-3270-491e-baea-12945f5e5799/files/88336669-a6ce-4137-9ef7-fd70690fd3c3.jpg';
const skin7 = 'https://cdn.poehali.dev/projects/95b577c9-3270-491e-baea-12945f5e5799/files/a6913c1e-ee21-4c43-84dd-1ab3747a220a.jpg';
const skin8 = 'https://cdn.poehali.dev/projects/95b577c9-3270-491e-baea-12945f5e5799/files/5243614d-1327-49f0-8dac-6e692d4908ac.jpg';

const cases: CaseType[] = [
  {
    id: '1',
    name: 'Starter Case',
    description: 'Базовый кейс для новичков',
    rarity: 'common',
    price: 100,
    items: [
      { id: '1-1', name: 'AK-47 | Redline', rarity: 'rare', image: skin1, price: 45 },
      { id: '1-2', name: 'P90 | Asiimov', rarity: 'common', image: skin1, price: 15 },
      { id: '1-3', name: 'MAC-10 | Neon Rider', rarity: 'common', image: skin1, price: 12 },
      { id: '1-4', name: 'Glock-18 | Water Elemental', rarity: 'common', image: skin7, price: 18 },
      { id: '1-5', name: 'P250 | See Ya Later', rarity: 'common', image: skin1, price: 10 },
      { id: '1-6', name: 'FAMAS | Djinn', rarity: 'common', image: skin1, price: 8 },
      { id: '1-7', name: 'M4A4 | Asiimov', rarity: 'epic', image: skin4, price: 85 },
      { id: '1-8', name: 'AWP | Dragon Lore', rarity: 'legendary', image: skin2, price: 450 },
    ]
  },
  {
    id: '2',
    name: 'Premium Case',
    description: 'Редкие скины высокого качества',
    rarity: 'rare',
    price: 250,
    items: [
      { id: '2-1', name: 'M4A1-S | Hyper Beast', rarity: 'rare', image: skin4, price: 65 },
      { id: '2-2', name: 'USP-S | Kill Confirmed', rarity: 'rare', image: skin7, price: 55 },
      { id: '2-3', name: 'P250 | Asiimov', rarity: 'common', image: skin1, price: 20 },
      { id: '2-4', name: 'Galil AR | Cerberus', rarity: 'common', image: skin1, price: 25 },
      { id: '2-5', name: 'AWP | Asiimov', rarity: 'epic', image: skin5, price: 120 },
      { id: '2-6', name: 'Karambit | Fade', rarity: 'legendary', image: skin3, price: 850 },
      { id: '2-7', name: 'Butterfly Knife | Tiger Tooth', rarity: 'legendary', image: skin6, price: 780 },
    ]
  },
  {
    id: '3',
    name: 'Legendary Case',
    description: 'Самые редкие предметы',
    rarity: 'legendary',
    price: 500,
    items: [
      { id: '3-1', name: 'Desert Eagle | Blaze', rarity: 'rare', image: skin8, price: 75 },
      { id: '3-2', name: 'AK-47 | Vulcan', rarity: 'rare', image: skin1, price: 90 },
      { id: '3-3', name: 'AWP | Lightning Strike', rarity: 'epic', image: skin5, price: 180 },
      { id: '3-4', name: 'M4A4 | Howl', rarity: 'epic', image: skin4, price: 350 },
      { id: '3-5', name: 'AWP | Medusa', rarity: 'legendary', image: skin2, price: 1200 },
      { id: '3-6', name: 'M9 Bayonet | Crimson Web', rarity: 'legendary', image: skin3, price: 1500 },
      { id: '3-7', name: 'AK-47 | Fire Serpent', rarity: 'legendary', image: skin1, price: 980 },
    ]
  },
  {
    id: '4',
    name: 'Knife Case',
    description: 'Только ножи',
    rarity: 'epic',
    price: 400,
    items: [
      { id: '4-1', name: 'Huntsman Knife | Fade', rarity: 'rare', image: skin3, price: 220 },
      { id: '4-2', name: 'Gut Knife | Marble Fade', rarity: 'rare', image: skin3, price: 190 },
      { id: '4-3', name: 'Falchion Knife | Case Hardened', rarity: 'epic', image: skin3, price: 380 },
      { id: '4-4', name: 'Flip Knife | Doppler', rarity: 'epic', image: skin6, price: 450 },
      { id: '4-5', name: 'Karambit | Doppler', rarity: 'legendary', image: skin3, price: 1100 },
      { id: '4-6', name: 'Bayonet | Slaughter', rarity: 'legendary', image: skin3, price: 950 },
    ]
  },
  {
    id: '5',
    name: 'AWP Collection',
    description: 'Коллекция снайперских винтовок',
    rarity: 'rare',
    price: 200,
    items: [
      { id: '5-1', name: 'AWP | Redline', rarity: 'common', image: skin5, price: 30 },
      { id: '5-2', name: 'AWP | Graphite', rarity: 'common', image: skin5, price: 28 },
      { id: '5-3', name: 'AWP | Electric Hive', rarity: 'common', image: skin5, price: 22 },
      { id: '5-4', name: 'AWP | Hyper Beast', rarity: 'rare', image: skin5, price: 95 },
      { id: '5-5', name: 'AWP | Asiimov', rarity: 'epic', image: skin5, price: 150 },
      { id: '5-6', name: 'AWP | Fade', rarity: 'legendary', image: skin2, price: 680 },
    ]
  },
  {
    id: '6',
    name: 'Pistol Case',
    description: 'Коллекция пистолетов',
    rarity: 'common',
    price: 150,
    items: [
      { id: '6-1', name: 'P2000 | Fire Elemental', rarity: 'common', image: skin7, price: 16 },
      { id: '6-2', name: 'Five-SeveN | Monkey Business', rarity: 'common', image: skin7, price: 14 },
      { id: '6-3', name: 'Desert Eagle | Golden Koi', rarity: 'rare', image: skin8, price: 70 },
      { id: '6-4', name: 'USP-S | Orion', rarity: 'rare', image: skin7, price: 60 },
      { id: '6-5', name: 'Desert Eagle | Blaze', rarity: 'epic', image: skin8, price: 140 },
      { id: '6-6', name: 'Glock-18 | Fade', rarity: 'legendary', image: skin7, price: 520 },
    ]
  },
  {
    id: '7',
    name: 'Rifle Collection',
    description: 'Лучшие автоматы',
    rarity: 'rare',
    price: 300,
    items: [
      { id: '7-1', name: 'AK-47 | Frontside Misty', rarity: 'common', image: skin1, price: 35 },
      { id: '7-2', name: 'M4A4 | Desolate Space', rarity: 'common', image: skin4, price: 32 },
      { id: '7-3', name: 'AK-47 | Aquamarine Revenge', rarity: 'rare', image: skin1, price: 110 },
      { id: '7-4', name: 'M4A1-S | Golden Coil', rarity: 'rare', image: skin4, price: 95 },
      { id: '7-5', name: 'AK-47 | Neon Revolution', rarity: 'epic', image: skin1, price: 240 },
      { id: '7-6', name: 'M4A4 | Howl', rarity: 'legendary', image: skin4, price: 1800 },
    ]
  },
  {
    id: '8',
    name: 'Elite Case',
    description: 'Элитные предметы',
    rarity: 'legendary',
    price: 750,
    items: [
      { id: '8-1', name: 'USP-S | Neo-Noir', rarity: 'rare', image: skin7, price: 85 },
      { id: '8-2', name: 'M4A4 | Neo-Noir', rarity: 'rare', image: skin4, price: 115 },
      { id: '8-3', name: 'AWP | Neo-Noir', rarity: 'epic', image: skin5, price: 280 },
      { id: '8-4', name: 'Butterfly Knife | Doppler', rarity: 'epic', image: skin6, price: 650 },
      { id: '8-5', name: 'Karambit | Gamma Doppler', rarity: 'legendary', image: skin3, price: 2100 },
      { id: '8-6', name: 'Sport Gloves | Pandora Box', rarity: 'legendary', image: skin3, price: 3500 },
    ]
  },
];

const rarityColors: Record<Rarity, string> = {
  common: 'bg-gradient-to-br from-gray-600 to-gray-800 border-gray-500',
  rare: 'bg-gradient-to-br from-blue-500 to-blue-700 border-blue-400',
  epic: 'bg-gradient-to-br from-purple-600 to-purple-800 border-purple-500',
  legendary: 'bg-gradient-to-br from-orange-500 to-red-600 border-orange-400',
};

const rarityLabels: Record<Rarity, string> = {
  common: 'Обычный',
  rare: 'Редкий',
  epic: 'Эпический',
  legendary: 'Легендарный',
};

const rarityChances: Record<Rarity, number> = {
  common: 70,
  rare: 22,
  epic: 6,
  legendary: 2,
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('cases');
  const [inventory, setInventory] = useState<(Item & { inventoryId: string })[]>([]);
  const [balance, setBalance] = useState(500);
  const [isOpening, setIsOpening] = useState(false);
  const [selectedCase, setSelectedCase] = useState<CaseType | null>(null);
  const [wonItem, setWonItem] = useState<Item | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [rouletteItems, setRouletteItems] = useState<Item[]>([]);
  const [rouletteOffset, setRouletteOffset] = useState(0);
  const [upgradeMode, setUpgradeMode] = useState(false);
  const [selectedUpgradeItems, setSelectedUpgradeItems] = useState<string[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
  }, []);

  const playSound = (type: 'spin' | 'win') => {
    if (!audioRef.current) return;
    
    if (type === 'spin') {
      audioRef.current.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBCx+zPLTgjEHHW7A7+OZUQ0OVKXi7qxXGAxGnODyv24eBCl6yPLZ';
      audioRef.current.volume = 0.3;
    } else {
      audioRef.current.src = 'data:audio/wav;base64,UklGRi4FAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQoFAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBCx+zPLTgjEHHW7A7+OZUQ0OVKXi7qxXGAxGnODyv24eBCl6yPLZgSoHGGW57OCXTgwNUKPf776lfJNdGg==';
      audioRef.current.volume = 0.5;
    }
    audioRef.current.play().catch(() => {});
  };

  const getRandomItemByRarity = (items: Item[]): Item => {
    const random = Math.random() * 100;
    let cumulativeChance = 0;

    const rarityOrder: Rarity[] = ['common', 'rare', 'epic', 'legendary'];
    
    for (const rarity of rarityOrder) {
      cumulativeChance += rarityChances[rarity];
      if (random <= cumulativeChance) {
        const itemsOfRarity = items.filter(item => item.rarity === rarity);
        if (itemsOfRarity.length > 0) {
          return itemsOfRarity[Math.floor(Math.random() * itemsOfRarity.length)];
        }
      }
    }
    
    return items[Math.floor(Math.random() * items.length)];
  };

  const openCase = (caseType: CaseType) => {
    if (balance < caseType.price) {
      toast.error('Недостаточно монет для открытия кейса!');
      return;
    }

    setBalance(prev => prev - caseType.price);
    setSelectedCase(caseType);
    setIsOpening(true);
    setShowResult(false);

    const allItems = [...caseType.items];
    const extendedItems: Item[] = [];
    for (let i = 0; i < 50; i++) {
      extendedItems.push(...allItems);
    }
    setRouletteItems(extendedItems);

    const randomItem = getRandomItemByRarity(caseType.items);
    
    playSound('spin');

    const targetOffset = -(extendedItems.length / 2 * 180) + Math.random() * 180 - 90;
    setRouletteOffset(targetOffset);

    setTimeout(() => {
      setWonItem(randomItem);
      const itemWithId = { ...randomItem, inventoryId: `${randomItem.id}-${Date.now()}` };
      setInventory(prev => [...prev, itemWithId]);
      setIsOpening(false);
      setShowResult(true);
      playSound('win');
    }, 4000);
  };

  const sellItem = (inventoryId: string) => {
    const item = inventory.find(i => i.inventoryId === inventoryId);
    if (!item) return;
    
    setInventory(prev => prev.filter(i => i.inventoryId !== inventoryId));
    setBalance(prev => prev + item.price);
    toast.success(`Продано за ${item.price} монет`);
  };

  const toggleUpgradeItem = (inventoryId: string) => {
    setSelectedUpgradeItems(prev => {
      if (prev.includes(inventoryId)) {
        return prev.filter(id => id !== inventoryId);
      }
      if (prev.length >= 5) {
        toast.error('Максимум 5 предметов для апгрейда');
        return prev;
      }
      return [...prev, inventoryId];
    });
  };

  const performUpgrade = () => {
    if (selectedUpgradeItems.length === 0) {
      toast.error('Выберите предметы для апгрейда');
      return;
    }

    const selectedItems = inventory.filter(i => selectedUpgradeItems.includes(i.inventoryId));
    const totalValue = selectedItems.reduce((sum, item) => sum + item.price, 0);
    
    const allItems = cases.flatMap(c => c.items);
    const eligibleItems = allItems.filter(item => item.price > totalValue * 0.8 && item.price < totalValue * 2);
    
    if (eligibleItems.length === 0) {
      toast.error('Нет подходящих предметов для апгрейда');
      return;
    }

    const successChance = Math.min(70, 30 + (selectedItems.length * 8));
    const success = Math.random() * 100 < successChance;

    setInventory(prev => prev.filter(i => !selectedUpgradeItems.includes(i.inventoryId)));

    if (success) {
      const upgradedItem = eligibleItems[Math.floor(Math.random() * eligibleItems.length)];
      const itemWithId = { ...upgradedItem, inventoryId: `${upgradedItem.id}-${Date.now()}` };
      setInventory(prev => [...prev, itemWithId]);
      toast.success(`Успешный апгрейд! Получен: ${upgradedItem.name}`);
      playSound('win');
    } else {
      toast.error('Апгрейд не удался. Предметы потеряны.');
    }

    setSelectedUpgradeItems([]);
    setUpgradeMode(false);
  };

  const closeDialog = () => {
    setSelectedCase(null);
    setWonItem(null);
    setShowResult(false);
    setIsOpening(false);
    setRouletteOffset(0);
    setRouletteItems([]);
  };

  const totalValue = inventory.reduce((sum, item) => sum + item.price, 0);
  const legendaryCount = inventory.filter(i => i.rarity === 'legendary').length;
  const epicCount = inventory.filter(i => i.rarity === 'epic').length;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">📦</div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                CS2 Cases
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 px-5 py-2 rounded-lg shadow-lg">
                <Icon name="Coins" size={20} className="text-yellow-900" />
                <span className="font-bold text-yellow-900 text-lg">{balance}</span>
              </div>
              <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg">
                <Icon name="Package" size={20} />
                <span className="font-semibold">{inventory.length}</span>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Icon name="User" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
            <TabsTrigger value="cases" className="gap-2">
              <Icon name="Box" size={16} />
              Кейсы
            </TabsTrigger>
            <TabsTrigger value="inventory" className="gap-2">
              <Icon name="Package" size={16} />
              Инвентарь
            </TabsTrigger>
            <TabsTrigger value="upgrade" className="gap-2">
              <Icon name="TrendingUp" size={16} />
              Апгрейд
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <Icon name="User" size={16} />
              Профиль
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cases" className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl font-bold">Открывай кейсы за монеты</h2>
              <p className="text-muted-foreground text-lg">
                Продавай скины и открывай новые кейсы
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cases.map((caseItem, index) => (
                <Card
                  key={caseItem.id}
                  className={`${rarityColors[caseItem.rarity]} border-2 p-6 hover:scale-105 transition-transform cursor-pointer animate-slide-up`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => openCase(caseItem)}
                >
                  <div className="text-center space-y-4">
                    <div className="text-6xl mb-4">📦</div>
                    <h3 className="text-xl font-bold text-white">{caseItem.name}</h3>
                    <p className="text-white/80 text-sm">{caseItem.description}</p>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {rarityLabels[caseItem.rarity]}
                    </Badge>
                    <div className="flex items-center justify-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                      <Icon name="Coins" size={20} className="text-yellow-300" />
                      <span className="font-bold text-white text-lg">{caseItem.price}</span>
                    </div>
                    <Button 
                      className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30"
                      disabled={balance < caseItem.price}
                    >
                      <Icon name="Unlock" size={16} className="mr-2" />
                      {balance < caseItem.price ? 'Недостаточно' : 'Открыть'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="animate-fade-in">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6 bg-gradient-to-br from-green-500/20 to-green-500/5 border-green-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Общая стоимость</p>
                      <p className="text-3xl font-bold text-green-400">{totalValue}</p>
                    </div>
                    <Icon name="DollarSign" size={32} className="text-green-400" />
                  </div>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-orange-500/20 to-orange-500/5 border-orange-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Легендарных</p>
                      <p className="text-3xl font-bold text-orange-400">{legendaryCount}</p>
                    </div>
                    <Icon name="Crown" size={32} className="text-orange-400" />
                  </div>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-purple-500/20 to-purple-500/5 border-purple-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Эпических</p>
                      <p className="text-3xl font-bold text-purple-400">{epicCount}</p>
                    </div>
                    <Icon name="Sparkles" size={32} className="text-purple-400" />
                  </div>
                </Card>
              </div>

              {inventory.length === 0 ? (
                <Card className="p-12 text-center">
                  <Icon name="Package" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">Инвентарь пуст</h3>
                  <p className="text-muted-foreground">Открой первый кейс, чтобы получить предметы</p>
                  <Button className="mt-6" onClick={() => setActiveTab('cases')}>
                    <Icon name="Box" size={16} className="mr-2" />
                    Открыть кейс
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {inventory.map((item) => (
                    <Card
                      key={item.inventoryId}
                      className={`${rarityColors[item.rarity]} border-2 p-4 hover:scale-105 transition-transform overflow-hidden`}
                    >
                      <div className="text-center space-y-2">
                        <img src={item.image} alt={item.name} className="w-full h-24 object-contain mb-2" />
                        <h4 className="text-xs font-semibold text-white line-clamp-2">{item.name}</h4>
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                          {rarityLabels[item.rarity]}
                        </Badge>
                        <div className="flex items-center justify-center gap-1 text-yellow-300 font-bold">
                          <Icon name="Coins" size={14} />
                          <span className="text-sm">{item.price}</span>
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full bg-green-500 hover:bg-green-600 text-white text-xs"
                          onClick={() => sellItem(item.inventoryId)}
                        >
                          <Icon name="DollarSign" size={12} className="mr-1" />
                          Продать
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="upgrade" className="animate-fade-in">
            <div className="max-w-4xl mx-auto space-y-6">
              <Card className="p-8 bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/30">
                <div className="text-center space-y-4">
                  <Icon name="TrendingUp" size={48} className="mx-auto text-purple-400" />
                  <h2 className="text-3xl font-bold">Апгрейд предметов</h2>
                  <p className="text-muted-foreground">
                    Выбери до 5 предметов для апгрейда. Чем больше предметов, тем выше шанс успеха!
                  </p>
                  <div className="flex items-center justify-center gap-8 py-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Выбрано</p>
                      <p className="text-2xl font-bold text-purple-400">{selectedUpgradeItems.length}/5</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Шанс успеха</p>
                      <p className="text-2xl font-bold text-green-400">
                        {Math.min(70, 30 + (selectedUpgradeItems.length * 8))}%
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <Button 
                      onClick={performUpgrade}
                      disabled={selectedUpgradeItems.length === 0}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Icon name="Zap" size={16} className="mr-2" />
                      Сделать апгрейд
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setSelectedUpgradeItems([])}
                      disabled={selectedUpgradeItems.length === 0}
                    >
                      Сбросить выбор
                    </Button>
                  </div>
                </div>
              </Card>

              {inventory.length === 0 ? (
                <Card className="p-12 text-center">
                  <Icon name="Package" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">Нет предметов</h3>
                  <p className="text-muted-foreground">Открой кейсы, чтобы получить предметы для апгрейда</p>
                </Card>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {inventory.map((item) => (
                    <Card
                      key={item.inventoryId}
                      className={`${rarityColors[item.rarity]} border-2 p-4 cursor-pointer transition-all ${
                        selectedUpgradeItems.includes(item.inventoryId) 
                          ? 'ring-4 ring-purple-500 scale-105' 
                          : 'hover:scale-105'
                      }`}
                      onClick={() => toggleUpgradeItem(item.inventoryId)}
                    >
                      <div className="text-center space-y-2">
                        {selectedUpgradeItems.includes(item.inventoryId) && (
                          <div className="absolute top-2 right-2 bg-purple-500 rounded-full p-1">
                            <Icon name="Check" size={16} className="text-white" />
                          </div>
                        )}
                        <img src={item.image} alt={item.name} className="w-full h-24 object-contain mb-2" />
                        <h4 className="text-xs font-semibold text-white line-clamp-2">{item.name}</h4>
                        <div className="flex items-center justify-center gap-1 text-yellow-300 font-bold">
                          <Icon name="Coins" size={14} />
                          <span className="text-sm">{item.price}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="animate-fade-in">
            <Card className="max-w-2xl mx-auto p-8">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
                  <Icon name="User" size={48} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Игрок #{Math.floor(Math.random() * 10000)}</h2>
                  <p className="text-muted-foreground">CS2 Case Opener Pro</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Баланс</p>
                    <div className="flex items-center gap-2">
                      <Icon name="Coins" size={20} className="text-yellow-500" />
                      <p className="text-2xl font-bold">{balance}</p>
                    </div>
                  </div>
                  <div className="bg-secondary p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Открыто кейсов</p>
                    <p className="text-2xl font-bold">{inventory.length}</p>
                  </div>
                  <div className="bg-secondary p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Стоимость инвентаря</p>
                    <div className="flex items-center gap-2">
                      <Icon name="TrendingUp" size={20} className="text-green-500" />
                      <p className="text-2xl font-bold">{totalValue}</p>
                    </div>
                  </div>
                  <div className="bg-secondary p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Лучший дроп</p>
                    <p className="text-2xl font-bold">
                      {legendaryCount > 0 ? '🔥' : epicCount > 0 ? '⭐' : '📦'}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Достижения</h3>
                  <div className="space-y-2">
                    <div className={`p-4 rounded-lg border-2 ${inventory.length > 0 ? 'bg-primary/10 border-primary' : 'bg-secondary border-border'}`}>
                      <div className="flex items-center gap-3">
                        <Icon name={inventory.length > 0 ? "CheckCircle" : "Circle"} size={24} className={inventory.length > 0 ? "text-primary" : "text-muted-foreground"} />
                        <div>
                          <p className="font-semibold">Первый кейс</p>
                          <p className="text-sm text-muted-foreground">Открой свой первый кейс</p>
                        </div>
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg border-2 ${inventory.length >= 10 ? 'bg-primary/10 border-primary' : 'bg-secondary border-border'}`}>
                      <div className="flex items-center gap-3">
                        <Icon name={inventory.length >= 10 ? "CheckCircle" : "Circle"} size={24} className={inventory.length >= 10 ? "text-primary" : "text-muted-foreground"} />
                        <div>
                          <p className="font-semibold">Коллекционер</p>
                          <p className="text-sm text-muted-foreground">Собери 10 предметов ({inventory.length}/10)</p>
                        </div>
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg border-2 ${legendaryCount > 0 ? 'bg-orange-500/10 border-orange-500' : 'bg-secondary border-border'}`}>
                      <div className="flex items-center gap-3">
                        <Icon name={legendaryCount > 0 ? "CheckCircle" : "Circle"} size={24} className={legendaryCount > 0 ? "text-orange-400" : "text-muted-foreground"} />
                        <div>
                          <p className="font-semibold">Легенда</p>
                          <p className="text-sm text-muted-foreground">Получи легендарный предмет</p>
                        </div>
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg border-2 ${totalValue >= 1000 ? 'bg-green-500/10 border-green-500' : 'bg-secondary border-border'}`}>
                      <div className="flex items-center gap-3">
                        <Icon name={totalValue >= 1000 ? "CheckCircle" : "Circle"} size={24} className={totalValue >= 1000 ? "text-green-400" : "text-muted-foreground"} />
                        <div>
                          <p className="font-semibold">Миллионер</p>
                          <p className="text-sm text-muted-foreground">Собери инвентарь на 1000+ монет</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={selectedCase !== null} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="sm:max-w-4xl bg-background/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              {isOpening ? 'Открываем кейс...' : showResult ? 'Поздравляем!' : selectedCase?.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center py-8">
            {isOpening ? (
              <div className="w-full overflow-hidden relative">
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary z-10 shadow-[0_0_20px_rgba(155,135,245,0.8)]" />
                <div 
                  className="flex gap-4 py-8 transition-transform duration-[4000ms] ease-out"
                  style={{ transform: `translateX(${rouletteOffset}px)` }}
                >
                  {rouletteItems.map((item, idx) => (
                    <div
                      key={idx}
                      className={`${rarityColors[item.rarity]} border-2 p-4 rounded-lg flex-shrink-0 w-40`}
                    >
                      <img src={item.image} alt={item.name} className="w-full h-20 object-contain mb-2" />
                      <p className="text-xs text-white text-center font-semibold truncate">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : showResult && wonItem ? (
              <div className={`${rarityColors[wonItem.rarity]} border-2 p-8 rounded-xl animate-scale-in max-w-md w-full`}>
                <div className="text-center space-y-4">
                  <img src={wonItem.image} alt={wonItem.name} className="w-full h-40 object-contain mb-4" />
                  <h3 className="text-2xl font-bold text-white">{wonItem.name}</h3>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-lg px-4 py-1">
                    {rarityLabels[wonItem.rarity]}
                  </Badge>
                  <div className="flex items-center justify-center gap-2 text-yellow-300 text-2xl font-bold">
                    <Icon name="Coins" size={24} />
                    <span>{wonItem.price}</span>
                  </div>
                  <Button 
                    className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 mt-6"
                    onClick={closeDialog}
                  >
                    <Icon name="Package" size={16} className="mr-2" />
                    Добавлено в инвентарь
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
