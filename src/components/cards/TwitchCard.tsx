import { memo, useCallback, useEffect, useState } from 'react';
import { BaseSocialCardProps } from '../../types';

const TwitchIcon = () => (
  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#9146FF] to-[#6441A4] flex items-center justify-center shadow-lg">
    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
    </svg>
  </div>
);

const mockPosts = [
  'https://source.unsplash.com/random/800x600?gaming',
  'https://source.unsplash.com/random/800x600?stream',
  'https://source.unsplash.com/random/800x600?esports'
];

function TwitchCardComponent({ children, onDelete, size, onTextChange }: BaseSocialCardProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(children);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [username, setUsername] = useState('@usuario');

  useEffect(() => {
    setTitle(children);
  }, [children]);

  const handleBlurTitle = useCallback(() => {
    setIsEditingTitle(false);
    if (onTextChange) {
      onTextChange(title);
    }
  }, [title, onTextChange]);

  const handleBlurUsername = useCallback(() => {
    setIsEditingUsername(false);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      (e.target as HTMLElement).blur();
    }
  }, []);

  return (
    <div className="w-full h-full p-6 flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <TwitchIcon />
        <div className="flex-1 flex flex-col gap-1">
          <div
            className="text-lg font-medium leading-tight cursor-text"
            onClick={() => setIsEditingTitle(true)}
          >
            {isEditingTitle ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleBlurTitle}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none outline-none p-0 focus:ring-0"
                autoFocus
              />
            ) : (
              title
            )}
          </div>
          <div
            className="text-sm text-gray-500 cursor-text"
            onClick={() => setIsEditingUsername(true)}
          >
            {isEditingUsername ? (
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={handleBlurUsername}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none outline-none p-0 focus:ring-0"
                autoFocus
              />
            ) : (
              username
            )}
          </div>
        </div>
      </div>
      {size?.w === 2 && (
        <div className="grid grid-cols-2 gap-2 mt-2">
          {mockPosts.slice(0, 2).map((url, index) => (
            <div key={index} className="aspect-video rounded-lg overflow-hidden bg-gray-100">
              <img src={url} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}
      {size?.w === 1 && size?.h === 2 && (
        <div className="flex-1 grid grid-cols-1 gap-2 mt-2">
          {mockPosts.map((url, index) => (
            <div key={index} className="aspect-video rounded-lg overflow-hidden bg-gray-100">
              <img src={url} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export const TwitchCard = memo(TwitchCardComponent); 