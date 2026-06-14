import React from 'react';

const Terminal: React.FC = () => {
  return (
    <div className="flex h-1/4 min-h-37.5 flex-col bg-black">
      <div className="placeholder: flex h-6 items-center bg-[#414339] pl-2 text-sm font-bold text-[#DEDEDE]">
        &gt; Output
      </div>
      <div className="flex h-full items-start rounded border-2 border-dashed border-gray-800 bg-[#272822] p-2 font-mono text-sm text-green-500">
        [ Terminal Output Area ]
      </div>
    </div>
  );
};

export default Terminal;
