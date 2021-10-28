import cn from 'classnames';

import s from './FeatureBar.module.scss';

interface FeatureBarProps {
  className?: string;
  title: string;
  description?: string;
  hide?: boolean;
  action?: React.ReactNode;
}

const FeatureBar: React.FC<FeatureBarProps> = ({
  title,
  description,
  className,
  action,
  hide,
}) => {
  const rootClassName = cn(
    s.root,
    {
      transform: true,
      [s['root--show']]: !hide,
      [s['root--hide']]: hide,
    },
    className,
  );
  return (
    <div className={rootClassName}>
      <span className={s.title}>{title}</span>
      <span className={s.desc}>{description}</span>
      {action && action}
    </div>
  );
};

export default FeatureBar;
