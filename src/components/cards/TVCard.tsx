import { BaseSocialCard, BaseSocialCardProps } from './BaseSocialCard';

type TVCardProps = Omit<BaseSocialCardProps, 'className' | 'icon'> & {
  videoId?: string;
  title?: string;
};

const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url?.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const TVControls = () => (
  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-gradient-to-b from-neutral-700 to-neutral-800 rounded-b-xl flex justify-center items-center gap-2 px-2">
    <div className="w-2 h-2 rounded-full bg-red-500/50 shadow-[0_0_4px_rgba(239,68,68,0.5)]" />
    <div className="w-2 h-2 rounded-full bg-yellow-500/50 shadow-[0_0_4px_rgba(234,179,8,0.5)]" />
    <div className="w-8 h-1.5 rounded-sm bg-neutral-600" />
  </div>
);

const TVAntenna = () => (
  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-6">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-neutral-700 rotate-[-25deg] origin-bottom" />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-neutral-700 rotate-[25deg] origin-bottom" />
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-neutral-800 rounded-t-sm" />
  </div>
);

export const TVCard = ({ children, onDelete, videoId: propVideoId, title }: TVCardProps) => {
  const videoId = propVideoId || getYouTubeId(children?.toString() || '') || 'dQw4w9WgXcQ';
  
  return (
    <BaseSocialCard
      icon={<></>}
      onDelete={onDelete}
      className="bg-gradient-to-br from-neutral-800 to-neutral-900 group relative overflow-visible
        before:absolute before:inset-0 before:rounded-2xl before:p-[2px]
        before:bg-gradient-to-b before:from-neutral-700 before:to-neutral-800
        before:opacity-50 before:transition-opacity
        hover:before:opacity-100"
    >
      <TVAntenna />
      <div className="w-full flex flex-col items-center">
        {title && (
          <div className="text-sm font-medium tracking-wide text-center opacity-90 mb-2">
            {title}
          </div>
        )}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black
          shadow-[inset_0_0_20px_rgba(0,0,0,0.3)]
          before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_50%,transparent_40%,rgba(0,0,0,0.3)_100%)]
          before:z-10 before:pointer-events-none
          after:absolute after:inset-0 after:bg-[linear-gradient(transparent_98%,rgba(255,255,255,0.2))]
          after:bg-[length:100%_3px] after:animate-[scan_4s_linear_infinite]
          after:z-10 after:pointer-events-none"
        >
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=0&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
        <TVControls />
      </div>
    </BaseSocialCard>
  );
}; 