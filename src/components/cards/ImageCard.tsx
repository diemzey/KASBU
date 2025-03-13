import { memo, useCallback, useState, useRef, useEffect } from 'react';
import { ImageCardProps } from '../../types';

function ImageCardComponent({ children, onDelete, onTextChange, onImageChange, imageUrl: initialImage }: ImageCardProps) {
  const [image, setImage] = useState<string | null>(initialImage || null);
  const [caption, setCaption] = useState(children?.toString() || '');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImage(initialImage || null);
  }, [initialImage]);

  useEffect(() => {
    setCaption(children?.toString() || '');
  }, [children]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setImage(result);
        onImageChange?.(result);
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
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
            <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500 text-sm mb-2">
              {isDragging ? 'Suelta la imagen aquí' : 'Arrastra una imagen aquí'}
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    const result = reader.result as string;
                    setImage(result);
                    onImageChange?.(result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Seleccionar archivo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export const ImageCard = memo(ImageCardComponent);
export default ImageCard; 