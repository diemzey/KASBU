import { memo, useCallback, useState, useEffect } from 'react';
import { TVCardProps } from '../../types';

const DeleteButton = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onClick?.();
    }}
    className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/30 hover:bg-red-500/90 transition-colors
      opacity-0 group-hover:opacity-100 z-50 no-drag"
    title="Eliminar"
  >
    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
);

function TVCardComponent({ children, onDelete, onTextChange, onVideoChange, videoId: initialVideoId }: TVCardProps) {
  const [videoId, setVideoId] = useState<string | null>(initialVideoId || null);
  const [title, setTitle] = useState(children?.toString() || '');
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [autoplay, setAutoplay] = useState(false);

  const getVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleUrlSubmit = useCallback((url: string) => {
    const newVideoId = getVideoId(url);
    if (newVideoId) {
      setVideoId(newVideoId);
      onVideoChange?.(newVideoId);
      setIsEditing(false);
      setInputValue('');
    }
  }, [onVideoChange]);

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    onTextChange?.(newTitle);
  }, [onTextChange]);

  const toggleAutoplay = useCallback(() => {
    setAutoplay(prev => !prev);
  }, []);

  // Actualizar el estado local cuando cambia el videoId del padre
  useEffect(() => {
    if (initialVideoId !== undefined) {
      setVideoId(initialVideoId);
    }
  }, [initialVideoId]);

  return (
    <div 
      className="relative w-full h-full rounded-xl overflow-hidden group transition-all duration-300
        bg-gray-50 hover:bg-gray-100"
    >
      {/* Zona arrastrable */}
      <div className="absolute inset-0 drag-handle pointer-events-none" />
      
      {/* Contenido interactivo */}
      <div className="relative z-10 w-full h-full">
        {onDelete && <DeleteButton onClick={onDelete} />}
        
        {videoId ? (
          <div className="relative w-full h-full">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? '1' : '0'}&rel=0`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            
            {/* Overlay con controles al hacer hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Añade un título..."
                    className="flex-1 bg-transparent text-white placeholder-white/60 border-none outline-none text-sm no-drag"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleAutoplay();
                    }}
                    className={`p-1.5 rounded-lg transition-colors no-drag
                      ${autoplay 
                        ? 'bg-blue-500 hover:bg-blue-600' 
                        : 'bg-black/30 hover:bg-black/40'}`}
                    title={autoplay ? 'Desactivar autoplay' : 'Activar autoplay'}
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {autoplay ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>
              
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setVideoId(null);
                  onVideoChange?.('');
                }}
                className="absolute top-3 left-3 p-1.5 rounded-lg bg-black/30 hover:bg-red-500/90 transition-colors no-drag"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <div className="mb-4 pointer-events-none">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div 
              className="no-drag w-full max-w-sm px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Pega la URL del video de YouTube"
                  className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200 
                    focus:border-blue-500 focus:outline-none text-sm text-gray-600
                    placeholder-gray-400 transition-colors"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUrlSubmit(inputValue);
                    }
                  }}
                />
                <button
                  onClick={() => handleUrlSubmit(inputValue)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg
                    bg-blue-500 hover:bg-blue-600 transition-colors"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500 pointer-events-none">
              Ejemplo: https://www.youtube.com/watch?v=dQw4w9WgXcQ
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export const TVCard = memo(TVCardComponent); 