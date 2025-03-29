import React from 'react';
import { useLocation } from 'react-router-dom';
import LoadingModal from '../../common/LoadingModal';
import SignOutButton from '../../common/SignOutButton';
import SuccessMessage from './components/SuccessMessage';
import ErrorMessage from './components/ErrorMessage';
import DebugInfo from '../../common/DebugInfo';
import { useAuth } from '../../../hooks/useAuth';

const BetaPage = () => {
  const location = useLocation();
  const requestedUsername = location.state?.username;
  const {
    userName,
    userUsername,
    usernameStatus,
    showLoadingModal,
    debugInfo,
    handleSignOut
  } = useAuth(requestedUsername);

  return (
    <div className={`min-h-screen w-full bg-white relative transition-opacity duration-500
      ${showLoadingModal ? 'opacity-0' : 'opacity-100'}`}>
      <LoadingModal 
        isOpen={showLoadingModal} 
        message="Verificando sesión..."
      />
      
      <SignOutButton onClick={handleSignOut} />

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-medium text-gray-800">
            ¡Hola {userName}!
          </h1>
          
          {usernameStatus === 'success' && (
            <SuccessMessage 
              username={userUsername}
              isNewUsername={!!requestedUsername}
            />
          )}
          
          {usernameStatus === 'error' && <ErrorMessage />}

          <p className="text-xl text-gray-600 mt-6">
            Pronto Kasbu estará disponible para ti
          </p>

          <DebugInfo data={debugInfo} />
        </div>
      </div>
    </div>
  );
};

export default BetaPage; 