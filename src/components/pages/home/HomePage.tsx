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

  const patterns = [
    {
      y: [0, -35, -15, 25, 0],
      x: [0, 30, -25, -20, 0],
      rotate: [-4, 0, 4, 0, -4]
    },
    {
      y: [-25, -40, 0, -20, -25],
      x: [-35, 15, 30, -25, -35],
      rotate: [3, -3, 3, -3, 3]
    },
    {
      y: [20, -25, -45, 15, 20],
      x: [25, -30, 10, 25, 25],
      rotate: [-3, 3, -3, 3, -3]
    },
    {
      y: [10, -30, 20, -15, 10],
      x: [-20, 25, -25, 20, -20],
      rotate: [4, -2, 4, -2, 4]
    },
    {
      y: [-15, 25, -35, 10, -15],
      x: [30, -20, 15, -30, 30],
      rotate: [-3, 2, -3, 2, -3]
    }
  ];

  const patternIndex = index % patterns.length;
  const duration = 45 + (index % 5) * 8;

  return (
    <motion.div 
      className={`absolute ${sizeClasses} ${className} rounded-2xl overflow-hidden`}
      initial={{ opacity: 0, y: 40, scale: 1.4, filter: "blur(20px)" }}
      animate={visibleCards >= index ? {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        ...patterns[patternIndex]
      } : {}}
      transition={{ 
        opacity: { duration: 0.5 },
        scale: { duration: 0.8, type: "spring", stiffness: 100, damping: 12 },
        filter: { duration: 0.6 },
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
      const response = await fetch(
        `https://back.kasbu.com/check-username/${value}`,
      );
      const data = await response.json();
      setIsAvailable(!data.exists);
    } catch (error) {
      console.error("Error checking username:", error);
      setIsAvailable(false);
    } finally {
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
      
      <div className={`fixed inset-0 w-full bg-white transition-opacity duration-500 overflow-hidden
        ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        {/* Fondo decorativo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_50%)]" />
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.8),transparent)]" />
          <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-[linear-gradient(to_top,rgba(255,255,255,1),rgba(255,255,255,0.8),transparent)]" />
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
              {/* Logo */}
              <div className={`relative mb-6 group transition-all duration-1000 transform
                ${mounted ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-2xl 
                  transition-all duration-500" />
                <img 
                  src="/images/Kasbu.png" 
                  alt="Kasbu Logo" 
                  className="relative w-32 h-32 object-contain mx-auto transition-all duration-500 
                    hover:scale-105"
                />
              </div>

              {/* Contenido dinámico */}
              <div className={`space-y-8 transition-all duration-1000 delay-300
                ${showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                
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
                          className="px-8 py-3 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 
                            rounded-xl shadow-lg hover:from-blue-500 hover:to-purple-500 
                            active:from-blue-700 active:to-purple-700 transform hover:scale-105 
                            transition-all duration-200 ease-out focus:outline-none focus:ring-2 
                            focus:ring-purple-500 focus:ring-opacity-50 relative overflow-hidden group"
                        >
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                            bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] rounded-xl" />
                          <div className="absolute top-0 -left-[100%] w-[120%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent 
                            animate-[shine_3s_ease-in-out_infinite] pointer-events-none" />
                          Aparta tu espacio ahora
                        </button>

                        <button
                          onClick={() => navigate('/login')}
                          className="px-6 py-2 text-sm font-medium text-gray-600 hover:text-gray-900
                            transition-all duration-200 ease-out rounded-lg hover:bg-gray-100"
                        >
                          Ya tengo una cuenta
                        </button>
                      </motion.div>
                    </div>
                  </>
                ) : (
                  <div className="max-w-md mx-auto space-y-6">
                    {/* Campo de usuario */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Elige tu nombre de usuario
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                          <span className="text-gray-600 font-medium">kasbu.com/</span>
                        </div>
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => handleUsernameChange(e.target.value)}
                          onBlur={() => checkAvailability(username)}
                          className="block w-full pl-[calc(7.5rem-0.5rem)] pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          placeholder="mi-nombre"
                          required
                          minLength={3}
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center">
                          {isCheckingUsername ? (
                            <svg
                              className="animate-spin h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          ) : (
                            isAvailable !== null && (
                              isAvailable ? (
                                <svg
                                  className="w-5 h-5 text-green-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  className="w-5 h-5 text-red-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              )
                            )
                          )}
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-gray-500 pl-3"> 
                        Esta será tu URL personal. Usa solo minúsculas, números y guiones.
                      </p>
                      {username.length > 0 && (
                        <p className={`mt-1 text-xs pl-3 ${isAvailable ? "text-green-500" : "text-red-500"}`}>
                          {username.length < 3
                            ? "El nombre debe tener al menos 3 caracteres"
                            : /[^a-z0-9-]/.test(username)
                              ? "Solo puedes usar letras minúsculas, números y guiones"
                              : isAvailable === false
                                ? "Este nombre de usuario no está disponible"
                                : isAvailable === true
                                  ? "¡Este nombre de usuario está disponible!"
                                  : null}
                        </p>
                      )}
                    </div>

                    {!showEmailForm ? (
                      <>
                        {/* Botón de Google */}
                        <button
                          type="button"
                          onClick={handleGoogleSignIn}
                          disabled={!username || username.length < 3 || isAvailable === false || isCheckingUsername}
                          className="w-full bg-white text-gray-700 py-3 px-4 rounded-xl font-medium border border-gray-200 hover:bg-gray-50 transition-all duration-300 shadow-sm
                            flex items-center justify-center gap-3 relative group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              fill="#4285F4"
                            />
                            <path
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              fill="#34A853"
                            />
                            <path
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                              fill="#FBBC05"
                            />
                            <path
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              fill="#EA4335"
                            />
                          </svg>
                          <span className="relative">
                            {isCheckingUsername ? "Verificando usuario..." : "Continuar con Google"}
                          </span>
                        </button>

                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">O</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setShowEmailForm(true)}
                          disabled={!username || username.length < 3 || isAvailable === false || isCheckingUsername}
                          className="w-full bg-gray-50 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-100 transition-all duration-300
                            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-50"
                        >
                          Continuar con correo
                        </button>

                        <button
                          type="button"
                          onClick={() => setShowSignUpModal(false)}
                          className="w-full text-gray-600 py-2 rounded-xl font-medium hover:text-gray-800 transition-all duration-300"
                        >
                          Volver
                        </button>
                      </>
                    ) : (
                      <>
                        {/* Campo de nombre */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre completo
                          </label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="Tu nombre completo"
                            required
                          />
                        </div>

                        {/* Campo de correo */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Correo electrónico
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="tu@email.com"
                            required
                          />
                        </div>

                        {/* Campo de contraseña */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Contraseña
                          </label>
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                            required
                            minLength={6}
                          />
                        </div>

                        {/* Botón de registro */}
                        <button
                          type="button"
                          onClick={handleEmailSignUp}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-medium 
                            hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/25 
                            disabled:opacity-50 disabled:cursor-not-allowed group relative"
                          disabled={
                            !username ||
                            username.length < 3 ||
                            isAvailable === false ||
                            !email ||
                            !password ||
                            !name ||
                            isLoading ||
                            isCheckingUsername
                          }
                        >
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                            bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] rounded-xl" />
                          <div className="flex items-center justify-center gap-2">
                            {isLoading ? (
                              <>
                                <svg
                                  className="animate-spin h-5 w-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                <span className="relative">Creando cuenta...</span>
                              </>
                            ) : (
                              <span className="relative">Crear mi Kasbu</span>
                            )}
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setShowEmailForm(false)}
                          className="w-full text-gray-600 py-2 rounded-xl font-medium hover:text-gray-800 transition-all duration-300"
                        >
                          Volver
                        </button>
                      </>
                    )}

                    {/* Error message */}
                    {error && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                        <div className="flex items-center">
                          <svg
                            className="w-5 h-5 mr-2 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {error}
                        </div>
                      </div>
                    )}
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
            <div className="space-y-8 pb-4 bg-gradient-to-b from-transparent to-white">
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
      `}</style>
    </>
  );
};

export default HomeScreen; 