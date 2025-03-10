import { useState, useRef, useEffect } from 'react';
import { TikTokCardProps } from '../../types';

const InstagramIcon = () => (
  <div className="p-2.5 rounded-lg bg-gradient-to-br from-[#ff3c7b] via-[#7d2ae8] to-[#feda75] transition-all duration-300
    shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(0,0,0,0.1)]
    hover:shadow-[inset_-1px_-1px_3px_rgba(255,255,255,0.7),inset_1px_1px_3px_rgba(0,0,0,0.1)]
    active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.7)]"
  >
    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  </div>
);

const mockPosts = [
  'https://picsum.photos/300/300?random=1',
  'https://picsum.photos/300/300?random=2',
  'https://picsum.photos/300/300?random=3'
];

export const InstagramCard = ({ 
  children, 
  onDelete, 
  size = { w: 1, h: 1 }, 
  onTitleChange,
  onUsernameChange,
  title: initialTitle = '¡Sígueme en Instagram!'
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
    setCurrentTitle(newText || '¡Sígueme en Instagram!');
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
    <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 transition-all duration-300 ease-out 
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
              <InstagramIcon />
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
                  empty:before:content-['¡Sígueme_en_Instagram!'] empty:before:text-gray-400"
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
            <div className="grid grid-cols-3 w-full gap-2 mt-2">
              {mockPosts.map((url, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                  <img src={url} alt={`Post ${index + 1}`} className="absolute inset-0 w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Grid de posts en modo horizontal */}
        {showImages && isHorizontal && (
          <div className="grid grid-cols-2 w-32 gap-2">
            {mockPosts.slice(0, 2).map((url, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
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