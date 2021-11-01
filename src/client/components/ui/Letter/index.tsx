import s from './Letter.module.scss';

export interface LetterProps {
  width?: string,
  height?: string,
  background?: string,
  children?: React.ReactChild | React.ReactNode;
  onClick: () => void;
}

const Letter: React.FC<LetterProps> =
  ({
    width,
    height,
    background,
     children ,
     onClick,
  }) => {

  return (
    <div style={{width, height, background}} className={s['letter']} onClick={onClick}>
      {children}
    </div>
  );
};

export default Letter;