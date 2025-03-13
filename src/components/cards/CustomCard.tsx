import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { CustomCardProps } from '../../types';

interface EditableContentProps {
  value: string;
  onBlur: (text: string) => void;
  placeholder: string;
  className?: string;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

const EditableContent = memo(({ 
  value, 
  onBlur, 
  placeholder, 
  className = '', 
  isEditing,
  setIsEditing
}: EditableContentProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    const newText = ref.current?.innerText || '';
    onBlur(newText);
  }, [onBlur, setIsEditing]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      ref.current?.blur();
    }
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    ref.current?.focus();
  }, []);

  return (
    <div
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onFocus={() => setIsEditing(true)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      className={`editable-content empty:before:text-gray-400 empty:before:content-[${placeholder}] ${className}`}
    >
      {value}
    </div>
  );
});

EditableContent.displayName = 'EditableContent';

export const CustomCard = memo(({ 
  text, 
  children, 
  onDelete, 
  onTextChange,
  onTitleChange,
  title: initialTitle = 'Tarjeta personalizada'
}: CustomCardProps) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingText, setIsEditingText] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(initialTitle);
  const [currentText, setCurrentText] = useState(text || children?.toString() || '');

  useEffect(() => {
    setCurrentTitle(initialTitle);
  }, [initialTitle]);

  useEffect(() => {
    setCurrentText(text || children?.toString() || '');
  }, [text, children]);

  const handleTitleBlur = useCallback((newText: string) => {
    setCurrentTitle(newText || 'Tarjeta personalizada');
    onTitleChange?.(newText);
  }, [onTitleChange]);

  const handleTextBlur = useCallback((newText: string) => {
    setCurrentText(newText);
    onTextChange?.(newText);
  }, [onTextChange]);

  const handleDragStart = useCallback((e: React.MouseEvent) => {
    if (!isEditingTitle && !isEditingText) {
      e.preventDefault();
    }
  }, [isEditingTitle, isEditingText]);

  return (
    <div className="relative w-full h-full rounded-2xl bg-[#f7f7f7] shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.1)] 
      hover:shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_8px_16px_-4px_rgba(0,0,0,0.1)] group overflow-hidden">
      
      {/* Área de arrastre */}
      {onDelete && (
        <div 
          className="absolute inset-0 cursor-move" 
          onMouseDown={handleDragStart}
        />
      )}
      
      {/* Contenido */}
      <div className={`h-full w-full p-6 flex flex-col gap-4 relative z-10 ${onDelete ? 'z-10' : ''}`}>
        <EditableContent
          value={currentTitle}
          onBlur={handleTitleBlur}
          placeholder="Tarjeta_personalizada"
          className="text-xl font-semibold text-gray-900"
          isEditing={isEditingTitle}
          setIsEditing={setIsEditingTitle}
        />
        <EditableContent
          value={currentText}
          onBlur={handleTextBlur}
          placeholder="Escribe_aquí_tu_texto..."
          className="flex-1 text-base text-gray-600"
          isEditing={isEditingText}
          setIsEditing={setIsEditingText}
        />
      </div>
    </div>
  );
}); 