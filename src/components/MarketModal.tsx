import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Platform } from '../types';
import {
  SocialCard,
  CustomCard,
  CodeCard,
  QRCard,
  MapCard,
  TVCard,
  URLCard,
  ImageCard,
  VideoCard,
  ProductCard
} from './cards';

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
    autoplay?: boolean;
    controls?: boolean;
    showTitle?: boolean;
    videoUrl?: string;
    productImage?: string;
    price?: string;
    rating?: number;
    reviews?: number;
    prime?: boolean;
    variant?: 'amazon' | 'mercadolibre' | 'generic';
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
    preview: <SocialCard platform="tiktok">usuario</SocialCard>,
    defaultSize: { w: 1, h: 1 }
  },
  {
    id: 'instagram',
    title: 'Instagram',
    description: 'Comparte tu perfil de Instagram',
    preview: <SocialCard platform="instagram">usuario</SocialCard>,
    defaultSize: { w: 1, h: 1 }
  },
  {
    id: 'facebook',
    title: 'Facebook',
    description: 'Comparte tu perfil de Facebook',
    preview: <SocialCard platform="facebook">usuario</SocialCard>,
    defaultSize: { w: 1, h: 1 }
  },
  {
    id: 'youtube',
    title: 'YouTube',
    description: 'Comparte tu canal de YouTube',
    preview: <SocialCard platform="youtube">usuario</SocialCard>,
    defaultSize: { w: 1, h: 1 }
  },
  {
    id: 'twitter',
    title: 'Twitter',
    description: 'Comparte tu perfil de Twitter',
    preview: <SocialCard platform="twitter">usuario</SocialCard>,
    defaultSize: { w: 1, h: 1 }
  },
  {
    id: 'pinterest',
    title: 'Pinterest',
    description: 'Comparte tu perfil de Pinterest',
    preview: <SocialCard platform="pinterest">usuario</SocialCard>,
    defaultSize: { w: 1, h: 1 }
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    description: 'Comparte tu perfil profesional',
    preview: <SocialCard platform="linkedin">usuario</SocialCard>,
    defaultSize: { w: 1, h: 1 }
  },
  {
    id: 'github',
    title: 'GitHub',
    description: 'Muestra tu perfil de desarrollador',
    preview: <SocialCard platform="github">usuario</SocialCard>,
    defaultSize: { w: 1, h: 1 }
  },
  {
    id: 'twitch',
    title: 'Twitch',
    description: 'Comparte tu canal de streaming',
    preview: <SocialCard platform="twitch">usuario</SocialCard>,
    defaultSize: { w: 1, h: 1 }
  },
  {
    id: 'discord',
    title: 'Discord',
    description: 'Invita a tu servidor',
    preview: <SocialCard platform="discord">usuario</SocialCard>,
    defaultSize: { w: 1, h: 1 }
  },
  {
    id: 'spotify',
    title: 'Spotify',
    description: 'Comparte tu música favorita',
    preview: <SocialCard platform="spotify">usuario</SocialCard>,
    defaultSize: { w: 1, h: 1 }
  },
  {
    id: 'behance',
    title: 'Behance',
    description: 'Muestra tu portafolio creativo',
    preview: <SocialCard platform="behance">usuario</SocialCard>,
    defaultSize: { w: 1, h: 1 }
  },
  {
    id: 'dribbble',
    title: 'Dribbble',
    description: 'Comparte tus diseños',
    preview: <SocialCard platform="dribbble">usuario</SocialCard>,
    defaultSize: { w: 1, h: 1 }
  },
  {
    id: 'medium',
    title: 'Medium',
    description: 'Comparte tus artículos',
    preview: <SocialCard platform="medium">usuario</SocialCard>,
    defaultSize: { w: 1, h: 1 }
  },
  {
    id: 'dev',
    title: 'Dev.to',
    description: 'Comparte tus publicaciones técnicas',
    preview: <SocialCard platform="dev">usuario</SocialCard>,
    defaultSize: { w: 1, h: 1 }
  },
  {
    id: 'stackoverflow',
    title: 'Stack Overflow',
    description: 'Muestra tu perfil de desarrollador',
    preview: <SocialCard platform="stackoverflow">usuario</SocialCard>,
    defaultSize: { w: 1, h: 1 }
  },
  {
    id: 'custom',
    title: 'Texto',
    description: 'Añade una tarjeta con texto personalizado',
    preview: <CustomCard title="Tarjeta de texto">Escribe aquí tu texto...</CustomCard>,
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
    preview: <MapCard icon={
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    }>Mi ubicación</MapCard>,
    defaultSize: { w: 1, h: 2 }
  },
  {
    id: 'tv',
    title: 'Video de YouTube',
    description: 'Añade un video de YouTube',
    preview: (
      <TVCard
        videoId="AD-WDWgTtao"
      />
    ),
    defaultSize: { w: 2, h: 1 },
    customData: {
      videoId: 'AD-WDWgTtao'
    }
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
    preview: (
      <div 
        className="relative w-full h-full rounded-xl overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1666777247416-ee7a95235559?q=80&w=1374&auto=format&fit=crop")'
        }}
      />
    ),
    defaultSize: { w: 1, h: 1 }
  },
  {
    id: 'video',
    title: 'Video',
    description: 'Añade un video nativo',
    preview: (
      <VideoCard videoUrl="https://videos.pexels.com/video-files/8435441/8435441-hd_1920_1080_25fps.mp4" />
    ),
    defaultSize: { w: 2, h: 1 },
    customData: {
      videoUrl: 'https://videos.pexels.com/video-files/8435441/8435441-hd_1920_1080_25fps.mp4'
    }
  },
  {
    id: 'amazon-product',
    title: 'Amazon',
    description: 'Producto estilo Amazon con Prime',
    preview: (
      <ProductCard
        variant="amazon"
        productImage="https://images-na.ssl-images-amazon.com/images/I/71ZXj1QEE0L._AC_SL1500_.jpg"
        price="299.99"
        rating={4.8}
        reviews={2547}
        prime={true}
      >
        Apple AirPods Pro (2da Generación) con Estuche de Carga MagSafe
      </ProductCard>
    ),
    defaultSize: { w: 1, h: 2 },
    customData: {
      variant: "amazon",
      productImage: "https://images-na.ssl-images-amazon.com/images/I/71ZXj1QEE0L._AC_SL1500_.jpg",
      price: "299.99",
      rating: 4.8,
      reviews: 2547,
      prime: true,
      text: "Apple AirPods Pro (2da Generación) con Estuche de Carga MagSafe"
    }
  },
  {
    id: 'mercadolibre-product',
    title: 'MercadoLibre',
    description: 'Producto estilo MercadoLibre con FULL',
    preview: (
      <ProductCard
        variant="mercadolibre"
        productImage="https://http2.mlstatic.com/D_NQ_NP_2X_652335-MLM51559388195_092022-F.webp"
        price="299.99"
        rating={4.8}
        reviews={2547}
        prime={true}
      >
        Apple AirPods Pro (2da Generación) Originales - Blanco
      </ProductCard>
    ),
    defaultSize: { w: 1, h: 2 },
    customData: {
      variant: "mercadolibre",
      productImage: "https://http2.mlstatic.com/D_NQ_NP_2X_652335-MLM51559388195_092022-F.webp",
      price: "299.99",
      rating: 4.8,
      reviews: 2547,
      prime: true,
      text: "Apple AirPods Pro (2da Generación) Originales - Blanco"
    }
  },
  {
    id: 'generic-product',
    title: 'Producto',
    description: 'Tarjeta de producto minimalista',
    preview: (
      <ProductCard
        variant="generic"
        productImage="https://images-na.ssl-images-amazon.com/images/I/71ZXj1QEE0L._AC_SL1500_.jpg"
        price="299.99"
        rating={4.8}
        reviews={2547}
        prime={true}
      >
        Apple AirPods Pro (2da Generación) - Blanco
      </ProductCard>
    ),
    defaultSize: { w: 1, h: 2 },
    customData: {
      variant: "generic",
      productImage: "https://images-na.ssl-images-amazon.com/images/I/71ZXj1QEE0L._AC_SL1500_.jpg",
      price: "299.99",
      rating: 4.8,
      reviews: 2547,
      prime: true,
      text: "Apple AirPods Pro (2da Generación) - Blanco"
    }
  }
];

