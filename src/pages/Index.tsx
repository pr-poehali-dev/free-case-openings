import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type Rarity = 'common' | 'rare' | 'legendary';

interface Item {
  id: string;
  name: string;
  rarity: Rarity;
  image: string;
}

interface CaseType {
  id: string;
  name: string;
  description: string;
  rarity: Rarity;
  items: Item[];
}

const cases: CaseType[] = [
  {
    id: '1',
    name: 'Starter Case',
    description: 'Базовый кейс для новичков',
    rarity: 'common',
    items: [
      { id: '1-1', name: 'AK-47 | Redline', rarity: 'rare', image: '🔫' },
      { id: '1-2', name: 'M4A4 | Asiimov', rarity: 'legendary', image: '🔫' },
      { id: '1-3', name: 'AWP | Dragon Lore', rarity: 'legendary', image: '🎯' },
      { id: '1-4', name: 'Glock-18 | Water Elemental', rarity: 'common', image: '🔫' },
      { id: '1-5', name: 'Desert Eagle | Blaze', rarity: 'rare', image: '🔫' },
    ]
  },
  {
    id: '2',
    name: 'Premium Case',
    description: 'Редкие скины высокого качества',
    rarity: 'rare',
    items: [
      { id: '2-1', name: 'Karambit | Fade', rarity: 'legendary', image: '🗡️' },
      { id: '2-2', name: 'Butterfly Knife | Tiger Tooth', rarity: 'legendary', image: '🗡️' },
      { id: '2-3', name: 'M4A1-S | Hyper Beast', rarity: 'rare', image: '🔫' },
      { id: '2-4', name: 'USP-S | Kill Confirmed', rarity: 'rare', image: '🔫' },
      { id: '2-5', name: 'P250 | Asiimov', rarity: 'common', image: '🔫' },
    ]
  },
  {
    id: '3',
    name: 'Legendary Case',
    description: 'Самые редкие предметы',
    rarity: 'legendary',
    items: [
      { id: '3-1', name: 'AWP | Medusa', rarity: 'legendary', image: '🎯' },
      { id: '3-2', name: 'M9 Bayonet | Crimson Web', rarity: 'legendary', image: '🗡️' },
      { id: '3-3', name: 'AK-47 | Fire Serpent', rarity: 'legendary', image: '🔫' },
      { id: '3-4', name: 'Flip Knife | Doppler', rarity: 'legendary', image: '🗡️' },
      { id: '3-5', name: 'AWP | Lightning Strike', rarity: 'rare', image: '🎯' },
    ]
  },
  {
    id: '4',
    name: 'Knife Case',
    description: 'Только ножи',
    rarity: 'rare',
    items: [
      { id: '4-1', name: 'Karambit | Doppler', rarity: 'legendary', image: '🗡️' },
      { id: '4-2', name: 'Bayonet | Slaughter', rarity: 'legendary', image: '🗡️' },
      { id: '4-3', name: 'Huntsman Knife | Fade', rarity: 'rare', image: '🗡️' },
      { id: '4-4', name: 'Gut Knife | Marble Fade', rarity: 'rare', image: '🗡️' },
      { id: '4-5', name: 'Falchion Knife | Case Hardened', rarity: 'rare', image: '🗡️' },
    ]
  },
  {
    id: '5',
    name: 'AWP Collection',
    description: 'Коллекция снайперских винтовок',
    rarity: 'common',
    items: [
      { id: '5-1', name: 'AWP | Asiimov', rarity: 'rare', image: '🎯' },
      { id: '5-2', name: 'AWP | Hyper Beast', rarity: 'rare', image: '🎯' },
      { id: '5-3', name: 'AWP | Redline', rarity: 'common', image: '🎯' },
      { id: '5-4', name: 'AWP | Fade', rarity: 'legendary', image: '🎯' },
      { id: '5-5', name: 'AWP | Graphite', rarity: 'common', image: '🎯' },
    ]
  },
  {
    id: '6',
    name: 'Pistol Case',
    description: 'Коллекция пистолетов',
    rarity: 'common',
    items: [
      { id: '6-1', name: 'Glock-18 | Fade', rarity: 'legendary', image: '🔫' },
      { id: '6-2', name: 'Desert Eagle | Golden Koi', rarity: 'rare', image: '🔫' },
      { id: '6-3', name: 'USP-S | Orion', rarity: 'rare', image: '🔫' },
      { id: '6-4', name: 'P2000 | Fire Elemental', rarity: 'common', image: '🔫' },
      { id: '6-5', name: 'Five-SeveN | Monkey Business', rarity: 'common', image: '🔫' },
    ]
  },
];

