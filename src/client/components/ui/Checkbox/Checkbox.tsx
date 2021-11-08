import React from 'react';
import cn from 'classnames';

import s from './Checkbox.module.scss';

export interface CheckboxProps {
  className?: string;
  label?: string;
  name?: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean, name?: string) => void;
}

/**
 * Компонент Checkbox
 */
const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { className, checked, onChange, label, name } = props;

  const rootClassName = cn(className, s.checkbox);

  const _onChange = React.useCallback(
    (event) => {
      const currentValue: boolean = event.target.checked;

      onChange(currentValue, name);
    },
    [name],
  );

  const hasLabel = !!label;

  return (
    <label className={rootClassName}>
      <input type="checkbox" checked={checked} onChange={_onChange} />
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        aria-hidden="true"
        focusable="false"
      >
        <rect
          className={s.background}
          x="0"
          y="0"
          width="22"
          height="22"
          stroke="currentColor"
          fill="none"
          strokeWidth="0"
          rx="3"
          ry="3"
        ></rect>
        <polyline
          className={s.checkmark}
          points="4.245,8.505 9.745,16.005 17.995,7.755"
          stroke="transparent"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        ></polyline>
      </svg>
      {hasLabel && <span>{label}</span>}
    </label>
  );
};

export default Checkbox;
