import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Platform } from '../types';
import { BaseSocialCard } from './cards/BaseSocialCard';
import { TikTokCard } from './cards/TikTokCard';
import { InstagramCard } from './cards/InstagramCard';
import { FacebookCard } from './cards/FacebookCard';
import { YouTubeCard } from './cards/YouTubeCard';
import { CustomCard } from './cards/CustomCard';
import { CodeCard } from './cards/CodeCard';
import { QRCard } from './cards/QRCard';
import { MapCard } from './cards/MapCard';
import { TVCard } from './cards/TVCard';
import { URLCard } from './cards/URLCard';
import { LinkedInCard } from './cards/LinkedInCard';
import { GitHubCard } from './cards/GitHubCard';
import { TwitchCard } from './cards/TwitchCard';
import { ImageCard } from './cards/ImageCard';

type CardType = {
  id: Platform;
  title: string;
  description: string;
  preview: React.ReactNode;
  defaultSize: { w: number; h: number };
  customData?: {
    title?: string;
    text?: string;
    gradient?: 'blue' | 'purple' | 'green' | 'orange' | 'pink';
    command?: string;
    url?: string;
    lat?: number;
    lng?: number;
    zoom?: number;
    videoId?: string;
    imageUrl?: string;
  };
};

interface MarketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCard: (
    platform: Platform,
    size: { w: number; h: number },
    customData?: CardType['customData']
  ) => void;
}

const cards: CardType[] = [
  {
    id: 'tiktok',
    title: 'TikTok',
    description: 'Comparte tu perfil de TikTok',
    preview: <TikTokCard>usuario</TikTokCard>,
    defaultSize: { w: 1, h: 1 }
  },
  {
    id: 'instagram',
    title: 'Instagram',
    description: 'Comparte tu perfil de Instagram',
    preview: <InstagramCard>usuario</InstagramCard>,
    defaultSize: { w: 1, h: 1 }
  },
  {
    id: 'facebook',
    title: 'Facebook',
    description: 'Comparte tu perfil de Facebook',
    preview: <FacebookCard>usuario</FacebookCard>,
    defaultSize: { w: 1, h: 1 }
  },
  {
    id: 'youtube',
    title: 'YouTube',
    description: 'Comparte tu canal de YouTube',
    preview: <YouTubeCard>usuario</YouTubeCard>,
    defaultSize: { w: 1, h: 1 }
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    description: 'Comparte tu perfil profesional',
    preview: <LinkedInCard>usuario</LinkedInCard>,
    defaultSize: { w: 1, h: 1 }
  },
  {
    id: 'github',
    title: 'GitHub',
    description: 'Comparte tu perfil de desarrollador',
    preview: <GitHubCard>usuario</GitHubCard>,
    defaultSize: { w: 1, h: 1 }
  },
  {
    id: 'twitch',
    title: 'Twitch',
    description: 'Comparte tu canal de streaming',
    preview: <TwitchCard>usuario</TwitchCard>,
    defaultSize: { w: 1, h: 1 }
  },
  {
    id: 'custom',
    title: 'Personalizada',
    description: 'Crea una tarjeta personalizada',
    preview: <CustomCard title="Tarjeta personalizada">Escribe aquí tu texto...</CustomCard>,
    defaultSize: { w: 1, h: 1 }
  },
  {
    id: 'code',
    title: 'Código',
    description: 'Muestra un comando o código',
    preview: <CodeCard command="npm install">npm install</CodeCard>,
    defaultSize: { w: 2, h: 1 }
  },
  {
    id: 'qr',
    title: 'Código QR',
    description: 'Genera un código QR',
    preview: <QRCard url="https://ejemplo.com">https://ejemplo.com</QRCard>,
    defaultSize: { w: 1, h: 1 }
  },
  {
    id: 'map',
    title: 'Ubicación',
    description: 'Muestra una ubicación con un diseño visual',
    preview: <MapCard>Mi ubicación</MapCard>,
    defaultSize: { w: 1, h: 2 }
  },
  {
    id: 'tv',
    title: 'TV',
    description: 'Incrusta un video de YouTube',
    preview: <TVCard videoId="dQw4w9WgXcQ" />,
    defaultSize: { w: 2, h: 1 }
  },
  {
    id: 'url',
    title: 'URL',
    description: 'Enlace a cualquier sitio web',
    preview: <URLCard url="https://ejemplo.com">Visita mi sitio web</URLCard>,
    defaultSize: { w: 1, h: 1 }
  },
  {
    id: 'image',
    title: 'Imagen',
    description: 'Sube y muestra tus propias imágenes',
    preview: <ImageCard>Sube una imagen</ImageCard>,
    defaultSize: { w: 1, h: 1 }
  }
];

