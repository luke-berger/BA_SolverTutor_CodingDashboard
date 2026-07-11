export const handleProceedToSurvey = (surveyId: string, taskId: number) => {
  try {
    // encode ID to base64 to pass it as a URL parameter
    const encodedId = btoa(surveyId);

    // determine the next survey URL based on the task ID
    // replace these URLs with the actual URLs of the LimeSurvey instances
    const nextSurveyUrl =
      taskId === 1
        ? 'https://limesurvey.my-uni.de/index.php/LS2'
        : 'https://limesurvey.my-uni.de/index.php/LS3';

    // redirect the user to the next survey with the encoded ID as a parameter
    window.location.href = `${nextSurveyUrl}?p=${encodedId}`;
  } catch (error) {
    console.error('Error while redirecting to LimeSurvey:', error);
  }
};
