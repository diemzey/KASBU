import { BaseURLCard } from './BaseURLCard';
import { BaseURLCardProps } from '../../types';

type CodeCardProps = Omit<BaseURLCardProps, 'className' | 'icon'> & {
  language?: string;
};

const WindowControls = () => (
  <div className="absolute top-3 left-3 flex gap-1.5">
    <div className="w-2.5 h-2.5 rounded-full bg-red-500/90" />
    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/90" />
    <div className="w-2.5 h-2.5 rounded-full bg-green-500/90" />
  </div>
);

export const CodeCard = ({ children, language = 'javascript', ...props }: CodeCardProps) => {
  return (
    <BaseURLCard
      icon={<></>}
      onDelete={props.onDelete}
      className="bg-[linear-gradient(110deg,#1a1b1e,#2d2e32)] group relative overflow-hidden pt-10
        before:absolute before:inset-0 before:bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.1),transparent)] 
        before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000
        after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]
        after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500"
    >
      <WindowControls />
      <div className="w-full overflow-hidden">
        <div className="font-mono text-xs opacity-70 mb-1">
          ~/terminal $
        </div>
        <div className="font-mono text-sm">
          {props.command || children || 'echo "Hello World!"'}
          <span className="inline-block w-2 h-4 ml-1 bg-white/70 animate-pulse" />
        </div>
      </div>
    </BaseURLCard>
  );
}; 