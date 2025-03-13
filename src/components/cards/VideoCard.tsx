import { memo, useCallback, useState, useEffect, useRef } from 'react';
import { VideoCardProps } from '../../types';
import { BaseSocialCard } from './BaseSocialCard';

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
    <BaseSocialCard
      icon={<></>}
      onDelete={onDelete}
      className="bg-black group relative overflow-hidden"
    >
      <div className="absolute inset-0">
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
    </BaseSocialCard>
  );
}

export const VideoCard = memo(VideoCardComponent); 