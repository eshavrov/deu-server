import React from 'react';
import cn from 'classnames';

import Word from '@components/ui/Word';
import { Button } from '@components/ui';

import s from './Translation.module.scss';

const listWords = [
  { id: 0, value: 'дерево' },
  { id: 1, value: 'цветок' },
  { id: 2, value: 'дом' },
  { id: 3, value: 'конфета' },
  { id: 4, value: 'природа' },
];

const Translation = (props) => {
  const word = 'Holz';

const listWords = [
  { id: 0, value: 'дерево' },
  { id: 1, value: 'цветок' },
  { id: 2, value: 'дом' },
  { id: 3, value: 'конфета' },
  { id: 4, value: 'природа' },
];

const realWord = 'Holz';

const Translation = (props) => {
  const rootClassName = cn(s.container);

  return (
    <div className={rootClassName}>
      <p className={s.title}>
        Перемешаны буквы слова, необходимо поставить на нужное место
      </p>
      <div className={s.originalWord}>
        <p>{word}</p>
      </div>
      <div className={s.words}>
        {listWords.map((item) => {
          return <Word key={item.id} value={item.value} />;
        })}
      </div>
      <div className={s.button__row}>
        <Button>Пропустить</Button>
        <Button>Проверить</Button>
      </div>
    </div>
  );
};

export default Translation;
