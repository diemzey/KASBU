import { BaseSocialCard } from './BaseSocialCard';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useRef, useState } from 'react';
import { CardProps } from '../../types';

interface QRCardProps extends CardProps {
  url?: string;
}

const QR_STYLES = {
  '1x1': {
    containerClass: 'flex flex-col items-center justify-center gap-3',
    qrSize: 120,
    qrClass: 'p-2',
    textClass: 'text-xs max-w-[120px] truncate'
  },
  '2x1': {
    containerClass: 'flex items-center justify-between gap-4 px-4',
    qrSize: 140,
    qrClass: 'p-3',
    textClass: 'text-sm flex-1 text-left'
  },
  '1x2': {
    containerClass: 'flex flex-col items-center justify-center gap-6',
    qrSize: 160,
    qrClass: 'p-4',
    textClass: 'text-sm max-w-[160px] text-center'
  },
  '2x2': {
    containerClass: 'flex flex-col items-center justify-center gap-8',
    qrSize: 200,
    qrClass: 'p-5',
    textClass: 'text-base max-w-[200px] text-center'
  }
};

export const QRCard = ({ children, onDelete, url, size = { w: 1, h: 1 }, onTextChange }: QRCardProps) => {
  const qrValue = url || children?.toString() || 'https://example.com';
  const style = QR_STYLES[`${size.w}x${size.h}` as keyof typeof QR_STYLES] || QR_STYLES['1x1'];
  
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
      <div className={`w-full h-full ${style.containerClass}`}>
        <div className={`bg-white rounded-2xl shadow-lg transform transition-transform duration-300 group-hover:scale-105
          hover:shadow-xl relative ${style.qrClass}
          after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/0 after:to-black/5 after:rounded-2xl`}>
          <QRCodeSVG
            value={qrValue}
            size={style.qrSize}
            level="H"
            includeMargin={false}
            className="rounded-xl"
          />
        </div>
        <div 
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onTextChange?.(e.currentTarget.textContent || '')}
          className={`${style.textClass} opacity-90 cursor-text hover:bg-black/10 rounded transition-colors duration-200 px-2 py-1`}
        >
          {qrValue}
        </div>
      </div>
    </BaseSocialCard>
  );
}; 