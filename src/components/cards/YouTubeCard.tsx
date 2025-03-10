import { useState, useRef, useEffect } from 'react';
import { TikTokCardProps } from '../../types';

const YouTubeIcon = () => (
  <div className="p-2.5 rounded-lg bg-[#ff0000] transition-all duration-300
    shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(0,0,0,0.1)]
    hover:shadow-[inset_-1px_-1px_3px_rgba(255,255,255,0.7),inset_1px_1px_3px_rgba(0,0,0,0.1)]
    active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.7)]"
  >
    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  </div>
);

const mockPosts = [
  'https://picsum.photos/400/225?random=1',
  'https://picsum.photos/400/225?random=2',
  'https://picsum.photos/400/225?random=3'
];

export const YouTubeCard = ({ 
  children, 
  onDelete, 
  size = { w: 1, h: 1 }, 
  onTitleChange,
  onUsernameChange,
  title: initialTitle = '¡Suscríbete a mi canal!'
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
    setCurrentTitle(newText || '¡Suscríbete a mi canal!');
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

  return (
    <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-red-50 to-rose-50 p-6 transition-all duration-300 ease-out 
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
              <YouTubeIcon />
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
                  empty:before:content-['¡Suscríbete_a_mi_canal!'] empty:before:text-gray-400"
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
              {mockPosts.map((url, index) => (
                <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                  <img src={url} alt={`Video ${index + 1}`} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Grid de posts en modo horizontal */}
        {showImages && isHorizontal && (
          <div className="grid grid-cols-1 w-40 gap-2">
            {mockPosts.slice(0, 2).map((url, index) => (
              <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                <img src={url} alt={`Video ${index + 1}`} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
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