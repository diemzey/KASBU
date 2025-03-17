import { memo, useCallback, useState, useEffect } from 'react';
import { TVCardProps } from '../../types';
import { BaseSocialCard } from './BaseSocialCard';

export const TVCard = memo(({ children, onDelete, videoId: initialVideoId, onVideoChange }: TVCardProps) => {
  const [videoId, setVideoId] = useState(initialVideoId || '');

  useEffect(() => {
    setVideoId(initialVideoId || '');
  }, [initialVideoId]);

  return (
    <div className="w-full h-full bg-black rounded-[1.5rem] relative overflow-hidden group">
      {/* Botón de eliminar */}
      {onDelete && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete();
          }}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-black/20 hover:bg-red-500/90 transition-all 
            opacity-0 group-hover:opacity-100 z-50"
          title="Eliminar"
        >
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Contenedor del video */}
      <div className="absolute inset-0 w-full h-full">
        {videoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-white/60">
              Pega el ID o URL del video
            </p>
          </div>
        )}
      </div>
    </div>
  );
}); 