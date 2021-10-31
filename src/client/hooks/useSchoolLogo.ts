import React from 'react';

import { useUI } from '@components/ui/context';
import { getRandomPairOfColors } from '@lib/colors';

export const useSchoolLogo = (name = 'logo') => {
  const { schoolLogo, setSchoolLogo } = useUI();

  React.useEffect(() => {
    if (!schoolLogo && localStorage.getItem(name)) {
      // Get bg from localStorage and push it to the context.
      setSchoolLogo(localStorage.getItem(name));
    }

    if (!localStorage.getItem(name)) {
      // bg not set locally, generating one, setting localStorage and context to persist.
      const bg = getRandomPairOfColors();
      const value = `linear-gradient(140deg, ${bg[0]}, ${bg[1]} 100%)`;

      localStorage.setItem(name, value);
      setSchoolLogo(value);
    }
  }, []);

  return {
    schoolLogo,
    setSchoolLogo,
  };
};
