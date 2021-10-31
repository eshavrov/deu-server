import React from 'react';

import { useSchoolLogo } from '@hooks/useSchoolLogo';

import s from './Logo.module.scss';

interface Props {
  className?: string;
  children?: any;
}

const Logo: React.FC<Props> = ({}) => {
  const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const { schoolLogo } = useSchoolLogo();

  return (
    <div
      ref={ref}
      style={{ backgroundImage: schoolLogo }}
      className={s.wrapper}
    >
      {/* Add an image - We're generating a gradient as placeholder  <img></img> */}
    </div>
  );
};

export default Logo;
