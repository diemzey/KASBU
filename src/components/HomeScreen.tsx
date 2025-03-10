import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [username, setUsername] = useState('');
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleUsernameChange = (value: string) => {
    setUsername(value.toLowerCase().replace(/[^a-z0-9-]/g, ''));
    setIsAvailable(null);
  };

  const checkAvailability = () => {
    // Simulación de verificación
    setIsAvailable(username.length >= 3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.length >= 3 && isAvailable) {
      navigate('/start', { state: { username } });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.8),transparent)]" />
      </div>

      {/* Elementos decorativos flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-64 h-64 rounded-full bg-gradient-to-r from-blue-600/5 to-purple-600/5
              animate-float-slow transform -translate-x-1/2 -translate-y-1/2
              ${i === 0 ? 'top-1/4 left-1/4 delay-0' : 
                i === 1 ? 'top-3/4 left-3/4 delay-1000' : 
                'top-1/2 left-2/3 delay-2000'}`}
            style={{
              animationDuration: `${20 + i * 5}s`,
              filter: 'blur(40px)'
            }}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4">
        <div className={`text-center transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {/* Logo con efecto de brillo */}
          <div className="relative mb-6 group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-2xl 
              group-hover:from-blue-600/30 group-hover:to-purple-600/30 transition-all duration-500" />
            <h1 className="relative text-[6rem] leading-none font-normal font-['Modernia'] bg-gradient-to-r from-blue-600 to-purple-600 
              bg-clip-text text-transparent transition-all duration-500
              hover:from-blue-500 hover:to-purple-500">
              K
            </h1>
          </div>

          {/* Texto descriptivo con animación de entrada */}
          <p className={`text-xl text-gray-600 mb-12 max-w-md mx-auto transition-all duration-1000 delay-300
            ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            Tu espacio digital, tu identidad
          </p>

          {/* Campo de usuario */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
            <div className={`relative transition-all duration-1000 delay-400
              ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <span className="text-gray-600 font-medium select-none">kasbu.com/</span>
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  onBlur={checkAvailability}
                  className="block w-full pl-[6rem] pr-10 py-4 bg-white border border-gray-200 rounded-2xl 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all
                    shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_2px_8px_-2px_rgba(0,0,0,0.1)]
                    text-lg"
                  placeholder="mi-nombre"
                  required
                  minLength={3}
                />
                {isAvailable !== null && (
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    {isAvailable ? (
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                )}
              </div>
              {!isAvailable && username.length > 0 && (
                <p className="mt-1 text-xs text-red-500 pl-3">
                  El nombre debe tener al menos 3 caracteres y estar disponible.
                </p>
              )}
            </div>

            {/* Botón con efectos mejorados */}
            <button
              type="submit"
              disabled={!isAvailable}
              className={`group relative w-full px-8 py-4 mt-4 transition-all duration-1000 delay-500
                ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl 
                group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300
                shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/30
                ${!isAvailable ? 'opacity-50' : ''}`} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
              <span className="relative text-white font-medium">
                Crear mi espacio
              </span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/start')}
              className={`w-full text-gray-500 py-3 text-sm hover:text-gray-800 transition-all duration-300
                ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>

      {/* Footer con animación de entrada */}
      <div className={`absolute bottom-8 left-0 right-0 text-center transition-all duration-1000 delay-700
        ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <p className="text-sm text-gray-500">
          Diseña · Comparte · Conecta
        </p>
      </div>
    </div>
  );
};

export default HomeScreen; 