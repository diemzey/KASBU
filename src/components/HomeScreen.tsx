import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SocialCard } from './cards/SocialCard';
import { ImageCard } from './cards/ImageCard';
import { MapCard } from './cards/MapCard';
import type { SocialPlatform } from '../types';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import '../styles/animations.css';
import LoadingModal from './LoadingModal';

interface FloatingCardProps {
  className?: string;
  style?: React.CSSProperties;
  size?: 'normal' | 'tall';
  children: React.ReactNode;
  index: number;
}

const FloatingCard = ({ className = '', size = 'normal', children, index }: FloatingCardProps) => {
  const sizeClasses = {
    normal: 'w-48 h-48',
    tall: 'w-48 h-96',
  }[size];

  const patterns = [
    {
      y: [0, -40, -15, 40, 0],
      x: [0, 40, -15, -40, 0],
      rotate: [-5, 0, 5, 0, -5]
    },
    {
      y: [-15, -45, 0, -25, -15],
      x: [-40, 15, 40, -10, -40],
      rotate: [3, -3, 3, -3, 3]
    },
    {
      y: [10, -30, -50, 25, 10],
      x: [30, -30, 0, 30, 30],
      rotate: [0, -3, 0, 3, 0]
    }
  ];

  const patternIndex = index % patterns.length;
  const duration = 15 + (index % 3) * 5;

  return (
    <motion.div 
      className={`absolute ${sizeClasses} ${className} rounded-2xl overflow-hidden`}
      animate={patterns[patternIndex]}
      transition={{ 
        duration: duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }}
    >
      {children}
    </motion.div>
  );
};

interface CardConfig {
  type: 'social' | 'image' | 'map';
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
    scale: 0.7,
    blur: 'blur-[2.2px]',
    text: 'Mi compañero fiel 🐾',
    imageUrl: 'https://content.elmueble.com/medio/2023/03/02/perro-de-raza-beagle_67c65dda_230302133829_900x900.jpg',
    description: 'Mi compañero fiel 🐾'
  },
  {
    type: 'social',
    platform: 'github',
    position: 'left-16 top-24',
    size: 'normal',
    depth: 3,
    scale: 1.2,
    text: 'Mis proyectos',
    description: '@midudev'
  },
  {
    type: 'social',
    platform: 'instagram',
    position: 'right-24 top-16',
    size: 'normal',
    depth: 4,
    scale: 1.15,
    blur: 'blur-[1.8px]',
    text: 'Mi día a día',
    description: '@leomessi'
  },
  {
    type: 'map',
    position: 'right-48 top-64',
    size: 'normal',
    depth: 6,
    scale: 1.1,
    blur: 'blur-[1px]',
    text: 'Mérida',
    description: 'Mi ubicación'
  },
  {
    type: 'social',
    platform: 'youtube',
    position: 'left-64 top-8',
    size: 'normal',
    depth: 8,
    scale: 1,
    blur: 'blur-[0.8px]',
    text: 'Últimos vlogs',
    description: '@luisitocomunica'
  },
  {
    type: 'social',
    platform: 'spotify',
    position: 'right-80 top-32',
    size: 'normal',
    depth: 9,
    scale: 0.95,
    blur: 'blur-[0.2px]',
    text: 'Lo que escucho',
    description: '@badbunnypr'
  },
  {
    type: 'social',
    platform: 'linkedin',
    position: 'left-96 bottom-24',
    size: 'normal',
    depth: 10,
    scale: 0.9,
    blur: 'blur-[1.2px]',
    text: 'Mi experiencia',
    description: '@billgates'
  },
  {
    type: 'social',
    platform: 'discord',
    position: 'left-32 bottom-16',
    size: 'normal',
    depth: 12,
    scale: 0.85,
    blur: 'blur-[0.8px]',
    text: 'Únete al chat',
    description: '@pewdiepie'
  },
  {
    type: 'social',
    platform: 'twitter',
    position: 'right-16 top-96',
    size: 'normal',
    depth: 13,
    scale: 0.8,
    text: 'Mis ideas',
    description: '@elonmusk'
  },
  {
    type: 'social',
    platform: 'twitch',
    position: 'right-48 bottom-8',
    size: 'normal',
    depth: 14,
    scale: 0.75,
    blur: 'blur-[1.2px]',
    text: 'Streams en vivo',
    description: '@ibai'
  }
];

const FloatingCards = ({ startSequence }: { startSequence: boolean }) => {
  const [visibleCards, setVisibleCards] = useState<number>(-1);

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
        index={index}
      >
        <div className={`${config.blur || ''} w-full h-full`}>
          {config.type === 'image' ? (
            <div className="w-full h-full">
              <img 
                src={config.imageUrl} 
                alt={config.text}
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
                <div className="text-white text-sm">
                  {config.text}
                </div>
              </div>
            </div>
          ) : config.type === 'map' ? (
            <MapCard>
              {config.text}
            </MapCard>
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
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [startSequence, setStartSequence] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    setTimeout(() => {
      setStartSequence(true);
    }, 500);
  }, []);

  const handleUsernameChange = (value: string) => {
    setUsername(value.toLowerCase().replace(/[^a-z0-9]/g, ''));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username) {
      navigate('/beta', { state: { username } });
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setShowCountdown(true);
  };

  return (
    <main className="min-h-screen w-full bg-white relative overflow-hidden">
      <LoadingModal 
        isOpen={isLoading} 
        message="Iniciando sesión con Google..."
      />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Kasbu
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            Crea tu página personal profesional en minutos. Comparte tus redes sociales y contenido de forma elegante.
          </p>
        </header>

        <div className="w-full max-w-md space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <label htmlFor="username" className="sr-only">Nombre de usuario</label>
              <div className="flex items-center">
                <span className="text-gray-500 text-lg sm:text-xl absolute left-4">
                  kasbu.com/
                </span>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  placeholder="tunombre"
                  className="w-full pl-[7.5rem] pr-4 py-3 text-lg sm:text-xl bg-gray-50 border border-gray-200 rounded-xl
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  aria-label="Ingresa tu nombre de usuario"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl px-6 py-3
                text-lg sm:text-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300
                shadow-lg shadow-blue-500/25 relative group"
              aria-label="Crear mi página"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] rounded-xl" />
              <span>Crear mi página</span>
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">o</span>
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-white border border-gray-200 rounded-xl px-6 py-3 text-lg sm:text-xl
              font-medium hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow
              flex items-center justify-center gap-3 relative group"
            aria-label="Iniciar sesión con Google"
          >
            <img src="/google.svg" alt="Google logo" className="w-6 h-6" />
            <span>Iniciar sesión con Google</span>
          </button>
        </div>
      </section>

      {/* Floating Cards Background */}
      <FloatingCards startSequence={startSequence} />

      {/* Footer */}
      <footer className="absolute bottom-4 left-0 right-0 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Kasbu. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
};

export default HomeScreen; 