import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authClient, signOut } from '../utils/auth-client';

interface UseAuthResult {
  userName: string;
  userUsername: string;
  usernameStatus: 'success' | 'error' | null;
  showLoadingModal: boolean;
  debugInfo: any;
  handleSignOut: () => Promise<void>;
}

export const useAuth = (requestedUsername?: string): UseAuthResult => {
  const [userName, setUserName] = useState('');
  const [userUsername, setUserUsername] = useState('');
  const [usernameStatus, setUsernameStatus] = useState<'success' | 'error' | null>(null);
  const [showLoadingModal, setShowLoadingModal] = useState(true);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const navigate = useNavigate();
  const isDevelopment = process.env.NODE_ENV === 'development';

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await authClient.getSession();
        if (data?.user?.name) {
          setUserName(data.user.name);
          if (isDevelopment) {
            setDebugInfo(prev => ({ ...prev, sessionData: data }));
          }

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

  return {
    userName,
    userUsername,
    usernameStatus,
    showLoadingModal,
    debugInfo,
    handleSignOut
  };
}; 