import React from 'react';

const GlobalHeader: React.FC = () => {
  return (
    <header className="flex h-10 shrink-0 items-center justify-between border-b border-[#414339] bg-[#1F201F] px-4">
      <div className="text-lg font-bold text-[#DEDEDE]">Dashboard</div>
      <div className="border border-dashed border-gray-500 p-1 text-sm text-gray-500">
        [ Header Controls Placeholder ]
      </div>
    </header>
  );
};

export default GlobalHeader;
