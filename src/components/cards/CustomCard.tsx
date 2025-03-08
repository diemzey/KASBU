import { BaseSocialCard, BaseSocialCardProps } from './BaseSocialCard';

type CustomCardProps = Omit<BaseSocialCardProps, 'className' | 'icon'> & {
  title?: string;
  gradient?: 'blue' | 'purple' | 'green' | 'orange' | 'pink';
};

const CustomIcon = () => (
  <svg className="w-8 h-8 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h10m-10 4h10" />
  </svg>
);

const gradients = {
  blue: "bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800",
  purple: "bg-gradient-to-br from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800",
  green: "bg-gradient-to-br from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800",
  orange: "bg-gradient-to-br from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800",
  pink: "bg-gradient-to-br from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800",
};

export const CustomCard = ({ children, onDelete, title, gradient = 'blue' }: CustomCardProps) => {
  return (
    <BaseSocialCard
      icon={<CustomIcon />}
      onDelete={onDelete}
      className={`${gradients[gradient]}
        after:absolute after:inset-0 after:rounded-2xl after:opacity-0 after:transition-opacity
        after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]
        hover:after:opacity-100`}
    >
      {title && <div className="text-lg font-semibold mb-1">{title}</div>}
      <div className="text-sm opacity-90">{children}</div>
    </BaseSocialCard>
  );
}; 