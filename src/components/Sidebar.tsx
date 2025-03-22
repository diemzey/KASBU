import { useState, useRef, useEffect } from 'react';
import { fonts } from '../utils/constants';
import MarketModal from './MarketModal';
import { Platform } from '../types';
import { parseUrl, enrichMetadata } from '../utils/url-parser';

interface SidebarProps {
  onAddCard: (
    platform: Platform,
    size: { w: number; h: number },
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
      videoUrl?: string;
    }
  ) => void;
  onChangeBackground: (type: string, value: string) => void;
  onAddSticker?: (emoji: string, position: { x: number; y: number }) => void;
  onTitleChange: (title: string, color?: string) => void;
  onFontChange: (index: number) => void;
  currentTitle: string;
  currentFontIndex: number;
  className?: string;
  onViewModeChange?: (mode: 'web' | 'desktop') => void;
}

type MenuType = 'none' | 'background' | 'stickers';

interface Background {
  id: string;
  name: string;
  value: string;
}

interface Pattern {
  id: string;
  name: string;
  value: string;
}

const backgrounds: Background[] = [
  { id: 'white', name: 'Blanco', value: 'bg-white' },
  { id: 'cream', name: 'Crema', value: 'bg-[#FFF5E4]' },
  { id: 'lavender', name: 'Lavanda', value: 'bg-[#E8E3F3]' },
  { id: 'white2', name: 'Blanco Hueso', value: 'bg-[#FAFAFA]' },
  { id: 'peach', name: 'Durazno', value: 'bg-[#FFE8E3]' },
  { id: 'sky', name: 'Cielo', value: 'bg-[#E3F1FF]' },
  { id: 'rose', name: 'Rosa', value: 'bg-[#FFE3F1]' },
  { id: 'lemon', name: 'Limón', value: 'bg-[#FAFFD1]' },
  { id: 'lilac', name: 'Lila', value: 'bg-[#F1E3FF]' },
  { id: 'navy', name: 'Azul Marino', value: 'bg-[#1B2A4A]' },
  { id: 'wine', name: 'Vino', value: 'bg-[#722F37]' },
  { id: 'forest', name: 'Verde Bosque', value: 'bg-[#2D4A3E]' },
  { id: 'plum', name: 'Ciruela', value: 'bg-[#4A2D4A]' },
  { id: 'coffee', name: 'Café', value: 'bg-[#4A3C2D]' },
  { id: 'slate', name: 'Pizarra', value: 'bg-[#2D3A4A]' },
  { id: 'burgundy', name: 'Borgoña', value: 'bg-[#9A3B3B]' },
  { id: 'midnight', name: 'Medianoche', value: 'bg-[#1A1B2F]' },
];

const patterns: Pattern[] = [
  { id: 'none', name: 'Ninguno', value: '' },
  { id: 'dots', name: 'Puntos', value: 'bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[length:24px_24px]' },
  { id: 'grid', name: 'Cuadrícula', value: 'bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[length:24px_24px]' },
  { id: 'waves', name: 'Ondas', value: 'bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_1px,transparent_1px)_repeat_scroll_0_0,radial-gradient(circle_at_center,rgba(0,0,0,0.05)_1px,transparent_1px)_repeat_scroll_12px_12px] bg-[length:24px_24px]' },
];

const platforms = [
  { id: 'facebook', name: 'Facebook' },
  { id: 'instagram', name: 'Instagram' },
  { id: 'tiktok', name: 'TikTok' },
  { id: 'youtube', name: 'YouTube' },
  { id: 'twitter', name: 'Twitter' },
  { id: 'linkedin', name: 'LinkedIn' },
  { id: 'github', name: 'GitHub' },
  { id: 'twitch', name: 'Twitch' },
  { id: 'custom', name: 'Personalizada' },
  { id: 'code', name: 'Terminal' },
  { id: 'qr', name: 'Código QR' },
  { id: 'map', name: 'Mapa' },
  { id: 'tv', name: 'TV Retro' },
  { id: 'url', name: 'URL' },
  { id: 'image', name: 'Imagen' },
  { id: 'video', name: 'Video' },
] as const;

const sizes = [
  { id: 'small', name: 'Pequeño', dimensions: { w: 1, h: 1 } },
  { id: 'wide', name: 'Largo', dimensions: { w: 2, h: 1 } },
  { id: 'tall', name: 'Alto', dimensions: { w: 1, h: 2 } },
  { id: 'large', name: 'Grande', dimensions: { w: 2, h: 2 } },
] as const;

const gradients = [
  { id: 'blue', name: 'Azul' },
  { id: 'purple', name: 'Morado' },
  { id: 'green', name: 'Verde' },
  { id: 'orange', name: 'Naranja' },
  { id: 'pink', name: 'Rosa' },
] as const;

