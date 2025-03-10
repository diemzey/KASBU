import { memo, useCallback, useState, useRef, useEffect } from 'react';
import { ImageCardProps } from '../../types';

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

function ImageCardComponent({ children, onDelete, onTextChange, onImageChange, imageUrl: initialImage }: ImageCardProps) {
  const [image, setImage] = useState<string | null>(initialImage || null);
  const [isDragging, setIsDragging] = useState(false);
  const [caption, setCaption] = useState(children?.toString() || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialImage !== undefined) {
      setImage(initialImage);
    }
  }, [initialImage]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImage = event.target?.result as string;
        setImage(newImage);
        onImageChange?.(newImage);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageChange]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImage = event.target?.result as string;
        setImage(newImage);
        onImageChange?.(newImage);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageChange]);

  const handleCaptionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newCaption = e.target.value;
    setCaption(newCaption);
    onTextChange?.(newCaption);
  }, [onTextChange]);

  const handleRemoveImage = useCallback(() => {
    setImage(null);
    onImageChange?.('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onImageChange]);

  return (
    <div 
      className="relative w-full h-full rounded-xl overflow-hidden group transition-all duration-300
        bg-gray-50 hover:bg-gray-100"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {/* Zona arrastrable */}
      <div className="absolute inset-0 drag-handle pointer-events-none" />
      
      {/* Contenido interactivo */}
      <div className="relative z-10 w-full h-full">
        {onDelete && <DeleteButton onClick={onDelete} />}
        
        {image ? (
          <div className="relative w-full h-full">
            <img 
              src={image} 
              alt={caption}
              className="w-full h-full object-cover pointer-events-none"
            />
            
            {/* Overlay con controles al hacer hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <input
                  type="text"
                  value={caption}
                  onChange={handleCaptionChange}
                  placeholder="Añade un pie de foto..."
                  className="w-full bg-transparent text-white placeholder-white/60 border-none outline-none text-sm no-drag"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRemoveImage();
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div 
              className="no-drag"
              onClick={(e) => e.stopPropagation()}
            >
              <label className="cursor-pointer">
                <span 
                  className="px-4 py-2 rounded-lg bg-white shadow-sm border border-gray-200 hover:border-blue-500 transition-colors text-sm font-medium text-gray-600 hover:text-blue-500 inline-block"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                >
                  Seleccionar imagen
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  onClick={(e) => e.stopPropagation()}
                />
              </label>
            </div>
            <p className="mt-2 text-sm text-gray-500 pointer-events-none">
              o arrastra y suelta una imagen aquí
            </p>
          </div>
        )}

        {isDragging && (
          <div className="absolute inset-0 border-2 border-blue-500 border-dashed rounded-xl bg-blue-50 flex items-center justify-center z-20">
            <p className="text-blue-500 font-medium">Suelta la imagen aquí</p>
          </div>
        )}
      </div>
    </div>
  );
}

export const ImageCard = memo(ImageCardComponent); 