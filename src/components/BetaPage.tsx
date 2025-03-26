import { useEffect, useState } from 'react';
import { authClient, signOut } from '../utils/auth-client';
import { useNavigate, useLocation } from 'react-router-dom';

const BetaPage = () => {
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await authClient.getSession();
        if (data?.user?.name) {
          setUserName(data.user.name);

          // Si tenemos un username pendiente de actualizar, lo intentamos aquí
          if (username && !data.user.username) {
            try {
              const { error: updateError } = await authClient.updateUser({
                username: username,
              });

              if (updateError) {
                console.error("Error updating username:", updateError);
                navigate('/', { 
                  state: { 
                    error: "No se pudo asignar el nombre de usuario. Por favor, intenta con otro." 
                  } 
                });
                return;
              }
            } catch (error) {
              console.error("Error updating username:", error);
              navigate('/', { 
                state: { 
                  error: "Hubo un problema al actualizar tu nombre de usuario. Por favor, intenta de nuevo." 
                } 
              });
              return;
            }
          }
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error getting user data:', error);
        navigate('/');
      }
    };
    getUserData();
  }, [navigate, username]);

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
    <div className="min-h-screen w-full bg-white relative">
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

      {/* Mensaje principal */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-medium text-gray-800">
            {userName}, pronto Kasbu estará disponible para ti
          </h1>
        </div>
      </div>
    </div>
  );
};

export default BetaPage; 