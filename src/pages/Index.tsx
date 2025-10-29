import { useState, useEffect } from 'react';
import Logo from '@/components/Logo';
import Navigation from '@/components/Navigation';
import SearchBar from '@/components/SearchBar';
import SearchResult from '@/components/SearchResult';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const mockResults = [
  {
    title: 'Википедия — свободная энциклопедия',
    url: 'https://ru.wikipedia.org',
    description: 'Крупнейшая универсальная энциклопедия на русском языке, созданная и редактируемая добровольцами со всего мира.',
  },
  {
    title: 'GitHub — платформа для разработчиков',
    url: 'https://github.com',
    description: 'Сервис для хостинга IT-проектов и их совместной разработки. Позволяет управлять версиями кода и работать в команде.',
  },
  {
    title: 'Stack Overflow — вопросы и ответы',
    url: 'https://stackoverflow.com',
    description: 'Крупнейшее сообщество программистов для обмена знаниями и поиска решений технических проблем.',
  },
];

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [favorites, setFavorites] = useState<typeof mockResults>([]);
  const [settings, setSettings] = useState({
    safeSearch: true,
    darkMode: true,
    showImages: true,
    bypassRestrictions: true,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setHasSearched(true);
    setCurrentPage('search');
  };

  useEffect(() => {
    if (currentPage === 'search' && hasSearched) {
      const timer = setTimeout(() => {
        const searchContainer = document.getElementById('google-search-container');
        if (searchContainer && window.google) {
          const searchElement = window.google.search.cse.element.getElement('google-search');
          if (searchElement) {
            searchElement.execute(searchQuery);
          }
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentPage, hasSearched, searchQuery]);

  return (
    <div className="min-h-screen bg-background cyber-grid">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b-2 border-primary/20 shadow-[0_5px_20px_rgba(0,255,136,0.1)]">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Logo />
          <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {currentPage === 'home' && (
          <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-4xl md:text-6xl font-orbitron font-bold bg-gradient-to-r from-neon-green via-neon-cyan to-neon-purple bg-clip-text text-transparent animate-glow-pulse">
                Поиск без границ
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Инновационная поисковая система с обходом ограничений для геймеров и исследователей
              </p>
            </div>
            <SearchBar onSearch={handleSearch} size="large" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 w-full max-w-4xl">
              <Card className="p-6 bg-card/50 border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,136,0.2)]">
                <Icon name="Shield" size={32} className="text-primary mb-3" />
                <h3 className="font-orbitron font-semibold text-lg mb-2">Без цензуры</h3>
                <p className="text-sm text-muted-foreground">Обход региональных ограничений и блокировок</p>
              </Card>
              <Card className="p-6 bg-card/50 border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,212,255,0.2)]">
                <Icon name="Zap" size={32} className="text-secondary mb-3" />
                <h3 className="font-orbitron font-semibold text-lg mb-2">Молниеносно</h3>
                <p className="text-sm text-muted-foreground">Быстрый поиск с использованием передовых технологий</p>
              </Card>
              <Card className="p-6 bg-card/50 border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(155,135,245,0.2)]">
                <Icon name="Lock" size={32} className="text-accent mb-3" />
                <h3 className="font-orbitron font-semibold text-lg mb-2">Приватность</h3>
                <p className="text-sm text-muted-foreground">Ваши данные остаются конфиденциальными</p>
              </Card>
            </div>
          </div>
        )}

        {currentPage === 'search' && (
          <div className="space-y-6">
            <SearchBar onSearch={handleSearch} />
            {hasSearched && (
              <div id="google-search-container" className="gcse-container">
                <div className="gcse-search"></div>
              </div>
            )}
          </div>
        )}

        {currentPage === 'favorites' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Icon name="Star" size={32} className="text-primary" />
              <h2 className="text-3xl font-orbitron font-bold text-foreground">Избранное</h2>
            </div>
            {favorites.length === 0 ? (
              <Card className="p-12 text-center bg-card/50 border-2 border-primary/20">
                <Icon name="Star" size={64} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-xl text-muted-foreground">Здесь пока пусто</p>
                <p className="text-sm text-muted-foreground mt-2">Добавляйте интересные результаты в избранное</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {favorites.map((result, index) => (
                  <SearchResult key={index} {...result} index={index} />
                ))}
              </div>
            )}
          </div>
        )}

        {currentPage === 'settings' && (
          <div className="space-y-6 max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Icon name="Settings" size={32} className="text-primary" />
              <h2 className="text-3xl font-orbitron font-bold text-foreground">Настройки</h2>
            </div>
            <Card className="p-6 bg-card border-2 border-primary/20">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="safe-search" className="font-orbitron font-semibold">Безопасный поиск</Label>
                    <p className="text-sm text-muted-foreground">Фильтрация нежелательного контента</p>
                  </div>
                  <Switch
                    id="safe-search"
                    checked={settings.safeSearch}
                    onCheckedChange={(checked) => setSettings({ ...settings, safeSearch: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="dark-mode" className="font-orbitron font-semibold">Тёмная тема</Label>
                    <p className="text-sm text-muted-foreground">Геймерский киберпанк стиль</p>
                  </div>
                  <Switch
                    id="dark-mode"
                    checked={settings.darkMode}
                    onCheckedChange={(checked) => setSettings({ ...settings, darkMode: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="show-images" className="font-orbitron font-semibold">Показывать изображения</Label>
                    <p className="text-sm text-muted-foreground">Отображение картинок в результатах</p>
                  </div>
                  <Switch
                    id="show-images"
                    checked={settings.showImages}
                    onCheckedChange={(checked) => setSettings({ ...settings, showImages: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="bypass" className="font-orbitron font-semibold">Обход ограничений</Label>
                    <p className="text-sm text-muted-foreground">Доступ к заблокированным ресурсам</p>
                  </div>
                  <Switch
                    id="bypass"
                    checked={settings.bypassRestrictions}
                    onCheckedChange={(checked) => setSettings({ ...settings, bypassRestrictions: checked })}
                  />
                </div>
              </div>
            </Card>
          </div>
        )}

        {currentPage === 'help' && (
          <div className="space-y-6 max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Icon name="HelpCircle" size={32} className="text-primary" />
              <h2 className="text-3xl font-orbitron font-bold text-foreground">Помощь</h2>
            </div>
            <Card className="p-6 bg-card border-2 border-primary/20">
              <h3 className="font-orbitron font-semibold text-xl mb-4 text-primary">Как использовать Charing Tool?</h3>
              <div className="space-y-4 text-foreground/90">
                <div>
                  <h4 className="font-semibold mb-2">🔍 Базовый поиск</h4>
                  <p className="text-sm">Введите запрос в поисковую строку и нажмите Enter или кнопку "Поиск"</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">⭐ Избранное</h4>
                  <p className="text-sm">Нажмите на звёздочку рядом с результатом, чтобы добавить его в избранное</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">🛡️ Обход ограничений</h4>
                  <p className="text-sm">Функция автоматически активируется при поиске. Включите в настройках для доступа к заблокированным сайтам</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">⚙️ Настройки</h4>
                  <p className="text-sm">Настройте поисковик под себя: безопасный поиск, тема, отображение изображений</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-card border-2 border-accent/20">
              <h3 className="font-orbitron font-semibold text-xl mb-4 text-accent">Горячие клавиши</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                  <span>Фокус на поиске</span>
                  <kbd className="px-2 py-1 bg-card rounded border border-primary/30 font-mono">Ctrl + K</kbd>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                  <span>Главная</span>
                  <kbd className="px-2 py-1 bg-card rounded border border-primary/30 font-mono">Alt + H</kbd>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                  <span>Избранное</span>
                  <kbd className="px-2 py-1 bg-card rounded border border-primary/30 font-mono">Alt + F</kbd>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                  <span>Настройки</span>
                  <kbd className="px-2 py-1 bg-card rounded border border-primary/30 font-mono">Alt + S</kbd>
                </div>
              </div>
            </Card>
          </div>
        )}

        {currentPage === 'about' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Icon name="Info" size={32} className="text-primary" />
              <h2 className="text-3xl font-orbitron font-bold text-foreground">О проекте</h2>
            </div>
            <Card className="p-8 bg-card border-2 border-primary/20 text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-50"></div>
                  <div className="relative bg-gradient-to-br from-neon-green to-neon-cyan p-6 rounded-full">
                    <Icon name="Rocket" size={64} className="text-primary-foreground" />
                  </div>
                </div>
              </div>
              <h3 className="text-4xl font-orbitron font-bold bg-gradient-to-r from-neon-green via-neon-cyan to-neon-purple bg-clip-text text-transparent mb-4">
                CHARING TOOL
              </h3>
              <p className="text-xl text-muted-foreground mb-6">Версия 1.0.0</p>
              <Separator className="my-6" />
              <p className="text-foreground/90 leading-relaxed mb-6">
                Charing Tool — это инновационная поисковая система нового поколения, 
                разработанная специально для геймеров и пользователей, которым важна свобода информации. 
                Мы используем передовые технологии для обхода региональных ограничений и 
                обеспечения доступа к информации без цензуры.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="p-4 bg-muted/20 rounded-lg">
                  <Icon name="Users" size={32} className="text-primary mx-auto mb-2" />
                  <p className="font-orbitron font-semibold">Для сообщества</p>
                  <p className="text-sm text-muted-foreground mt-1">Создано геймерами для геймеров</p>
                </div>
                <div className="p-4 bg-muted/20 rounded-lg">
                  <Icon name="Code" size={32} className="text-secondary mx-auto mb-2" />
                  <p className="font-orbitron font-semibold">Open Source</p>
                  <p className="text-sm text-muted-foreground mt-1">Прозрачность и безопасность</p>
                </div>
                <div className="p-4 bg-muted/20 rounded-lg">
                  <Icon name="Globe" size={32} className="text-accent mx-auto mb-2" />
                  <p className="font-orbitron font-semibold">Без границ</p>
                  <p className="text-sm text-muted-foreground mt-1">Доступ к информации везде</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-card/50 border-2 border-accent/20">
              <h3 className="font-orbitron font-semibold text-lg mb-4 text-accent">Технологии</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Proxy Network', 'Encryption'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-muted/40 rounded-full text-sm border border-primary/20">
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        )}
      </main>

      <footer className="mt-16 border-t-2 border-primary/20 bg-card/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Icon name="Rocket" size={24} className="text-primary" />
              <span className="font-orbitron font-semibold">Charing Tool</span>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Icon name="Github" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Icon name="Twitter" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Icon name="MessageCircle" size={20} />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 Charing Tool. Поиск без границ.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;