import React from 'react';

const Terminal: React.FC = () => {
  return (
    <div className="flex h-1/4 min-h-[150px] flex-col border-t border-gray-700 bg-black p-4">
      <div className="flex h-full items-start rounded border-2 border-dashed border-gray-800 bg-gray-900/50 p-2 font-mono text-sm text-green-500">
        [ Terminal Output Area ]
      </div>
    </div>
  );
};

export default Terminal;
