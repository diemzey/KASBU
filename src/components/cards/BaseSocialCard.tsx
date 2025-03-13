import { memo, useState, useRef } from 'react';
import { BaseSocialCardProps } from '../../types';

const BaseSocialCardComponent = ({ children, className = '', icon, onDelete, onTextChange }: BaseSocialCardProps) => {
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

  return (
    <div 
      className={`relative w-full h-full rounded-[1.5rem] text-white p-6 transition-all duration-300 ease-out 
        shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_4px_20px_-4px_rgba(0,0,0,0.1)] backdrop-blur-sm
        hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_8px_40px_-8px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.1)_inset]
        active:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_2px_10px_-2px_rgba(0,0,0,0.1)]
        cursor-pointer flex flex-col items-center justify-center gap-4 group ${className}`}
    >
      <div className="text-3xl mb-1">
        {icon}
      </div>
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
        className="editable-content text-sm font-medium tracking-wide text-center opacity-90 text-white"
      >
        {children}
      </div>
    </div>
  );
};

export const BaseSocialCard = memo(BaseSocialCardComponent);
export default BaseSocialCard; 