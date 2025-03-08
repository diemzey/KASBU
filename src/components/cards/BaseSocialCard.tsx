import { ReactNode } from 'react';

export interface BaseSocialCardProps {
  children?: ReactNode;
  onDelete?: () => void;
  className?: string;
  icon: ReactNode;
}

export const BaseSocialCard = ({ children, onDelete, className = '', icon }: BaseSocialCardProps) => {
  return (
    <div 
      className={`relative w-full h-full rounded-2xl text-white p-6 transition-all duration-300 ease-out 
        shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_4px_20px_-4px_rgba(0,0,0,0.1)] backdrop-blur-sm
        hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_8px_40px_-8px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.1)_inset]
        active:scale-[0.98] active:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_2px_10px_-2px_rgba(0,0,0,0.1)]
        cursor-pointer flex flex-col items-center justify-center gap-4 group ${className}`}
      onMouseDown={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest('button')) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDelete?.();
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="absolute top-3 right-3 p-2 rounded-full bg-black/10 backdrop-blur-md 
          hover:bg-red-500/90 transition-all duration-200 opacity-0 group-hover:opacity-100 z-50
          shadow-[0_2px_8px_-2px_rgba(0,0,0,0.2),inset_0_0_0_1px_rgba(255,255,255,0.15)]"
        title="Eliminar"
      >
        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="text-3xl mb-1">
        {icon}
      </div>
      <div className="text-sm font-medium tracking-wide text-center opacity-90">
        {children}
      </div>
    </div>
  );
}; 