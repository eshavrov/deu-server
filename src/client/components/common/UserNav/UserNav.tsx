import React from 'react';
import cn from 'classnames';
import { useTheme } from 'next-themes';

import { Moon, Sun } from '@components/icons';
import { useUI } from '@components/ui/context';
import { Avatar } from '@components/common';

import s from './UserNav.module.scss';

interface Props {
  className?: string;
}

const UserNav: React.FC<Props> = ({ className }) => {
  const user = null;
  const { openModal } = useUI();

  const { theme, setTheme } = useTheme();

  return (
    <nav className={cn(s.root, className)}>
      <div className={s.mainContainer}>
        <ul className={s.list}>
          <li
            className={s.item}
            onClick={() => {
              theme === 'dark' ? setTheme('light') : setTheme('dark');
            }}
          >
            {theme == 'dark' ? (
              <Moon width={20} height={20} />
            ) : (
              <Sun width="20" height={20} />
            )}
          </li>
          <li className={s.item}>
            {user ? (
              // TODO(eshavrov): Здесь будет выпадающее меню пользователя
              <>User</>
            ) : (
              <button
                className={s.avatarButton}
                aria-label="Menu"
                onClick={() => openModal()}
              >
                <Avatar />
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default UserNav;
