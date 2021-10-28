import cn from 'classnames';
import React from 'react';
import dynamic from 'next/dynamic';

import { useUI } from '@components/ui/context';
import { Navbar, Footer } from '@components/common';
import { Button, Modal, LoadingDots } from '@components/ui';
import LoginView from '@components/auth/LoginView';
import { useAcceptCookies } from '@hooks/useAcceptCookies';

import s from './Layout.module.scss';

type Page = any;
type Category = any;

const Loading = () => (
  <div className={s.loading}>
    <LoadingDots />
  </div>
);

const dynamicProps = {
  loading: Loading,
};

const SignUpView = dynamic(
  () => import('@components/auth/SignUpView'),
  dynamicProps,
);

const ForgotPassword = dynamic(
  () => import('@components/auth/ForgotPassword'),
  dynamicProps,
);

const FeatureBar = dynamic(
  () => import('@components/common/FeatureBar'),
  dynamicProps,
);

interface Props {
  pageProps: {
    pages?: Page[];
    categories?: Category[];
  };
}

const ModalView: React.FC<{ modalView: string; closeModal(): any }> = ({
  modalView,
  closeModal,
}) => {
  return (
    <Modal onClose={closeModal}>
      {modalView === 'LOGIN_VIEW' && <LoginView />}
      {modalView === 'SIGNUP_VIEW' && <SignUpView />}
      {modalView === 'FORGOT_VIEW' && <ForgotPassword />}
    </Modal>
  );
};

const ModalUI: React.FC = () => {
  const { displayModal, closeModal, modalView } = useUI();
  return displayModal ? (
    <ModalView modalView={modalView} closeModal={closeModal} />
  ) : null;
};

const Layout: React.FC<Props> = ({ children, pageProps }) => {
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies();

  return (
    <div className={cn(s.root)}>
      <Navbar />
      <main className="fit">{children}</main>
      <Footer pages={pageProps.pages} />
      <ModalUI />
      <FeatureBar
        title="Diese Seite verwendet Cookies, um Ihre Erfahrung zu verbessern. Durch Anklicken stimmen Sie unserer Datenschutzerklärung zu."
        hide={acceptedCookies}
        action={
          <Button
            className={s['accept-button']}
            onClick={() => onAcceptCookies()}
          >
            Cookies akzeptieren
          </Button>
        }
      />
    </div>
  );
};

export default Layout;
