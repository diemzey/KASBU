import { ReactNode } from 'react';

export type Platform = 'tiktok' | 'instagram' | 'facebook' | 'youtube' | 'linkedin' | 'github' | 'twitch' | 'custom' | 'code' | 'qr' | 'map' | 'tv' | 'url' | 'image';

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
}

export type CustomCardProps = {
  children?: ReactNode;
  onDelete?: () => void;
  title?: string;
  text?: string;
  onTitleChange?: (text: string) => void;
  onTextChange?: (text: string) => void;
}

export type URLCardProps = Omit<BaseSocialCardProps, 'className' | 'icon'> & {
  url?: string;
  title?: string;
  onTitleChange?: (text: string) => void;
}

export type TikTokCardProps = Omit<BaseSocialCardProps, 'className' | 'icon'> & {
  size?: { w: number; h: number };
  onTitleChange?: (text: string) => void;
  onUsernameChange?: (text: string) => void;
  title?: string;
}

export type CodeCardProps = Omit<BaseSocialCardProps, 'className' | 'icon'> & {
  command?: string;
}

export type QRCardProps = Omit<BaseSocialCardProps, 'className' | 'icon'> & {
  url?: string;
  title?: string;
}

export type MapCardProps = Omit<BaseSocialCardProps, 'className' | 'icon'> & {
  lat?: number;
  lng?: number;
  title?: string;
  zoom?: number;
}

export type TVCardProps = Omit<BaseSocialCardProps, 'className' | 'icon'> & {
  videoId?: string;
  onTextChange?: (text: string) => void;
  onVideoChange?: (videoId: string) => void;
};

export type ImageCardProps = Omit<BaseSocialCardProps, 'className' | 'icon'> & {
  imageUrl?: string;
  onImageChange?: (imageUrl: string) => void;
}; 