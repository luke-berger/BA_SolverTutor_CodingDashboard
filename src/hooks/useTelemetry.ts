import { useRef, useCallback, useState } from 'react';
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

export const useTelemetry = () => {
  const { surveyId, taskId } = useUrlParams();
  const { group } = useExperimentGroup();

  const [startTime] = useState<number>(() => Date.now());

  const runCount = useRef<number>(0);
  const resetCount = useRef<number>(0);
  const aiMessageCount = useRef<number>(0);

  // Increment functions to track user interactions
  const incrementRun = useCallback(() => {
    runCount.current += 1;
    console.log('Telemetry: Run', runCount.current);
  }, []);

  const incrementReset = useCallback(() => {
    resetCount.current += 1;
    console.log('Telemetry: Reset', resetCount.current);
  }, []);

  const incrementAiMessage = useCallback(() => {
    aiMessageCount.current += 1;
    console.log('Telemetry: AI Message', aiMessageCount.current);
  }, []);

  // Function to submit telemetry data to the backend
  const submitTelemetry = async () => {
    const timeOnTaskSec = Math.floor((Date.now() - startTime) / 1000);

    const payload: TelemetryPayload = {
      surveyId,
      timeOnTask: timeOnTaskSec,
      runCount: runCount.current,
      resetCount: resetCount.current,
    };

    // add group and aiMessageCount only for Task 1, since Task 2 doesn't have the chat component
    if (taskId === 1) {
      payload.group = group;
      payload.aiMessageCount = aiMessageCount.current;
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
