import React from 'react';

import { Word } from '@components/ui';

import s from './WordTraining.module.scss';

const WordTraining = (props) => {
  const { text } = props;

  const words = text.split(' ');

  return (
    <div>
      <div className={s.group}>
        {words.map((word) => {
          return <Word value={word} />;
        })}
      </div>

      <div>
        <p>Перетащите слова на свои места, что бы предложение имело смысл</p>
      </div>
    </div>
  );
};

export default WordTraining;
