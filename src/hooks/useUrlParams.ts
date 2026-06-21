export const useUrlParams = () => {
  const queryParams = new URLSearchParams(window.location.search);

  const taskId = queryParams.get('taskId') === '2' ? 2 : 1;
  const surveyId = queryParams.get('surveyId') || 'local-test-user-001';

  return { taskId, surveyId };
};
