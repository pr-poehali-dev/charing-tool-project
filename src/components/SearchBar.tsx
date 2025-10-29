import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  size?: 'default' | 'large';
}

export default function SearchBar({ onSearch, size = 'default' }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query);
    }
  };

  const isLarge = size === 'large';

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-neon-green via-neon-cyan to-neon-purple rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск без границ..."
              className={`${
                isLarge ? 'h-16 text-lg' : 'h-12'
              } bg-card border-2 border-primary/50 focus:border-primary text-foreground placeholder:text-muted-foreground pr-12 rounded-lg font-roboto transition-all duration-300 focus:shadow-[0_0_20px_rgba(0,255,136,0.3)]`}
            />
            <Icon
              name="Search"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-primary"
              size={isLarge ? 24 : 20}
            />
          </div>
          <Button
            type="submit"
            size={isLarge ? 'lg' : 'default'}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-orbitron font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,136,0.5)]"
          >
            <Icon name="Zap" size={20} className="mr-2" />
            Поиск
          </Button>
        </div>
      </div>
    </form>
  );
}
