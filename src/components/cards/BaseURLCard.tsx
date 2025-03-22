import { memo, useState, useRef, useEffect } from 'react';
import { BaseURLCardProps } from '../../types';
import ImageEditor from '../ImageEditor';

const BaseURLCardComponent = ({ 
  children, 
  className = '', 
  icon, 
  onDelete, 
  onTextChange,
  buttonStyle = 'bg-[#4093EF] hover:bg-[#2875CA] active:bg-[#3383DC]',
  buttonText = 'Follow',
  size = { w: 1, h: 1 },
  description,
  imageUrl: initialImage,
  onImageChange,
  isEditorMode = true,
  url
}: BaseURLCardProps & { isEditorMode?: boolean }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState<string | null>(initialImage || null);
  const textRef = useRef<HTMLDivElement>(null);

  const handleBlur = () => {
    setIsEditing(false);
    const newText = textRef.current?.innerText || '';
    onTextChange?.(newText);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      textRef.current?.blur();
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const isWide = size.w === 2 && size.h === 1;
  const isTall = size.w === 1 && size.h === 2;
  const isHuge = size.w === 2 && size.h === 2;

  return (
    <div className={`w-full h-full rounded-2xl overflow-hidden ${className}`}>
      <div className={`w-full h-full flex ${isWide ? 'flex-row' : 'flex-col'} gap-3 p-3`}>
        <div className={`${isWide ? 'w-1/2' : 'w-full'} ${isTall || isHuge ? 'h-[45%]' : 'flex-1'} flex flex-col gap-3`}>
          <div className="w-10 h-10 rounded-2xl overflow-hidden">
            {icon}
          </div>
          <div className="flex-1 flex flex-col gap-1.5">
            <div
              ref={textRef}
              contentEditable={isEditorMode}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="text-base font-medium outline-none"
              suppressContentEditableWarning
            >
              {children}
            </div>
            {description && (
              <div className="text-xs text-gray-500">
                {description}
              </div>
            )}
          </div>
          <button
            onClick={handleButtonClick}
            className={`w-full py-1.5 rounded-xl text-white text-sm font-medium transition-colors ${buttonStyle}`}
          >
            {buttonText}
          </button>
        </div>

        {isEditorMode && (isWide || isTall || isHuge) && (
          <ImageEditor
            imageUrl={image}
            onImageChange={(newImage) => {
              setImage(newImage);
              onImageChange?.(newImage);
            }}
            onDelete={() => {
              setImage(null);
              onImageChange?.(null);
            }}
            isEditorMode={isEditorMode}
            containerClassName={`${isWide ? 'w-1/2' : 'w-full'} ${isTall || isHuge ? 'h-[55%]' : 'flex-1'} rounded-2xl overflow-hidden bg-gray-100`}
          />
        )}
      </div>
    </div>
  );
};

export const BaseURLCard = memo(BaseURLCardComponent);
export default BaseURLCard; 