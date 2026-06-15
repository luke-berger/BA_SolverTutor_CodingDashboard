import React, { useState } from 'react';
import GlobalHeader from '../header/GlobalHeader';
import CodingWorkspace from '../editor/CodingWorkspace';
import AiChat from '../chat/AiChat';
import { MONOKAI_THEME } from '../editor/monacoThemes';

const DashboardLayout: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState(MONOKAI_THEME);

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#1F201F] text-white">
      <GlobalHeader selectedTheme={selectedTheme} onThemeChange={setSelectedTheme} />

      {/* Split-Screen Container */}
      <div className="flex flex-1 overflow-hidden">
        <CodingWorkspace theme={selectedTheme} />
        <AiChat />
      </div>
    </div>
  );
};

export default DashboardLayout;
