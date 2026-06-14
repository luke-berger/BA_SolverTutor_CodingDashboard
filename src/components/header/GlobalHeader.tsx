import React from 'react';

const GlobalHeader: React.FC = () => {
  return (
    <header className="border-monokai-highlight bg-monokai-bgI flex h-10 shrink-0 items-center justify-between border-b px-4">
      <div className="text-lg font-bold text-gray-400"></div>
      <div className="border-monokai-highlight text-monokai-text border border-dashed p-1 text-sm">
        [ Header Controls Placeholder ]
      </div>
    </header>
  );
};

export default GlobalHeader;