const titleColors = [
  { id: 'black', name: 'Negro', type: 'solid', class: 'text-gray-900', buttonClass: 'bg-gray-900' },
  { id: 'white', name: 'Blanco', type: 'solid', class: 'text-white', buttonClass: 'bg-white border border-gray-200' },
  { id: 'blue', name: 'Azul', type: 'solid', class: 'text-blue-500', buttonClass: 'bg-blue-500' },
  { id: 'purple', name: 'Morado', type: 'solid', class: 'text-purple-500', buttonClass: 'bg-purple-500' },
  { id: 'green', name: 'Verde', type: 'solid', class: 'text-green-500', buttonClass: 'bg-green-500' },
  { id: 'orange', name: 'Naranja', type: 'solid', class: 'text-orange-500', buttonClass: 'bg-orange-500' },
  { id: 'pink', name: 'Rosa', type: 'solid', class: 'text-pink-500', buttonClass: 'bg-pink-500' },
  { id: 'blue-purple', name: 'Azul a Morado', type: 'gradient', class: 'from-blue-500 to-purple-500', buttonClass: 'bg-gradient-to-r from-blue-500 to-purple-500' },
  { id: 'green-blue', name: 'Verde a Azul', type: 'gradient', class: 'from-green-500 to-blue-500', buttonClass: 'bg-gradient-to-r from-green-500 to-blue-500' },
  { id: 'orange-pink', name: 'Naranja a Rosa', type: 'gradient', class: 'from-orange-500 to-pink-500', buttonClass: 'bg-gradient-to-r from-orange-500 to-pink-500' },
] as const;

const emojiCategories = [
  {
    name: "Caras",
    emojis: ["😀", "😂", "🥹", "😊", "😎", "🥳", "😍", "🤩", "😴", "🤔", "🫡", "🤗", "🫶"]
  },
  {
    name: "Gestos",
    emojis: ["👋", "✌️", "🤘", "👍", "👎", "👏", "🙌", "🫂", "💪", "🦾", "🧠", "👀", "💯"]
  },
  {
    name: "Objetos",
    emojis: ["💫", "⭐️", "🌟", "✨", "💥", "🔥", "❤️", "🎯", "💡", "💭", "🗯️", "💬", "🎨"]
  },
  {
    name: "Símbolos",
    emojis: ["✅", "❌", "⭕️", "❗️", "❓", "💤", "🔄", "🔝", "⚡️", "🎵", "🎶", "💲", "🔱"]
  }
];

