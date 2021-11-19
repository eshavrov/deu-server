import React from 'react';
import cn from 'classnames';

import s from './ProgressBar.module.scss';

export interface ProgressBarProps {
  className?: string;

  /**
   * Текущее значение
   */
  value: number;

  /**
   * Максимальное зачение (По-умолчанию равно 100)
   */
  max?: number;
}

/**
 * Компонент ProgressBar
 */
const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  const { className, value, max = 100 } = props;

  const rootClassName = cn(className, s.progress);

  return <progress className={rootClassName} value={value} max={max} />;
};

export default ProgressBar;
