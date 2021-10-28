import React from 'react';
import cn from 'classnames';

import s from './Input.module.scss';

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  onChange?: (...args: any[]) => any;
}

const Input: React.FC<Props> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { className, children, onChange, ...rest } = props;

  const rootClassName = cn(s.root, {}, className);

  const handleOnChange = (e: any) => {
    if (onChange) {
      onChange(e.target.value);
    }
    return null;
  };

  return (
    <label>
      <input
        className={rootClassName}
        onChange={handleOnChange}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...rest}
      />
    </label>
  );
};

export default Input;
