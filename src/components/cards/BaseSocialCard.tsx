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
      className={`relative w-full h-full rounded-2xl text-white p-6 transition-all duration-300 ease-out 
        shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_4px_20px_-4px_rgba(0,0,0,0.1)] backdrop-blur-sm
        hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_8px_40px_-8px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.1)_inset]
        active:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_2px_10px_-2px_rgba(0,0,0,0.1)]
        cursor-pointer flex flex-col items-center justify-center gap-4 group ${className}`}
    >
      {onDelete && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete();
          }}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/20 hover:bg-red-500/80 transition-all duration-200 
            opacity-0 group-hover:opacity-100 z-50"
          title="Eliminar"
        >
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
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