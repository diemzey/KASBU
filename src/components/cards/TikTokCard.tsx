import { useState, useRef, useEffect } from 'react';
import { TikTokCardProps } from '../../types';

const TikTokIcon = () => (
  <div className="p-2.5 rounded-lg bg-gray-100 transition-all duration-300
    shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(0,0,0,0.1)]
    hover:shadow-[inset_-1px_-1px_3px_rgba(255,255,255,0.7),inset_1px_1px_3px_rgba(0,0,0,0.1)]
    active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.7)]"
  >
    <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  </div>
);

const mockPosts = [
  'https://picsum.photos/140/211?random=1',
  'https://picsum.photos/140/211?random=2',
  'https://picsum.photos/140/211?random=3'
];

export const TikTokCard = ({ 
  children, 
  onDelete, 
  size = { w: 1, h: 1 }, 
  onTitleChange,
  onUsernameChange,
  title: initialTitle = '¡Sígueme en TikTok!'
}: TikTokCardProps) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(initialTitle);
  const [currentUsername, setCurrentUsername] = useState(children?.toString() || 'usuario');
  const titleRef = useRef<HTMLDivElement>(null);
  const usernameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentTitle(initialTitle);
  }, [initialTitle]);

  useEffect(() => {
    setCurrentUsername(children?.toString() || 'usuario');
  }, [children]);

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    const newText = titleRef.current?.innerText || '';
    setCurrentTitle(newText || '¡Sígueme en TikTok!');
    onTitleChange?.(newText);
  };

  const handleUsernameBlur = () => {
    setIsEditingUsername(false);
    const newText = usernameRef.current?.innerText || '';
    setCurrentUsername(newText || 'usuario');
    onUsernameChange?.(newText);
  };

  const handleKeyDown = (e: React.KeyboardEvent, ref: React.RefObject<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      ref.current?.blur();
    }
  };

  // Mostrar imágenes solo en tarjetas 2x1 o más grandes
  const showImages = size.w >= 2 || size.h >= 2;
  // Layout horizontal solo para tarjetas 2x1
  const isHorizontal = size.w === 2 && size.h === 1;
  // Layout vertical para tarjetas 1x2
  const isVertical = size.w === 1 && size.h === 2;

  return (
    <div className="relative w-full h-full rounded-2xl bg-white p-6 transition-all duration-300 ease-out 
      shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_8px_16px_-4px_rgba(0,0,0,0.1)]
      cursor-pointer flex flex-col group overflow-hidden">

      {/* Botón de eliminar */}
      {onDelete && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete();
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-black/5 hover:bg-red-500/90 transition-all duration-200 
            opacity-0 group-hover:opacity-100 z-50"
          title="Eliminar"
        >
          <svg className="w-3 h-3 text-black/60 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Contenido */}
      <div className={`flex ${isHorizontal ? 'flex-row gap-6' : 'flex-col'} flex-1`}>
        <div className={`flex ${isHorizontal ? 'items-start gap-4' : 'flex-col items-start gap-3'}`}>
          <div className={`${isHorizontal ? 'flex items-start gap-4' : 'flex flex-col items-start gap-3'}`}>
            <div className="flex-shrink-0">
              <TikTokIcon />
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <div
                ref={titleRef}
                contentEditable
                suppressContentEditableWarning
                onFocus={() => setIsEditingTitle(true)}
                onBlur={handleTitleBlur}
                onKeyDown={(e) => handleKeyDown(e, titleRef)}
                onClick={(e) => {
                  e.stopPropagation();
                  titleRef.current?.focus();
                }}
                className="editable-content text-lg font-semibold text-gray-900 line-clamp-1
                  empty:before:content-['¡Sígueme_en_TikTok!'] empty:before:text-gray-400"
              >
                {currentTitle}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-500">@</span>
                <div
                  ref={usernameRef}
                  contentEditable
                  suppressContentEditableWarning
                  onFocus={() => setIsEditingUsername(true)}
                  onBlur={handleUsernameBlur}
                  onKeyDown={(e) => handleKeyDown(e, usernameRef)}
                  onClick={(e) => {
                    e.stopPropagation();
                    usernameRef.current?.focus();
                  }}
                  className="editable-content text-sm text-gray-500 break-all line-clamp-1
                    empty:before:content-['usuario'] empty:before:text-gray-400"
                >
                  {currentUsername}
                </div>
              </div>
            </div>
          </div>

          {/* Grid de posts */}
          {showImages && !isHorizontal && (
            <div className="grid grid-cols-2 w-full gap-2 mt-2">
              {mockPosts.slice(0, 3).map((url, index) => (
                <div key={index} className="relative aspect-[140/211] rounded-lg overflow-hidden">
                  <img src={url} alt={`Post ${index + 1}`} className="absolute inset-0 w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Grid de posts en modo horizontal */}
        {showImages && isHorizontal && (
          <div className="grid grid-cols-1 w-32 gap-2">
            {mockPosts.slice(0, 2).map((url, index) => (
              <div key={index} className="relative aspect-[140/211] rounded-lg overflow-hidden">
                <img src={url} alt={`Post ${index + 1}`} className="absolute inset-0 w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Efecto hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}; 