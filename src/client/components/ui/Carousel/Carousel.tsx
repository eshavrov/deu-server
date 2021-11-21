import React from 'react';
import cn from 'classnames';

import s from './Carousel.module.scss';

export type RenderCb<TItem> = (props: { data: TItem }) => JSX.Element;

export interface CarouselProps<TItem> {
  className?: string;
  phase: TransitionStatus;
  index: number;
  items: TItem[];
  render: RenderCb<TItem>;
  onTransitionEnd: () => void;
}

enum TransitionStatus {
  current,
  prev,
  next,
  wait,
}

export const useCarousel = (items, index, setIndex) => {
  const [transitionStatus, setTransitionStatus] = React.useState(
    TransitionStatus.current,
  );

  const onChangePrev = React.useCallback(() => {
    setIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }

      return 0;
    });
  }, []);

  const onChangeNext = React.useCallback(() => {
    setIndex((prevIndex) => {
      const last = items.length - 1;

      if (last > prevIndex) {
        return prevIndex + 1;
      }

      return last;
    });
  }, [items]);

  const prev = React.useCallback(
    () => setTransitionStatus(TransitionStatus.prev),
    [],
  );

  const next = React.useCallback(
    () => setTransitionStatus(TransitionStatus.next),
    [],
  );

  const onTransitionEnd = React.useCallback(() => {
    setTransitionStatus((transitionStatus) => {
      switch (transitionStatus) {
        case TransitionStatus.next: {
          onChangeNext();
          return TransitionStatus.wait;
        }

        case TransitionStatus.prev: {
          onChangePrev();
          return TransitionStatus.wait;
        }

        default: {
          return transitionStatus;
        }
      }
    });
  }, [transitionStatus]);

  React.useEffect(() => {
    setTransitionStatus(TransitionStatus.current);
  }, [index]);

  const isAnimated = transitionStatus !== TransitionStatus.current;

  return {
    isAnimated,
    props: {
      phase: transitionStatus,
      onTransitionEnd,
    },
    prev,
    next,
  };
};

/**
 * Компонент Carousel
 */
const Carousel: React.FC<CarouselProps<any>> = (props) => {
  const {
    className,
    items,
    index,
    render,
    phase = TransitionStatus.current,
    onTransitionEnd,
  } = props;

  const rootClassName = cn(className, s.root);

  const view = React.useMemo(() => {
    return Array.from(new Array(5), (_, i) => {
      return items[index + i - 2];
    });
  }, [index, items]);

  return (
    <div className={rootClassName}>
      <div
        className={cn(s.carousel, {
          [s['carousel--current']]: phase === TransitionStatus.current,
          [s['carousel--next']]: phase === TransitionStatus.next,
          [s['carousel--prev']]: phase === TransitionStatus.prev,
        })}
        onTransitionEnd={onTransitionEnd}
      >
        <div className={s.cards}>
          <label className={cn(s.card, s.old)}>
            {render({ data: view[0] })}
          </label>
          <label className={cn(s.card, s.prev)}>
            {render({ data: view[1] })}
          </label>
          <label className={cn(s.card, s.next)}>
            {render({ data: view[3] })}
          </label>
          <label className={cn(s.card, s.new)}>
            {render({ data: view[4] })}
          </label>
          <label className={cn(s.card, s.current)}>
            {render({ data: view[2] })}
          </label>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
