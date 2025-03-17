import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SocialCard } from './cards/SocialCard';
import { ImageCard } from './cards/ImageCard';
import type { SocialPlatform } from './cards/SocialCard';

interface FloatingCardProps {
  className?: string;
  style?: React.CSSProperties;
  size?: 'normal' | 'tall';
  children: React.ReactNode;
}

const FloatingCard = ({ className = '', size = 'normal', children }: FloatingCardProps) => {
  const sizeClasses = {
    normal: 'w-44 h-44',
    tall: 'w-44 h-[352px]',
  }[size];

  return (
    <div className={`absolute ${sizeClasses} ${className}`}>
      {children}
    </div>
  );
};

interface CardConfig {
  type: 'social' | 'image';
  platform?: SocialPlatform;
  position: string;
  size?: 'normal' | 'tall';
  depth: number;
  scale: number;
  blur?: string;
  text: string;
  imageUrl?: string;
  description?: string;
}

const CARDS_CONFIG: CardConfig[] = [
  {
    type: 'image',
    position: 'left-32 bottom-80',
    size: 'tall',
    depth: 15,
    scale: 1.25,
    blur: 'blur-[1.5px]',
    text: 'Mi compañero fiel 🐾',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1666777247416-ee7a95235559?q=80&w=1374&auto=format&fit=crop',
    description: 'Mi compañero fiel 🐾'
  },
  {
    type: 'social',
    platform: 'youtube',
    position: 'left-64 top-8',
    size: 'normal',
    depth: 4,
    scale: 1.1,
    blur: 'blur-[0.8px]',
    text: 'Últimos vlogs',
    description: '@luisitocomunica'
  },
  {
    type: 'social',
    platform: 'github',
    position: 'left-16 top-24',
    size: 'normal',
    depth: 3,
    scale: 0.85,
    text: 'Mis proyectos',
    description: '@midudev'
  },
  {
    type: 'social',
    platform: 'instagram',
    position: 'right-24 top-16',
    size: 'tall',
    depth: 12,
    scale: 1.25,
    text: 'Mi día a día',
    description: '@leomessi'
  },
  {
    type: 'social',
    platform: 'spotify',
    position: 'right-80 top-32',
    size: 'normal',
    depth: 8,
    scale: 1.05,
    blur: 'blur-[0.8px]',
    text: 'Lo que escucho',
    description: '@badbunnypr'
  },
  {
    type: 'social',
    platform: 'twitter',
    position: 'right-16 top-96',
    size: 'normal',
    depth: 4,
    scale: 0.8,
    blur: 'blur-[2px]',
    text: 'Mis ideas',
    description: '@elonmusk'
  },
  {
    type: 'social',
    platform: 'linkedin',
    position: 'left-96 bottom-24',
    size: 'normal',
    depth: 9,
    scale: 1.1,
    blur: 'blur-[0.8px]',
    text: 'Mi experiencia',
    description: '@billgates'
  },
  {
    type: 'social',
    platform: 'twitch',
    position: 'right-48 bottom-8',
    size: 'tall',
    depth: 14,
    scale: 1.25,
    text: 'Streams en vivo',
    description: '@ibai'
  },
  {
    type: 'social',
    platform: 'discord',
    position: 'left-32 bottom-16',
    size: 'normal',
    depth: 6,
    scale: 0.85,
    blur: 'blur-[1.5px]',
    text: 'Únete al chat',
    description: '@pewdiepie'
  }
];

