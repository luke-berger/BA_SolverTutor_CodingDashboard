export const useUrlParams = () => {
  const queryParams = new URLSearchParams(window.location.search);

  // fallback values
  let taskId = 1;
  let surveyId = 'unknown-user';

  // read query parameters
  const plainTaskId = queryParams.get('t');
  const plainSurveyId = queryParams.get('u');

  if (plainTaskId === '2') taskId = 2;
  if (plainSurveyId) surveyId = plainSurveyId;

  // after reading the parameters, we remove them from the URL without reloading page
  if (plainTaskId || plainSurveyId) {
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  return { taskId, surveyId };
};
