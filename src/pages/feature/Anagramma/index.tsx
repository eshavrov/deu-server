import s from './Anagramma.module.scss';
import { useState } from 'react';
import { Button } from '@components/ui';
import Letter from '@components/ui/Letter';

export default function Anagramma() {

  return (
    <div className={s.word}>
      <p className={s.title}>
        Перемешаны буквы слова, необходимо поставить на нужное место
      </p>
      <hr className={s.line} />
      <div className={s.letters}>
        <Letter char="D" />
      </div>

    </div>
  );
}