const Sidebar = ({ onAddCard, onChangeBackground, onAddSticker, className, onViewModeChange }: SidebarProps) => {
  const [activeMenu, setActiveMenu] = useState<MenuType>('none');
  const [viewMode, setViewMode] = useState<'web' | 'desktop'>('desktop');
  const menuRef = useRef<HTMLDivElement>(null);
  const [selectedBackground, setSelectedBackground] = useState('white');
  const [quickUrl, setQuickUrl] = useState('');
  const [isMarketOpen, setIsMarketOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleBackgroundChange = (id: string) => {
    setSelectedBackground(id);
    const bg = backgrounds.find(b => b.id === id);
    if (bg) {
      onChangeBackground('background', bg.value);
      setActiveMenu('none');
    }
  };

  const toggleMenu = (menu: MenuType) => {
    setActiveMenu(current => current === menu ? 'none' : menu);
  };

  const handleQuickUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (quickUrl) {
      try {
        // Procesar la URL y obtener metadatos
        const metadata = await parseUrl(quickUrl);
        // Enriquecer con metadatos adicionales (título, descripción, etc.)
        const enrichedMetadata = await enrichMetadata(metadata);

        // Crear la tarjeta con los metadatos obtenidos
        onAddCard('url', { w: 1, h: 1 }, {
          title: enrichedMetadata.data.title || enrichedMetadata.title,
          text: enrichedMetadata.description,
          url: quickUrl,
          ...enrichedMetadata.data
        });

        setQuickUrl('');
      } catch (error) {
        console.error('Error procesando URL:', error);
        // Si hay un error, crear una tarjeta genérica
        onAddCard('url', { w: 1, h: 1 }, { 
          url: quickUrl, 
          title: 'Enlace rápido' 
        });
      }
    }
  };

  const handleStickerClick = (emoji: string) => {
    if (onAddSticker) {
      // Posición inicial aleatoria en los laterales
      const side = Math.random() > 0.5 ? 'left' : 'right';
      const x = side === 'left' ? Math.random() * 100 : window.innerWidth - (Math.random() * 100);
      const y = Math.random() * (window.innerHeight - 200) + 100;
      
      onAddSticker(emoji, { x, y });
    }
    setActiveMenu('none');
  };

  const handleViewModeChange = (mode: 'web' | 'desktop') => {
    setViewMode(mode);
    onViewModeChange?.(mode);
  };

  return (
    <>
      <MarketModal 
        isOpen={isMarketOpen}
        onClose={() => setIsMarketOpen(false)}
        onAddCard={onAddCard}
      />
      
      <div className={`fixed z-50 transition-all duration-500 ${isMarketOpen ? 'translate-y-[120px]' : 'translate-y-0'}
        ${isMobile 
          ? 'bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 backdrop-blur-[20px]' 
          : 'bottom-6 left-1/2 -translate-x-1/2'} ${className || ''}`}
      >
        {/* Menús flotantes */}
        <div className="relative">
          <div 
            ref={menuRef}
            className={`absolute ${
              isMobile 
                ? 'left-0 right-0 bottom-full mb-4' 
                : 'left-1/2 -translate-x-1/2 bottom-16'
            } transition-all duration-200`}
          >
            {activeMenu === 'background' && (
              <div className={`bg-white/70 backdrop-blur-md rounded-xl shadow-lg ${isMobile ? 'mx-4' : 'w-[300px]'} 
                animate-in fade-in slide-in-from-bottom-4 duration-200`}
              >
                <div className="p-4 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
                  <h3 className="text-lg font-semibold text-gray-800">Fondo</h3>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600">Color</label>
                    <div className="grid grid-cols-3 gap-2">
                      {backgrounds.map(bg => (
                        <button
                          key={bg.id}
                          onClick={() => handleBackgroundChange(bg.id)}
                          className={`h-12 rounded-xl transition-all ${bg.value} border border-black/5
                            ${selectedBackground === bg.id ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:ring-2 hover:ring-blue-500/50 hover:ring-offset-2'}`}
                          title={bg.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeMenu === 'stickers' && !isMobile && (
              <div className={`bg-white/70 backdrop-blur-md rounded-xl shadow-lg ${isMobile ? 'mx-4' : 'w-[300px]'} 
                animate-in fade-in slide-in-from-bottom-4 duration-200`}
              >
                <div className="p-4 flex flex-col gap-4 max-h-[80vh] overflow-hidden">
                  <h3 className="text-lg font-semibold text-gray-800">Stickers</h3>
                  <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                    {emojiCategories.map((category, index) => (
                      <button
                        key={category.name}
                        onClick={() => setSelectedCategory(index)}
                        className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-sm transition-all
                          ${selectedCategory === index 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-6 gap-2 overflow-y-auto max-h-[200px] p-1">
                    {emojiCategories[selectedCategory].emojis.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => handleStickerClick(emoji)}
                        className="h-10 rounded-lg flex items-center justify-center text-2xl hover:bg-gray-100 transition-all"
                        title="Agregar sticker"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Barra principal */}
          <div className={`${isMobile ? '' : 'bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20'} flex items-center gap-2 p-2`}>
            {/* Botones de vista */}
            {!isMobile && (
              <div className="flex items-center gap-1 mr-2">
                <button
                  onClick={() => handleViewModeChange('web')}
                  className={`h-[33px] w-[50px] rounded-[6px] flex items-center justify-center transition-all relative group overflow-hidden
                    ${viewMode === 'web' 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-inner' 
                      : 'text-gray-700 hover:bg-gray-50 border border-gray-200/80 hover:border-blue-200'}`}
                  title="Vista Móvil"
                >
                  <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="5" y="2" width="14" height="20" rx="2" strokeWidth="2" />
                    <line x1="12" y1="18" x2="12" y2="18" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
                <button
                  onClick={() => handleViewModeChange('desktop')}
                  className={`h-[33px] w-[50px] rounded-[6px] flex items-center justify-center transition-all relative group overflow-hidden
                    ${viewMode === 'desktop' 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-inner' 
                      : 'text-gray-700 hover:bg-gray-50 border border-gray-200/80 hover:border-blue-200'}`}
                  title="Vista Desktop"
                >
                  <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="2" y="4" width="20" height="13" rx="2" strokeWidth="2" />
                    <path d="M8 20h8" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 17v3" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            )}

            {!isMobile && <div className="w-px h-8 bg-gray-200/50" />}

            {/* Input URL */}
            <div className={`${isMobile ? 'flex-1' : ''}`}>
              <form onSubmit={handleQuickUrlSubmit} className="flex items-center">
                <input
                  type="url"
                  value={quickUrl}
                  onChange={(e) => setQuickUrl(e.target.value)}
                  placeholder="Pega una URL aquí"
                  className={`${isMobile ? 'w-full' : 'w-48'} px-3 py-2 text-sm bg-white/70 backdrop-blur-md border border-white/20 rounded-lg 
                    focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder-gray-400`}
                />
              </form>
            </div>

            {!isMobile && <div className="w-px h-8 bg-gray-200" />}

            {/* Botones de acción */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMarketOpen(true)}
                className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-all"
                title="Abrir Market"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                </svg>
              </button>

              <button
                onClick={() => toggleMenu('stickers')}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all
                  ${activeMenu === 'stickers' 
                    ? 'bg-blue-500 text-white shadow-inner' 
                    : 'text-gray-700 hover:bg-gray-100'}
                  ${isMobile ? 'hidden' : ''}`}
                title="Agregar sticker"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>

              <button
                onClick={() => toggleMenu('background')}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all
                  ${activeMenu === 'background' 
                    ? 'bg-blue-500 text-white shadow-inner' 
                    : 'text-gray-700 hover:bg-gray-100'}`}
                title="Cambiar fondo"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;