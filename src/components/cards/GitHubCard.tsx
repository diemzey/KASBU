import { memo, useCallback, useEffect, useState } from 'react';
import { BaseSocialCardProps } from '../../types';

const GitHubIcon = () => (
  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#24292e] to-[#1a1e22] flex items-center justify-center shadow-lg">
    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
  </div>
);

const mockPosts = [
  'https://source.unsplash.com/random/800x600?code',
  'https://source.unsplash.com/random/800x600?programming',
  'https://source.unsplash.com/random/800x600?developer'
];

function GitHubCardComponent({ children, onDelete, size, onTextChange }: BaseSocialCardProps) {
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
        <GitHubIcon />
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

export const GitHubCard = memo(GitHubCardComponent); 