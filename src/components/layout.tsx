import { useMemo, useState, useCallback, memo, useContext, createContext, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { HomeLayouts, keys } from "../utils/layout.helper";
import { fonts, socialPlatforms } from "../utils/constants";
import { CustomCard, CodeCard, QRCard, MapCard, TVCard, URLCard, ImageCard, SocialCard, VideoCard, ProductCard } from "./cards";
import Sidebar from "./Sidebar";
import ColorMenu from "./ColorMenu";
import Sticker from "./Sticker";
import "../styles/grid.css";
import { Platform } from "../types";

type CardData = {
  id: string;
  platform: Platform;
  w: number;
  h: number;
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
  videoUrl?: string;
  productImage?: string;
  price?: string;
  rating?: number;
  reviews?: number;
  prime?: boolean;
  variant?: 'amazon' | 'mercadolibre' | 'generic';
};

interface ResizeMenuProps {
  onResize: (size: { w: number; h: number }) => void;
  onDelete?: () => void;
  isDragging?: boolean;
  currentSize?: { w: number; h: number };
}

const ResizeMenuComponent = ({ onResize, onDelete, isDragging, currentSize }: ResizeMenuProps) => {
  const handleClick = useCallback((e: React.MouseEvent, size: { w: number; h: number }) => {
    e.preventDefault();
    e.stopPropagation();
    onResize(size);
  }, [onResize]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDelete = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete?.();
  }, [onDelete]);

  return (
    <div 
      className={`absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-2 flex justify-center items-center gap-2
        translate-y-full ${isDragging ? 'pointer-events-none opacity-0' : 'group-hover:translate-y-0'} transition-all duration-200 cursor-default z-50 no-drag`}
      onMouseDown={handleMouseDown}
      onClick={handleMouseDown}
    >
      {[
        { 
          action: "1x1",
          title: "1x1", 
          icon: <rect x="7" y="7" width="10" height="10" strokeWidth={2} />,
          onClick: (e: React.MouseEvent) => handleClick(e, { w: 1, h: 1 }),
          size: { w: 1, h: 1 }
        },
        { 
          action: "2x1",
          title: "2x1", 
          icon: <rect x="3" y="8" width="18" height="8" strokeWidth={2} />,
          onClick: (e: React.MouseEvent) => handleClick(e, { w: 2, h: 1 }),
          size: { w: 2, h: 1 }
        },
        { 
          action: "1x2",
          title: "1x2", 
          icon: <rect x="8" y="3" width="8" height="18" strokeWidth={2} />,
          onClick: (e: React.MouseEvent) => handleClick(e, { w: 1, h: 2 }),
          size: { w: 1, h: 2 }
        },
        { 
          action: "2x2",
          title: "2x2", 
          icon: <rect x="4" y="4" width="16" height="16" strokeWidth={2} />,
          onClick: (e: React.MouseEvent) => handleClick(e, { w: 2, h: 2 }),
          size: { w: 2, h: 2 }
        },
        { 
          action: "delete",
          title: "Eliminar", 
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />,
          onClick: handleDelete
        }
      ].filter(button => {
        if (button.action === "delete") return true;
        if (!currentSize) return true;
        if (!('size' in button)) return true;
        const sizeButton = button as { size: { w: number; h: number } };
        return sizeButton.size.w !== currentSize.w || sizeButton.size.h !== currentSize.h;
      }).map(({ action, title, icon, onClick }) => (
        <button
          key={action}
          onClick={onClick}
          onMouseDown={handleMouseDown}
          className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer
            active:scale-95 transition-transform no-drag"
          title={title}
        >
          <svg className={action === "delete" ? "w-3 h-3" : "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {icon}
          </svg>
        </button>
      ))}
    </div>
  );
};

const ResizeMenu = memo(ResizeMenuComponent);

interface Sticker {
  id: string;
  emoji: string;
  position: { x: number; y: number };
}

interface BlockProps {
  keyProp: string;
  onDelete?: () => void;
  platform?: CardData['platform'];
}

const Block = memo(({ keyProp, onDelete, platform }: BlockProps) => {
  const { cards, currentlayout, handleTextChange, handleVideoChange, handleImageChange } = useContext(LayoutContext);
  const card = cards.find(c => c.id === keyProp);
  const layout = currentlayout?.lg?.find(item => item.i === keyProp) || currentlayout?.xs?.find(item => item.i === keyProp);
  const size = layout ? { w: layout.w, h: layout.h } : { w: 1, h: 1 };
  
  // Si la plataforma es una red social, usamos SocialCard
  if (card?.platform && ['facebook', 'instagram', 'tiktok', 'youtube', 'twitter', 'pinterest', 'linkedin', 'github', 'twitch', 'discord', 'spotify', 'behance', 'dribbble', 'medium', 'dev', 'stackoverflow'].includes(card.platform)) {
    return (
      <SocialCard
        platform={card.platform as any}
        onDelete={onDelete}
        onTextChange={(newText: string) => handleTextChange(keyProp, newText)}
        size={size}
      >
        {card?.text || card?.title?.replace('@', '')}
      </SocialCard>
    );
  }
  
  // Para URLs con título, usamos URLCard
  if (card?.url && card?.title) {
    return (
      <URLCard
        url={card.url}
        title={card.title}
        onDelete={onDelete}
        onTitleChange={(newTitle: string) => handleTextChange(keyProp, newTitle)}
        size={size}
      >
        {card.text}
      </URLCard>
    );
  }
  
  if (platform || keyProp in socialPlatforms) {
    const platformToUse = platform || socialPlatforms[keyProp as keyof typeof socialPlatforms].platform;
    
    if (['facebook', 'instagram', 'tiktok', 'youtube', 'twitter', 'pinterest', 'linkedin', 'github', 'twitch', 'discord', 'spotify', 'behance', 'dribbble', 'medium', 'dev', 'stackoverflow'].includes(platformToUse)) {
      return (
        <SocialCard
          platform={platformToUse as any}
          onDelete={onDelete}
          onTextChange={(newText: string) => handleTextChange(keyProp, newText)}
          size={size}
        >
          {card?.text}
        </SocialCard>
      );
    }

    const CardComponent = {
      custom: CustomCard,
      code: CodeCard,
      qr: QRCard,
      map: MapCard,
      tv: TVCard,
      url: URLCard,
      image: ImageCard,
      video: VideoCard,
      'amazon-product': ProductCard,
      'mercadolibre-product': ProductCard,
      'generic-product': ProductCard
    }[platformToUse];

    if (CardComponent) {
      const text = platformToUse === 'image'
        ? 'Arrastra una imagen aquí'
        : card?.text || 'Texto personalizado';

      const commonProps = {
        onDelete,
        size,
        onTextChange: (newText: string) => handleTextChange(keyProp, newText)
      };

      if (platformToUse === 'image') {
        return (
          <ImageCard 
            {...commonProps}
            imageUrl={card?.imageUrl}
            onImageChange={(newImageUrl: string) => handleImageChange(keyProp, newImageUrl)}
          >
            {text}
          </ImageCard>
        );
      }

      if (platformToUse === 'tv') {
        return (
          <TVCard 
            {...commonProps}
            videoId={card?.videoId}
            onVideoChange={(newVideoId: string) => handleVideoChange(keyProp, newVideoId)}
          >
            {text}
          </TVCard>
        );
      }

      if (platformToUse === 'video') {
        return (
          <VideoCard 
            {...commonProps}
            videoUrl={card?.videoUrl}
            onVideoChange={(videoUrl: string) => handleVideoChange(keyProp, videoUrl)}
          >
            {text}
          </VideoCard>
        );
      }

      if (platformToUse.endsWith('-product')) {
        const variant = platformToUse === 'amazon-product' 
          ? 'amazon' 
          : platformToUse === 'mercadolibre-product'
            ? 'mercadolibre'
            : 'generic';

        return (
          <ProductCard 
            {...commonProps}
            productImage={card?.productImage}
            price={card?.price}
            rating={card?.rating}
            reviews={card?.reviews}
            prime={card?.prime}
            variant={variant}
          >
            {card?.text || text}
          </ProductCard>
        );
      }

      return (
        <CardComponent 
          {...commonProps}
        >
          {text}
        </CardComponent>
      );
    }
  }

  return null;
});

// Crear un contexto para compartir el estado
interface LayoutContextType {
  cards: CardData[];
  currentlayout: typeof HomeLayouts;
  handleTextChange: (cardId: string, newText: string) => void;
  handleVideoChange: (cardId: string, newVideoId: string) => void;
  handleImageChange: (cardId: string, newImageUrl: string) => void;
}

export const LayoutContext = createContext<LayoutContextType>({
  cards: [],
  currentlayout: HomeLayouts,
  handleTextChange: () => {},
  handleVideoChange: () => {},
  handleImageChange: () => {},
});

function Layout() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [currentlayout, setCurrentLayout] = useState(() => ({
    lg: HomeLayouts.lg.map(item => ({
      ...item,
      isResizable: false as const,
      static: false as const
    })),
    xs: HomeLayouts.xs.map(item => ({
      ...item,
      static: false as const,
      isResizable: false as const,
      w: Math.min(item.w, 2)
    }))
  }));
  const [viewMode, setViewMode] = useState<'web' | 'desktop'>('desktop');

  // Asegurar que todas las tarjetas sean móviles al montar
  useEffect(() => {
    setCurrentLayout(prev => ({
      ...prev,
      xs: prev.xs.map(item => ({
        ...item,
        static: false,
        isResizable: false,
        w: Math.min(item.w, 2)
      }))
    }));

    // Desactivar la animación inicial después de que todas las cards se hayan cargado
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 2000); // Tiempo suficiente para que todas las animaciones terminen

    return () => clearTimeout(timer);
  }, []);

  const [visibleCards, setVisibleCards] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [background, setBackground] = useState('bg-white');
  const [pattern, setPattern] = useState('');
  const [title, setTitle] = useState('VICTOR');
  const [subtitle, setSubtitle] = useState('Diseñador & Desarrollador');
  const [currentFontIndex, setCurrentFontIndex] = useState(0);
  const [currentSubtitleFontIndex, setCurrentSubtitleFontIndex] = useState(0);
  const [titleColor, setTitleColor] = useState('from-blue-600 to-purple-600');
  const [subtitleColor, setSubtitleColor] = useState('from-gray-600 to-gray-600');
  const [cards, setCards] = useState<CardData[]>([]);
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Memoize context value
  const contextValue = useMemo(() => ({
    cards,
    currentlayout,
    handleTextChange: (cardId: string, newText: string) => {
      setCards(prev => prev.map(card => 
        card.id === cardId 
          ? { ...card, text: newText }
          : card
      ));
    },
    handleVideoChange: (cardId: string, newVideoId: string) => {
      setCards(prev => prev.map(card => 
        card.id === cardId 
          ? { ...card, videoId: newVideoId }
          : card
      ));
    },
    handleImageChange: (cardId: string, newImageUrl: string) => {
      setCards(prev => prev.map(card => 
        card.id === cardId 
          ? { ...card, imageUrl: newImageUrl }
          : card
      ));
    }
  }), [cards, currentlayout]);

  const handleFontChange = useCallback((index: number, isSubtitle = false) => {
    if (isSubtitle) {
      setCurrentSubtitleFontIndex(index);
    } else {
      setCurrentFontIndex(index);
    }
  }, []);

  const handleDeleteCard = useCallback((keyToDelete: string) => {
    if (!isDragging) {
      setVisibleCards(prev => prev.filter(key => key !== keyToDelete));
      setCards(prev => prev.filter(card => card.id !== keyToDelete));
    }
  }, [isDragging]);

  const handleAddCard = useCallback((
    platform: CardData['platform'],
    size: { w: number; h: number },
    customData?: Partial<Omit<CardData, 'id' | 'platform' | 'w' | 'h'>>
  ) => {
    const newId = Math.random().toString(36).substr(2, 9);
    setCards(prev => [...prev, { 
      id: newId, 
      platform, 
      w: size.w, 
      h: size.h, 
      ...customData 
    }]);
    setVisibleCards(prev => [...prev, newId]);
    
    setCurrentLayout(prev => {
      // Encontrar la posición Y más alta actual
      const maxY = Math.max(
        ...prev.lg.map(item => item.y + item.h),
        0
      );
      
      return {
        ...prev,
        lg: [
          ...prev.lg,
          {
            i: newId,
            x: 0,
            y: maxY,
            w: size.w,
            h: size.h,
            isResizable: false as const,
            static: false as const
          },
        ],
        xs: [
          ...prev.xs,
          {
            i: newId,
            x: 0,
            y: maxY,
            w: Math.min(size.w, 2),
            h: size.h,
            static: false as const,
            isResizable: false as const,
          },
        ],
      };
    });
  }, []);

  const handleBackgroundChange = useCallback((type: string, value: string) => {
    if (type === 'background') {
      setBackground(value);
      const colorMatch = value.match(/bg-\[(#[A-Fa-f0-9]+)\]/);
      document.documentElement.style.setProperty('--current-bg', 
        colorMatch ? colorMatch[1] : value === 'bg-white' ? 'white' : null);
    } else if (type === 'pattern') {
      setPattern(value);
    }
  }, []);

  const handleTitleChange = useCallback((newTitle: string, color?: string, isSubtitle = false) => {
    if (color) {
      isSubtitle ? setSubtitleColor(color) : setTitleColor(color);
      return;
    }
    isSubtitle ? setSubtitle(newTitle) : setTitle(newTitle);
  }, []);

  const handleResize = useCallback((cardId: string, newSize: { w: number; h: number }) => {
    setCurrentLayout(prev => ({
      ...prev,
      lg: prev.lg.map(item => 
        item.i === cardId ? { ...item, w: newSize.w, h: newSize.h } : item
      ),
      xs: prev.xs.map(item =>
        item.i === cardId ? { ...item, w: Math.min(newSize.w, 2), h: newSize.h } : item
      )
    }));
  }, []);

  const ResponsiveReactGridLayout = useMemo(() => WidthProvider(Responsive), []);

  const filteredLayouts = useMemo(() => ({
    ...currentlayout,
    lg: currentlayout.lg.filter(item => visibleCards.includes(item.i)),
    xs: currentlayout.xs.filter(item => visibleCards.includes(item.i))
  }), [currentlayout, visibleCards]);

  const handleAddSticker = useCallback((emoji: string, position: { x: number; y: number }) => {
    setStickers(prev => [...prev, {
      id: Math.random().toString(36).substring(7),
      emoji,
      position
    }]);
  }, []);

  const handleDeleteSticker = useCallback((stickerId: string) => {
    setStickers(prev => prev.filter(s => s.id !== stickerId));
  }, []);

  const handleSave = useCallback(() => {
    const settings = {
      title: {
        text: title,
        font: fonts[currentFontIndex].name,
        color: titleColor
      },
      subtitle: {
        text: subtitle,
        font: fonts[currentSubtitleFontIndex].name,
        color: subtitleColor
      },
      background: {
        color: background,
        pattern: pattern
      },
      grid: {
        layout: currentlayout,
        cards: cards
      },
      stickers: stickers
    };

    // Crear y descargar el archivo JSON
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mi-grid-settings.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [title, currentFontIndex, titleColor, subtitle, currentSubtitleFontIndex, subtitleColor, background, pattern, currentlayout, cards, stickers]);

  const handleViewModeChange = useCallback((mode: 'web' | 'desktop') => {
    setViewMode(mode);
    if (mode === 'web') {
      document.body.style.maxWidth = '430px';
      document.body.style.margin = '0 auto';
      document.body.style.transition = 'max-width 0.3s ease-in-out';
      // Forzar el modo mobile cuando estamos en preview
      setIsMobile(true);
      
      // Sincronizar las posiciones de xs basadas en lg
      setCurrentLayout(prev => ({
        ...prev,
        xs: prev.lg.map(item => ({
          ...item,
          static: false as const,
          isResizable: false as const,
          w: Math.min(item.w, 2),
          h: item.h,
          y: item.y // Mantener la misma posición Y
        }))
      }));
    } else {
      document.body.style.maxWidth = 'none';
      document.body.style.margin = '0';
      // Restaurar el modo mobile basado en el ancho de la ventana
      setIsMobile(window.innerWidth < 768);
      
      // Sincronizar las posiciones de lg basadas en xs
      setCurrentLayout(prev => ({
        ...prev,
        lg: prev.xs.map(item => ({
          ...item,
          static: false as const,
          isResizable: false as const,
          w: item.w * 2 <= 4 ? item.w * 2 : item.w, // Ajustar el ancho proporcionalmente
          h: item.h,
          y: item.y // Mantener la misma posición Y
        }))
      }));
    }
  }, []);

  // Modificar el onLayoutChange para mantener sincronizadas las posiciones
  const onLayoutChange = useCallback((_, allLayouts) => {
    if (!allLayouts) return;
    
    const newLayout = {
      lg: allLayouts.lg?.map(item => ({
        ...item,
        isResizable: false as const,
        static: false as const,
        w: item.w,
        h: item.h
      })) || currentlayout.lg,
      xs: allLayouts.xs?.map(item => ({
        ...item,
        static: false as const,
        isResizable: false as const,
        w: Math.min(item.w, 2),
        h: item.h
      })) || currentlayout.xs
    };

    // Sincronizar las posiciones entre lg y xs
    if (isMobile) {
      newLayout.lg = newLayout.lg.map(item => {
        const xsItem = newLayout.xs.find(x => x.i === item.i);
        return xsItem ? { ...item, y: xsItem.y } : item;
      });
    } else {
      newLayout.xs = newLayout.xs.map(item => {
        const lgItem = newLayout.lg.find(x => x.i === item.i);
        return lgItem ? { ...item, y: lgItem.y } : item;
      });
    }

    setCurrentLayout(newLayout);
  }, [isMobile, currentlayout]);

  useEffect(() => {
    const checkMobile = () => {
      // Solo actualizar isMobile si no estamos en modo preview
      if (viewMode !== 'web') {
        setIsMobile(window.innerWidth < 768);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Activar la animación del Sidebar después de que la página cargue
    const timer = setTimeout(() => {
      setIsSidebarVisible(true);
    }, 100);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, [viewMode]);

  return (
    <LayoutContext.Provider value={contextValue}>
      <div className={`min-h-screen transition-colors duration-500 ${background} ${pattern}`}>
        <div className={`relative mx-auto ${viewMode === 'web' ? 'max-w-[430px] border-x border-gray-200' : ''} min-h-screen py-12 md:py-16`}>
          {/* Stickers Layer */}
          <div className={`fixed inset-0 pointer-events-none ${isMobile ? 'hidden' : ''}`}>
            <div className="absolute inset-0 pointer-events-auto">
              {stickers.map(sticker => (
                <Sticker
                  key={sticker.id}
                  emoji={sticker.emoji}
                  initialPosition={sticker.position}
                  onDelete={() => handleDeleteSticker(sticker.id)}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-1 sm:gap-2 mb-4 sm:mb-8 w-full">
            {/* Título */}
            <div className="relative flex-1 max-w-3xl w-full px-4">
              <div className="h-[60px] sm:h-[80px] md:h-[100px] flex items-center">
                <div className="relative w-full group">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className={`peer ${isMobile ? 'text-4xl' : 'text-4xl sm:text-6xl md:text-8xl'} font-bold text-center bg-transparent border-none outline-none focus:ring-0 bg-gradient-to-r ${titleColor} bg-clip-text text-transparent ${fonts[currentFontIndex].class}
                      caret-blue-500 selection:bg-blue-500/20 uppercase w-full px-8 sm:px-12 md:px-16 leading-none
                      opacity-0 animate-[titleAppear_800ms_cubic-bezier(0.22,1,0.36,1)_forwards]`}
                    placeholder="kasbu"
                  />
                  <ColorMenu 
                    value={titleColor}
                    onChange={(color) => handleTitleChange(title, color)}
                  />
                </div>
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <button
                    onClick={() => handleFontChange((currentFontIndex - 1 + fonts.length) % fonts.length)}
                    className="text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button
                    onClick={() => handleFontChange((currentFontIndex + 1) % fonts.length)}
                    className="text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Subtítulo */}
            <div className="relative flex-1 max-w-2xl w-full px-4">
              <div className="min-h-[30px] sm:min-h-[40px] md:min-h-[60px] flex items-center py-1 sm:py-2">
                <div className="relative w-full group">
                  <textarea
                    value={subtitle}
                    onChange={(e) => handleTitleChange(e.target.value, undefined, true)}
                    className={`peer ${isMobile ? 'text-lg' : 'text-xl sm:text-2xl md:text-3xl'} font-medium text-center bg-transparent border-none outline-none focus:ring-0 bg-gradient-to-r ${subtitleColor} bg-clip-text text-transparent ${fonts[currentSubtitleFontIndex].class}
                      caret-blue-500 selection:bg-blue-500/20 w-full px-6 sm:px-8 md:px-12 leading-tight resize-none overflow-hidden max-h-[160px]
                      opacity-0 animate-[subtitleAppear_800ms_cubic-bezier(0.22,1,0.36,1)_forwards_200ms]`}
                    placeholder="Subtítulo"
                    rows={1}
                    style={{ height: 'auto' }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = Math.min(target.scrollHeight, 160) + 'px';
                    }}
                  />
                  <ColorMenu 
                    value={subtitleColor}
                    onChange={(color) => handleTitleChange(subtitle, color, true)}
                  />
                </div>
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <button
                    onClick={() => handleFontChange((currentSubtitleFontIndex - 1 + fonts.length) % fonts.length, true)}
                    className="text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button
                    onClick={() => handleFontChange((currentSubtitleFontIndex + 1) % fonts.length, true)}
                    className="text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ResponsiveReactGridLayout
            className="w-full max-w-[800px] px-0 mx-auto"
            breakpoints={{ lg: 800, md: 600, sm: 400, xs: 0 }}
            cols={{ lg: 4, md: 4, sm: 2, xs: 2 }}
            rowHeight={180}
            margin={[12, 12]}
            containerPadding={[8, 8]}
            layouts={filteredLayouts}
            onDragStart={() => setIsDragging(true)}
            onDragStop={() => {
              setTimeout(() => {
                setIsDragging(false);
                setSelectedCard(null);
              }, 100);
            }}
            useCSSTransforms={false}
            draggableCancel=".no-drag"
            isDraggable={selectedCard ? true : window.innerWidth >= 600}
            draggableHandle={selectedCard ? undefined : ".drag-handle"}
            preventCollision={false}
            compactType={null}
            verticalCompact={false}
            isDroppable={true}
            onDrop={(layout, item, e) => {
              e.preventDefault();
              return item;
            }}
            allowOverlap={false}
            onLayoutChange={onLayoutChange}
          >
            {visibleCards.map((key) => (
              <div
                key={key}
                onClick={() => {
                  if (window.innerWidth < 600) {
                    setSelectedCard(prev => prev === key ? null : key);
                  }
                }}
                className={`bg-[#f5f5f7] flex justify-center items-center rounded-[1.5rem] text-2xl text-[#1d1d1f] visible 
                  ${window.innerWidth < 600 ? (selectedCard === key ? 'cursor-grab ring-4 ring-blue-500 ring-offset-4 ring-offset-white' : 'cursor-pointer') : 'cursor-grab'} 
                  group relative overflow-hidden ${window.innerWidth >= 600 ? 'drag-handle' : ''}
                  shadow-[0_12px_24px_-6px_rgba(0,0,0,0.12),0_6px_12px_-2px_rgba(0,0,0,0.04),0_0_0_1px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.3)]
                  hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18),0_12px_24px_-6px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.4)]
                  active:scale-[0.97]
                  active:shadow-[0_8px_16px_-4px_rgba(0,0,0,0.1),0_3px_6px_-2px_rgba(0,0,0,0.05),0_0_0_1px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.2)]
                  backdrop-blur-[3px]
                  after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/10 after:to-transparent after:opacity-0
                  hover:after:opacity-100
                  before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/[0.01] before:to-black/[0.06]
                  ${isDragging ? '' : '[transition:box-shadow_300ms_ease-out,transform_300ms_ease-out]'}
                  ${isInitialLoad ? 'initial-load' : ''}
                  animate-[cardAppear_500ms_cubic-bezier(0.22,1,0.36,1)_forwards]
                  opacity-0 scale-95`}
                style={{
                  animationDelay: isInitialLoad ? `${Math.floor((currentlayout[isMobile ? 'xs' : 'lg'].find(item => item.i === key)?.y || 0) * 200 + (currentlayout[isMobile ? 'xs' : 'lg'].find(item => item.i === key)?.x || 0) * 100)}ms` : undefined
                }}
              >
                <Block 
                  keyProp={key} 
                  onDelete={() => handleDeleteCard(key)}
                  platform={cards.find(card => card.id === key)?.platform}
                />
                <ResizeMenu 
                  onResize={(size) => handleResize(key, size)} 
                  onDelete={() => handleDeleteCard(key)} 
                  isDragging={isDragging}
                  currentSize={currentlayout.lg.find(item => item.i === key)}
                />
              </div>
            ))}
          </ResponsiveReactGridLayout>
          {!isMobile && (
            <a
              href="https://kasbu.com"
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-4 right-6 text-sm text-gray-400 hover:text-gray-600 transition-all duration-200
                px-4 py-2 bg-white
                shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.04)]
                border border-gray-100 rounded-lg z-50"
            >
              Made with Kasbu
            </a>
          )}
          <Sidebar 
            onAddCard={handleAddCard} 
            onChangeBackground={handleBackgroundChange} 
            onTitleChange={handleTitleChange}
            onFontChange={handleFontChange}
            onAddSticker={handleAddSticker}
            currentTitle={title}
            currentFontIndex={currentFontIndex}
            onSave={handleSave}
            onViewModeChange={handleViewModeChange}
            className={`transform transition-transform duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${isSidebarVisible ? 'translate-y-0' : 'translate-y-[300%]'}`}
          />
        </div>
      </div>
    </LayoutContext.Provider>
  );
}

export default memo(Layout);
