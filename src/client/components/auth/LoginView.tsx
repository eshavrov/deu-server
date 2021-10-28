import React from 'react';
import { validate } from 'email-validator';

import { Logo, Button, Input } from '@components/ui';
// import useLogin from '@framework/auth/use-login';
import { useUI } from '@components/ui/context';

import s from './auth.module.scss';

const LoginView: React.FC<any> = () => {
  // Form State
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [dirty, setDirty] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const { setModalView, closeModal } = useUI();

  // const login = useLogin();

  const handleLogin = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    if (!dirty && !disabled) {
      setDirty(true);
      handleValidation();
    }

    try {
      setLoading(true);
      setMessage('');
      // await login({
      //   email,
      //   password,
      // });
      setLoading(false);
      closeModal();
    } catch ({ errors }) {
      setMessage(errors[0].message);
      setLoading(false);
      setDisabled(false);
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
    <form onSubmit={handleLogin} className={s.form}>
      <div className={s.logo}>
        <Logo width="64px" height="64px" />
      </div>
      <div className={s.wrapper}>
        {message && (
          <div className={s.forgot}>
            {message}. Вы {` `}
            <a className={s.link} onClick={() => setModalView('FORGOT_VIEW')}>
              забыли свой пароль?
            </a>
          </div>
        )}
        <Input type="email" placeholder="Email" onChange={setEmail} />
        <Input type="password" placeholder="Пароль" onChange={setPassword} />

        <Button
          variant="slim"
          type="submit"
          loading={loading}
          disabled={disabled}
        >
          Войти
        </Button>
        <div className={s.footer}>
          <span className={s.grey}>Нет учетной записи?</span>
          {` `}
          <a className={s.link} onClick={() => setModalView('SIGNUP_VIEW')}>
            Зарегистрируйся
          </a>
        </div>
      </div>
    </form>
  );
};

export default LoginView;
