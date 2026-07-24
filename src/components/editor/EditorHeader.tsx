import React, { useRef, useState, useEffect } from 'react';
import pythonIcon from '../../assets/python-icon.png';
import { Play, RotateCcw, SkipForward } from 'lucide-react';
import ResetModal from '../modals/ResetModal';
import SuccessModal from '../modals/SuccessModal';
import SkipModal from '../modals/SkipModal';
import { useTelemetry } from '../../hooks/useTelemetry';
import { handleProceedToSurvey } from '../../utils/surveyUtils.ts';

interface EditorHeaderProps {
  filename: string;
  onRun?: () => void;
  onReset?: () => void;
  isLoading?: boolean;
  showSuccess?: boolean;
  surveyId?: string;
  taskId?: number;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  filename,
  onRun,
  onReset,
  isLoading = false,
  showSuccess,
  surveyId,
  taskId,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);
  const [skipEnabled, setSkipEnabled] = useState(false);
  const { incrementRun, incrementReset, submitTelemetry } = useTelemetry();

  const hasLoggedSuccess = useRef(false);
  const isTask2 = taskId === 2;

  // listening for showSuccess to become true, then submit telemetry data (only once)
  useEffect(() => {
    if (showSuccess && !hasLoggedSuccess.current) {
      submitTelemetry('completed');
      hasLoggedSuccess.current = true;
    }
  }, [showSuccess, submitTelemetry]);

  useEffect(() => {
    if (!isTask2) {
      return;
    }

    const timer = window.setTimeout(() => {
      setSkipEnabled(true);
    }, 60000);

    return () => window.clearTimeout(timer);
  }, [isTask2]);

  const handleConfirmReset = () => {
    if (onReset) onReset();
    setShowResetConfirm(false);
  };

  const handleConfirmSkip = () => {
    submitTelemetry('skipped');
    setShowSkipConfirm(false);
    handleProceedToSurvey(surveyId || '', taskId || 1);
  };

  return (
    <div className="bg-bgI text-text flex shrink-0 items-center justify-between py-2 pr-2 pl-4 text-lg">
      <div className="flex items-center gap-2">
        <img src={pythonIcon} alt="Python Icon" className="h-7 w-7" />
        <span className="text-2xl font-bold">{filename}</span>
      </div>

      {/* RUN BUTTON */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          title="Run Code"
          onClick={() => {
            onRun?.();
            incrementRun();
          }}
          disabled={isLoading}
          aria-label="Run program"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md hover:brightness-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Play className="h-6 w-6" fill="currentColor" />
        </button>

        {/* RESETMODAL WRAPPER */}
        <div className="relative flex items-center">
          {/* RESET BUTTON */}
          <button
            type="button"
            title="Reset Code"
            onClick={() => setShowResetConfirm(true)}
            aria-label="Reset code"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md hover:brightness-50"
          >
            <RotateCcw className="h-6.5 w-6.5" strokeWidth={3} />
          </button>

          <ResetModal
            isOpen={showResetConfirm}
            onCancel={() => setShowResetConfirm(false)}
            onConfirm={() => {
              handleConfirmReset();
              incrementReset();
            }}
          />
        </div>

        {/* SKIPMODAL WRAPPER */}
        {isTask2 && (
          <div className="relative flex items-center">
            {/* SKIP BUTTON */}
            <button
              type="button"
              title="Skip Task"
              onClick={() => setShowSkipConfirm(true)}
              aria-label="Skip task"
              disabled={!skipEnabled}
              className="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-semibold transition-colors enabled:cursor-pointer enabled:hover:brightness-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <SkipForward className="h-4 w-4" strokeWidth={3} />
              <span>Skip</span>
            </button>

            <SkipModal
              isOpen={showSkipConfirm}
              onCancel={() => setShowSkipConfirm(false)}
              onConfirm={handleConfirmSkip}
            />
          </div>
        )}

        {/* SUCCESS MODAL WRAPPER */}
        <div className="">
          <SuccessModal
            isOpen={showSuccess || false}
            onConfirm={() => handleProceedToSurvey(surveyId || '', taskId || 1)}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorHeader;
