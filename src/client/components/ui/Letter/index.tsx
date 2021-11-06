import React from 'react';
import s from './Letter.module.scss';

export interface LetterProps {
  size?: string;
  char: string;
  onClick?: () => void;
  color?: string;
}

/**
 * Компонент буква
 * @example
 * `<Letter char='f' />`
 */

const Letter: React.FC<LetterProps> = ({ size, char, color, onClick }) => {
  const style = React.useMemo(() => {
    return {
      width: size,
      height: size,
      color,
    };
  }, [size, color]);

  return (
    <div style={style} className={s.letter} onClick={onClick}>
      {char}
    </div>
  );
};

export default Letter;
