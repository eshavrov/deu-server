import React from 'react';

import { useUserAvatar } from '@hooks/useUserAvatar';

import s from './Avatar.module.scss';

interface Props {
  className?: string;
  children?: any;
}

const Avatar: React.FC<Props> = ({}) => {
  const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const { userAvatar } = useUserAvatar();

  return (
    <div
      ref={ref}
      style={{ backgroundImage: userAvatar }}
      className={s.wrapper}
    >
      {/* Add an image - We're generating a gradient as placeholder  <img></img> */}
    </div>
  );
};

export default Avatar;
