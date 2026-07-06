import React, { useState } from 'react';
import GlobalHeader from '../header/GlobalHeader';
import CodingWorkspace from '../editor/CodingWorkspace';
import AiChat from '../chat/AiChat';
import { MONOKAI_THEME } from '../themes/monacoThemes';
import { useExperimentGroup } from '../../hooks/useExperimentGroup';
import { useUrlParams } from '../../hooks/useUrlParams';
import { appThemeColors } from '../themes/appThemeColors';

const DashboardLayout: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState(MONOKAI_THEME);
  const { group, resetExperiment } = useExperimentGroup();
  const { taskId } = useUrlParams();
  const [currentCode, setCurrentCode] = useState('');

  return (
    <div
      style={appThemeColors[selectedTheme]}
      className="bg-bgI text-text relative flex h-screen w-full flex-col overflow-hidden overscroll-none"
    >
      <GlobalHeader selectedTheme={selectedTheme} onThemeChange={setSelectedTheme} />

      {/* Split-Screen Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* taskId passed as key to force remounting of CodingWorkspace when taskId changes, ensuring
        correct initial code and filename are loaded */}
        <CodingWorkspace
          key={taskId}
          theme={selectedTheme}
          onCodeChange={setCurrentCode}
          taskId={taskId}
        />
        {/* AiChat only in Task 1 */}
        {taskId === 1 && <AiChat group={group} currentCode={currentCode} />}
      </div>

      {/* Dev-Tool Button just for testing . Delete later */}
      <button
        onClick={resetExperiment}
        className="absolute bottom-4 left-4 z-50 rounded bg-gray-700/50 px-3 py-1 text-xs text-white opacity-30 transition-opacity hover:opacity-100"
      >
        Reset Group (Current: {group}) | Task: {taskId}
      </button>
    </div>
  );
};

export default DashboardLayout;
