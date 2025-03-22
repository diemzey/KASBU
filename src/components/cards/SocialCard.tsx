import { memo } from 'react';
import { BaseURLCard } from './BaseURLCard';
import { SocialCardProps, SocialPlatform } from '../../types';

const platformConfig: Record<SocialPlatform, {
  icon: JSX.Element;
  defaultText: string;
  color: string;
  bgTint: string;
  buttonStyle: string;
  buttonText: string;
  baseUrl: string;
}> = {
  facebook: {
    icon: (
      <div className="w-full h-full bg-gradient-to-br from-white to-[#EEF4FF] flex items-center justify-center rounded-xl shadow-[inset_2px_2px_4px_rgba(24,119,242,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.7)]">
        <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </div>
    ),
    defaultText: 'Facebook',
    color: 'text-[#1877F2]',
    bgTint: 'bg-gradient-to-br from-white to-[#EEF4FF]',
    buttonStyle: 'bg-[#1877F2] hover:bg-[#0C63D4] active:bg-[#1567E0]',
    buttonText: 'Add Friend',
    baseUrl: 'https://facebook.com/'
  },
  instagram: {
    icon: (
      <div className="w-full h-full bg-gradient-to-br from-white to-[#FFE7F4] flex items-center justify-center rounded-xl shadow-[inset_2px_2px_4px_rgba(228,64,95,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.7)]">
        <svg className="w-5 h-5 text-[#E4405F]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </div>
    ),
    defaultText: 'Instagram',
    color: 'text-[#E4405F]',
    bgTint: 'bg-gradient-to-br from-white to-[#FFF0F7]',
    buttonStyle: 'bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] hover:from-[#E37A24] hover:via-[#C42569] hover:to-[#722D9B] active:from-[#D97323] active:via-[#B72361] active:to-[#682B91]',
    buttonText: 'Follow',
    baseUrl: 'https://instagram.com/'
  },
  tiktok: {
    icon: (
      <div className="w-full h-full bg-gradient-to-br from-white to-[#F0FEFF] flex items-center justify-center rounded-xl shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.9)]">
        <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      </div>
    ),
    defaultText: 'TikTok',
    color: 'text-black',
    bgTint: 'bg-gradient-to-br from-white to-[#F0FEFF]',
    buttonStyle: 'bg-black hover:bg-gray-900 active:bg-gray-800',
    buttonText: 'Follow',
    baseUrl: 'https://tiktok.com/@'
  },
  youtube: {
    icon: (
      <div className="w-full h-full bg-gradient-to-br from-white to-[#FFE7E7] flex items-center justify-center rounded-xl shadow-[inset_2px_2px_4px_rgba(255,0,0,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.7)]">
        <svg className="w-5 h-5 text-[#FF0000]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      </div>
    ),
    defaultText: 'YouTube',
    color: 'text-[#FF0000]',
    bgTint: 'bg-gradient-to-br from-white to-[#FFF0F0]',
    buttonStyle: 'bg-[#FF0000] hover:bg-[#D90000] active:bg-[#CC0000]',
    buttonText: 'Subscribe',
    baseUrl: 'https://youtube.com/@'
  },
  twitter: {
    icon: (
      <div className="w-full h-full bg-gradient-to-br from-white to-[#E8F5FF] flex items-center justify-center rounded-xl shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.9)]">
        <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </div>
    ),
    defaultText: 'Twitter',
    color: 'text-black',
    bgTint: 'bg-gradient-to-br from-white to-[#F0F9FF]',
    buttonStyle: 'bg-black hover:bg-gray-900 active:bg-gray-800',
    buttonText: 'Follow',
    baseUrl: 'https://twitter.com/'
  },
  pinterest: {
    icon: (
      <div className="w-full h-full bg-gradient-to-br from-white to-[#FFE7EA] flex items-center justify-center rounded-xl shadow-[inset_2px_2px_4px_rgba(230,0,35,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.7)]">
        <svg className="w-5 h-5 text-[#E60023]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
        </svg>
      </div>
    ),
    defaultText: 'Pinterest',
    color: 'text-[#E60023]',
    bgTint: 'bg-gradient-to-br from-white to-[#FFE7EA]',
    buttonStyle: 'bg-[#E60023] hover:bg-[#CC001F] active:bg-[#B3001B]',
    buttonText: 'Save',
    baseUrl: 'https://pinterest.com/'
  },
  linkedin: {
    icon: (
      <div className="w-full h-full bg-gradient-to-br from-white to-[#E7F3FF] flex items-center justify-center rounded-xl shadow-[inset_2px_2px_4px_rgba(0,119,181,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.7)]">
        <svg className="w-5 h-5 text-[#0077B5]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </div>
    ),
    defaultText: 'LinkedIn',
    color: 'text-[#0077B5]',
    bgTint: 'bg-gradient-to-br from-white to-[#E7F3FF]',
    buttonStyle: 'bg-[#0077B5] hover:bg-[#006396] active:bg-[#005582]',
    buttonText: 'Connect',
    baseUrl: 'https://linkedin.com/in/'
  },
  github: {
    icon: (
      <div className="w-full h-full bg-gradient-to-br from-white to-[#F0F0F0] flex items-center justify-center rounded-xl shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.7)]">
        <svg className="w-5 h-5 text-[#24292F]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      </div>
    ),
    defaultText: 'GitHub',
    color: 'text-[#24292F]',
    bgTint: 'bg-gradient-to-br from-white to-[#F0F0F0]',
    buttonStyle: 'bg-[#24292F] hover:bg-[#1B1F23] active:bg-[#1B1F23]',
    buttonText: 'Follow',
    baseUrl: 'https://github.com/'
  },
  twitch: {
    icon: (
      <div className="w-full h-full bg-gradient-to-br from-white to-[#F0E7FF] flex items-center justify-center rounded-xl shadow-[inset_2px_2px_4px_rgba(100,65,165,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.7)]">
        <svg className="w-5 h-5 text-[#6441A5]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
        </svg>
      </div>
    ),
    defaultText: 'Twitch',
    color: 'text-[#6441A5]',
    bgTint: 'bg-gradient-to-br from-white to-[#F0E7FF]',
    buttonStyle: 'bg-[#6441A5] hover:bg-[#563A8F] active:bg-[#4C347D]',
    buttonText: 'Follow',
    baseUrl: 'https://twitch.tv/'
  },
  discord: {
    icon: (
      <div className="w-full h-full bg-gradient-to-br from-white to-[#E7E9FF] flex items-center justify-center rounded-xl shadow-[inset_2px_2px_4px_rgba(88,101,242,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.7)]">
        <svg className="w-5 h-5 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      </div>
    ),
    defaultText: 'Discord',
    color: 'text-[#5865F2]',
    bgTint: 'bg-gradient-to-br from-white to-[#E7E9FF]',
    buttonStyle: 'bg-[#5865F2] hover:bg-[#4752C4] active:bg-[#3C45A5]',
    buttonText: 'Join',
    baseUrl: 'https://discord.gg/'
  },
  spotify: {
    icon: (
      <div className="w-full h-full bg-gradient-to-br from-white to-[#E7FFE7] flex items-center justify-center rounded-xl shadow-[inset_2px_2px_4px_rgba(30,215,96,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.7)]">
        <svg className="w-5 h-5 text-[#1ED760]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      </div>
    ),
    defaultText: 'Spotify',
    color: 'text-[#1ED760]',
    bgTint: 'bg-gradient-to-br from-white to-[#E7FFE7]',
    buttonStyle: 'bg-[#1ED760] hover:bg-[#1DB954] active:bg-[#1AA34A]',
    buttonText: 'Follow',
    baseUrl: 'https://open.spotify.com/user/'
  },
  behance: {
    icon: (
      <div className="w-full h-full bg-gradient-to-br from-white to-[#E7E7FF] flex items-center justify-center rounded-xl shadow-[inset_2px_2px_4px_rgba(0,87,255,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.7)]">
        <svg className="w-5 h-5 text-[#0057FF]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 7h-7V2H9v5H2v15h20V7zM9 13.47c0 .43-.15.77-.46 1.03-.31.25-.75.38-1.32.38H5.94v2.24H4.12V9.91h3.13c.56 0 .99.12 1.3.35.31.24.46.57.46 1v2.21zm7.05 1.6c0 .71-.21 1.32-.62 1.82s-.97.87-1.68 1.1c-.71.23-1.51.35-2.4.35H8.02V9.91h3.77c1.14 0 2.11.23 2.91.69.8.46 1.19 1.18 1.19 2.16 0 .46-.12.87-.35 1.21-.23.35-.57.6-1.02.77.6.16 1.05.46 1.35.89.3.43.45.95.45 1.56v.88zm3.43-2.63c0 .71-.17 1.31-.52 1.8-.35.49-.89.74-1.62.74-.74 0-1.28-.25-1.63-.74-.35-.49-.52-1.09-.52-1.8 0-.72.17-1.33.52-1.82.35-.49.89-.74 1.63-.74.73 0 1.27.25 1.62.74.35.49.52 1.1.52 1.82zm-.57-4.56h-3.86V6.41h3.86v1.47z"/>
        </svg>
      </div>
    ),
    defaultText: 'Behance',
    color: 'text-[#0057FF]',
    bgTint: 'bg-gradient-to-br from-white to-[#E7E7FF]',
    buttonStyle: 'bg-[#0057FF] hover:bg-[#004CE6] active:bg-[#0042CC]',
    buttonText: 'Follow',
    baseUrl: 'https://behance.net/'
  },
  dribbble: {
    icon: (
      <div className="w-full h-full bg-gradient-to-br from-white to-[#FFE7F4] flex items-center justify-center rounded-xl shadow-[inset_2px_2px_4px_rgba(234,76,137,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.7)]">
        <svg className="w-5 h-5 text-[#EA4C89]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.372 0 0 5.373 0 12c0 6.627 5.372 12 12 12s12-5.373 12-12c0-6.627-5.372-12-12-12zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073-.244-.563-.497-1.125-.767-1.68 2.31-1 4.165-2.358 5.548-4.082 1.35 1.594 2.197 3.619 2.322 5.835zm-3.842-7.282c-1.205 1.554-2.868 2.783-4.986 3.68-1.016-1.861-2.178-3.676-3.488-5.438.779-.197 1.591-.314 2.431-.314 2.275 0 4.368.779 6.043 2.072zm-10.516-.993c1.331 1.742 2.511 3.538 3.537 5.381-2.43.715-5.331 1.082-8.684 1.105.692-2.835 2.601-5.193 5.147-6.486zM1.333 12c0-.076.008-.152.01-.228 3.767-.072 7.108-.526 10.024-1.363.222.475.475.951.653 1.43-3.596 1.123-6.425 3.446-8.573 7.075-1.318-1.984-2.114-4.364-2.114-6.914zm4.481 8.292c1.97-3.39 4.536-5.535 7.896-6.479.849 2.204 1.497 4.466 1.953 6.783-1.089.438-2.278.68-3.514.68-2.4 0-4.605-.893-6.335-2.984zm7.96 2.455c-.438-2.269-1.07-4.48-1.895-6.635 1.952-.293 4.106-.248 6.471.169-.418 2.418.27.43.72.79.79 1.215.79.3 0 1.275-.24 1.62-.72.45-.48.87-1.486 1.17-.615.315-1.215.472-1.8.472-.915 0-1.686-.27-2.31-.795-.615-.524-.524-.927-1.28-.927-2.28v-.15zm3.098-5.874c-.75.03-1.395.27-1.92.72-.526.45-.79 1.065-.79 1.845v.465c0 .856.275 1.47.826 1.845.55.374 1.198.555 1.939.555.78 0 1.425-.24 1.935-.704.51-.466.766-1.05.766-1.755v-2.76c-.706.016-1.685.076-2.756.18v.01zM15.72 17.33c.05-.12.198-.157.438-.124 3.75.48 7.24.018 10.47-1.383.215-.09.383-.09.504.014.165.104.24.255.24.45-.006.18-.096.334-.27.465-1.275.914-2.695 1.575-4.26 2.01-4.26 1.56.435-3.164.645-4.798.645-1.754 0-3.48-.255-5.18-.765-.18-.06-.27-.164-.27-.314 0-.09.045-.176.135-.256.09-.075.195-.135.3-.18l2.52-.435c.21-.03.375-.016.495.045.12.045.21.14.27.27.09.195.21.375.36.54.144.18.33.307.54.39.21.08.48.15.81.195.33.045.615.064.855.064.435 0 .885-.034 1.35-.104a4.688 4.688 0 001.215-.315l-.016-.015z"/>
        </svg>
      </div>
    ),
    defaultText: 'Dribbble',
    color: 'text-[#EA4C89]',
    bgTint: 'bg-gradient-to-br from-white to-[#FFE7F4]',
    buttonStyle: 'bg-[#EA4C89] hover:bg-[#E62A72] active:bg-[#D91A62]',
    buttonText: 'Follow',
    baseUrl: 'https://dribbble.com/'
  },
  medium: {
    icon: (
      <div className="w-full h-full bg-gradient-to-br from-white to-[#F0F0F0] flex items-center justify-center rounded-xl shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.7)]">
        <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
        </svg>
      </div>
    ),
    defaultText: 'Medium',
    color: 'text-black',
    bgTint: 'bg-gradient-to-br from-white to-[#F0F0F0]',
    buttonStyle: 'bg-black hover:bg-gray-900 active:bg-gray-800',
    buttonText: 'Follow',
    baseUrl: 'https://medium.com/@'
  },
  dev: {
    icon: (
      <div className="w-full h-full bg-gradient-to-br from-white to-[#F0F0F0] flex items-center justify-center rounded-xl shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.7)]">
        <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.3zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z"/>
        </svg>
      </div>
    ),
    defaultText: 'Dev.to',
    color: 'text-black',
    bgTint: 'bg-gradient-to-br from-white to-[#F0F0F0]',
    buttonStyle: 'bg-black hover:bg-gray-900 active:bg-gray-800',
    buttonText: 'Follow',
    baseUrl: 'https://dev.to/'
  },
  stackoverflow: {
    icon: (
      <div className="w-full h-full bg-gradient-to-br from-white to-[#FFE7E0] flex items-center justify-center rounded-xl shadow-[inset_2px_2px_4px_rgba(244,128,36,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.7)]">
        <svg className="w-5 h-5 text-[#F48024]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.986 21.865v-6.404h2.134V24H1.844v-8.539h2.13v6.404h15.012zM6.111 19.731H16.85v-2.137H6.111v2.137zm.259-4.852l10.48 2.189.451-2.07-10.478-2.187-.453 2.068zm1.359-5.056l9.705 4.53.903-1.95-9.706-4.53-.902 1.95zm2.715-4.785l8.217 6.855 1.359-1.62-8.216-6.853-1.35 1.618zM15.751 0l-1.746 1.294 6.405 8.604 1.746-1.294L15.749 0h.002z"/>
        </svg>
      </div>
    ),
    defaultText: 'Stack Overflow',
    color: 'text-[#F48024]',
    bgTint: 'bg-gradient-to-br from-white to-[#FFE7E0]',
    buttonStyle: 'bg-[#F48024] hover:bg-[#DA721F] active:bg-[#C1651C]',
    buttonText: 'Follow',
    baseUrl: 'https://stackoverflow.com/users/'
  },
  amazon: {
    icon: (
      <div className="w-full h-full bg-gradient-to-br from-white to-[#FEEBDC] flex items-center justify-center rounded-xl shadow-[inset_2px_2px_4px_rgba(255,153,0,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.7)]">
        <svg className="w-5 h-5 text-[#FF9900]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.174.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726a17.617 17.617 0 01-10.951-.577 17.88 17.88 0 01-5.43-3.35c-.1-.074-.151-.15-.151-.22 0-.047.021-.09.021-.09.051-.13zm6.565-6.218c0-1.005.247-1.863.743-2.577.495-.71 1.17-1.25 2.04-1.615.796-.335 1.756-.575 2.912-.72.39-.046 1.033-.103 1.92-.174v-.37c0-.93-.105-1.558-.3-1.875-.302-.43-.78-.65-1.44-.65h-.182c-.48.046-.896.196-1.246.45-.35.35.256-.575.586-.66.993-.06.26-.206.4-.435.42l-2.52-.315c.21-.03.375-.016.495.045.12.045.21.14.27.27.09.195.21.375.36.54.144.18.33.307.54.39.21.08.48.15.81.195.33.045.615.064.855.064.435 0 .885-.034 1.35-.104a4.688 4.688 0 001.215-.315l-.016-.015z"/>
        </svg>
      </div>
    ),
    defaultText: 'Amazon',
    color: 'text-[#FF9900]',
    bgTint: 'bg-gradient-to-br from-white to-[#FEEBDC]',
    buttonStyle: 'bg-[#FF9900] hover:bg-[#E68A00] active:bg-[#CC7A00]',
    buttonText: 'Comprar',
    baseUrl: 'https://amazon.com/'
  },
  mercadolibre: {
    icon: (
      <div className="w-full h-full bg-gradient-to-br from-white to-[#FFF9CC] flex items-center justify-center rounded-xl shadow-[inset_2px_2px_4px_rgba(255,230,0,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.7)]">
        <svg className="w-5 h-5 text-[#2D3277]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.372 0 0 5.373 0 12c0 6.628 5.372 12 12 12s12-5.372 12-12c0-6.627-5.372-12-12-12zm0 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25zm4.5 7.5h-9v4.5h9v-4.5z"/>
        </svg>
      </div>
    ),
    defaultText: 'MercadoLibre',
    color: 'text-[#2D3277]',
    bgTint: 'bg-gradient-to-br from-white to-[#FFF9CC]',
    buttonStyle: 'bg-[#3483FA] hover:bg-[#2968C8] active:bg-[#1259C3]',
    buttonText: 'Comprar',
    baseUrl: 'https://mercadolibre.com/'
  }
};

const SocialCardComponent = ({
  platform,
  children,
  isEditorMode = true,
  description,
  ...props
}: SocialCardProps) => {
  const config = platformConfig[platform];
  const normalizedDescription = description ?? children?.toString().toLowerCase();
  const username = children?.toString().replace('@', '') || '';
  const url = `${config.baseUrl}${username}`;
  
  return (
    <BaseURLCard
      icon={config.icon}
      className={`${config.bgTint} ${config.color}`}
      buttonStyle={config.buttonStyle}
      buttonText={config.buttonText}
      description={normalizedDescription}
      isEditorMode={isEditorMode}
      url={url}
      size={{ w: 1, h: 1 }}
      {...props}
    >
      {children || config.defaultText}
    </BaseURLCard>
  );
};

export const SocialCard = memo(SocialCardComponent);
export default SocialCard; 