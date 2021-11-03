import s from './Letter.module.scss';

export interface LetterProps {
  width?: string;
  height?: string;
  children?: React.ReactChild | React.ReactNode;
  onClick: () => void;
}

const Letter: React.FC<LetterProps> = ({
  width,
  height,
  children,
  onClick,
}) => {
  return (
    <div style={{ width, height }} className={s.letter} onClick={onClick}>
      {children}
    </div>
  );
};

export default Letter;
