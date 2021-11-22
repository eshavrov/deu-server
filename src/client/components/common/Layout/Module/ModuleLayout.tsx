import cn from 'classnames';
import React from 'react';

import Topbar from './Topbar';
import Footer, { Status } from './Footer';

import s from './ModuleLayout.module.scss';

const ModuleLayout: React.FC = ({ children }) => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((oldValue) => {
        const newValue = (oldValue + 7) % 101;

        return newValue;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const status =
    value < 33 ? Status.none : value > 66 ? Status.success : Status.error;

  return (
    <div className={cn(s.root)}>
      <div className={s.wrapper}>
        <Topbar value={value} />
        <main className={s.main}>{children}</main>
        <Footer status={status} />
      </div>
    </div>
  );
};

export default ModuleLayout;
