// hook to extract and manage URL parameters for task and survey identification
export const useUrlParams = () => {
  const queryParams = new URLSearchParams(window.location.search);

  // searching for p-parameter (payload)
  const payload = queryParams.get('p');

  // fallback if nothing is attached to the URL
  let taskId = 1;
  let surveyId = 'local-test-user-001';

  if (payload) {
    try {
      // translate base64 string into text
      const decodedString = atob(payload);

      // tranform text into JS-object
      const parsedData = JSON.parse(decodedString);

      // read the data
      if (parsedData.taskId === 2) taskId = 2;
      if (parsedData.surveyId) surveyId = parsedData.surveyId;
    } catch (error) {
      // if someone tries to write or change the p-parameter it trows an error
      console.warn('Error: ' + error);
    }
  } else {
    // ONLY FOR TESTING PURPOSES, remove after implentation phase is over
    const plainTaskId = queryParams.get('taskId');
    const plainSurveyId = queryParams.get('surveyId');

    if (plainTaskId === '2') taskId = 2;
    if (plainSurveyId) surveyId = plainSurveyId;
  }

  return { taskId, surveyId };
};
