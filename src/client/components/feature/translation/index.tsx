import React from 'react';
import cn from 'classnames';

import Word from '@components/ui/Word';
import { Button } from '@components/ui';

import s from './Translation.module.scss';
<<<<<<< HEAD

const listWords = [
  { id: 0, value: 'дерево' },
  { id: 1, value: 'цветок' },
  { id: 2, value: 'дом' },
  { id: 3, value: 'конфета' },
  { id: 4, value: 'природа' },
];

const Translation = (props) => {
  const word = 'Holz';
=======

const listWords = [
  { id: 0, value: 'дерево' },
  { id: 1, value: 'цветок' },
  { id: 2, value: 'дом' },
  { id: 3, value: 'конфета' },
  { id: 4, value: 'природа' },
];

const realWord = 'Holz';
>>>>>>> 9d2f269 (сделал правки)

const Translation = (props) => {
  const rootClassName = cn(s.container);

  return (
    <div className={rootClassName}>
      <p className={s.title}>
        Перемешаны буквы слова, необходимо поставить на нужное место
      </p>
<<<<<<< HEAD
      <div className={s.originalWord}>
        <p>{word}</p>
      </div>
      <div className={s.words}>
        {listWords.map((item) => {
          return <Word className={s.word} key={item.id} value={item.value} />;
=======
      <div className={s.word}>
        <p>{realWord}</p>
      </div>
      <div className={s.words}>
        {listWords.map((item) => {
          return <Word key={item.id} value={item.value} />;
>>>>>>> 9d2f269 (сделал правки)
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
