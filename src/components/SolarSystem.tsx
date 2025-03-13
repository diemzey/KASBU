import { useEffect, useState, useRef, useCallback } from 'react';
import { URLCard } from './cards/URLCard';

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
  distance: number;
  opacity: number;
  type: 'youtube' | 'github' | 'twitter' | 'instagram' | 'linkedin' | 'spotify' | 'twitch' | 'discord' | 'website' | 'email';
  delay: number;
  active: boolean;
}

const CARD_TYPES: Particle['type'][] = [
  'youtube', 'github', 'twitter', 'instagram', 'linkedin', 'spotify', 'twitch', 'discord', 'website', 'email'
];

const CARD_URLS = {
  youtube: 'https://youtube.com/@yourusername',
  github: 'https://github.com/yourusername',
  twitter: 'https://twitter.com/yourusername',
  instagram: 'https://instagram.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  spotify: 'https://open.spotify.com/user/yourusername',
  twitch: 'https://twitch.tv/yourusername',
  discord: 'https://discord.gg/yourusername',
  website: 'https://yourdomain.com',
  email: 'mailto:your@email.com'
} as const;

const INITIAL_DELAY = 1500;
const TOTAL_CYCLE_TIME = 24000; // 24 segundos para un ciclo completo
const DELAY_BETWEEN_CARDS = TOTAL_CYCLE_TIME / CARD_TYPES.length; // Distribuir equitativamente
const BASE_SPEED = 0.008;
const SPEED_VARIANCE = 0.001;
const DISTANCE_MIN = 600;
const DISTANCE_VARIANCE = 100;
const CARD_SIZE_MAX = 180;
const CARD_SIZE_MIN = 60;
const BASE_SCALE_MAX = 1.5;
const BASE_SCALE_MIN = 0.3;
const REGENERATION_DELAY = DELAY_BETWEEN_CARDS;
const FADE_START_DISTANCE = 0.8;
const FADE_END_DISTANCE = 0.2;
const SPAWN_ANGLE = -Math.PI / 2;

