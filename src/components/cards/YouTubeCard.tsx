import { BaseSocialCard, BaseSocialCardProps } from './BaseSocialCard';

type YouTubeCardProps = Omit<BaseSocialCardProps, 'className' | 'icon'>;

const YouTubeIcon = () => (
  <svg className="w-8 h-8 opacity-90" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export const YouTubeCard = ({ children, onDelete }: YouTubeCardProps) => {
  return (
    <BaseSocialCard
      icon={<YouTubeIcon />}
      onDelete={onDelete}
      className="bg-gradient-to-br from-[#FF0000] to-[#CC0000] hover:from-[#E60000] hover:to-[#B30000]
        after:absolute after:inset-0 after:rounded-2xl after:opacity-0 after:transition-opacity
        after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]
        hover:after:opacity-100"
    >
      {children}
    </BaseSocialCard>
  );
}; 