import cn from 'classnames';
import React from 'react';

import Topbar from './Topbar';

import s from './ModuleLayout.module.scss';

type Page = any;
type Category = any;

interface Props {
  pageProps: {
    pages?: Page[];
    categories?: Category[];
  };
}

const ModuleLayout: React.FC<Props> = ({ children }) => {
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

  return (
    <div className={cn(s.root)}>
      <div className={s.wrapper}>
        <Topbar value={value} />
        <main className={s.main}>{children}</main>
      </div>
    </div>
  );
};

export default ModuleLayout;
