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
    // Efecto de confeti
    const duration = 2000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Ya que estás lanzando partículas en diferentes direcciones
      // es una buena idea crear una capa de partículas en varias direcciones
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    setIsExiting(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    navigate('/start');
  };

  return (
    <>
      <LoadingModal isOpen={isExiting} />
      
      <div className={`relative min-h-screen w-full bg-white transition-opacity duration-500
        ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
        {/* Fondo decorativo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_50%)]" />
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.8),transparent)]" />
          <div className="absolute bottom-0 left-0 w-full h-[70vh] bg-[linear-gradient(to_top,rgba(255,255,255,1),rgba(255,255,255,0.8),transparent)]" />
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
              <img 
                src="/images/Kasbu.png" 
                alt="Kasbu Logo" 
                className="relative w-32 h-32 object-contain mx-auto transition-all duration-500 
                  hover:scale-105"
              />
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