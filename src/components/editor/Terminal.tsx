import React from 'react';

interface TerminalProps {
  output?: string;
}

const Terminal: React.FC<TerminalProps> = ({ output = '' }) => {
  return (
    <div className="flex h-1/4 min-h-37.5 flex-col">
      <div className="bg-monokai-highlight text-monokai-text flex h-8 items-center pl-4 text-sm font-bold">
        &gt; Output
      </div>
      <div className="bg-monokai-bgII text-monokai-text flex h-full flex-col overflow-auto rounded border-2 border-dashed border-gray-800 p-2 font-mono text-sm whitespace-pre-wrap">
        {output || '[ Terminal Output Area ]'}
      </div>
    </div>
  );
};

export default Terminal;
