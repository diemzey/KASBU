import { memo, useCallback, useEffect, useState } from 'react';
import { BaseSocialCardProps } from '../../types';

const LinkedInIcon = () => (
  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0077B5] to-[#0A66C2] flex items-center justify-center shadow-lg">
    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  </div>
);

const mockPosts = [
  'https://source.unsplash.com/random/800x600?business',
  'https://source.unsplash.com/random/800x600?office',
  'https://source.unsplash.com/random/800x600?professional'
];

function LinkedInCardComponent({ children, onDelete, size, onTextChange }: BaseSocialCardProps) {
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
        <LinkedInIcon />
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

export const LinkedInCard = memo(LinkedInCardComponent); 