import React from 'react';

const ErrorMessage = () => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-4">
      <p className="text-red-700">
        No se pudo asignar el nombre de usuario solicitado
      </p>
      <p className="text-red-600 mt-2">
        Por favor, intenta con otro nombre de usuario
      </p>
    </div>
  );
};

export default ErrorMessage; 