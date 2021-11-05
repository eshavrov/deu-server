import React from 'react';
import cn from 'classnames';

import s from './Word.module.scss';

const Word = (props) => {
  const { value, className } = props;
  const rootClassName = cn(className, s.word);

  return <span className={rootClassName}>{value}</span>;
};

export default Word;
