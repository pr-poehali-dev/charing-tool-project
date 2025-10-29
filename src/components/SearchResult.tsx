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
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <Card className="p-5 bg-card border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,136,0.2)] group animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="block group-hover:translate-x-1 transition-transform duration-300">
              <h3 className="text-lg font-orbitron font-semibold text-primary group-hover:text-neon-cyan transition-colors duration-300 mb-1">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">{url}</p>
              <p className="text-foreground/90 leading-relaxed mb-3">{description}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(true)}
                  className="border-primary/30 hover:border-primary hover:bg-primary/10"
                >
                  <Icon name="Eye" size={16} className="mr-1" />
                  Просмотр
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="border-primary/30 hover:border-primary hover:bg-primary/10"
                >
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <Icon name="ExternalLink" size={16} className="mr-1" />
                    Открыть
                  </a>
                </Button>
              </div>
            </div>
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

      {showPreview && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full h-full max-w-7xl max-h-[90vh] bg-card border-2 border-primary/30 rounded-lg shadow-[0_0_50px_rgba(0,255,136,0.3)] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-primary/20">
              <div className="flex-1 min-w-0">
                <h3 className="font-orbitron font-semibold text-primary truncate">{title}</h3>
                <p className="text-sm text-muted-foreground truncate">{url}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowPreview(false)}
                className="hover:bg-primary/10 ml-4 flex-shrink-0"
              >
                <Icon name="X" size={24} className="text-muted-foreground" />
              </Button>
            </div>
            <iframe
              src={url}
              className="flex-1 w-full border-0"
              title={title}
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          </div>
        </div>
      )}
    </>
  );
}