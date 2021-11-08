import React from 'react';

import Anagramma from '@components/feature/anagramma';

export default function Component() {
  const state = [
    { id: 0, word: 'black' },
    { id: 1, word: 'blue' },
    { id: 2, word: 'red' },
    { id: 3, word: 'green' },
  ];

  return (
    <Anagramma value={'black'} />
  )
}
