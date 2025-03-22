import { memo, useCallback, useState, useEffect } from 'react';
import { ImageCardProps } from '../../types';
import ImageEditor from '../ImageEditor';

function ImageCardComponent({ children, onDelete, onTextChange, onImageChange, imageUrl: initialImage, isEditing = true }: ImageCardProps & { isEditing?: boolean }) {
  const [image, setImage] = useState<string | null>(initialImage || null);
  const [caption, setCaption] = useState(children?.toString() || '');

  useEffect(() => {
    setImage(initialImage || null);
  }, [initialImage]);

  useEffect(() => {
    setCaption(children?.toString() || '');
  }, [children]);

  const handleCaptionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newCaption = e.target.value;
    setCaption(newCaption);
    onTextChange?.(newCaption);
  }, [onTextChange]);

  const handleImageChange = useCallback((newImage: string | null) => {
    setImage(newImage);
    onImageChange?.(newImage || '');
  }, [onImageChange]);

  return (
    <div 
      className="relative w-full h-full rounded-xl overflow-hidden group transition-all duration-300
        bg-gray-50 hover:bg-gray-100"
    >
      {/* Zona arrastrable */}
      <div className="absolute inset-0 drag-handle pointer-events-none" />
      
      {/* Contenido interactivo */}
      <div className="relative z-10 w-full h-full">
        <ImageEditor
          imageUrl={image}
          onImageChange={handleImageChange}
          onDelete={() => handleImageChange(null)}
          isEditorMode={isEditing}
          containerClassName="w-full h-full"
        />
        
        {image && (
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
        )}
      </div>
    </div>
  );
}

export const ImageCard = memo(ImageCardComponent);
export default ImageCard; 