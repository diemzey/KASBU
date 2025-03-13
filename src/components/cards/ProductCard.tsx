import { memo } from 'react';
import { BaseSocialCard } from './BaseSocialCard';
import { CardProps } from '../../types';

interface ShopCardProps extends CardProps {
  productImage?: string;
  price?: string;
  rating?: number;
  reviews?: number;
  prime?: boolean;
  variant?: 'amazon' | 'mercadolibre' | 'generic';
}

const CARD_STYLES = {
  '1x1': {
    containerClass: 'flex flex-col',
    imageClass: 'h-24',
    titleClass: 'text-xs line-clamp-2',
    ratingClass: 'scale-75 -ml-1',
    priceClass: 'text-base'
  },
  '2x1': {
    containerClass: 'flex flex-row gap-4',
    imageClass: 'w-32 h-full',
    titleClass: 'text-sm line-clamp-2',
    ratingClass: 'scale-90',
    priceClass: 'text-lg'
  },
  '1x2': {
    containerClass: 'flex flex-col',
    imageClass: 'h-48',
    titleClass: 'text-sm line-clamp-3',
    ratingClass: 'scale-100',
    priceClass: 'text-xl'
  },
  '2x2': {
    containerClass: 'flex flex-row gap-6',
    imageClass: 'w-[45%] h-full',
    titleClass: 'text-lg line-clamp-3',
    ratingClass: 'scale-110',
    priceClass: 'text-2xl'
  }
};

const SHOP_STYLES = {
  amazon: {
    cardStyle: "bg-white border-[3px] border-[#DDD] hover:border-[#FF9900] transition-all duration-300 shadow-[0_0_0_3px_rgba(255,153,0,0)] hover:shadow-[0_0_0_3px_rgba(255,153,0,0.2)]",
    headerBg: "from-[#232F3E] to-[#131921]",
    headerBorder: "border-[#485769]",
    priceColor: "text-[#0F1111]",
    titleHoverColor: "hover:text-[#C7511F]",
    ratingColor: "text-[#FFA41C]",
    reviewsColor: "text-[#007185] hover:text-[#C7511F]",
    buttonGradient: "from-[#FFD814] to-[#FFA41C] hover:from-[#FFE342] hover:to-[#FFB648]",
    buttonBorder: "border-[#FCD200]",
    buttonTextColor: "text-[#0F1111]",
    logos: {
      small: "https://bluejuicecomics.com/wp-content/uploads/2017/02/Amazon-icon-white.png",
      large: "https://wildfiresocial.com/wp-content/uploads/2019/01/amazon-logo-white._cb1509666198_.png"
    },
    specialTag: {
      text: "Prime",
      bg: "bg-[#232F3E]",
      textColor: "text-white"
    },
    buttonLabel: "Comprar ahora"
  },
  mercadolibre: {
    cardStyle: "bg-white border-[3px] border-[#E5E5E5] hover:border-[#3483FA] transition-all duration-300 shadow-[0_0_0_3px_rgba(52,131,250,0)] hover:shadow-[0_0_0_3px_rgba(52,131,250,0.2)]",
    headerBg: "from-[#FFF159] to-[#FFE51E]",
    headerBorder: "border-[#E6D600]",
    priceColor: "text-[#333333]",
    titleHoverColor: "hover:text-[#3483FA]",
    ratingColor: "text-[#3483FA]",
    reviewsColor: "text-[#3483FA] hover:text-[#1259C3]",
    buttonGradient: "from-[#3483FA] to-[#2968C8] hover:from-[#2968C8] hover:to-[#1259C3]",
    buttonBorder: "border-[#2968C8]",
    buttonTextColor: "text-white",
    logos: {
      small: "https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.22/mercadolibre/favicon.svg",
      large: "https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.22/mercadolibre/logo-pt__large_plus.png"
    },
    specialTag: {
      text: "FULL",
      bg: "bg-[#00A650]",
      textColor: "text-white"
    },
    buttonLabel: "Comprar"
  },
  generic: {
    cardStyle: "bg-white border-[3px] border-gray-100 hover:border-indigo-500 transition-all duration-300 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_32px_-4px_rgba(0,0,0,0.12)]",
    headerBg: "from-indigo-500 to-violet-600",
    headerBorder: "border-indigo-400",
    priceColor: "text-gray-900",
    titleHoverColor: "hover:text-indigo-600",
    ratingColor: "text-indigo-500",
    reviewsColor: "text-gray-600 hover:text-indigo-600",
    buttonGradient: "from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700",
    buttonBorder: "border-indigo-400",
    buttonTextColor: "text-white",
    logos: {
      small: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'/%3E%3C/svg%3E",
      large: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'/%3E%3C/svg%3E"
    },
    specialTag: {
      text: "OFERTA",
      bg: "bg-indigo-500",
      textColor: "text-white"
    },
    buttonLabel: "Agregar al carrito"
  }
};

