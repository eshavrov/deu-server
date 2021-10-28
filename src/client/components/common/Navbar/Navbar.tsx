import type React from 'react';
import Link from 'next/link';

import { Logo, Container } from '@components/ui';
import { UserNav } from '@components/common';
import NavbarRoot from './NavbarRoot';

import s from './Navbar.module.scss';

interface Link {
  href: string;
  label: string;
}
interface NavbarProps {
  links?: Link[];
}

const Navbar: React.FC<NavbarProps> = () => (
  <NavbarRoot>
    <Container>
      <div className={s.nav}>
        <div className={s.main}>
          <Link href="/">
            <a className={s.logo} aria-label="Logo">
              <Logo />
            </a>
          </Link>
        </div>
        <div className={s['user-nav-wrapper']}>
          <UserNav />
        </div>
      </div>
    </Container>
  </NavbarRoot>
);

export default Navbar;