const BlackHole = () => {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const requestRef = useRef<number>();
  const cardsRef = useRef<HTMLDivElement>(null);

  const createParticle = useCallback((index: number): Particle => ({
    x: 0,
    y: 0,
    size: CARD_SIZE_MAX,
    speed: Math.random() * SPEED_VARIANCE + BASE_SPEED,
    angle: SPAWN_ANGLE + (Math.random() * 0.2 - 0.1),
    distance: DISTANCE_MIN + Math.random() * DISTANCE_VARIANCE,
    opacity: 1,
    type: CARD_TYPES[index],
    delay: INITIAL_DELAY + (index * DELAY_BETWEEN_CARDS),
    active: false
  }), []);

  const updateParticle = useCallback((
    particle: Particle, 
    radius: number, 
    centerX: number, 
    centerY: number,
    card: HTMLElement
  ) => {
    // Calcular la aceleración basada en la distancia al centro
    const gravityFactor = Math.pow(radius / particle.distance, 0.6);
    const radialSpeed = particle.speed * (1 + gravityFactor);
    
    // Actualizar posición
    particle.distance -= radialSpeed;
    particle.angle += 0.001 / Math.pow(gravityFactor, 0.5);
    
    // Calcular opacidad y efectos visuales basados en la distancia
    const distanceRatio = (particle.distance - radius * FADE_END_DISTANCE) / (radius * FADE_START_DISTANCE);
    const normalizedDistance = Math.max(0, Math.min(1, distanceRatio));

    // Calcular tamaño basado en la distancia
    const size = CARD_SIZE_MIN + (CARD_SIZE_MAX - CARD_SIZE_MIN) * normalizedDistance;
    
    // Calcular opacidad con una curva más suave
    if (particle.distance < radius * FADE_START_DISTANCE) {
      const distanceFactor = (particle.distance - radius * FADE_END_DISTANCE) / (radius * 0.6);
      particle.opacity = Math.max(0, Math.min(1, Math.pow(distanceFactor, 1.5)));
    }

    // Calcular efectos visuales con una curva más gradual
    const blurStart = 0.6;
    const blurIntensity = Math.max(0, (blurStart - normalizedDistance) / blurStart * 12);
    const blur = Math.pow(blurIntensity, 1.5);
    
    // Actualizar posición y estilos de la card
    const x = centerX + Math.cos(particle.angle) * particle.distance;
    const y = centerY + Math.sin(particle.angle) * particle.distance;
    
    // Nuevo cálculo de escala que permite tanto reducir como agrandar
    const scale = BASE_SCALE_MIN + (BASE_SCALE_MAX - BASE_SCALE_MIN) * normalizedDistance;
    card.style.transform = `translate(${x - CARD_SIZE_MAX/2}px, ${y - CARD_SIZE_MAX/2}px) scale(${scale})`;
    card.style.opacity = particle.opacity.toString();
    card.style.filter = `blur(${blur}px)`;
  }, []);

  useEffect(() => {
    setMounted(true);
    
    // Inicializar partículas
    particlesRef.current = Array(CARD_TYPES.length).fill(null).map((_, index) => createParticle(index));

    // Activar partículas en secuencia
    particlesRef.current.forEach((particle, index) => {
      setTimeout(() => {
        if (particlesRef.current[index]) {
          particlesRef.current[index].active = true;
        }
      }, particle.delay);
    });

    const animate = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      const cards = cardsRef.current;
      
      if (!canvas || !ctx || !cards) return;

      // Limpiar canvas
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.55;

      // Actualizar partículas
      particlesRef.current.forEach((particle, index) => {
        const card = cards.children[index] as HTMLElement;
        if (!card) return;

        if (!particle.active) {
          card.style.opacity = '0';
          return;
        }

        updateParticle(particle, radius, centerX, centerY, card);

        // Regenerar partícula cuando desaparece
        if (particle.opacity <= 0 || particle.distance < radius * FADE_END_DISTANCE) {
          const newParticle = createParticle(index);
          particlesRef.current[index] = newParticle;

          // Posicionar mientras está invisible
          card.style.opacity = '0';
          const x = centerX + Math.cos(newParticle.angle) * newParticle.distance;
          const y = centerY + Math.sin(newParticle.angle) * newParticle.distance;
          card.style.transform = `translate(${x - newParticle.size}px, ${y - newParticle.size}px)`;

          setTimeout(() => {
            if (particlesRef.current[index]) {
              particlesRef.current[index].active = true;
            }
          }, REGENERATION_DELAY);
        }
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [createParticle, updateParticle]);

  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />

      {/* Logo central */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-[48px] 
            group-hover:from-blue-600/30 group-hover:to-purple-600/30 transition-all duration-500" />
          <h1 className="relative text-[9rem] leading-none font-normal font-['Modernia'] bg-gradient-to-r from-blue-600/40 to-purple-600/40 
            bg-clip-text text-transparent transition-all duration-500
            hover:from-blue-500/50 hover:to-purple-500/50">
            K
          </h1>
        </div>
      </div>

      {/* Copyright */}
      <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
        <p className="text-sm text-gray-500/80 font-light">
          © 2024 Todos los derechos reservados · Hapco Tecnologías del Futuro · 
          <span className="font-semibold text-gray-600/90">KASBU.COM</span>
        </p>
      </div>

      <div ref={cardsRef} className="absolute inset-0 pointer-events-none">
        {CARD_TYPES.map((type, index) => (
          <div
            key={type}
            className="absolute"
            style={{
              width: `${CARD_SIZE_MAX}px`,
              height: `${CARD_SIZE_MAX}px`,
              transition: 'transform 0s, opacity 0.5s ease-out, filter 0.3s ease-out'
            }}
          >
            <URLCard
              url={CARD_URLS[type]}
              title={type.charAt(0).toUpperCase() + type.slice(1)}
              children={type}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlackHole; 