import cn from 'classnames';
import Link from 'next/link';
import type React from 'react';

import { Logo, Container } from '@components/ui';

import s from './Footer.module.scss';

type Page = any;
interface Props {
  className?: string;
  children?: any;
  pages?: Page[];
}

const Footer: React.FC<Props> = ({ className }) => {
  const rootClassName = cn(className, s.footer);

  return (
    <footer className={rootClassName}>
      <Container>
        <div className={s.wrapper}>
          <div className={s.item}>
            <Link href="/">
              <a className={s['logo-link']}>
                <span className={s['logo-wrapper']}>
                  <Logo />
                </span>
                <span>Simulator zum Deutschlernen</span>
              </a>
            </Link>
          </div>
          <div className={s.item}>
            <ul className={s.list}>
              <li className={s['list-item']}>
                <Link href="/audio">
                  <a className={s['list-item-link']}>Запоминаем!</a>
                </Link>
              </li>
              <li className={s['list-item']}>
                <Link href="/words">
                  <a className={s['list-item-link']}>Угадай слова!</a>
                </Link>
              </li>
              <li className={s['list-item']}>
                <Link href="/new">
                  <a className={s['list-item-link']}>Тест на слух!</a>
                </Link>
              </li>
              <li className={s['list-item']}>
                <Link href="/trainer">
                  <a className={s['list-item-link']}>Проверка!</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={s.copyright}>
          <div>
            <span>&copy; 2021</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
