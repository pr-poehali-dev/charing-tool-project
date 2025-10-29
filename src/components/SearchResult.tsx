import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface SearchResultProps {
  title: string;
  url: string;
  description: string;
  index: number;
}

export default function SearchResult({ title, url, description, index }: SearchResultProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="p-5 bg-card border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,136,0.2)] group animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group-hover:translate-x-1 transition-transform duration-300"
          >
            <h3 className="text-lg font-orbitron font-semibold text-primary group-hover:text-neon-cyan transition-colors duration-300 mb-1">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">{url}</p>
            <p className="text-foreground/90 leading-relaxed">{description}</p>
          </a>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsFavorite(!isFavorite)}
          className="hover:bg-primary/10 transition-colors"
        >
          <Icon
            name="Star"
            size={20}
            className={`transition-colors ${
              isFavorite ? 'fill-primary text-primary' : 'text-muted-foreground'
            }`}
          />
        </Button>
      </div>
    </Card>
  );
}
