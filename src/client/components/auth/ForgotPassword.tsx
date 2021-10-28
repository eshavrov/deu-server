import React from 'react';
import { validate } from 'email-validator';

import { useUI } from '@components/ui/context';
import { Logo, Button, Input } from '@components/ui';

import s from './auth.module.scss';

const ForgotPassword: React.FC<any> = () => {
  // Form State
  const [email, setEmail] = React.useState('');
  const [loading] = React.useState(false);
  const [message] = React.useState('');
  const [dirty, setDirty] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  const { setModalView } = useUI();

  const handleResetPassword = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    if (!dirty && !disabled) {
      setDirty(true);
      handleValidation();
    }
  };

  const handleValidation = React.useCallback(() => {
    // Unable to send form unless fields are valid.
    if (dirty) {
      setDisabled(!validate(email));
    }
  }, [email, dirty]);

  React.useEffect(() => {
    handleValidation();
  }, [handleValidation]);

  return (
    <form onSubmit={handleResetPassword} className={s.form}>
      <div className={s.logo}>
        <Logo width="64px" height="64px" />
      </div>
      <div className={s.wrapper}>
        {message && <div className={s.forgot}>{message}</div>}

        <Input placeholder="Email" onChange={setEmail} type="email" />
        <div className={s.buttons}>
          <Button
            variant="slim"
            type="submit"
            loading={loading}
            disabled={disabled}
          >
            Восстановить пароль
          </Button>
        </div>

        <span className={s.footer}>
          <span className={s.grey}>У тебя есть аккаунт?</span>
          {` `}
          <a className={s.link} onClick={() => setModalView('LOGIN_VIEW')}>
            Войти
          </a>
        </span>
      </div>
    </form>
  );
};

export default ForgotPassword;
