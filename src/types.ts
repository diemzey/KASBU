import { ReactNode } from 'react';

export type Platform = 'tiktok' | 'instagram' | 'facebook' | 'youtube' | 'twitter' | 'pinterest' | 'linkedin' | 'github' | 'twitch' | 'discord' | 'spotify' | 'behance' | 'dribbble' | 'medium' | 'dev' | 'stackoverflow' | 'custom' | 'code' | 'qr' | 'map' | 'tv' | 'url' | 'image' | 'video';

export type SocialPlatform = 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'pinterest' | 'linkedin' | 'github' | 'twitch' | 'discord' | 'spotify' | 'behance' | 'dribbble' | 'medium' | 'dev' | 'stackoverflow';

export interface CardData {
  id: string;
  platform: Platform;
  w: number;
  h: number;
  title?: string;
  text?: string;
  gradient?: 'blue' | 'purple' | 'green' | 'orange' | 'pink';
  command?: string;
  url?: string;
  lat?: number;
  lng?: number;
  zoom?: number;
  videoId?: string;
  imageUrl?: string;
}

export interface BaseURLCardProps {
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
  onDelete?: () => void;
  onTextChange?: (text: string) => void;
  buttonStyle?: string;
  buttonText?: string;
  size?: { w: number; h: number };
  description?: string;
  imageUrl?: string;
  onImageChange?: (imageUrl: string | null) => void;
}

export interface SocialCardProps extends Omit<BaseURLCardProps, 'icon' | 'className'> {
  platform: SocialPlatform;
}

export interface CardProps {
  children?: ReactNode;
  onDelete?: () => void;
  size?: { w: number; h: number };
  onTextChange?: (text: string) => void;
  onTitleChange?: (title: string) => void;
  title?: string;
}

export interface CustomCardProps extends CardProps {
  gradient?: 'blue' | 'purple' | 'green' | 'orange' | 'pink';
}

export interface CodeCardProps extends CardProps {
  command?: string;
}

export interface QRCardProps extends CardProps {
  url?: string;
}

export interface MapCardProps extends CardProps {
  lat?: number;
  lng?: number;
  zoom?: number;
}

export interface TVCardProps extends CardProps {
  videoId?: string;
  onVideoChange?: (videoId: string) => void;
}

export interface URLCardProps extends CardProps {
  url?: string;
}

export interface ImageCardProps extends CardProps {
  imageUrl?: string;
  onImageChange?: (imageUrl: string) => void;
}

export interface VideoCardProps extends CardProps {
  videoUrl?: string;
  onVideoChange?: (videoUrl: string) => void;
} 