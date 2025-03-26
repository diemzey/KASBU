import React from 'react';

interface LoadingModalProps {
  isOpen: boolean;
  message?: string;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen, message = "Cargando..." }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay con efecto de desenfoque */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />
      
      {/* Contenedor del modal */}
      <div className="relative bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center gap-4
        animate-fade-in border border-gray-100">
        {/* Spinner */}
        <div className="relative">
          {/* Anillo exterior */}
          <div className="w-12 h-12 border-4 border-blue-600/20 rounded-full animate-spin" />
          {/* Arco de progreso */}
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-blue-600 rounded-full animate-spin" />
        </div>
        
        {/* Mensaje */}
        <p className="text-gray-700 font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingModal; 