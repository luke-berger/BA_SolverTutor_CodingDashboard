import React from 'react';

const Terminal: React.FC = () => {
  return (
    <div className="flex h-1/4 min-h-37.5 flex-col">
      <div className="bg-monokai-highlight text-monokai-text flex h-8 items-center pl-4 text-sm font-bold">
        &gt; Output
      </div>
      <div className="bg-monokai-bgII text-monokai-text flex h-full items-start rounded border-2 border-dashed border-gray-800 p-2 font-mono text-sm">
        [ Terminal Output Area ]
      </div>
    </div>
  );
};

export default Terminal;