const ShopCardComponent = ({ 
  children, 
  onDelete,
  size = { w: 1, h: 1 },
  productImage = "https://images-na.ssl-images-amazon.com/images/I/71p-M3sPhhL._AC_SL1500_.jpg",
  price = "99.99",
  rating = 4.5,
  reviews = 1234,
  prime = true,
  variant = 'amazon'
}: ShopCardProps) => {
  const style = CARD_STYLES[`${size.w}x${size.h}` as keyof typeof CARD_STYLES] || CARD_STYLES['1x1'];
  const shopStyle = SHOP_STYLES[variant];
  const is1x1 = size.w === 1 && size.h === 1;

  return (
    <BaseSocialCard
      icon={<></>}
      onDelete={onDelete}
      className={`${shopStyle.cardStyle} group relative overflow-hidden rounded-2xl
        before:absolute before:inset-0 before:bg-gradient-to-b before:from-gray-50 before:to-white before:opacity-0 hover:before:opacity-100 before:transition-opacity`}
    >
      {/* Header */}
      {is1x1 ? (
        <div className={`absolute top-2 left-2 w-8 h-8 rounded-xl bg-gradient-to-b ${shopStyle.headerBg} flex items-center justify-center z-10`}>
          <img 
            src={shopStyle.logos.small}
            alt={variant} 
            className="h-5 w-5 brightness-[1.15]"
          />
        </div>
      ) : (
        <div className={`absolute top-0 left-0 right-0 h-12 bg-gradient-to-b ${shopStyle.headerBg} flex items-center px-4 border-b ${shopStyle.headerBorder} z-10`}>
          <img 
            src={shopStyle.logos.large}
            alt={variant} 
            className="h-[1.2rem] brightness-[1.15]"
          />
        </div>
      )}

      <div className={`h-full ${style.containerClass} ${is1x1 ? 'pt-6' : 'pt-12'} relative z-[1]`}>
        {/* Imagen del producto */}
        <div className={`relative ${style.imageClass} ${size.w === 2 && size.h === 1 ? 'flex-shrink-0' : ''} 
          ${is1x1 ? 'p-2' : 'p-4'} bg-white`}>
          <img 
            src={productImage} 
            alt={children?.toString()} 
            className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Información del producto */}
        <div className={`flex flex-col justify-between flex-1 ${is1x1 ? 'gap-1 p-2' : 'gap-2 p-4'} bg-white`}>
          {/* Título */}
          <h3 className={`${style.titleClass} font-medium ${shopStyle.priceColor} ${shopStyle.titleHoverColor} transition-colors cursor-pointer`}>
            {children}
          </h3>

          <div className={`${is1x1 ? 'space-y-1' : 'space-y-2'}`}>
            {/* Rating */}
            {!is1x1 && (
              <div className={`flex items-center gap-1.5 ${style.ratingClass} origin-left`}>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? shopStyle.ratingColor : 'text-gray-200'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className={`text-xs ${shopStyle.reviewsColor} hover:underline cursor-pointer`}>
                  {reviews.toLocaleString()}
                </span>
              </div>
            )}

            {/* Precio y Botón de Comprar para 2x2 */}
            {size.w === 2 && size.h === 2 ? (
              <div className="flex flex-col gap-3 mt-4">
                <div className="flex items-start gap-2">
                  <div className="flex items-baseline gap-0.5">
                    <span className={`text-sm ${shopStyle.priceColor}`}>$</span>
                    <span className={`${style.priceClass} font-medium ${shopStyle.priceColor}`}>{price}</span>
                  </div>
                  {prime && (
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded ${shopStyle.specialTag.bg} ${shopStyle.specialTag.textColor} text-xs`}>
                      <span className="font-medium">{shopStyle.specialTag.text}</span>
                    </div>
                  )}
                </div>
                <button className={`w-full py-2 px-4 rounded-full bg-gradient-to-b ${shopStyle.buttonGradient} 
                  border ${shopStyle.buttonBorder} shadow-[0_2px_5px_rgba(213,217,217,.5)] 
                  ${shopStyle.buttonTextColor} font-medium text-sm transition-all`}>
                  {shopStyle.buttonLabel}
                </button>
              </div>
            ) : (
              <div className="flex items-baseline gap-0.5">
                <span className={`text-sm ${shopStyle.priceColor}`}>$</span>
                <span className={`${style.priceClass} font-medium ${shopStyle.priceColor}`}>{price}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </BaseSocialCard>
  );
};

export const ShopCard = memo(ShopCardComponent);
export default ShopCard;