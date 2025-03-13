import { useState, useEffect, useRef } from 'react';
import { URLCardProps } from '../../types';

const getFaviconUrl = (url: string) => {
  try {
    const urlObject = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${urlObject.hostname}&sz=128`;
  } catch {
    return null;
  }
};

const DefaultWebIcon = () => (
  <div className="p-2.5 rounded-lg bg-gray-100 transition-all duration-300
    shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(0,0,0,0.1)]
    hover:shadow-[inset_-1px_-1px_3px_rgba(255,255,255,0.7),inset_1px_1px_3px_rgba(0,0,0,0.1)]
    active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.7)]"
  >
    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" 
      />
    </svg>
  </div>
);

const getUrlType = (url: string) => {
  try {
    const urlObject = new URL(url);
    const hostname = urlObject.hostname;

    if (hostname.includes('github.com')) return 'github';
    if (hostname.includes('twitter.com')) return 'twitter';
    if (hostname.includes('facebook.com')) return 'facebook';
    if (hostname.includes('instagram.com')) return 'instagram';
    if (hostname.includes('linkedin.com')) return 'linkedin';
    if (hostname.includes('youtube.com')) return 'youtube';
    if (hostname.includes('twitch.tv')) return 'twitch';
    if (hostname.includes('discord.gg') || hostname.includes('discord.com')) return 'discord';
    if (hostname.includes('spotify.com')) return 'spotify';
    return 'default';
  } catch {
    return 'default';
  }
};

const getIconBackground = (type: string) => {
  switch (type) {
    case 'github':
      return 'bg-slate-100';
    case 'twitter':
      return 'bg-sky-100';
    case 'facebook':
      return 'bg-blue-100';
    case 'instagram':
      return 'bg-gradient-to-br from-fuchsia-100 via-pink-100 to-orange-100';
    case 'linkedin':
      return 'bg-indigo-100';
    case 'youtube':
      return 'bg-rose-100';
    case 'spotify':
      return 'bg-green-100';
    case 'twitch':
      return 'bg-purple-100';
    case 'discord':
      return 'bg-violet-100';
    default:
      return 'bg-gray-100';
  }
};

const URLIcon = ({ url }: { url?: string }) => {
  const [faviconUrl, setFaviconUrl] = useState<string | null>(null);
  const [useDuckDuckGo, setUseDuckDuckGo] = useState(false);
  const [hasError, setHasError] = useState(false);
  const urlType = url ? getUrlType(url) : 'default';

  useEffect(() => {
    if (url) {
      const favicon = getFaviconUrl(url);
      setFaviconUrl(favicon);
      setHasError(false);
      setUseDuckDuckGo(false);
    }
  }, [url]);

  const handleImageError = () => {
    if (!useDuckDuckGo && url) {
      try {
        const urlObject = new URL(url);
        setFaviconUrl(`https://icons.duckduckgo.com/ip3/${urlObject.hostname}.ico`);
        setUseDuckDuckGo(true);
      } catch {
        setHasError(true);
        setFaviconUrl(null);
      }
    } else {
      setHasError(true);
      setFaviconUrl(null);
    }
  };

  if (!faviconUrl || hasError) {
    return <DefaultWebIcon />;
  }

  return (
    <div className={`p-2.5 rounded-lg ${getIconBackground(urlType)} transition-all duration-300
      shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(0,0,0,0.1)]
      hover:shadow-[inset_-1px_-1px_3px_rgba(255,255,255,0.7),inset_1px_1px_3px_rgba(0,0,0,0.1)]
      active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.7)]`}
    >
      <img 
        src={faviconUrl} 
        alt="Favicon" 
        className="w-6 h-6 rounded-md object-contain transition-transform duration-300
          group-hover:scale-105 group-active:scale-95"
        onError={handleImageError}
      />
    </div>
  );
};

export const URLCard = ({ children, onDelete, url, title, onTitleChange }: URLCardProps) => {
  const displayUrl = url || children?.toString() || 'https://ejemplo.com';
  const [currentTitle, setCurrentTitle] = useState(title || 'Título del sitio web');
  const titleRef = useRef<HTMLDivElement>(null);

  const handleTitleBlur = () => {
    const newText = titleRef.current?.innerText || '';
    setCurrentTitle(newText || 'Título del sitio web');
    onTitleChange?.(newText);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      titleRef.current?.blur();
    }
  };
  
  return (
    <div className="relative w-full h-full rounded-2xl bg-white p-6 transition-all duration-300 ease-out 
      shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_8px_16px_-4px_rgba(0,0,0,0.1)]
      cursor-pointer flex flex-col group overflow-hidden">

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <div
          ref={titleRef}
          contentEditable
          suppressContentEditableWarning
          onBlur={handleTitleBlur}
          onKeyDown={handleKeyDown}
          className="text-lg font-semibold text-gray-900 mb-2 outline-none empty:before:content-[Título_del_sitio_web] empty:before:text-gray-400"
        >
          {currentTitle}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <a 
            href={displayUrl.startsWith('http') ? displayUrl : `https://${displayUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 transition-colors truncate"
            onClick={(e) => e.stopPropagation()}
          >
            {displayUrl}
          </a>
        </div>
      </div>
    </div>
  );
};

export default URLCard; 