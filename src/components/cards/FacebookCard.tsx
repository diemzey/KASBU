import { useState, useRef, useEffect } from 'react';
import { TikTokCardProps } from '../../types';

const FacebookIcon = () => (
  <div className="p-2.5 rounded-lg bg-[#1877f2] transition-all duration-300
    shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(0,0,0,0.1)]
    hover:shadow-[inset_-1px_-1px_3px_rgba(255,255,255,0.7),inset_1px_1px_3px_rgba(0,0,0,0.1)]
    active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.7)]"
  >
    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  </div>
);

const mockPosts = [
  'https://picsum.photos/400/250?random=1',
  'https://picsum.photos/400/250?random=2',
  'https://picsum.photos/400/250?random=3'
];

export const FacebookCard = ({ 
  children, 
  onDelete, 
  size = { w: 1, h: 1 }, 
  onTitleChange,
  onUsernameChange,
  title: initialTitle = '¡Sígueme en Facebook!'
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
    setCurrentTitle(newText || '¡Sígueme en Facebook!');
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
    <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 transition-all duration-300 ease-out 
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
              <FacebookIcon />
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
                  empty:before:content-['¡Sígueme_en_Facebook!'] empty:before:text-gray-400"
              >
                {currentTitle}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-500">/</span>
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
                  <img src={url} alt={`Post ${index + 1}`} className="absolute inset-0 w-full h-full object-cover" />
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