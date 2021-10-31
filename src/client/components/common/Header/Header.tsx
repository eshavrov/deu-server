import cn from 'classnames';
import type React from 'react';

import s from './Header.module.scss';
import SchoolLogo from '@components/common/Logo';

import { useHeaderBackground } from '@hooks/useHeaderBackground';

interface Props {
  className?: string;
  title: string;
  description: string;
  children?: any;
}

const Header: React.FC<Props> = ({ className, title, description }) => {
  const rootClassName = cn(className, s.header);
  const { headerBackground } = useHeaderBackground();

  return (
    <section
      className={rootClassName}
      style={{ backgroundImage: headerBackground }}
    >
      <div>
        <SchoolLogo />
      </div>
      <div className={s.wrapper}>
        <h3 className={s.title}>{title}</h3>
        <p className={s.description}>{description}</p>
      </div>
    </section>
  );
};

export default Header;
