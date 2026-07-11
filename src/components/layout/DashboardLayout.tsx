import React, { useState, useEffect } from 'react';
import GlobalHeader from '../header/GlobalHeader';
import CodingWorkspace from '../editor/CodingWorkspace';
import AiChat from '../chat/AiChat';
import { MONOKAI_THEME } from '../themes/monacoThemes';
import { useExperimentGroup } from '../../hooks/useExperimentGroup';
import { useUrlParams } from '../../hooks/useUrlParams';
import { appThemeColors } from '../themes/appThemeColors';
import { useTelemetry } from '../../hooks/useTelemetry';

// DashboardLayout component that wraps the entire dashboard
const DashboardLayout: React.FC = () => {
  // lazy initialization of selectedTheme from localStorage, defaulting to MONOKAI_THEME if not found
  const [selectedTheme, setSelectedTheme] = useState(() => {
    const savedTheme = localStorage.getItem('solverTutorTheme');
    return savedTheme || MONOKAI_THEME;
  });
  // Persist selectedTheme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('solverTutorTheme', selectedTheme);
  }, [selectedTheme]);

  const { group, resetExperiment } = useExperimentGroup();
  const { taskId, surveyId } = useUrlParams();
  const [currentCode, setCurrentCode] = useState('');

  // Telemetry hook to track user interactions
  const { incrementThemeChange } = useTelemetry();
  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
    incrementThemeChange();
  };

  return (
    <div
      style={appThemeColors[selectedTheme]}
      className="bg-bgI text-text relative flex h-screen w-full flex-col overflow-hidden overscroll-none"
    >
      <GlobalHeader selectedTheme={selectedTheme} onThemeChange={handleThemeChange} />

      {/* Split-Screen Container */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* taskId passed as key to force remounting of CodingWorkspace when taskId changes, ensuring
        correct initial code and filename are loaded */}
        <CodingWorkspace
          key={taskId}
          theme={selectedTheme}
          onCodeChange={setCurrentCode}
          taskId={taskId}
          surveyId={surveyId}
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
