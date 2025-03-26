import { useEffect, useState } from 'react';
import { authClient, signOut } from '../utils/auth-client';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingModal from './LoadingModal';

const BetaPage = () => {
  const [userName, setUserName] = useState('');
  const [userUsername, setUserUsername] = useState('');
  const [usernameStatus, setUsernameStatus] = useState<'success' | 'error' | null>(null);
  const [showLoadingModal, setShowLoadingModal] = useState(true);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const requestedUsername = location.state?.username;
  const isDevelopment = true; // Forzamos modo desarrollo

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await authClient.getSession();
        if (data?.user?.name) {
          setUserName(data.user.name);
          if (isDevelopment) {
            setDebugInfo(prev => ({ ...prev, sessionData: data }));
          }

          // Si tenemos un username pendiente de actualizar, lo intentamos aquí
          if (requestedUsername && !data.user.username) {
            try {
              const { error: updateError } = await authClient.updateUser({
                username: requestedUsername,
              });

              if (updateError) {
                console.error("Error updating username:", updateError);
                setUsernameStatus('error');
                if (isDevelopment) {
                  setDebugInfo(prev => ({ ...prev, updateError }));
                }
                navigate('/', { 
                  state: { 
                    error: "No se pudo asignar el nombre de usuario. Por favor, intenta con otro." 
                  } 
                });
                return;
              }
              
              // Refrescamos los datos del usuario para obtener el username actualizado
              const { data: updatedData } = await authClient.getSession();
              if (updatedData?.user?.username) {
                setUserUsername(updatedData.user.username);
                setUsernameStatus('success');
                if (isDevelopment) {
                  setDebugInfo(prev => ({ ...prev, updatedData }));
                }
              }
            } catch (error) {
              console.error("Error updating username:", error);
              setUsernameStatus('error');
              if (isDevelopment) {
                setDebugInfo(prev => ({ ...prev, error }));
              }
              navigate('/', { 
                state: { 
                  error: "Hubo un problema al actualizar tu nombre de usuario. Por favor, intenta de nuevo." 
                } 
              });
              return;
            }
          } else if (data.user.username) {
            setUserUsername(data.user.username);
            setUsernameStatus('success');
          }
          setShowLoadingModal(false);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error getting user data:', error);
        if (isDevelopment) {
          setDebugInfo(prev => ({ ...prev, error }));
        }
        navigate('/');
      }
    };
    getUserData();
  }, [navigate, requestedUsername, isDevelopment]);

  const handleSignOut = async () => {
    try {
      setShowLoadingModal(true);
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      if (isDevelopment) {
        setDebugInfo(prev => ({ ...prev, signOutError: error }));
      }
      setShowLoadingModal(false);
    }
  };

  const handleGoToKasbu = () => {
    navigate(`/${userUsername}`);
  };

  return (
    <div className={`min-h-screen w-full bg-white relative transition-opacity duration-500
      ${showLoadingModal ? 'opacity-0' : 'opacity-100'}`}>
      <LoadingModal 
        isOpen={showLoadingModal} 
        message="Verificando sesión..."
      />
      
      {/* Botón de cerrar sesión */}
      <button
        onClick={handleSignOut}
        className="fixed top-4 right-4 px-4 py-2 text-gray-600 hover:text-gray-800 bg-white/50 hover:bg-white/80 
          backdrop-blur-md rounded-xl border border-gray-200 transition-all duration-300 flex items-center gap-2
          hover:shadow-lg z-50"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Cerrar sesión
      </button>

      {/* Mensaje principal */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-medium text-gray-800">
            ¡Hola {userName}!
          </h1>
          
          {usernameStatus === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-4">
              <p className="text-green-700">
                Tu nombre de usuario ha sido asignado correctamente
              </p>
              <p className="text-green-800 font-medium mt-2">
                kasbu.com/{userUsername}
              </p>
              
              {/* Botón de ir a Kasbu */}
              <button
                onClick={handleGoToKasbu}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl
                  font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300
                  shadow-lg shadow-blue-500/25 group relative"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                  bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] rounded-xl" />
                <div className="flex items-center justify-center gap-2">
                  <span>Ir a tu Kasbu</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </button>
            </div>
          )}
          
          {usernameStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-4">
              <p className="text-red-700">
                No se pudo asignar el nombre de usuario solicitado
              </p>
              <p className="text-red-600 mt-2">
                Por favor, intenta con otro nombre de usuario
              </p>
            </div>
          )}

          <p className="text-xl text-gray-600 mt-6">
            Pronto Kasbu estará disponible para ti
          </p>

          {/* Debug Info */}
          {isDevelopment && debugInfo && (
            <div className="mt-8 text-left">
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
    </div>
  );
};

export default BetaPage; 