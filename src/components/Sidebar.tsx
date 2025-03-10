import { useState, useRef, useEffect } from 'react';
import { fonts } from '../utils/constants';
import MarketModal from './MarketModal';

interface SidebarProps {
  onAddCard: (
    platform: 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'custom' | 'code' | 'qr' | 'map' | 'tv' | 'url',
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
    }
  ) => void;
  onChangeBackground: (type: string, value: string) => void;
  onAddSticker?: (emoji: string, position: { x: number; y: number }) => void;
  onTitleChange: (title: string, color?: string) => void;
  onFontChange: (index: number) => void;
  currentTitle: string;
  currentFontIndex: number;
  onSave?: () => void;
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
  { id: 'custom', name: 'Personalizada' },
  { id: 'code', name: 'Terminal' },
  { id: 'qr', name: 'Código QR' },
  { id: 'map', name: 'Mapa' },
  { id: 'tv', name: 'TV Retro' },
  { id: 'url', name: 'URL' },
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

const WebIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

const Sidebar = ({ onAddCard, onChangeBackground, onAddSticker, onSave }: SidebarProps) => {
  const [activeMenu, setActiveMenu] = useState<MenuType>('none');
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState<'bottom' | 'top'>('bottom');
  const [selectedBackground, setSelectedBackground] = useState('white');
  const [quickUrl, setQuickUrl] = useState('');
  const [isMarketOpen, setIsMarketOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      if (menuRef.current) {
        const menuHeight = menuRef.current.offsetHeight;
        const windowHeight = window.innerHeight;
        const menuRect = menuRef.current.getBoundingClientRect();
        
        if (menuRect.top < 20) {
          setMenuPosition('bottom');
        } else {
          setMenuPosition('top');
        }
      }
    };

    if (activeMenu !== 'none') {
      setTimeout(updatePosition, 10);
      window.addEventListener('resize', updatePosition);
    }

    return () => window.removeEventListener('resize', updatePosition);
  }, [activeMenu]);

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

  const handleQuickUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickUrl) {
      onAddCard('url', { w: 1, h: 1 }, { url: quickUrl, title: 'Enlace rápido' });
      setQuickUrl('');
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

  return (
    <>
      <MarketModal 
        isOpen={isMarketOpen}
        onClose={() => setIsMarketOpen(false)}
        onAddCard={onAddCard}
      />
      
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-end gap-4 z-50">
        {/* Menús */}
        <div className="relative">
          <div 
            ref={menuRef}
            className={`absolute left-1/2 -translate-x-1/2 ${
              menuPosition === 'bottom' 
                ? 'bottom-16'
                : 'bottom-full mb-2'
            } transition-all duration-200`}
          >
            {activeMenu === 'background' && (
              <div className="bg-white p-4 rounded-xl shadow-lg w-[300px] flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-200 max-h-[80vh] overflow-y-auto">
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
            )}

            {activeMenu === 'stickers' && (
              <div className="bg-white p-4 rounded-xl shadow-lg w-[300px] flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-200 max-h-[80vh] overflow-hidden">
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
            )}
          </div>
        </div>

        {/* Botones de control */}
        <div className="bg-white rounded-xl shadow-lg border border-black/5 flex flex-row items-center gap-2 p-2">
          <form onSubmit={handleQuickUrlSubmit} className="flex items-center">
            <input
              type="url"
              value={quickUrl}
              onChange={(e) => setQuickUrl(e.target.value)}
              placeholder="Pega una URL aquí"
              className="w-48 px-3 py-2 text-sm bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
            <button
              type="submit"
              className="ml-2 w-10 h-10 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-all"
              title="Agregar URL"
            >
              <WebIcon className="w-5 h-5" />
            </button>
          </form>

          <div className="w-px h-8 bg-gray-200"></div>

          <button
            onClick={() => toggleMenu('background')}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all
              ${activeMenu === 'background' 
                ? 'bg-blue-500 text-white shadow-inner' 
                : 'text-gray-700 hover:bg-gray-50'}`}
            title="Cambiar fondo"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>

          <button
            onClick={() => toggleMenu('stickers')}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all
              ${activeMenu === 'stickers'
                ? 'bg-blue-500 text-white shadow-inner'
                : 'text-gray-700 hover:bg-gray-50'}`}
            title="Stickers"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          <button
            onClick={() => setIsMarketOpen(true)}
            className="w-12 h-12 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-all"
            title="Market"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
          </button>

          <div className="w-px h-8 bg-gray-200"></div>

          <button
            onClick={() => {
              onSave?.();
            }}
            className="w-12 h-12 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-all"
            title="Guardar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;