import React from 'react';

interface DebugInfoProps {
  data: any;
}

const DebugInfo = ({ data }: DebugInfoProps) => {
  if (!data || process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="mt-8 text-left">
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <h2 className="text-lg font-medium text-gray-800 mb-2">Debug Info:</h2>
        <pre className="text-xs text-gray-600 overflow-auto max-h-96">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default DebugInfo; 