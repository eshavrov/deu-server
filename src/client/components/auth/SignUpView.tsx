import React from 'react';
import { validate } from 'email-validator';

import { Info } from '@components/icons';
import { useUI } from '@components/ui/context';
import { Logo, Button, Input } from '@components/ui';
// import useSignup from '@framework/auth/use-signup';

import s from './auth.module.scss';

// interface Props {}

const SignUpView: React.FC<any> = () => {
  // Form State
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [login, setLogin] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [dirty, setDirty] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  // const signup = useSignup();
  const { setModalView, closeModal } = useUI();

  const handleSignup = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    if (!dirty && !disabled) {
      setDirty(true);
      handleValidation();
    }

    try {
      setLoading(true);
      setMessage('');
      // await signup({
      //   email,
      //   firstName,
      //   lastName,
      //   password,
      // });
      setLoading(false);
      closeModal();
    } catch ({ errors }) {
      setMessage(errors[0].message);
      setLoading(false);
    }
  };

  const handleValidation = React.useCallback(() => {
    // Test for Alphanumeric password
    const validPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password);

    // Unable to send form unless fields are valid.
    if (dirty) {
      setDisabled(!validate(email) || password.length < 7 || !validPassword);
    }
  }, [email, password, dirty]);

  React.useEffect(() => {
    handleValidation();
  }, [handleValidation]);

  return (
    <form onSubmit={handleSignup} className={s.form}>
      <div className={s.logo}>
        <Logo width="64px" height="64px" />
      </div>
      <div className={s.wrapper}>
        {message && <div className={s['error-message']}>{message}</div>}

        <Input placeholder="Логин" onChange={setLogin} />
        <Input type="email" placeholder="Email" onChange={setEmail} />
        <Input type="password" placeholder="Пароль" onChange={setPassword} />
        <span className={s['achtung-wrapper']}>
          <span className={s['achtung-icon']}>
            <Info width="15" height="15" />
          </span>{' '}
          <span className={s.achtung}>
            <strong>Предупреждаем</strong>: Пароль должен быть длиннее 7
            символов и включать цифры.{' '}
          </span>
        </span>
        <div className={s.buttons}>
          <Button
            variant="slim"
            type="submit"
            loading={loading}
            disabled={disabled}
          >
            Зарегистрироваться
          </Button>
        </div>

        <span className={s.footer}>
          <span className={s.grey}>У тебя есть учетная запись?</span>
          {` `}
          <a className={s.link} onClick={() => setModalView('LOGIN_VIEW')}>
            Войти
          </a>
        </span>
      </div>
    </form>
  );
};

export default SignUpView;
