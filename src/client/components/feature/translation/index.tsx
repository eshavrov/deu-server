import React from 'react';
import cn from 'classnames';

import Word from '@components/ui/Word';
import { Button } from '@components/ui';

import s from '@components/feature/translation/Translation.module.scss';

const Translation = (props) => {
  const listWords = [
    { id: 0, value: 'дерево' },
    { id: 1, value: 'цветок' },
    { id: 2, value: 'дом' },
    { id: 3, value: 'конфета' },
    { id: 4, value: 'природа' },
  ];

  const rootClassName = cn(s.container);

  return (
    <div className={rootClassName}>
      <p className={s.title}>
        Перемешаны буквы слова, необходимо поставить на нужное место
      </p>
      <div className={s.word}>
        <p>Holz</p>
      </div>
      <div className={s.words}>
        {listWords.map((item) => {
          return <Word value={item.value} />;
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