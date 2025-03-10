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
    return 'default';
  } catch {
    return 'default';
  }
};

const getIconBackground = (type: string) => {
  switch (type) {
    case 'github':
      return 'bg-[#24292e]';
    case 'twitter':
      return 'bg-[#1da1f2]';
    case 'facebook':
      return 'bg-[#1877f2]';
    case 'instagram':
      return 'bg-gradient-to-br from-[#405de6] via-[#e1306c] to-[#ffdc80]';
    case 'linkedin':
      return 'bg-[#0a66c2]';
    case 'youtube':
      return 'bg-[#ff0000]';
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

      {/* Delete Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDelete?.();
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="absolute top-3 right-3 p-1.5 rounded-full bg-black/5 hover:bg-red-500/90 transition-all duration-200 
          opacity-0 group-hover:opacity-100 z-50"
        title="Eliminar"
      >
        <svg className="w-3 h-3 text-black/60 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Content */}
      <div className="flex flex-col items-start gap-3">
        <URLIcon url={displayUrl} />
        <div className="flex flex-col gap-1 min-w-0">
          <div
            ref={titleRef}
            contentEditable
            suppressContentEditableWarning
            onBlur={handleTitleBlur}
            onKeyDown={handleKeyDown}
            onClick={(e) => {
              e.stopPropagation();
              titleRef.current?.focus();
            }}
            className="editable-content text-lg font-semibold text-gray-900 line-clamp-1"
          >
            {currentTitle}
          </div>
          <div className="text-sm text-gray-500 break-all line-clamp-1">
            {displayUrl}
          </div>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default URLCard; 