const categories = [
  {
    id: 'basic',
    name: 'Básicos',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    )
  },
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
    id: 'media',
    name: 'Multimedia',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 'products',
    name: 'Productos',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    )
  }
];

const categorizedCards = {
  basic: ['custom', 'code', 'qr'],
  social: cards
    .filter(card => card.id.match(/^(facebook|instagram|tiktok|youtube|twitter|pinterest|linkedin|github|twitch|discord|spotify)$/))
    .map(card => card.id),
  media: ['image', 'video', 'tv', 'map', 'url'],
  products: ['amazon-product', 'mercadolibre-product', 'generic-product']
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
      className="relative w-full aspect-square rounded-[1.5rem] overflow-hidden cursor-pointer group"
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
        transition-opacity duration-300 rounded-[1.5rem] flex flex-col items-center justify-center gap-2 backdrop-blur-sm z-50">
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
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] transition-opacity duration-200 md:block
          ${isClosing ? 'opacity-0' : 'opacity-100'}`}
        onClick={handleClose}
      />
      <div 
        className={`fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:w-[90vw] md:max-w-5xl md:max-h-[85vh] 
          bg-white md:rounded-[1.5rem] shadow-2xl z-[100] overflow-hidden transition-all duration-300 flex flex-col
          ${isClosing ? 'opacity-0 md:scale-95 translate-y-full md:translate-y-[calc(-50%+2rem)]' : 'opacity-100 md:scale-100 translate-y-0 md:-translate-y-1/2'}`}
      >
        <div className="p-6 border-b flex items-center justify-between flex-shrink-0">
          <h2 className="text-2xl font-semibold text-gray-900">Widgets</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="space-y-8 md:space-y-12">
            {/* Sección Redes Sociales */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 md:mb-6">Redes Sociales</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {cards
                  .filter(card => categorizedCards.social.includes(card.id))
                  .map((card) => (
                    <div key={card.id} className="flex flex-col items-center gap-4">
                      <CardPreview card={card} onAdd={handleAddCard} />
                      <div className="flex flex-col items-center text-center">
                        <h3 className="text-sm font-medium text-gray-900">{card.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{card.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </section>

            {/* Sección Básicos */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 md:mb-6">Básicos</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {cards
                  .filter(card => categorizedCards.basic.includes(card.id))
                  .map((card) => (
                    <div key={card.id} className="flex flex-col items-center gap-4">
                      <CardPreview card={card} onAdd={handleAddCard} />
                      <div className="flex flex-col items-center text-center">
                        <h3 className="text-sm font-medium text-gray-900">{card.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{card.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </section>

            {/* Sección Multimedia */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Multimedia</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {cards
                  .filter(card => categorizedCards.media.includes(card.id))
                  .map((card) => (
                    <div key={card.id} className="flex flex-col items-center gap-4">
                      <CardPreview card={card} onAdd={handleAddCard} />
                      <div className="flex flex-col items-center text-center">
                        <h3 className="text-sm font-medium text-gray-900">{card.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{card.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </section>

            {/* Sección Productos */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Productos</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {cards
                  .filter(card => categorizedCards.products.includes(card.id))
                  .map((card) => (
                    <div key={card.id} className="flex flex-col items-center gap-4">
                      <CardPreview card={card} onAdd={handleAddCard} />
                      <div className="flex flex-col items-center text-center">
                        <h3 className="text-sm font-medium text-gray-900">{card.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{card.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          </div>
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