import React from 'react';
import GlobalHeader from '../header/GlobalHeader';
import CodingWorkspace from '../editor/CodingWorkspace';
import AiChat from '../chat/AiChat';

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#1F201F] text-white">
      <GlobalHeader />

      {/* Split-Screen Container */}
      <div className="flex flex-1 overflow-hidden">
        <CodingWorkspace />
        <AiChat />
      </div>
    </div>
  );
};

export default DashboardLayout;
