import type React from 'react';
import cn from 'classnames';

import { Container } from '@components/ui';
import { Dialog, Info } from '@components/icons';

import s from './Footer.module.scss';

export enum Status {
  none,
  success,
  error,
}

interface FooterProps {
  status: Status;
}

const Footer: React.FC<FooterProps> = (props) => {
  const { status = Status.none } = props;
  const _onChangeDialog = () => {
    console.log('back');
  };

  const _onChangeInfo = () => {
    console.log('info');
  };

  const message = Status.error ? 'Не правильно!' : 'Правильно!';

  return (
    <div
      className={cn(s.root, {
        [s['root--hide']]: status === Status.none,
        [s['root--error']]: status === Status.error,
        [s['root--success']]: status === Status.success,
      })}
    >
      <Container>
        <div className={s.wrapper}>
          <button type="button" className={s.btn} onClick={_onChangeDialog}>
            <Dialog className={s.icon} />
          </button>
          <p className={s.message}>{message}</p>
          <button type="button" className={s.btn} onClick={_onChangeInfo}>
            <Info className={s.icon} />
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
