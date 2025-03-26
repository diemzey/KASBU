import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { authClient } from '../utils/auth-client';
import LoadingModal from './LoadingModal';

const UserPage = () => {
  const { username } = useParams<{ username: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isDevelopment = true; // Forzamos modo desarrollo
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Aquí cargaríamos los datos del usuario desde el backend
        const response = await fetch(`https://back.kasbu.com/user/${username}`);
        const data = await response.json();
        
        if (isDevelopment) {
          setDebugInfo(data);
        }

        if (!response.ok) {
          throw new Error(data.message || 'Error al cargar el perfil');
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error loading user data:', error);
        setError('No se pudo cargar el perfil');
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [username]);

  if (isLoading) {
    return <LoadingModal isOpen={true} message="Cargando perfil..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-white flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 max-w-md">
          <p className="text-red-700 text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Fondo decorativo */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.8),transparent)]" />
      </div>

      {/* Contenido principal */}
      <div className="relative min-h-screen w-full max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">@{username}</h1>
          <p className="text-gray-600 mt-2">Bienvenido a mi Kasbu</p>
        </div>

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Aquí irían las tarjetas de contenido */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-800">Próximamente</h2>
            <p className="text-gray-600 mt-2">
              Pronto podrás personalizar tu Kasbu con tus enlaces y contenido favorito
            </p>
          </div>
        </div>

        {/* Debug Info */}
        {isDevelopment && debugInfo && (
          <div className="mt-8">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <h2 className="text-lg font-medium text-gray-800 mb-2">Debug Info:</h2>
              <pre className="text-xs text-gray-600 overflow-auto max-h-96">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage; 