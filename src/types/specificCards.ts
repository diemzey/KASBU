import { CardProps, BaseURLCardProps } from './baseCards';
import { SocialPlatform } from './platforms';
import { GradientType } from './common';

export interface SocialCardProps extends Omit<BaseURLCardProps, 'icon' | 'className'> {
  platform: SocialPlatform;
  isEditorMode?: boolean;
}

export interface CustomCardProps extends CardProps {
  gradient?: GradientType;
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
  isEditorMode?: boolean;
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
  isEditorMode?: boolean;
}

export interface ShopCardProps extends CardProps {
  productId?: string;
  platform?: 'amazon' | 'amazon-product';
} 