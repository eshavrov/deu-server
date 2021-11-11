import React from 'react';
import cn from 'classnames';

import s from './Timer.module.scss';

const Timer = (props) => {
  const { millis, className } = props;

  const [totalSeconds, setTotalSeconds] = React.useState(millis / 1000);

  React.useEffect(() => {
    if (totalSeconds > 0) {
      setTimeout(() => setTotalSeconds(totalSeconds - 1), 1000);
    } else {
      setTotalSeconds(0);
    }
  }, [totalSeconds]);

  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60);
  const result =
    (minutes < 10 ? '0' : '') +
    minutes +
    ':' +
    (seconds < 10 ? '0' : '') +
    seconds;

  const rootClassName = cn(className, s.timer);

  return (
    <div className={rootClassName}>
      <div className={s.timer__body}>
        {result}
      </div>
    </div>
  );
};

export default Timer;