import { useState } from 'react';

export type ExperimentGroup = 'tutor' | 'solver';

export const useExperimentGroup = () => {
  const [group] = useState<ExperimentGroup>(() => {
    const savedGroup = localStorage.getItem('experiment_group') as ExperimentGroup;

    if (savedGroup === 'tutor' || savedGroup === 'solver') {
      return savedGroup;
    }

    const isTutor = Math.random() < 0.5;
    const newGroup = isTutor ? 'tutor' : 'solver';

    localStorage.setItem('experiment_group', newGroup);
    return newGroup;
  });

  const resetExperiment = () => {
    localStorage.removeItem('experiment_group');
    window.location.reload();
  };

  return { group, resetExperiment };
};
