import { ReactNode } from 'react';

export type Platform = 'tiktok' | 'instagram' | 'facebook' | 'youtube' | 'twitter' | 'linkedin' | 'github' | 'twitch' | 'custom' | 'code' | 'qr' | 'map' | 'tv' | 'url' | 'image' | 'video' | 'amazon-product' | 'mercadolibre-product' | 'generic-product';

export type SocialPlatform = 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'twitter';

export type ShopPlatform = 'amazon' | 'mercadolibre' | 'generic';

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

export interface BaseSocialCardProps {
  children?: ReactNode;
  className?: string;
  icon: ReactNode;
  onDelete?: () => void;
  onTextChange?: (text: string) => void;
  buttonStyle?: string;
  buttonText?: string;
}

export interface SocialCardProps extends Omit<BaseSocialCardProps, 'icon' | 'className'> {
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

export interface ShopCardProps extends CardProps {
  productImage?: string;
  price?: string;
  rating?: number;
  reviews?: number;
  prime?: boolean;
  variant: ShopPlatform;
} 