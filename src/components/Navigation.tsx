import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: 'home', label: 'Главная', icon: 'Home' },
  { id: 'search', label: 'Поиск', icon: 'Search' },
  { id: 'favorites', label: 'Избранное', icon: 'Star' },
  { id: 'settings', label: 'Настройки', icon: 'Settings' },
  { id: 'help', label: 'Помощь', icon: 'HelpCircle' },
  { id: 'about', label: 'О проекте', icon: 'Info' },
];

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [open, setOpen] = useState(false);

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setOpen(false);
  };

  return (
    <>
      <nav className="hidden md:flex items-center gap-2">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={currentPage === item.id ? 'default' : 'ghost'}
            className={`font-orbitron transition-all duration-300 ${
              currentPage === item.id
                ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(0,255,136,0.4)]'
                : 'text-foreground hover:text-primary hover:bg-card'
            }`}
            onClick={() => handleNavigate(item.id)}
          >
            <Icon name={item.icon as any} size={18} className="mr-2" />
            {item.label}
          </Button>
        ))}
      </nav>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" size="icon" className="border-primary/50 hover:border-primary">
            <Icon name="Menu" size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-card border-l-2 border-primary/30 w-64">
          <div className="flex flex-col gap-2 mt-8">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? 'default' : 'ghost'}
                className={`justify-start font-orbitron transition-all duration-300 ${
                  currentPage === item.id
                    ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(0,255,136,0.4)]'
                    : 'text-foreground hover:text-primary hover:bg-muted'
                }`}
                onClick={() => handleNavigate(item.id)}
              >
                <Icon name={item.icon as any} size={20} className="mr-3" />
                {item.label}
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