const categories = [
  {
    id: 'social',
    name: 'Redes Sociales',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    )
  },
  {
    id: 'tools',
    name: 'Herramientas',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    id: 'media',
    name: 'Multimedia',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

const categorizedCards = {
  social: ['facebook', 'instagram', 'tiktok', 'youtube', 'linkedin', 'github', 'twitch'],
  tools: ['custom', 'code', 'qr', 'url'],
  media: ['map', 'tv', 'image']
};

const styles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes modalEnter {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(10px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @keyframes modalExit {
    from {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
    to {
      opacity: 0;
      transform: scale(0.95) translateY(10px);
    }
  }

  @keyframes confirmationIn {
    0% {
      transform: scale(0.8) translateY(20px);
    }
    50% {
      transform: scale(1.1) translateY(0);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes confirmationOut {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0.8) translateY(-20px);
    }
  }
`;

const getCardCategory = (cardId: string): string => {
  for (const [category, cardIds] of Object.entries(categorizedCards)) {
    if (cardIds.includes(cardId)) {
      return category;
    }
  }
  return 'all';
};

const CardPreview = memo(({ card, onAdd }: { card: CardType; onAdd: (card: CardType) => void }) => {
  const handleClick = useCallback(() => {
    onAdd(card);
  }, [card, onAdd]);

  const [transform, setTransform] = useState('');
  const [filter, setFilter] = useState('');
  const [boxShadow, setBoxShadow] = useState('0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 10px -2px rgba(0, 0, 0, 0.1)');

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -20;
    const rotateY = ((x - centerX) / centerX) * 20;

    const brightness = 1 + (Math.abs(x - centerX) + Math.abs(y - centerY)) / (rect.width + rect.height) * 0.4;
    const dx = (x - centerX) / 10;
    const dy = (y - centerY) / 10;
    
    requestAnimationFrame(() => {
      setTransform(`
        perspective(800px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        scale3d(1.1, 1.1, 1.1)
        translateZ(20px)
      `);
      setFilter(`brightness(${brightness})`);
      setBoxShadow(`
        ${-dx}px ${-dy}px 20px rgba(0, 0, 0, 0.2),
        0 10px 20px -10px rgba(0, 0, 0, 0.3),
        inset 0 0 20px rgba(255, 255, 255, 0.1)
      `);
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    requestAnimationFrame(() => {
      setTransform('perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0)');
      setFilter('brightness(1)');
      setBoxShadow('0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 10px -2px rgba(0, 0, 0, 0.1)');
    });
  }, []);

  return (
    <div 
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-square rounded-xl overflow-hidden cursor-pointer group"
      style={{
        transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), filter 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        transformStyle: 'preserve-3d',
        transform,
        filter,
        boxShadow,
        willChange: 'transform, filter, box-shadow'
      }}
    >
      <div className="w-full h-full relative">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
          bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_70%)] pointer-events-none" 
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
          bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.2),transparent)] 
          animate-[shine_2s_ease-in-out_infinite] pointer-events-none"
        />
        <div className="w-full h-full">
          {card.preview}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40 opacity-0 group-hover:opacity-100 
        transition-opacity duration-300 rounded-xl flex flex-col items-center justify-center gap-2 backdrop-blur-sm z-50">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md
          shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-transform duration-300">
          <svg className="w-6 h-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <span className="text-white font-medium text-sm mt-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md
          transition-transform duration-300
          shadow-[0_0_20px_rgba(255,255,255,0.2)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
          Agregar al grid
        </span>
      </div>
    </div>
  );
});

const ConfirmationOverlay = memo(({ card, isVisible, onAnimationEnd }: { 
  card: CardType; 
  isVisible: boolean; 
  onAnimationEnd: () => void;
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onAnimationEnd, 1500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onAnimationEnd]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
      style={{
        animation: `${isVisible ? 'fadeIn' : 'fadeOut'} 0.2s ease-out forwards`
      }}
    >
      <div 
        className="flex flex-col items-center gap-4 px-8 py-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-md border border-white/20"
        style={{
          animation: `${isVisible ? 'confirmationIn' : 'confirmationOut'} 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards`
        }}
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center
          shadow-[0_0_30px_rgba(59,130,246,0.5)]">
          <svg className="w-8 h-8 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            {card.title}
          </h3>
          <p className="text-white/80 text-sm">
            agregado al grid
          </p>
        </div>
      </div>
    </div>
  );
});

export const MarketModal = memo(({ isOpen, onClose, onAddCard }: MarketModalProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationCard, setConfirmationCard] = useState<CardType | null>(null);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
  }, [onClose]);

  const handleAddCard = useCallback((card: CardType) => {
    setConfirmationCard(card);
    setShowConfirmation(true);
    onAddCard(card.id, card.defaultSize, card.customData);
  }, [onAddCard]);

  const handleConfirmationEnd = useCallback(() => {
    setShowConfirmation(false);
    handleClose();
  }, [handleClose]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
  }, []);

  const filteredCards = useMemo(() => {
    const searchTermLower = searchTerm.toLowerCase();
    return cards.filter(card => {
      const matchesSearch = card.title.toLowerCase().includes(searchTermLower);
      const matchesCategory = selectedCategory === 'all' || getCardCategory(card.id) === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <style>{styles}</style>
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-200
          ${isClosing ? 'opacity-0' : 'opacity-100'}`}
        onClick={handleClose}
      />
      <div 
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-5xl max-h-[85vh] 
          bg-white rounded-2xl shadow-2xl z-50 overflow-hidden transition-all duration-300
          ${isClosing ? 'opacity-0 scale-95 translate-y-[calc(-50%+2rem)]' : 'opacity-100 scale-100 -translate-y-1/2'}`}
      >
        <div className="p-6 border-b flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-gray-900">Market</h2>
          
          <div className="flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Buscar widgets..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 rounded-xl bg-gray-100 text-gray-900 placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
            <svg className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 border-b">
          <div className="flex gap-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-3 flex items-center gap-2 text-sm font-medium transition-all
                  ${selectedCategory === category.id 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-900'}`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="p-8 overflow-y-auto flex-1 no-scrollbar scroll-smooth overscroll-contain">
          {filteredCards.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01" />
              </svg>
              <p className="text-gray-500">No se encontraron widgets que coincidan con tu búsqueda</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-6">
              {filteredCards.map((card) => (
                <CardPreview key={card.id} card={card} onAdd={handleAddCard} />
              ))}
            </div>
          )}
        </div>
      </div>
      {confirmationCard && (
        <ConfirmationOverlay 
          card={confirmationCard}
          isVisible={showConfirmation}
          onAnimationEnd={handleConfirmationEnd}
        />
      )}
    </>
  );
});

export default MarketModal; 