const rarityColors: Record<Rarity, string> = {
  common: 'bg-gradient-to-br from-purple-600 to-purple-800 border-purple-500',
  rare: 'bg-gradient-to-br from-blue-500 to-blue-700 border-blue-400',
  legendary: 'bg-gradient-to-br from-orange-500 to-red-600 border-orange-400',
};

const rarityLabels: Record<Rarity, string> = {
  common: 'Обычный',
  rare: 'Редкий',
  legendary: 'Легендарный',
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('cases');
  const [inventory, setInventory] = useState<Item[]>([]);
  const [isOpening, setIsOpening] = useState(false);
  const [selectedCase, setSelectedCase] = useState<CaseType | null>(null);
  const [wonItem, setWonItem] = useState<Item | null>(null);
  const [showResult, setShowResult] = useState(false);

  const openCase = (caseType: CaseType) => {
    setSelectedCase(caseType);
    setIsOpening(true);
    setShowResult(false);

    setTimeout(() => {
      const randomItem = caseType.items[Math.floor(Math.random() * caseType.items.length)];
      setWonItem(randomItem);
      setInventory(prev => [...prev, randomItem]);
      setIsOpening(false);
      setShowResult(true);
    }, 2000);
  };

  const closeDialog = () => {
    setSelectedCase(null);
    setWonItem(null);
    setShowResult(false);
    setIsOpening(false);
  };

  const totalValue = inventory.length;
  const legendaryCount = inventory.filter(i => i.rarity === 'legendary').length;
  const rareCount = inventory.filter(i => i.rarity === 'rare').length;

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
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="cases" className="gap-2">
              <Icon name="Box" size={16} />
              Кейсы
            </TabsTrigger>
            <TabsTrigger value="inventory" className="gap-2">
              <Icon name="Package" size={16} />
              Инвентарь
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <Icon name="User" size={16} />
              Профиль
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cases" className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl font-bold">Открывай кейсы бесплатно</h2>
              <p className="text-muted-foreground text-lg">
                Все кейсы доступны без ограничений
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.map((caseItem, index) => (
                <Card
                  key={caseItem.id}
                  className={`${rarityColors[caseItem.rarity]} border-2 p-6 hover:scale-105 transition-transform cursor-pointer animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => openCase(caseItem)}
                >
                  <div className="text-center space-y-4">
                    <div className="text-6xl mb-4">📦</div>
                    <h3 className="text-xl font-bold text-white">{caseItem.name}</h3>
                    <p className="text-white/80 text-sm">{caseItem.description}</p>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {rarityLabels[caseItem.rarity]}
                    </Badge>
                    <Button className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30">
                      <Icon name="Unlock" size={16} className="mr-2" />
                      Открыть бесплатно
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="animate-fade-in">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6 bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Всего предметов</p>
                      <p className="text-3xl font-bold">{totalValue}</p>
                    </div>
                    <Icon name="Package" size={32} className="text-primary" />
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
                <Card className="p-6 bg-gradient-to-br from-blue-500/20 to-blue-500/5 border-blue-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Редких</p>
                      <p className="text-3xl font-bold text-blue-400">{rareCount}</p>
                    </div>
                    <Icon name="Star" size={32} className="text-blue-400" />
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
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {inventory.map((item, index) => (
                    <Card
                      key={`${item.id}-${index}`}
                      className={`${rarityColors[item.rarity]} border-2 p-4 hover:scale-105 transition-transform`}
                    >
                      <div className="text-center space-y-2">
                        <div className="text-4xl">{item.image}</div>
                        <h4 className="text-sm font-semibold text-white">{item.name}</h4>
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                          {rarityLabels[item.rarity]}
                        </Badge>
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
                  <p className="text-muted-foreground">CS2 Case Opener</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Открыто кейсов</p>
                    <p className="text-2xl font-bold">{inventory.length}</p>
                  </div>
                  <div className="bg-secondary p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Лучший дроп</p>
                    <p className="text-2xl font-bold">
                      {legendaryCount > 0 ? '🔥' : rareCount > 0 ? '⭐' : '📦'}
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
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={selectedCase !== null} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              {isOpening ? 'Открываем кейс...' : showResult ? 'Поздравляем!' : selectedCase?.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center py-8">
            {isOpening ? (
              <div className="space-y-6 text-center">
                <div className="text-8xl animate-glow">📦</div>
                <p className="text-lg text-muted-foreground">Определяем ваш приз...</p>
              </div>
            ) : showResult && wonItem ? (
              <div className={`${rarityColors[wonItem.rarity]} border-2 p-8 rounded-xl animate-scale-in`}>
                <div className="text-center space-y-4">
                  <div className="text-8xl mb-4">{wonItem.image}</div>
                  <h3 className="text-2xl font-bold text-white">{wonItem.name}</h3>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-lg px-4 py-1">
                    {rarityLabels[wonItem.rarity]}
                  </Badge>
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
