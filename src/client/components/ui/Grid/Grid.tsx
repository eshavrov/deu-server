import cn from 'classnames';
import type { FC, ReactNode, Component } from 'react';

import s from './Grid.module.scss';

interface GridProps {
  className?: string;
  children?: ReactNode[] | Component[] | any[];
  layout?: 'normal';
  variant?: 'default' | 'filled';
}

const Grid: FC<GridProps> = ({
  className,
  layout = 'normal',
  children,
  variant = 'default',
}) => {
  const rootClassName = cn(
    s.root,
    {
      [s.layoutNormal]: layout === 'normal',
      [s.default]: variant === 'default',
      [s.filled]: variant === 'filled',
    },
    className,
  );
  return <div className={rootClassName}>{children}</div>;
};

export default Grid;
