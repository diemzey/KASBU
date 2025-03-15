import { memo, useState, useRef } from 'react';
import { BaseSocialCardProps } from '../../types';

const BaseSocialCardComponent = ({ 
  children, 
  className = '', 
  icon, 
  onDelete, 
  onTextChange,
  buttonStyle = 'bg-[#4093EF] hover:bg-[#2875CA] active:bg-[#3383DC]',
  buttonText = 'Follow',
  size = { w: 1, h: 1 }
}: BaseSocialCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
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

  const isWide = size.w === 2 && size.h === 1;
  const isTall = size.w === 1 && size.h === 2;
  const isHuge = size.w === 2 && size.h === 2;

  return (
    <div 
      className={`relative w-full h-full rounded-[1.5rem] p-4 transition-all duration-300 ease-out 
        bg-white
        shadow-[0_2px_3px_-1px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]
        hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)]
        active:shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]
        cursor-pointer flex ${isHuge ? 'flex-col' : isWide ? 'flex-row' : isTall ? 'flex-col' : 'flex-col'} gap-3 group ${className}`}
    >
      <div className={`flex flex-col gap-2 ${isWide ? 'w-1/2' : 'w-full'} ${isTall ? 'h-[40%]' : ''} ${isHuge ? 'h-[35%]' : ''}`}>
        <div className="relative w-12 h-12 rounded-xl overflow-hidden">
          {icon}
        </div>
        <div className="flex flex-col">
          <div
            ref={textRef}
            contentEditable
            suppressContentEditableWarning
            onFocus={() => setIsEditing(true)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onClick={(e) => {
              e.stopPropagation();
              textRef.current?.focus();
            }}
            className="editable-content text-base tracking-wide text-gray-900"
          >
            {children}
          </div>
          <div className="text-sm text-gray-500 mt-0.5">
            {children?.toString().toLowerCase().replace(/\s/g, '')}
          </div>
        </div>

        <button className={`w-full py-1.5 px-4 rounded-lg ${buttonStyle} text-white font-bold text-sm 
          transition-all duration-300 ease-out
          shadow-[0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.1)]
          hover:shadow-[0_4px_8px_rgba(0,0,0,0.2),inset_0_2px_0_rgba(255,255,255,0.1)]
          hover:scale-[1.02]
          active:scale-[0.98]
          active:shadow-[0_1px_2px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.05)]`}
        >
          {buttonText} <span className="ml-1 font-medium text-white/80">132K</span>
        </button>
      </div>

      {(isWide || isTall || isHuge) && (
        <div className={`${isWide ? 'w-1/2' : 'flex-1'} h-full rounded-xl overflow-hidden bg-gray-100`}>
          <img 
            src={`https://source.unsplash.com/random/${isHuge ? '800x800' : isWide ? '800x400' : '400x900'}`}
            alt="Random"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {!isEditing && (
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
            className="w-8 h-8 rounded-lg bg-white hover:bg-gray-50 border border-gray-100 flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export const BaseSocialCard = memo(BaseSocialCardComponent);
export default BaseSocialCard; 