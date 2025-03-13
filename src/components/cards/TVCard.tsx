import { memo, useCallback, useState, useEffect } from 'react';
import { TVCardProps } from '../../types';
import { BaseSocialCard } from './BaseSocialCard';

export const TVCard = memo(({ children, onDelete, videoId: initialVideoId, onVideoChange }: TVCardProps) => {
  const [videoId, setVideoId] = useState(initialVideoId || '');

  useEffect(() => {
    setVideoId(initialVideoId || '');
  }, [initialVideoId]);

  return (
    <BaseSocialCard
      icon={<></>}
      onDelete={onDelete}
      className="bg-black group relative overflow-hidden"
    >
      <div className="absolute inset-0">
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
    </BaseSocialCard>
  );
}); 