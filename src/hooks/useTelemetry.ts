import { useCallback, useState } from 'react';
import { useUrlParams } from './useUrlParams';
import { useExperimentGroup } from './useExperimentGroup';
import { submitTelemetryData } from '../services/telemetryClient';

// defines the shape of the telemetry data we want to send to the backend (group and aiMessageCount are optional because they are only relevant for Task 1)
interface TelemetryPayload {
  surveyId: string;
  timeOnTask: number;
  runCount: number;
  resetCount: number;
  group?: string;
  aiMessageCount?: number;
  chatHistory?: { role: string; content: string; codeSnapshot?: string }[];
  themeChangeCount?: number;
  status: 'in_progress' | 'completed' | 'skipped';
}

// Global variables outside the hook so all component instances share the exact same counters
let globalRunCount = 0;
let globalResetCount = 0;
let globalAiMessageCount = 0;
let globalChatHistory: { role: string; content: string; codeSnapshot?: string }[] = [];
let globalThemeChangeCount = 0;

// hook to manage telemetry data collection and submission
export const useTelemetry = () => {
  const { surveyId, taskId } = useUrlParams();
  const { group } = useExperimentGroup();

  const [startTime] = useState<number>(() => Date.now());

  // background sync function to save data without waiting for the request
  const syncToDatabase = useCallback(
    (isFinal: boolean = false) => {
      const timeOnTaskSec = Math.floor((Date.now() - startTime) / 1000);

      const payload: TelemetryPayload = {
        surveyId,
        timeOnTask: timeOnTaskSec,
        runCount: globalRunCount,
        resetCount: globalResetCount,
        themeChangeCount: globalThemeChangeCount,
        status: isFinal ? 'completed' : 'in_progress', // set status based on completion
      };

      // add group, aiMessageCount and chatHistory only for Task 1, since Task 2 doesn't have the chat component
      if (taskId === 1) {
        payload.group = group;
        payload.aiMessageCount = globalAiMessageCount;
        payload.chatHistory = globalChatHistory;
      }

      const endpoint = taskId === 1 ? 'log-task1' : 'log-task2';

      // fire and forget request, catch errors to avoid UI blocking
      submitTelemetryData(endpoint, payload).catch((error) => {
        console.error(`Background sync failed for task ${taskId}:`, error);
      });
    },
    [surveyId, taskId, group, startTime]
  );

  // Increment functions to track user interactions
  const incrementRun = useCallback(() => {
    globalRunCount += 1;
    console.log('Telemetry: Run', globalRunCount);
    syncToDatabase(); // trigger live sync
  }, [syncToDatabase]);

  const incrementReset = useCallback(() => {
    globalResetCount += 1;
    console.log('Telemetry: Reset', globalResetCount);
    syncToDatabase();
  }, [syncToDatabase]);

  const incrementAiMessage = useCallback(() => {
    globalAiMessageCount += 1;
    console.log('Telemetry: AI Message', globalAiMessageCount);
    syncToDatabase();
  }, [syncToDatabase]);

  const updateChatHistory = useCallback(
    (history: { role: string; content: string; codeSnapshot?: string }[]) => {
      globalChatHistory = history;
      syncToDatabase();
    },
    [syncToDatabase]
  );

  const incrementThemeChange = useCallback(() => {
    globalThemeChangeCount += 1;
    console.log('Telemetry: Theme Change', globalThemeChangeCount);
    syncToDatabase();
  }, [syncToDatabase]);

  // Function to submit telemetry data to the backend
  const submitTelemetry = async (status: 'completed' | 'skipped' = 'completed') => {
    console.log(`submitting ${status} telemetry from task ${taskId}...`);

    // submit the final state and mark as completed or skipped
    const payload = {
      surveyId,
      timeOnTask: Math.floor((Date.now() - startTime) / 1000),
      runCount: globalRunCount,
      resetCount: globalResetCount,
      themeChangeCount: globalThemeChangeCount,
      status,
    } as TelemetryPayload;

    if (taskId === 1) {
      payload.group = group;
      payload.aiMessageCount = globalAiMessageCount;
      payload.chatHistory = globalChatHistory;
    }

    const endpoint = taskId === 1 ? 'log-task1' : 'log-task2';

    submitTelemetryData(endpoint, payload).catch((error) => {
      console.error(`Background sync failed for task ${taskId}:`, error);
    });

    console.log(`telemetry from task ${taskId} successfully submitted as ${status}!`);

    // reset global variables for the next task
    globalRunCount = 0;
    globalResetCount = 0;
    globalAiMessageCount = 0;
    globalChatHistory = [];
    globalThemeChangeCount = 0;
  };

  return {
    incrementRun,
    incrementReset,
    incrementAiMessage,
    updateChatHistory,
    incrementThemeChange,
    submitTelemetry,
  };
};
