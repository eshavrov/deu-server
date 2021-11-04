import React from 'react';
import s from './Letter.module.scss';

export interface LetterProps {
  width?: string;
  height?: string;
  char: string;
  onClick?: () => void;
  color?: string;
}

/**
 * Компонент буква
 * @example
 * `<Letter char='f' />`
 */

const Letter: React.FC<LetterProps> = ({
  width,
  height,
  char,
  color,
  onClick,
}) => {
  const style = React.useMemo(() => {
    return {
      width,
      height,
      color,
    };
  }, [width, height, color]);

  return (
    <div style={style} className={s.letter} onClick={onClick}>
      {char}
    </div>
  );
};

export default Letter;
