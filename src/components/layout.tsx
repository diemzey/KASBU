import { useMemo, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { HomeLayouts, keys } from "../utils/layout.helper";
import { FacebookCard, InstagramCard, TikTokCard, YouTubeCard, CustomCard, CodeCard, QRCard, MapCard, TVCard } from "./cards";
import AddCardMenu from "./AddCardMenu";

type CardData = {
  id: string;
  platform: 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'custom' | 'code' | 'qr' | 'map' | 'tv';
  w: number;
  h: number;
  title?: string;
  text?: string;
  gradient?: 'blue' | 'purple' | 'green' | 'orange' | 'pink';
  command?: string;
  url?: string;
  lat?: number;
  lng?: number;
  zoom?: number;
  videoId?: string;
};

function Layout() {
  const [currentlayout, setCurrentLayout] = useState(HomeLayouts);
  const [visibleCards, setVisibleCards] = useState<string[]>(keys);
  const [isDragging, setIsDragging] = useState(false);
  const [cards, setCards] = useState<CardData[]>([
    { id: 'a', platform: 'facebook', w: 1, h: 1 },
    { id: 'b', platform: 'instagram', w: 1, h: 1 },
    { id: 'c', platform: 'tiktok', w: 1, h: 1 },
    { id: 'd', platform: 'youtube', w: 2, h: 1 },
  ]);

  const handleDeleteCard = (keyToDelete: string) => {
    if (!isDragging) {
      setVisibleCards(prev => prev.filter(key => key !== keyToDelete));
      setCards(prev => prev.filter(card => card.id !== keyToDelete));
    }
  };

  const handleAddCard = (
    platform: 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'custom' | 'code' | 'qr' | 'map' | 'tv',
    size: { w: number; h: number },
    customData?: { title?: string; text?: string; gradient?: 'blue' | 'purple' | 'green' | 'orange' | 'pink'; command?: string; url?: string; lat?: number; lng?: number; zoom?: number; videoId?: string }
  ) => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newCard: CardData = {
      id: newId,
      platform,
      w: size.w,
      h: size.h,
      ...(customData || {}),
    };

    setCards(prev => [...prev, newCard]);
    setVisibleCards(prev => [...prev, newId]);
    
    setCurrentLayout(prev => ({
      ...prev,
      lg: [
        ...prev.lg,
        {
          i: newId,
          x: (prev.lg.length * 2) % 3,
          y: Infinity,
          w: size.w,
          h: size.h,
          isResizable: false,
        },
      ],
      xs: [
        ...prev.xs,
        {
          i: newId,
          x: 0,
          y: Infinity,
          w: 1,
          h: size.h,
          static: true,
        },
      ],
    }));
  };

  const ResponsiveReactGridLayout = useMemo(
    () => WidthProvider(Responsive),
    []
  );

  const Block = ({ keyProp, onDelete, platform }: { keyProp: string; onDelete?: () => void; platform?: CardData['platform'] }) => {
    const card = cards.find(c => c.id === keyProp);
    
    if (platform || keyProp in socialPlatforms) {
      const platformToUse = platform || socialPlatforms[keyProp as keyof typeof socialPlatforms].platform;
      
      if (platformToUse === 'custom') {
        return (
          <CustomCard 
            onDelete={onDelete}
            title={card?.title}
            gradient={card?.gradient}
          >
            {card?.text || 'Texto personalizado'}
          </CustomCard>
        );
      }

      if (platformToUse === 'code') {
        return (
          <CodeCard
            onDelete={onDelete}
            command={card?.command}
          />
        );
      }

      if (platformToUse === 'qr') {
        return (
          <QRCard
            onDelete={onDelete}
            url={card?.url}
            title={card?.title}
          />
        );
      }

      if (platformToUse === 'map') {
        return (
          <MapCard
            onDelete={onDelete}
            lat={card?.lat}
            lng={card?.lng}
            zoom={card?.zoom}
            title={card?.title}
          />
        );
      }

      if (platformToUse === 'tv') {
        return (
          <TVCard
            onDelete={onDelete}
            videoId={card?.videoId}
            title={card?.title}
          />
        );
      }

      const text = platform ? 
        (platformToUse === 'youtube' ? 'Suscríbete en YouTube' : `Síguenos en ${platformToUse.charAt(0).toUpperCase() + platformToUse.slice(1)}`) :
        socialPlatforms[keyProp as keyof typeof socialPlatforms].text;

      const CardComponent = {
        facebook: FacebookCard,
        instagram: InstagramCard,
        tiktok: TikTokCard,
        youtube: YouTubeCard,
      }[platformToUse];

      return (
        <CardComponent onDelete={onDelete}>
          {text}
        </CardComponent>
      );
    }

    return (
      <div className="h-full w-full flex flex-col justify-center items-center p-6 bg-white text-[var(--black-1)] rounded-2xl text-3xl uppercase">
        {keyProp}
      </div>
    );
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center pt-[10vh] pb-[100px]">
      <h1 className="text-8xl font-bold mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        VICTOR
      </h1>
      <ResponsiveReactGridLayout
        className="w-full max-w-[660px] px-4"
        breakpoints={{ lg: 660, md: 500, sm: 380, xs: 100 }}
        cols={{ lg: 4, md: 4, sm: 2, xs: 1 }}
        rowHeight={145}
        margin={[15, 15]}
        layouts={{
          ...currentlayout,
          lg: currentlayout.lg.filter(item => visibleCards.includes(item.i)),
          xs: currentlayout.xs.filter(item => visibleCards.includes(item.i))
        }}
        onDragStart={() => setIsDragging(true)}
        onDragStop={() => setTimeout(() => setIsDragging(false), 100)}
      >
        {visibleCards.map((key) => (
          <div
            key={key}
            className="bg-[#f5f5f7] flex justify-center items-center shadow-[inset_0_0_0_2px_rgba(0,0,0,0)] rounded-2xl text-2xl text-[#1d1d1f] visible cursor-grab active:cursor-grabbing"
          >
            <Block 
              keyProp={key} 
              onDelete={() => handleDeleteCard(key)}
              platform={cards.find(card => card.id === key)?.platform}
            />
          </div>
        ))}
      </ResponsiveReactGridLayout>
      <AddCardMenu onAdd={handleAddCard} />
    </div>
  );
}

const socialPlatforms = {
  a: { platform: 'facebook', text: 'Síguenos en Facebook' },
  b: { platform: 'instagram', text: 'Síguenos en Instagram' },
  c: { platform: 'tiktok', text: 'Síguenos en TikTok' },
  d: { platform: 'youtube', text: 'Suscríbete en YouTube' },
} as const;

export default Layout;
