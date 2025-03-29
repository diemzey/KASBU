import React from 'react';

interface SignOutButtonProps {
  onClick: () => void;
}

const SignOutButton = ({ onClick }: SignOutButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 right-4 px-4 py-2 text-gray-600 hover:text-gray-800 bg-white/50 hover:bg-white/80 
        backdrop-blur-md rounded-xl border border-gray-200 transition-all duration-300 flex items-center gap-2
        hover:shadow-lg z-50"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      Cerrar sesión
    </button>
  );
};

export default SignOutButton; 