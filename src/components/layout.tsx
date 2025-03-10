import { useMemo, useState, useCallback, memo } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { HomeLayouts, keys } from "../utils/layout.helper";
import { fonts, socialPlatforms } from "../utils/constants";
import { TikTokCard, CustomCard, CodeCard, QRCard, MapCard, TVCard, URLCard, InstagramCard, FacebookCard, YouTubeCard, ImageCard } from "./cards";
import Sidebar from "./Sidebar";
import ColorMenu from "./ColorMenu";
import Sticker from "./Sticker";
import "../styles/grid.css";

type CardData = {
  id: string;
  platform: 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'custom' | 'code' | 'qr' | 'map' | 'tv' | 'url' | 'image';
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
};

interface ResizeMenuProps {
  onResize: (size: { w: number; h: number }) => void;
  onDelete?: () => void;
  isDragging?: boolean;
}

const ResizeMenuComponent = ({ onResize, onDelete, isDragging }: ResizeMenuProps) => {
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
        translate-y-full ${isDragging ? 'pointer-events-none opacity-0' : 'group-hover:translate-y-0'} transition-all duration-200 cursor-default z-50`}
      onMouseDown={handleMouseDown}
      onClick={handleMouseDown}
    >
      {[
        { 
          action: "1x1",
          title: "1x1", 
          icon: <rect x="7" y="7" width="10" height="10" strokeWidth={2} />,
          onClick: (e: React.MouseEvent) => handleClick(e, { w: 1, h: 1 })
        },
        { 
          action: "2x1",
          title: "2x1", 
          icon: <rect x="3" y="8" width="18" height="8" strokeWidth={2} />,
          onClick: (e: React.MouseEvent) => handleClick(e, { w: 2, h: 1 })
        },
        { 
          action: "1x2",
          title: "1x2", 
          icon: <rect x="8" y="3" width="8" height="18" strokeWidth={2} />,
          onClick: (e: React.MouseEvent) => handleClick(e, { w: 1, h: 2 })
        },
        { 
          action: "2x2",
          title: "2x2", 
          icon: <rect x="4" y="4" width="16" height="16" strokeWidth={2} />,
          onClick: (e: React.MouseEvent) => handleClick(e, { w: 2, h: 2 })
        },
        { 
          action: "delete",
          title: "Eliminar", 
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />,
          onClick: handleDelete
        }
      ].map(({ action, title, icon, onClick }) => (
        <button
          key={action}
          onClick={onClick}
          onMouseDown={handleMouseDown}
          className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer
            active:scale-95 transition-transform"
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

function Layout() {
  const [currentlayout, setCurrentLayout] = useState(HomeLayouts);
  const [visibleCards, setVisibleCards] = useState<string[]>(keys);
  const [isDragging, setIsDragging] = useState(false);
  const [background, setBackground] = useState('bg-white');
  const [pattern, setPattern] = useState('');
  const [title, setTitle] = useState('VICTOR');
  const [subtitle, setSubtitle] = useState('Diseñador & Desarrollador');
  const [currentFontIndex, setCurrentFontIndex] = useState(0);
  const [currentSubtitleFontIndex, setCurrentSubtitleFontIndex] = useState(0);
  const [titleColor, setTitleColor] = useState('from-blue-600 to-purple-600');
  const [subtitleColor, setSubtitleColor] = useState('from-gray-600 to-gray-600');
  const [cards, setCards] = useState<CardData[]>([
    { id: 'a', platform: 'facebook', w: 1, h: 1 },
    { id: 'b', platform: 'instagram', w: 1, h: 1 },
    { id: 'c', platform: 'tiktok', w: 1, h: 1 },
    { id: 'd', platform: 'youtube', w: 2, h: 1 },
  ]);
  const [stickers, setStickers] = useState<Sticker[]>([]);

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
    setCards(prev => [...prev, { id: newId, platform, w: size.w, h: size.h, ...customData }]);
    setVisibleCards(prev => [...prev, newId]);
    
    setCurrentLayout(prev => ({
      ...prev,
      lg: [
        ...prev.lg,
        {
          i: newId,
          x: (prev.lg.length * 2) % 3,
          y: Infinity,
          w: size.w,
          h: size.h,
          isResizable: false,
        },
      ],
      xs: [
        ...prev.xs,
        {
          i: newId,
          x: 0,
          y: Infinity,
          w: 1,
          h: size.h,
          static: true,
        },
      ],
    }));
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

  const handleTextChange = useCallback((cardId: string, newText: string) => {
    setCards(prev => prev.map(card => 
      card.id === cardId 
        ? { ...card, text: newText }
        : card
    ));
  }, []);

  const handleVideoChange = useCallback((cardId: string, newVideoId: string) => {
    setCards(prev => prev.map(card => 
      card.id === cardId 
        ? { ...card, videoId: newVideoId }
        : card
    ));
  }, []);

  const handleImageChange = useCallback((cardId: string, newImageUrl: string) => {
    setCards(prev => prev.map(card => 
      card.id === cardId 
        ? { ...card, imageUrl: newImageUrl }
        : card
    ));
  }, []);

  const ResponsiveReactGridLayout = useMemo(() => WidthProvider(Responsive), []);

  const filteredLayouts = useMemo(() => ({
    ...currentlayout,
    lg: currentlayout.lg.filter(item => visibleCards.includes(item.i)),
    xs: currentlayout.xs.filter(item => visibleCards.includes(item.i))
  }), [currentlayout, visibleCards]);

  interface BlockProps {
    keyProp: string;
    onDelete?: () => void;
    platform?: CardData['platform'];
  }

  const BlockComponent = ({ keyProp, onDelete, platform }: BlockProps) => {
    const card = cards.find(c => c.id === keyProp);
    const layout = currentlayout?.lg?.find(item => item.i === keyProp) || currentlayout?.xs?.find(item => item.i === keyProp);
    const size = layout ? { w: layout.w, h: layout.h } : { w: 1, h: 1 };
    
    if (platform || keyProp in socialPlatforms) {
      const platformToUse = platform || socialPlatforms[keyProp as keyof typeof socialPlatforms].platform;
      
      const CardComponent = {
        tiktok: TikTokCard,
        instagram: InstagramCard,
        facebook: FacebookCard,
        youtube: YouTubeCard,
        custom: CustomCard,
        code: CodeCard,
        qr: QRCard,
        map: MapCard,
        tv: TVCard,
        url: URLCard,
        image: ImageCard
      }[platformToUse];

      if (CardComponent) {
        const text = platformToUse === 'tiktok' 
          ? 'Sígueme en TikTok' 
          : platformToUse === 'instagram'
          ? 'Sígueme en Instagram'
          : platformToUse === 'facebook'
          ? 'Sígueme en Facebook'
          : platformToUse === 'youtube'
          ? 'Sígueme en YouTube'
          : platformToUse === 'image'
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
  };

  const Block = memo(BlockComponent);

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

  return (
    <div className="min-h-screen">
      {/* Stickers Layer */}
      <div className="fixed inset-0 pointer-events-none">
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

      <div className={`w-screen min-h-screen flex flex-col items-center pt-[10vh] pb-[100px] transition-colors duration-300 ${background} ${pattern}`}>
        <div className="flex flex-col items-center gap-4 mb-16">
          {/* Título */}
          <div className="relative flex-1 max-w-3xl">
            <div className="h-[120px] flex items-center">
              <div className="relative w-full group">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className={`peer text-8xl font-bold text-center bg-transparent border-none outline-none focus:ring-0 bg-gradient-to-r ${titleColor} bg-clip-text text-transparent ${fonts[currentFontIndex].class}
                    caret-blue-500 selection:bg-blue-500/20 uppercase w-full px-16 leading-none`}
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
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button
                  onClick={() => handleFontChange((currentFontIndex + 1) % fonts.length)}
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Subtítulo */}
          <div className="relative flex-1 max-w-2xl">
            <div className="h-[60px] flex items-center">
              <div className="relative w-full group">
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => handleTitleChange(e.target.value, undefined, true)}
                  className={`peer text-3xl font-medium text-center bg-transparent border-none outline-none focus:ring-0 bg-gradient-to-r ${subtitleColor} bg-clip-text text-transparent ${fonts[currentSubtitleFontIndex].class}
                    caret-blue-500 selection:bg-blue-500/20 w-full px-12 leading-none`}
                  placeholder="Subtítulo"
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
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button
                  onClick={() => handleFontChange((currentSubtitleFontIndex + 1) % fonts.length, true)}
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <ResponsiveReactGridLayout
          className="w-full max-w-[1000px] px-4"
          breakpoints={{ lg: 1000, md: 800, sm: 600, xs: 400 }}
          cols={{ lg: 4, md: 4, sm: 2, xs: 2 }}
          rowHeight={180}
          margin={[28, 28]}
          layouts={filteredLayouts}
          onDragStart={() => setIsDragging(true)}
          onDragStop={() => setTimeout(() => setIsDragging(false), 100)}
          useCSSTransforms={false}
          draggableCancel=".no-drag"
          draggableHandle=".drag-handle"
        >
          {visibleCards.map((key) => (
            <div
              key={key}
              className={`bg-[#f5f5f7] flex justify-center items-center rounded-2xl text-2xl text-[#1d1d1f] visible 
                cursor-grab group relative overflow-hidden drag-handle
                shadow-[0_12px_24px_-6px_rgba(0,0,0,0.12),0_6px_12px_-2px_rgba(0,0,0,0.04),0_0_0_1px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.3)]
                hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18),0_12px_24px_-6px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.4)]
                active:scale-[0.97]
                active:shadow-[0_8px_16px_-4px_rgba(0,0,0,0.1),0_3px_6px_-2px_rgba(0,0,0,0.05),0_0_0_1px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.2)]
                backdrop-blur-[3px]
                after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/10 after:to-transparent after:opacity-0
                hover:after:opacity-100
                before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/[0.01] before:to-black/[0.06]
                ${isDragging ? '' : '[transition:box-shadow_300ms_ease-out,transform_300ms_ease-out,opacity_300ms_ease-out]'}`}
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
              />
            </div>
          ))}
        </ResponsiveReactGridLayout>
        <Sidebar 
          onAddCard={handleAddCard} 
          onChangeBackground={handleBackgroundChange} 
          onTitleChange={handleTitleChange}
          onFontChange={handleFontChange}
          onAddSticker={handleAddSticker}
          currentTitle={title}
          currentFontIndex={currentFontIndex}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}

export default memo(Layout);
