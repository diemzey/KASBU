import { useEffect, useState } from 'react';
import { authClient } from '../utils/auth-client';
import { useNavigate } from 'react-router-dom';

const BetaPage = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await authClient.getSession();
        if (data?.user?.name) {
          setUserName(data.user.name);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error getting user data:', error);
        navigate('/');
      }
    };
    getUserData();
  }, [navigate]);

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-medium text-gray-800">
          {userName}, pronto Kasbu estará disponible para ti
        </h1>
      </div>
    </div>
  );
};

export default BetaPage; 