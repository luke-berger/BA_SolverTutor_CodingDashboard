import { useCallback, useState } from 'react';
import { useUrlParams } from './useUrlParams';
import { useExperimentGroup } from './useExperimentGroup';

// defines the shape of the telemetry data we want to send to the backend (group and aiMessageCount are optional because they are only relevant for Task 1)
interface TelemetryPayload {
  surveyId: string;
  timeOnTask: number;
  runCount: number;
  resetCount: number;
  group?: string;
  aiMessageCount?: number;
}

// Global variables outside the hook so all component instances share the exact same counters
let globalRunCount = 0;
let globalResetCount = 0;
let globalAiMessageCount = 0;

// hook to manage telemetry data collection and submission
export const useTelemetry = () => {
  const { surveyId, taskId } = useUrlParams();
  const { group } = useExperimentGroup();

  const [startTime] = useState<number>(() => Date.now());

  // Increment functions to track user interactions
  const incrementRun = useCallback(() => {
    globalRunCount += 1;
    console.log('Telemetry: Run', globalRunCount);
  }, []);

  const incrementReset = useCallback(() => {
    globalResetCount += 1;
    console.log('Telemetry: Reset', globalResetCount);
  }, []);

  const incrementAiMessage = useCallback(() => {
    globalAiMessageCount += 1;
    console.log('Telemetry: AI Message', globalAiMessageCount);
  }, []);

  // Function to submit telemetry data to the backend
  const submitTelemetry = async () => {
    const timeOnTaskSec = Math.floor((Date.now() - startTime) / 1000);

    const payload: TelemetryPayload = {
      surveyId,
      timeOnTask: timeOnTaskSec,
      runCount: globalRunCount,
      resetCount: globalResetCount,
    };

    // add group and aiMessageCount only for Task 1, since Task 2 doesn't have the chat component
    if (taskId === 1) {
      payload.group = group;
      payload.aiMessageCount = globalAiMessageCount;
    }

    const endpoint =
      taskId === 1 ? 'http://localhost:3001/api/log-task1' : 'http://localhost:3001/api/log-task2';
    console.log(`sending telemetry from task ${taskId}...`, payload);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('network response was not ok');
      console.log(`telemetry from task ${taskId} successfully saved!`);

      globalRunCount = 0;
      globalResetCount = 0;
      globalAiMessageCount = 0;
    } catch (error) {
      console.error(`Error saving telemetry (Task ${taskId}):`, error);
    }
  };

  return {
    incrementRun,
    incrementReset,
    incrementAiMessage,
    submitTelemetry,
  };
};
