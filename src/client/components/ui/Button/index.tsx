import React from 'react';
import cn from 'classnames';
import mergeRefs from 'react-merge-refs';

import { LoadingDots } from '@components/ui';
import s from './Button.module.scss';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  variant?: 'flat' | 'slim';
  active?: boolean;
  type?: 'submit' | 'reset' | 'button';
  Component?: string | React.JSXElementConstructor<any>;
  width?: string | number;
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = React.forwardRef((props, buttonRef) => {
  const {
    className,
    variant = 'flat',
    children,
    active,
    width,
    loading = false,
    disabled = false,
    style = {},
    Component = 'button',
    ...rest
  } = props;
  const ref = React.useRef<typeof Component>(null);

  const rootClassName = cn(
    s.root,
    {
      [s.slim]: variant === 'slim',
      [s.loading]: loading,
      [s.disabled]: disabled,
    },
    className,
  );

  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      ref={mergeRefs([ref, buttonRef])}
      className={rootClassName}
      disabled={disabled}
      style={{
        width,
        ...style,
      }}
      {...rest}
    >
      {children}
      {loading && (
        <i className={s['loading-dots']}>
          <LoadingDots />
        </i>
      )}
    </Component>
  );
});

export default Button;
