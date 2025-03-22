import { useEffect, useState } from 'react';
import { authClient, signOut } from '../utils/auth-client';
import { useNavigate } from 'react-router-dom';

const BetaPage = () => {
  const [mounted, setMounted] = useState(false);
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
    const getUserData = async () => {
      try {
        const { data } = await authClient.getSession();
        if (data?.user?.name) {
          setUserName(data.user.name);
        } else {
          // Si no hay sesión, redirigir al inicio
          navigate('/');
        }
      } catch (error) {
        console.error('Error getting user data:', error);
        navigate('/');
      }
    };
    getUserData();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden">
      {/* Fondo decorativo */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.8),transparent)]" />
      </div>

      {/* Botón de cerrar sesión */}
      <button
        onClick={handleSignOut}
        disabled={isLoading}
        className="fixed top-4 right-4 px-4 py-2 text-gray-600 hover:text-gray-800 bg-white/50 hover:bg-white/80 
          backdrop-blur-md rounded-xl border border-gray-200 transition-all duration-300 flex items-center gap-2
          hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed z-50"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Cerrando sesión...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Cerrar sesión
          </>
        )}
      </button>

      {/* Elementos decorativos flotantes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-64 h-64 rounded-full bg-gradient-to-r from-blue-600/5 to-purple-600/5
              animate-float-slow transform -translate-x-1/2 -translate-y-1/2
              ${
                i === 0
                  ? "top-1/4 left-1/4 delay-0"
                  : i === 1
                    ? "top-3/4 left-3/4 delay-1000"
                    : "top-1/2 left-2/3 delay-2000"
              }`}
            style={{
              animationDuration: `${20 + i * 5}s`,
              filter: "blur(40px)",
            }}
          />
        ))}
      </div>

      <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4">
        <div className={`text-center transform transition-all duration-1000 ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {/* Logo */}
          <div className="relative mb-12 group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-2xl 
              group-hover:from-blue-600/30 group-hover:to-purple-600/30 transition-all duration-500" />
            <img 
              src="/images/Logo.png"
              alt="Kasbu Logo"
              className="relative w-28 h-28 object-contain mx-auto transition-all duration-500
              hover:scale-105"
            />
          </div>

          {/* Mensaje principal */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ¡Estás dentro!
            </h1>
            <div className="space-y-2">
              <p className="text-2xl text-gray-700 max-w-md mx-auto font-medium">
                {userName}, hemos reservado
              </p>
              <p className="text-3xl text-blue-600 font-bold">
                kasbu.com
              </p>
              <p className="text-2xl text-gray-700 max-w-md mx-auto font-medium">
                para ti
              </p>
            </div>
            <p className="text-xl text-gray-600 max-w-md mx-auto">
              Muy pronto recibirás noticias emocionantes.
            </p>

            {/* Iconos de características */}
            <div className="flex justify-center gap-8 mt-12">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-blue-50 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">Acceso anticipado</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-purple-50 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">Novedades exclusivas</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-green-50 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">Prioridad de acceso</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`absolute bottom-8 left-0 right-0 text-center transition-all duration-1000 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <p className="text-sm text-gray-500">
          ¿Preguntas? Escríbenos a <a href="mailto:hola@kasbu.com" className="text-blue-600 hover:text-blue-700">hola@kasbu.com</a>
        </p>
      </div>
    </div>
  );
};

export default BetaPage; 