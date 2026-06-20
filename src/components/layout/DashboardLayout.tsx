import React, { useState } from 'react';
import GlobalHeader from '../header/GlobalHeader';
import CodingWorkspace from '../editor/CodingWorkspace';
import AiChat from '../chat/AiChat';
import { MONOKAI_THEME } from '../editor/monacoThemes';
import { useExperimentGroup } from '../../hooks/useExperimentGroup';

const DashboardLayout: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState(MONOKAI_THEME);

  const { group, resetExperiment } = useExperimentGroup();

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[#1F201F] text-white">
      <GlobalHeader selectedTheme={selectedTheme} onThemeChange={setSelectedTheme} />

      {/* Split-Screen Container */}
      <div className="flex flex-1 overflow-hidden">
        <CodingWorkspace theme={selectedTheme} />

        {/* Give group to AiChat */}
        <AiChat group={group} />
      </div>

      {/* Dev-Tool Button just for testing . Delete later*/}
      <button
        onClick={resetExperiment}
        className="absolute bottom-4 left-4 z-50 rounded bg-gray-700/50 px-3 py-1 text-xs text-white opacity-30 transition-opacity hover:opacity-100"
      >
        Reset Group (Current: {group})
      </button>
    </div>
  );
};

export default DashboardLayout;
