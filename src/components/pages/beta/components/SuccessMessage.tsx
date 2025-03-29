import React from 'react';

interface SuccessMessageProps {
  username: string;
  isNewUsername: boolean;
}

const SuccessMessage = ({ username, isNewUsername }: SuccessMessageProps) => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-4">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-green-700 text-lg font-medium mb-1">
            {isNewUsername ? '¡Has reservado tu nombre de usuario!' : 'Tu nombre de usuario está reservado'}
          </p>
          <p className="text-green-600 text-sm mb-3">
            Serás de los primeros en tener tu espacio en Kasbu
          </p>
          <div className="bg-white/50 backdrop-blur-sm border border-green-100 rounded-lg py-2 px-4 inline-block">
            <p className="text-green-800 font-medium">
              kasbu.com/{username}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage; 