import cn from 'classnames';
import Link from 'next/link';
import type React from 'react';

import s from './BoxItem.module.scss';

interface Props {
  slug: string;
  className?: string;
  children?: any;
}

/**
 * Элемент блок выбора, к примеру Курс или Статья
 */
const BoxItem: React.FC<Props> = ({ className, children, slug }) => {
  const rootClassName = cn(className, s.root);

  return (
    <Link href={slug}>
      <a className={rootClassName}>{children}</a>
    </Link>
  );
};

export default BoxItem;
