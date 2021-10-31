import React from 'react';

import { useUI } from '@components/ui/context';
import { getRandomPairOfColors } from '@lib/colors';

export const useHeaderBackground = (name = 'headerBackground') => {
  const { headerBackground, setHeaderBackground } = useUI();

  React.useEffect(() => {
    if (!headerBackground && localStorage.getItem(name)) {
      // Get bg from localStorage and push it to the context.
      setHeaderBackground(localStorage.getItem(name));
    }

    if (!localStorage.getItem(name)) {
      // bg not set locally, generating one, setting localStorage and context to persist.
      const bg = getRandomPairOfColors();
      const value = `linear-gradient(140deg, ${bg[0]}, ${bg[1]} 100%)`;

      localStorage.setItem(name, value);
      setHeaderBackground(value);
    }
  }, []);

  return {
    headerBackground,
    setHeaderBackground,
  };
};
