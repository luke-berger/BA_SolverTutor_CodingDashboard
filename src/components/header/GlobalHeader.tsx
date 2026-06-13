import React from 'react';

const GlobalHeader: React.FC = () => {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-gray-700 bg-gray-800 px-6">
      <div className="font-semibold text-gray-200">Debugging Dashboard</div>
      <div className="border border-dashed border-gray-500 p-1 text-sm text-gray-500">
        [ Header Controls Placeholder ]
      </div>
    </header>
  );
};

export default GlobalHeader;
