import React from 'react';
import cn from 'classnames';

import s from './Select.module.scss';

export interface Option {
  value: string;
  label: string;
}

export interface SelectProps {
  className?: string;
  options: Option[];
  value: string;
  disabled?: boolean;
  placeholder?: string;
  onChange: (value: string, option: Option) => void;
}

const Select: React.FC<SelectProps> = (props) => {
  const { className, options, value, placeholder, onChange } = props;

  const rootClassName = cn(className, s.select);

  const _onChange = React.useCallback(
    (event) => {
      if (!onChange) {
        return;
      }

      const currentValue = event.target.value;

      onChange(
        currentValue,
        options.find((item) => item.value === currentValue),
      );
    },
    [onChange],
  );

  return (
    <select
      className={rootClassName}
      value={value ?? 'off'}
      onChange={_onChange}
    >
      {!!placeholder && (
        <option disabled value="off">
          {placeholder}
        </option>
      )}
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
