import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { SocialCard } from '../../cards/SocialCard';
import { ImageCard } from '../../cards/ImageCard';
import { MapCard } from '../../cards/MapCard';
import type { SocialPlatform } from '../../../types';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import '../../../styles/animations.css';
import LoadingModal from '../../common/LoadingModal';
import { Helmet } from 'react-helmet';
import { authClient, emailSignUp, googleSignUp } from "../../../utils/auth-client";

interface FloatingCardProps {
  className?: string;
  style?: React.CSSProperties;
  size?: 'normal' | 'tall';
  children: React.ReactNode;
  index: number;
  visibleCards: number;
}

const FloatingCard = ({ className = '', size = 'normal', children, index, visibleCards }: FloatingCardProps) => {
  const sizeClasses = {
    normal: 'w-48 h-48',
    tall: 'w-48 h-96',
  }[size];

  // Extraer las posiciones del className para calcular la rotación
  const isLeft = className.includes('left-');
  const isRight = className.includes('right-');
  const isTop = className.includes('top-');
  const isBottom = className.includes('bottom-');

  // Calcular ángulos más pronunciados de rotación basados en la posición
  const rotateY = isLeft ? 12 : isRight ? -12 : 0;
  let rotateX = 0;
  
  // Ajustar rotación X basada en la posición vertical y horizontal
  if (isTop) {
    rotateX = 12;
  } else if (isBottom) {
    if (isRight) {
      rotateX = 12; // Las tarjetas inferiores derechas rotan hacia arriba
    } else {
      rotateX = -12;
    }
  }

  const patterns = [
    {
      y: [0, -35, -15, 25, 0],
      x: [0, 30, -25, -20, 0],
      rotate: [-4, 0, 4, 0, -4],
      rotateX: [rotateX, rotateX, rotateX, rotateX, rotateX],
      rotateY: [rotateY, rotateY, rotateY, rotateY, rotateY]
    },
    {
      y: [-25, -40, 0, -20, -25],
      x: [-35, 15, 30, -25, -35],
      rotate: [3, -3, 3, -3, 3],
      rotateX: [rotateX, rotateX, rotateX, rotateX, rotateX],
      rotateY: [rotateY, rotateY, rotateY, rotateY, rotateY]
    },
    {
      y: [20, -25, -45, 15, 20],
      x: [25, -30, 10, 25, 25],
      rotate: [-3, 3, -3, 3, -3],
      rotateX: [rotateX, rotateX, rotateX, rotateX, rotateX],
      rotateY: [rotateY, rotateY, rotateY, rotateY, rotateY]
    },
    {
      y: [10, -30, 20, -15, 10],
      x: [-20, 25, -25, 20, -20],
      rotate: [4, -2, 4, -2, 4],
      rotateX: [rotateX, rotateX, rotateX, rotateX, rotateX],
      rotateY: [rotateY, rotateY, rotateY, rotateY, rotateY]
    },
    {
      y: [-15, 25, -35, 10, -15],
      x: [30, -20, 15, -30, 30],
      rotate: [-3, 2, -3, 2, -3],
      rotateX: [rotateX, rotateX, rotateX, rotateX, rotateX],
      rotateY: [rotateY, rotateY, rotateY, rotateY, rotateY]
    }
  ];

  const patternIndex = index % patterns.length;
  const duration = 45 + (index % 5) * 8;

  return (
    <motion.div 
      className={`absolute ${sizeClasses} ${className} rounded-2xl overflow-hidden`}
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 40, scale: 1.4, filter: "blur(20px)" }}
      animate={visibleCards >= index ? {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        ...patterns[patternIndex],
        rotateX: patterns[patternIndex].rotateX,
        rotateY: patterns[patternIndex].rotateY
      } : {}}
      transition={{ 
        opacity: { duration: 0.5 },
        scale: { duration: 0.8, type: "spring", stiffness: 100, damping: 12 },
        filter: { duration: 0.6 },
        rotateX: { duration: duration * 1.2 },
        rotateY: { duration: duration * 1.2 },
        default: { duration: duration, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }
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
    position: 'left-8 bottom-[16rem]',
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
    position: 'left-12 top-8',
    size: 'normal',
    depth: 3,
    scale: 1.2,
    text: 'Mis proyectos',
    description: '@midudev'
  },
  {
    type: 'social',
    platform: 'instagram',
    position: 'right-12 top-4',
    size: 'normal',
    depth: 4,
    scale: 1.15,
    blur: 'blur-[1.8px]',
    text: 'Mi día a día',
    description: '@leomessi'
  },
  {
    type: 'map',
    position: 'right-[-2rem] top-[16rem]',
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
    position: 'left-[-2rem] top-[12rem]',
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
    position: 'right-[-4rem] top-[8rem]',
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
    position: 'left-[-4rem] bottom-[8rem]',
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
    position: 'left-16 bottom-[-1rem]',
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
    position: 'right-16 bottom-[16rem]',
    size: 'normal',
    depth: 13,
    scale: 0.8,
    text: 'Mis ideas',
    description: '@elonmusk'
  },
  {
    type: 'social',
    platform: 'tiktok',
    position: 'right-12 bottom-[6rem]',
    size: 'normal',
    depth: 13.5,
    scale: 0.77,
    blur: 'blur-[1px]',
    text: 'Mis videos 👨‍💻',
    description: '@Diemzey'
  },
  {
    type: 'social',
    platform: 'twitch',
    position: 'right-[-2rem] bottom-[-2rem]',
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

  const renderCard = (config: CardConfig, index: number) => {
    return (
      <FloatingCard
        key={index}
        className={`fixed ${config.position}`}
        size={config.size || 'normal'}
        index={index}
        visibleCards={visibleCards}
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
    <div className="absolute inset-0 overflow-hidden pointer-events-none min-w-[1440px] min-h-[900px] hidden md:block">
      {CARDS_CONFIG.map((config, index) => renderCard(config, index))}
    </div>
  );
};

interface AuthError {
  message?: string;
  code?: string;
}

// Constantes de animación
const getAnimationProps = (delay = 0) => ({
  initial: { opacity: 0, scale: 1.8, filter: "blur(8px)", y: 40 },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)", y: 0 },
  transition: { 
    duration: 0.8,
    delay,
    type: "spring",
    stiffness: 50,
    damping: 15
  }
});

// Constantes para el carrusel
const COMPANY_LOGOS = [
  { name: '/pixel_ninja' },
  { name: '/crypto_wizard' },
  { name: '/code_master' },
  { name: '/design_guru' },
  { name: '/web_explorer' },
  { name: '/tech_nomad' },
  { name: '/data_voyager' },
  { name: '/cloud_surfer' },
  { name: '/dev_dreamer' },
  { name: '/byte_wanderer' }
];

const LogoCarousel = () => {
  return (
    <div className="w-full overflow-hidden">
      <p className="text-sm text-gray-400 text-center mb-4">Recién se unieron</p>
      <div className="relative max-w-xl mx-auto overflow-hidden">
        {/* Gradientes de desvanecimiento más opacos */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white via-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white via-white to-transparent z-10" />
        
        {/* Contenedor del carrusel con overflow-hidden */}
        <div className="flex animate-[scroll_15s_linear_infinite] hover:[animation-play-state:paused]">
          <div className="flex shrink-0 items-center gap-6">
            {COMPANY_LOGOS.map((company, index) => (
              <div key={index} className="flex-none w-28 h-8 flex items-center justify-center bg-gray-100 rounded-lg">
                <span className="text-gray-400 text-sm font-medium">{company.name}</span>
              </div>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-6">
            {COMPANY_LOGOS.map((company, index) => (
              <div key={index} className="flex-none w-28 h-8 flex items-center justify-center bg-gray-100 rounded-lg">
                <span className="text-gray-400 text-sm font-medium">{company.name}</span>
              </div>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-6">
            {COMPANY_LOGOS.map((company, index) => (
              <div key={index} className="flex-none w-28 h-8 flex items-center justify-center bg-gray-100 rounded-lg">
                <span className="text-gray-400 text-sm font-medium">{company.name}</span>
              </div>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-6">
            {COMPANY_LOGOS.map((company, index) => (
              <div key={index} className="flex-none w-28 h-8 flex items-center justify-center bg-gray-100 rounded-lg">
                <span className="text-gray-400 text-sm font-medium">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const HomeScreen = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const checkTimeout = useRef<NodeJS.Timeout | null>(null);
  const [error, setError] = useState("");
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!hasAnimated.current) {
    setTimeout(() => setMounted(true), 100);
      setTimeout(() => setShowCards(true), 100);
    setTimeout(() => setShowForm(true), 1500);
      hasAnimated.current = true;
    } else {
      setMounted(true);
      setShowCards(true);
      setShowForm(true);
    }
  }, []);

  const handleUsernameChange = (value: string) => {
    const sanitizedValue = value.toLowerCase().replace(/[^a-z0-9-]/g, "");
    setUsername(sanitizedValue);

    if (sanitizedValue.length < 3) {
      setIsAvailable(false);
      return;
    }

    if (checkTimeout.current) {
      clearTimeout(checkTimeout.current);
    }

    checkTimeout.current = setTimeout(() => {
      checkAvailability(sanitizedValue);
    }, 300);
  };

  const checkAvailability = async (value: string) => {
    if (!value || value.length < 3) {
      setIsAvailable(false);
      return;
    }

    setIsCheckingUsername(true);
    try {
      // Temporalmente, mientras el backend está apagado, siempre retornamos disponible
      setTimeout(() => {
        setIsAvailable(true);
        setIsCheckingUsername(false);
      }, 500);
    } catch (error) {
      console.error("Error checking username:", error);
      setIsAvailable(false);
      setIsCheckingUsername(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      if (!username || username.length < 3) {
        setError("El nombre de usuario debe tener al menos 3 caracteres");
        return;
      }
      setIsLoading(true);
      const result = await googleSignUp(username);
      if (!result) {
        setError("Error durante el inicio de sesión con Google");
        setIsLoading(false);
        return;
      }
      setTimeout(() => 1000);
      await authClient.updateUser({
        username: username,
      });
      navigate("/beta", { state: { username: username } });
    } catch (error) {
      console.error("Error during Google sign up:", error);
      setError("Hubo un problema al iniciar sesión con Google");
      setIsLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (username && isAvailable && email && password && name) {
      setIsLoading(true);
      try {
        await emailSignUp(email, password, username, name);
        navigate("/beta");
      } catch (error) {
        const authError = error as AuthError;
        console.error("Error during email sign-up:", error);
        if (authError.code === "USERNAME_IS_ALREADY_TAKEN_PLEASE_TRY_ANOTHER") {
          setError(
            "Este nombre de usuario ya está en uso. Por favor, elige otro.",
          );
        } else {
          setError(authError.message || "Error durante el registro con correo");
        }
      } finally {
        setIsLoading(false);
      }
    } else if (!name) {
      setError("Por favor ingresa tu nombre completo");
    }
  };

  const handleLogin = async () => {
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

    setShowSignUpModal(true);
  };

  return (
    <>
      <Helmet>
        <title>Kasbu - Crea tu página personal con un diseño único y moderno</title>
        <meta name="description" content="Kasbu te permite crear una página personal interactiva y moderna. Comparte tus redes sociales, fotos, ubicación y más con un diseño único y personalizable." />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kasbu.com/" />
        <meta property="og:title" content="Kasbu - Tu página personal con estilo" />
        <meta property="og:description" content="Crea una página personal única con Kasbu. Comparte tu contenido de forma elegante y moderna." />
        <meta property="og:image" content="https://kasbu.com/og-image.jpg" />

        {/* SEO tags */}
        <meta name="keywords" content="página personal, portafolio digital, redes sociales, diseño web, kasbu, página web personal" />
        <meta name="author" content="Kasbu" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://kasbu.com/" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Kasbu",
            "applicationCategory": "DesignApplication",
            "description": "Plataforma para crear páginas personales con diseño moderno y personalizable",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Helmet>
      
      <div className={`fixed inset-0 w-full bg-transparent transition-opacity duration-500 overflow-hidden
        ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        {/* Fondo decorativo */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Cuadrícula de fondo */}
          <div className="absolute inset-0 animate-[gridMove_7s_linear_infinite] bg-[linear-gradient(rgba(99,102,241,0.08)_4px,transparent_4px),linear-gradient(90deg,rgba(99,102,241,0.08)_4px,transparent_4px)] bg-[size:200px_200px] bg-[position:center_center]" />
          
          {/* Manchas azules */}
          <div className="absolute bottom-[20%] right-[30%] w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.04),transparent_80%)] blur-3xl" />
          <div className="absolute bottom-[10%] left-[20%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.03),transparent_70%)] blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.02),transparent_50%)]" />
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.8),transparent)]" />
          <div className="absolute bottom-0 left-0 w-full h-[100vh] bg-[linear-gradient(to_top,rgba(99,102,241,0.08),rgba(147,51,234,0.04),rgba(99,102,241,0.02),transparent)]" />
          <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-[linear-gradient(to_top,rgba(255,255,255,0.95),rgba(255,255,255,0.3),transparent)]" />
        </div>

        <FloatingCards startSequence={showCards} />

        {/* Contenido principal */}
        <div className={`absolute inset-0 flex flex-col items-center transition-all duration-1000 ease-out
          ${showForm ? 'justify-center' : 'justify-center translate-y-8'}`}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={showSignUpModal ? 'form' : 'initial'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center transform"
            >
              {!showSignUpModal && (
                <div className={`relative mb-6 group transition-all duration-1000 transform
              ${mounted ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-2xl transition-all duration-500" />
              <img 
                src="/images/Kasbu.png" 
                alt="Kasbu Logo" 
                    className="relative w-32 h-32 object-contain mx-auto transition-all duration-500 hover:scale-105"
              />
            </div>
              )}

              <div className={`space-y-8 transition-all duration-1000 delay-300 ${showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {!showSignUpModal ? (
                <>
                    <h1 className="text-4xl font-bold tracking-tight flex items-center justify-center gap-2">
                      <motion.span {...getAnimationProps(hasAnimated.current ? 0 : 1.6)}>
                        <span className="text-gray-900">El </span>
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">Hogar </span>
                        <span className="text-gray-900">de tus enlaces</span>
                      </motion.span>
                      <motion.span 
                        {...getAnimationProps(hasAnimated.current ? 0 : 1.7)} 
                        className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
                      >
                        .
                      </motion.span>
                    </h1>
                    <motion.h3 
                      {...getAnimationProps(hasAnimated.current ? 0 : 2.0)} 
                      className="heading-14 text-[22px] font-light text-[#636363] leading-[40px] flex justify-center -mt-1"
                    >
                      Tu Página Personal donde compartes todo lo que creas.
                    </motion.h3>
                    
                    <div className="flex flex-col items-center space-y-6 mt-12">
                      <motion.div
                        initial={hasAnimated.current ? false : { opacity: 0, scale: 1.8, filter: "blur(8px)", y: 40 }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
                        transition={{ 
                          duration: 0.8,
                          delay: hasAnimated.current ? 0 : 2.2,
                          type: "spring",
                          stiffness: 50,
                          damping: 15
                        }}
                        className="flex flex-col items-center space-y-6"
                      >
                    <button 
                      onClick={handleLogin}
                          className="px-8 py-3 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:from-blue-500 hover:to-purple-500 active:from-blue-700 active:to-purple-700 transform hover:scale-105 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 relative overflow-hidden group"
                        >
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] rounded-xl" />
                          <div className="absolute top-0 -left-[100%] w-[120%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shine_3s_ease-in-out_infinite] pointer-events-none" />
                          Aparta tu espacio ahora
                    </button>

                        <button
                          onClick={() => navigate('/login')}
                          className="px-6 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-all duration-200 ease-out rounded-lg hover:bg-gray-100"
                        >
                          Ya tengo una cuenta
                        </button>
                      </motion.div>
                  </div>
                </>
              ) : (
                  <div className="flex flex-col items-center justify-center">
                    <motion.h1 
                      {...getAnimationProps(0)}
                      className="text-4xl font-bold tracking-tight flex items-center justify-center gap-2 mb-8"
                    >
                      <span className="text-gray-900">Elige la dirección de tu </span>
                      <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">kasbu</span>
                    </motion.h1>

                    <motion.div
                      initial={{ opacity: 0, scale: 1.2, filter: "blur(8px)", y: 40 }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
                      transition={{ 
                        duration: 0.8,
                        type: "spring",
                        stiffness: 50,
                        damping: 15
                      }}
                      className="relative"
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-[28px] blur-xl"
                      />
                      <div className="w-[480px] h-[480px] mx-auto bg-gradient-to-br from-white via-[#F0F1FF] to-[#D8DBFF] rounded-3xl p-8 shadow-[0_8px_32px_-4px_rgba(88,101,242,0.15)] transition-all duration-300 relative">
                        <div className="flex flex-col h-full">
                          <div className="space-y-6">
                            {/* Icono y título */}
                            <div className="flex flex-col items-start gap-3">
                              <div className="w-16 h-16 bg-gradient-to-br from-white via-[#F0F1FF] to-[#D8DBFF] rounded-2xl flex items-center justify-center shadow-[inset_2px_2px_4px_rgba(88,101,242,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.7)]">
                                <img 
                                  src="/images/Kasbu.png" 
                                  alt="Kasbu Logo" 
                                  className="w-12 h-12 object-contain"
                                />
                              </div>
                              <div className="text-left">
                                <h2 className="text-[#5865F2] font-medium text-2xl">Tu espacio digital</h2>
                                <p className="text-gray-500 text-base mt-1">Personaliza tu perfil</p>
                              </div>
                            </div>

                            {/* Campo de usuario */}
                            <div className="w-full relative">
                              <div className="bg-white/60 rounded-2xl p-4 transition-all duration-300 focus-within:bg-white/80 shadow-[0_4px_16px_-4px_rgba(88,101,242,0.1)] focus-within:ring-2 focus-within:ring-[#5865F2]/20">
                                <div className="flex items-center">
                                  <span className="text-gray-400 text-lg">kasbu.com/</span>
                                  <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => handleUsernameChange(e.target.value.slice(0, 10))}
                                    className="flex-1 bg-transparent outline-none text-lg text-gray-700 placeholder-gray-300"
                                    placeholder="username"
                                    required
                                    minLength={3}
                                    maxLength={10}
                                  />
                                  {username && (
                                    <div className={`ml-2 transition-all duration-300 ${isCheckingUsername ? 'animate-spin' : ''}`}>
                                      {isCheckingUsername ? (
                                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24">
                                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                      ) : isAvailable ? (
                                        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                      ) : (
                                        <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Botones de acción */}
                          <div className="flex-1 flex flex-col justify-end space-y-4 mt-6">
                            <button
                              onClick={handleGoogleSignIn}
                              disabled={!username || username.length < 3 || isAvailable === false || isCheckingUsername}
                              className="w-full bg-gradient-to-r from-[#5865F2] via-[#6D76F7] to-[#5865F2] text-white py-4 px-4 rounded-2xl font-medium text-lg transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_16px_-4px_rgba(88,101,242,0.2)]"
                            >
                              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                              </svg>
                              Continuar con Google
                            </button>

                            <button
                              onClick={() => setShowEmailForm(true)}
                              disabled={!username || username.length < 3 || isAvailable === false || isCheckingUsername}
                              className="w-full bg-white/60 text-[#5865F2] py-4 rounded-2xl font-medium text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_16px_-4px_rgba(88,101,242,0.1)]"
                            >
                              Continuar con correo
                            </button>

                            <button
                              onClick={() => setShowSignUpModal(false)}
                              className="w-full text-gray-400 hover:text-gray-600 py-2 text-base transition-colors duration-300"
                            >
                              Volver
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                        </div>
                )}
                      </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer con carrusel */}
        <div className={`fixed bottom-0 left-0 right-0 transition-all duration-1000
          ${showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {!showSignUpModal ? (
            <div className="space-y-8 pb-4 bg-gradient-to-b from-transparent via-transparent to-white/50">
              <LogoCarousel />
              <p className="text-sm text-gray-500 text-center">
              Diseña · Comparte · Conecta
            </p>
            </div>
          ) : (
            <p className="text-xs text-gray-400 text-center pb-4">
              Al registrarte, aceptas nuestros{" "}
              <a href="#" className="text-blue-600 hover:text-blue-700">
                Términos y condiciones
              </a>{" "}
              y{" "}
              <a href="#" className="text-blue-600 hover:text-blue-700">
                Política de privacidad
              </a>
            </p>
          )}
        </div>
      </div>
      <style>{`
        @keyframes shine {
          0% { transform: translateX(0); }
          20% { transform: translateX(200%); }
          100% { transform: translateX(200%); }
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes blink {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(-200px); }
        }
      `}</style>
    </>
  );
};

export default HomeScreen; 