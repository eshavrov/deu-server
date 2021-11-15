import React from 'react';
import cn from 'classnames';

import s from './Timer.module.scss';

const Timer = (props) => {
  const { milliseconds, className } = props;

  const [totalSeconds, setTotalSeconds] = React.useState(milliseconds);

  function startTimer() {
    setTotalSeconds(totalSeconds - 1000);
  }

  function stopTimer() {
    setTotalSeconds(0);
  }

  React.useEffect(() => {
      const timerID = setTimeout(startTimer, 1000);

      return () => clearTimeout(timerID);
  }, [totalSeconds]);



  const seconds = (totalSeconds / 1000) % 60;
  const minutes = Math.floor((totalSeconds / 1000) / 60);
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