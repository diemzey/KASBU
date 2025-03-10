import { useState, useRef, useEffect } from 'react';

interface StickerProps {
  emoji: string;
  initialPosition: { x: number; y: number };
  onDelete?: () => void;
}

// Constantes para las áreas protegidas
const MARGIN = 50; // margen en píxeles alrededor del grid

const Sticker = ({ emoji, initialPosition, onDelete }: StickerProps) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isInvalidPosition, setIsInvalidPosition] = useState(false);
  const [scale, setScale] = useState(1);
  const [startResizeScale, setStartResizeScale] = useState(1);
  const [startResizePos, setStartResizePos] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(() => Math.random() * 20 - 10);
  const [startRotation, setStartRotation] = useState(0);
  const [startRotatePos, setStartRotatePos] = useState({ x: 0, y: 0 });
  const [protectedArea, setProtectedArea] = useState({ left: 0, right: 0, top: 0, bottom: 0 });
  const stickerRef = useRef<HTMLDivElement>(null);

  // Actualizar las áreas protegidas cuando cambia el tamaño de la ventana o el grid
  useEffect(() => {
    const updateProtectedArea = () => {
      const grid = document.querySelector('.react-grid-layout');
      if (grid) {
        const rect = grid.getBoundingClientRect();
        const scrollY = window.scrollY;
        setProtectedArea({
          left: rect.left - MARGIN,
          right: rect.right + MARGIN,
          top: rect.top + scrollY - MARGIN, // Ajustar por el scroll
          bottom: rect.bottom + scrollY + MARGIN // Ajustar por el scroll
        });
      }
    };

    // Observar cambios en el grid
    const observer = new MutationObserver(updateProtectedArea);

    const grid = document.querySelector('.react-grid-layout');
    if (grid) {
      observer.observe(grid, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ['style', 'class']
      });
    }

    // También observar cambios en el contenedor padre por si afectan al grid
    const gridContainer = document.querySelector('.react-grid-layout')?.parentElement;
    if (gridContainer) {
      observer.observe(gridContainer, {
        attributes: true,
        childList: true,
        attributeFilter: ['style', 'class']
      });
    }

    // Actualización inicial y listeners
    updateProtectedArea();
    window.addEventListener('resize', updateProtectedArea);
    window.addEventListener('scroll', updateProtectedArea);

    // Actualizar cada 100ms por si acaso hay cambios que no detectamos
    const interval = setInterval(updateProtectedArea, 100);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateProtectedArea);
      window.removeEventListener('scroll', updateProtectedArea);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const scrollY = window.scrollY;
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY + scrollY - dragOffset.y;

        // Verificar si la nueva posición está en el área protegida
        const isProtected = newX > protectedArea.left && 
                          newX < protectedArea.right && 
                          newY > protectedArea.top && 
                          newY < protectedArea.bottom;

        setIsInvalidPosition(isProtected);

        // Solo actualizar la posición si está fuera del área protegida
        if (!isProtected) {
          setPosition({
            x: newX,
            y: newY
          });
        }
      } else if (isResizing && stickerRef.current) {
        const dx = e.clientX - startResizePos.x;
        const dy = e.clientY - startResizePos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const scaleFactor = 1 + distance * (dx > 0 ? 0.01 : -0.01);
        const newScale = Math.max(0.5, Math.min(3, startResizeScale * scaleFactor));
        setScale(newScale);
      } else if (isRotating && stickerRef.current) {
        const rect = stickerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const startAngle = Math.atan2(
          startRotatePos.y - centerY,
          startRotatePos.x - centerX
        );
        const currentAngle = Math.atan2(
          e.clientY - centerY,
          e.clientX - centerX
        );
        
        const newRotation = startRotation + ((currentAngle - startAngle) * 180 / Math.PI);
        setRotation(newRotation);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setIsRotating(false);
      setIsInvalidPosition(false);
    };

    if (isDragging || isResizing || isRotating) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, isRotating, dragOffset, startResizePos, startResizeScale, startRotation, startRotatePos]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (stickerRef.current) {
      const rect = stickerRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - (rect.top - scrollY)
      });
      setIsDragging(true);
    }
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setStartResizePos({ x: e.clientX, y: e.clientY });
    setStartResizeScale(scale);
  };

  const handleRotateStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (stickerRef.current) {
      const rect = stickerRef.current.getBoundingClientRect();
      setStartRotatePos({ x: e.clientX, y: e.clientY });
      setStartRotation(rotation);
      setIsRotating(true);
    }
  };

  return (
    <>
      {/* Líneas protectoras */}
      {(isDragging || isResizing || isRotating) && (
        <div className="fixed inset-0 pointer-events-none z-30">
          {/* Líneas y área protegida */}
          <div 
            className="absolute border-4 border-dashed border-red-500/40"
            style={{
              left: `${protectedArea.left}px`,
              top: `${protectedArea.top - window.scrollY}px`,
              width: `${protectedArea.right - protectedArea.left}px`,
              height: `${protectedArea.bottom - protectedArea.top}px`,
              borderRadius: '24px',
              backdropFilter: 'blur(1px)',
              WebkitBackdropFilter: 'blur(1px)',
              background: 'rgba(239, 68, 68, 0.02)'
            }}
          />
        </div>
      )}

      <div
        ref={stickerRef}
        className={`fixed select-none cursor-move group
          ${isInvalidPosition ? 'opacity-50' : ''}`}
        style={{
          left: position.x,
          top: `${position.y - window.scrollY}px`,
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
          zIndex: isDragging || isResizing || isRotating ? 9999 : 40
        }}
        onMouseDown={handleMouseDown}
      >
        <div 
          className="text-4xl filter drop-shadow-md"
          style={{
            transform: `scale(${scale})`
          }}
        >
          {emoji}
        </div>
        
        {/* Controles en un contenedor separado que no se escala */}
        <div 
          className="absolute inset-0 origin-center"
          style={{
            transform: `scale(${scale})`
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white 
              opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center
              hover:bg-red-600 shadow-lg"
            style={{
              transform: `scale(${1/scale})`
            }}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            onMouseDown={handleRotateStart}
            className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-white border-2 border-gray-300 
              opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer
              hover:border-blue-500"
            style={{
              transform: `scale(${1/scale})`
            }}
            title="Rotar"
          >
            <svg className="w-3 h-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-600" 
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>

          <button
            onMouseDown={handleResizeStart}
            className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-white border-2 border-gray-300 
              opacity-0 group-hover:opacity-100 transition-opacity cursor-se-resize
              hover:border-blue-500"
            style={{
              transform: `scale(${1/scale})`
            }}
            title="Redimensionar"
          >
            <svg className="w-3 h-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-600" 
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M4 20h16M4 20v-4m16 4v-4M4 12h16M4 12v-4m16 4v-4M4 4h16" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sticker; 