import { memo, useState, useRef, useEffect } from 'react';

interface ImageEditorProps {
  imageUrl: string | null;
  onImageChange?: (imageUrl: string | null) => void;
  onDelete?: () => void;
  className?: string;
  isEditorMode?: boolean;
  containerClassName?: string;
}

const ImageEditor = ({
  imageUrl: initialImage,
  onImageChange,
  onDelete,
  className = '',
  isEditorMode = true,
  containerClassName = ''
}: ImageEditorProps) => {
  const [image, setImage] = useState<string | null>(initialImage);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [imageScale, setImageScale] = useState(1);
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setImage(initialImage);
  }, [initialImage]);

  const handleImageChange = (file: File) => {
    setIsLoadingImage(true);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImage(result);
      onImageChange?.(result);
      setIsLoadingImage(false);
      // Reset position and scale when new image is loaded
      setImagePosition({ x: 0, y: 0 });
      setImageScale(1);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImage(null);
    onImageChange?.(null);
    onDelete?.();
    // Reset position and scale when image is deleted
    setImagePosition({ x: 0, y: 0 });
    setImageScale(1);
  };

  const handleImageMouseDown = (e: React.MouseEvent) => {
    if (!isEditorMode) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingImage(true);
    setDragStart({
      x: e.clientX - imagePosition.x,
      y: e.clientY - imagePosition.y
    });
  };

  const handleImageMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingImage || !isEditorMode) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // Limit movement based on scale and container size
    const container = imageContainerRef.current;
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    const maxX = (containerRect.width * (imageScale - 1)) / 2;
    const maxY = (containerRect.height * (imageScale - 1)) / 2;
    
    setImagePosition({
      x: Math.max(-maxX, Math.min(maxX, newX)),
      y: Math.max(-maxY, Math.min(maxY, newY))
    });
  };

  const handleImageMouseUp = () => {
    setIsDraggingImage(false);
  };

  const adjustScale = (delta: number) => {
    if (!isEditorMode) return;
    const newScale = Math.max(1, Math.min(3, imageScale + delta));
    
    setImageScale(newScale);
    
    // Adjust position when scaling to keep the image centered
    const container = imageContainerRef.current;
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    const maxX = (containerRect.width * (newScale - 1)) / 2;
    const maxY = (containerRect.height * (newScale - 1)) / 2;
    
    setImagePosition({
      x: Math.max(-maxX, Math.min(maxX, imagePosition.x)),
      y: Math.max(-maxY, Math.min(maxY, imagePosition.y))
    });
  };

  const handleImageWheel = (e: React.WheelEvent) => {
    if (!isEditorMode) return;
    e.preventDefault();
    e.stopPropagation();
    
    const delta = -e.deltaY;
    const scaleChange = delta > 0 ? 0.1 : -0.1;
    adjustScale(scaleChange);
  };

  useEffect(() => {
    if (isDraggingImage) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        handleImageMouseMove(e as unknown as React.MouseEvent);
      };
      
      const handleGlobalMouseUp = () => {
        setIsDraggingImage(false);
      };
      
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDraggingImage]);

  return (
    <div 
      ref={imageContainerRef}
      className={`relative overflow-hidden ${containerClassName}`}
      onWheel={image ? handleImageWheel : undefined}
    >
      {isLoadingImage ? (
        <div className="w-full h-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400 animate-spin" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      ) : image ? (
        <div className={`relative w-full h-full ${className}`}>
          <div
            className={`absolute inset-0 ${isEditorMode ? 'cursor-move' : ''}`}
            onMouseDown={handleImageMouseDown}
          >
            <img 
              src={image} 
              alt="Card content"
              className="absolute w-full h-full object-cover transition-transform duration-200"
              style={{
                transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${imageScale})`,
                transformOrigin: 'center'
              }}
              draggable={false}
            />
          </div>

          {isEditorMode && (
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
                <button
                  onClick={handleDeleteImage}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <button
                  onClick={() => adjustScale(-0.1)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <button
                  onClick={() => adjustScale(0.1)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : isEditorMode ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          className="w-full h-full flex items-center justify-center text-gray-400 hover:text-gray-500 transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-gray-500 text-sm">Sin imagen</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleImageChange(file);
          }
        }}
        className="hidden"
      />
    </div>
  );
};

export default memo(ImageEditor); 