import { BaseSocialCard, BaseSocialCardProps } from './BaseSocialCard';
import { QRCodeSVG } from 'qrcode.react';

type QRCardProps = Omit<BaseSocialCardProps, 'className' | 'icon'> & {
  url?: string;
  title?: string;
};

export const QRCard = ({ children, onDelete, url, title }: QRCardProps) => {
  const qrValue = url || children?.toString() || 'https://example.com';
  
  return (
    <BaseSocialCard
      icon={<></>}
      onDelete={onDelete}
      className="bg-gradient-to-br from-violet-500 to-purple-700 group relative overflow-hidden
        before:absolute before:inset-0 before:bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.1),transparent)] 
        before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000
        after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]
        after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500"
    >
      <div className="w-full flex flex-col items-center gap-3">
        {title && (
          <div className="text-sm font-medium tracking-wide text-center opacity-90">
            {title}
          </div>
        )}
        <div className="bg-white p-2 rounded-xl">
          <QRCodeSVG
            value={qrValue}
            size={100}
            level="H"
            includeMargin={false}
            className="rounded-lg"
          />
        </div>
        <div className="text-xs opacity-70 break-all text-center max-w-full px-2">
          {qrValue}
        </div>
      </div>
    </BaseSocialCard>
  );
}; 