const FloatingCards = ({ startSequence }: { startSequence: boolean }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleCards, setVisibleCards] = useState<number>(-1);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x: x * 0.5, y: y * 0.5 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (startSequence) {
      const interval = setInterval(() => {
        setVisibleCards(prev => {
          if (prev < CARDS_CONFIG.length - 1) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [startSequence]);

  const getParallaxStyle = (depth: number) => ({
    transform: `translate3d(${mousePosition.x * depth}px, ${mousePosition.y * depth}px, 0)`
  });

  const cardClasses = (index: number) => `
    transition-[opacity,transform] duration-500 ease-out
    ${visibleCards >= index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
  `;

  const renderCard = (config: CardConfig, index: number) => {
    return (
      <FloatingCard
        key={index}
        className={`fixed ${config.position} ${cardClasses(index)}`}
        size={config.size || 'normal'}
      >
        <div 
          className={`transform scale-[${config.scale}] ${config.blur || ''} transition-transform duration-700 ease-out`}
          style={getParallaxStyle(config.depth)}
        >
          {config.type === 'image' ? (
            <ImageCard imageUrl={config.imageUrl!}>
              {config.text}
            </ImageCard>
          ) : (
            <SocialCard platform={config.platform!} description={config.description}>
              {config.text}
            </SocialCard>
          )}
        </div>
      </FloatingCard>
    );
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none min-w-[1280px] min-h-[800px] hidden md:block">
      {CARDS_CONFIG.map((config, index) => renderCard(config, index))}
    </div>
  );
};

const HomeScreen = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [username, setUsername] = useState('');
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [showCards, setShowCards] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
    setTimeout(() => setShowCards(true), 800);
    setTimeout(() => setShowForm(true), 1500);
  }, []);

  useEffect(() => {
    const targetDate = new Date('2025-06-01T00:00:00');

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleUsernameChange = (value: string) => {
    setUsername(value.toLowerCase().replace(/[^a-z0-9-]/g, ''));
    setIsAvailable(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.length >= 3 && isAvailable) {
      setIsExiting(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      navigate('/start', { state: { username } });
    }
  };

  const handleLogin = async () => {
    setIsExiting(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    navigate('/start');
  };

  return (
    <>
      {/* Loading Screen */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500
        ${isExiting ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="relative">
          {/* Fondo con gradiente animado */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-2xl 
            animate-pulse" />
          
          {/* Loading icon */}
          <div className="relative">
            <svg className="w-12 h-12 animate-spin" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                style={{ color: '#6366f1' }}
              />
              <path
                className="opacity-75"
                fill="currentColor"
                style={{ color: '#6366f1' }}
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`relative min-h-screen w-full bg-white overflow-hidden transition-opacity duration-800
        ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
        {/* Fondo decorativo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_50%)]" />
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.8),transparent)]" />
        </div>

        <FloatingCards startSequence={showCards} />

        {/* Contenido principal */}
        <div className={`relative min-h-screen w-full flex flex-col items-center transition-all duration-1000 ease-out
          ${showForm ? 'justify-center -translate-y-16' : 'justify-center translate-y-8'}`}>
          <div className="text-center transform transition-all duration-1000">
            {/* Logo */}
            <div className={`relative mb-6 mt-32 group transition-all duration-1000 transform
              ${mounted ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-2xl 
                group-hover:from-blue-600/30 group-hover:to-purple-600/30 transition-all duration-500" />
              <h1 className="relative text-[6rem] leading-none font-normal font-['Modernia'] bg-gradient-to-r from-blue-600 to-purple-600 
                bg-clip-text text-transparent transition-all duration-500
                hover:from-blue-500 hover:to-purple-500">
                K
              </h1>
            </div>

            {/* Contador y Botón */}
            <div className={`space-y-8 transition-all duration-1000 delay-300
              ${showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-xl text-gray-600">
                ¡A Linktree no le va gustar esto!
              </p>
              
              <div className="flex gap-8 justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {countdown.days}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Días</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {countdown.hours}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Horas</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {countdown.minutes}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Minutos</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {countdown.seconds}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Segundos</div>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-6">
                <button 
                  onClick={handleLogin}
                  className="px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 
                    rounded-xl shadow-lg hover:from-blue-500 hover:to-purple-500 
                    active:from-blue-700 active:to-purple-700 transform hover:scale-105 
                    transition-all duration-200 ease-out focus:outline-none focus:ring-2 
                    focus:ring-purple-500 focus:ring-opacity-50"
                >
                  Unirse a la lista de espera
                </button>

                <p className="text-sm text-gray-500">
                  Lanzamiento: 1 de Junio, 2025
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`absolute bottom-8 left-0 right-0 text-center transition-all duration-1000
          ${showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-sm text-gray-500">
            Diseña · Comparte · Conecta
          </p>
        </div>
      </div>
    </>
  );
};

export default HomeScreen; 