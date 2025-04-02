import { ReactNode } from 'react';
import { Platform } from './platforms';
import { GradientType, Size } from './common';

export interface CardData {
  id: string;
  platform: Platform;
  w: number;
  h: number;
  title?: string;
  text?: string;
  description?: string;
  gradient?: GradientType;
  command?: string;
  url?: string;
  lat?: number;
  lng?: number;
  zoom?: number;
  videoId?: string;
  imageUrl?: string;
  videoUrl?: string;
}

export interface BaseURLCardProps {
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
  onDelete?: () => void;
  onTextChange?: (text: string) => void;
  buttonStyle?: string;
  buttonText?: string;
  size?: Size;
  description?: string;
  imageUrl?: string;
  onImageChange?: (imageUrl: string | null) => void;
  isEditorMode?: boolean;
  url?: string;
}

export interface CardProps {
  children?: ReactNode;
  onDelete?: () => void;
  size?: Size;
  onTextChange?: (text: string) => void;
  onTitleChange?: (title: string) => void;
  title?: string;
} 