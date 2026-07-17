import { useState, useEffect } from 'react';

export const useUrlParams = () => {
  // initialize state lazily to read the URL only once during the very first render
  const [params] = useState(() => {
    const queryParams = new URLSearchParams(window.location.search);

    // extract the taskId and surveyId from the URL parameters
    const plainTaskId = queryParams.get('t'); // from LS1 or LS2
    const plainSurveyId = queryParams.get('u'); // from LS1 only

    // if surveyId is present in the URL of task1, store it in localStorage for later use in task2
    if (plainSurveyId) {
      localStorage.setItem('surveyId', plainSurveyId);
    }

    // get surveyId from localStorage, defaulting to 'unknown-user' if not found
    const surveyId = localStorage.getItem('surveyId') || 'unknown-user';

    // identify the taskId, defaulting to 1 if not specified or if it's not '2'
    let taskId = 1;
    if (plainTaskId === '2') taskId = 2;

    // store all variables in the state so they survive component re-renders
    return { taskId, surveyId, plainTaskId, plainSurveyId };
  });

  // clean up the URL by removing the query parameters after extracting them
  useEffect(() => {
    // safely check the state instead of the current empty URL
    if (params.plainTaskId || params.plainSurveyId) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [params]);

  return { taskId: params.taskId, surveyId: params.surveyId };
};
