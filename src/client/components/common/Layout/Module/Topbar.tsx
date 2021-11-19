import type React from 'react';
import Link from 'next/link';

import { Container } from '@components/ui';
import ProgressBar from '@components/ui/ProgressBar';
import { Cross } from '@components/icons';

import s from './Topbar.module.scss';

interface Link {
  href: string;
  label: string;
}

interface TopbarProps {
  links?: Link[];
  value: number;
}

const Topbar: React.FC<TopbarProps> = (props) => {
  const _onChangeRemove = () => {
    console.log('back');
  };

  return (
    <div className={s.root}>
      <Container>
        <div className={s.wrapper}>
          <button type="button" className={s.back} onClick={_onChangeRemove}>
            <Cross className={s.cross} />
          </button>
          <ProgressBar value={props.value} />
        </div>
      </Container>
    </div>
  );
};

export default Topbar;
