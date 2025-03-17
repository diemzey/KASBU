import { memo, useCallback, useState, useEffect, useRef } from 'react';
import { VideoCardProps } from '../../types';
import { BaseURLCard } from './BaseURLCard';

function VideoCardComponent({ children, onDelete, onVideoChange, videoUrl: initialVideoUrl }: VideoCardProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(initialVideoUrl || null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Actualizar el estado local cuando cambia el videoUrl del padre
  useEffect(() => {
    if (initialVideoUrl !== undefined) {
      setVideoUrl(initialVideoUrl);
    }
  }, [initialVideoUrl]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible) {
      video.play().catch(() => {
        // Manejo silencioso de errores de autoplay
      });
    } else {
      video.pause();
    }
  }, [isVisible]);

  const defaultVideo = "https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4";
  const currentVideo = videoUrl || defaultVideo;

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
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={currentVideo}
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
        />
      </div>
    </div>
  );
}

export const VideoCard = memo(VideoCardComponent); 