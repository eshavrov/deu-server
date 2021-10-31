import React from 'react';
import { ThemeProvider } from 'next-themes';

export interface State {
  displaySidebar: boolean;
  displayDropdown: boolean;
  displayModal: boolean;
  displayToast: boolean;
  modalView: string;
  userAvatar: string;
  schoolLogo: string;
  headerBackground: string;
}

const initialState = {
  displaySidebar: false,
  displayDropdown: false,
  displayModal: false,
  modalView: 'LOGIN_VIEW',
  displayToast: false,
  userAvatar: '',
  schoolLogo: '',
  headerBackground: '',
};

type Action =
  | {
      type: 'OPEN_SIDEBAR';
    }
  | {
      type: 'CLOSE_SIDEBAR';
    }
  | {
      type: 'OPEN_DROPDOWN';
    }
  | {
      type: 'CLOSE_DROPDOWN';
    }
  | {
      type: 'OPEN_MODAL';
    }
  | {
      type: 'CLOSE_MODAL';
    }
  | {
      type: 'SET_MODAL_VIEW';
      view: MODAL_VIEWS;
    }
  | {
      type: 'SET_USER_AVATAR';
      value: string;
    }
  | {
      type: 'SET_SCHOOL_LOGO';
      value: string;
    }
  | {
      type: 'SET_HEADER_BACKGROUND';
      value: string;
    };

type MODAL_VIEWS = 'SIGNUP_VIEW' | 'LOGIN_VIEW' | 'FORGOT_VIEW';

export const UIContext = React.createContext<State | any>(initialState);

UIContext.displayName = 'UIContext';

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case 'OPEN_SIDEBAR': {
      return {
        ...state,
        displaySidebar: true,
      };
    }
    case 'CLOSE_SIDEBAR': {
      return {
        ...state,
        displaySidebar: false,
      };
    }
    case 'OPEN_DROPDOWN': {
      return {
        ...state,
        displayDropdown: true,
      };
    }
    case 'CLOSE_DROPDOWN': {
      return {
        ...state,
        displayDropdown: false,
      };
    }
    case 'OPEN_MODAL': {
      return {
        ...state,
        displayModal: true,
      };
    }
    case 'CLOSE_MODAL': {
      return {
        ...state,
        displayModal: false,
      };
    }
    case 'SET_MODAL_VIEW': {
      return {
        ...state,
        modalView: action.view,
      };
    }

    case 'SET_USER_AVATAR': {
      return {
        ...state,
        userAvatar: action.value,
      };
    }

    case 'SET_SCHOOL_LOGO': {
      return {
        ...state,
        schoolLogo: action.value,
      };
    }

    case 'SET_HEADER_BACKGROUND': {
      return {
        ...state,
        headerBackground: action.value,
      };
    }
  }
}

export const UIProvider: React.FC = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  const openSidebar = () => dispatch({ type: 'OPEN_SIDEBAR' });
  const closeSidebar = () => dispatch({ type: 'CLOSE_SIDEBAR' });
  const toggleSidebar = () =>
    state.displaySidebar
      ? dispatch({ type: 'CLOSE_SIDEBAR' })
      : dispatch({ type: 'OPEN_SIDEBAR' });
  const closeSidebarIfPresent = () =>
    state.displaySidebar && dispatch({ type: 'CLOSE_SIDEBAR' });

  const openDropdown = () => dispatch({ type: 'OPEN_DROPDOWN' });
  const closeDropdown = () => dispatch({ type: 'CLOSE_DROPDOWN' });

  const openModal = () => dispatch({ type: 'OPEN_MODAL' });
  const closeModal = () => dispatch({ type: 'CLOSE_MODAL' });

  const setModalView = (view: MODAL_VIEWS) =>
    dispatch({ type: 'SET_MODAL_VIEW', view });

  const setUserAvatar = React.useCallback(
    (value: string) => dispatch({ type: 'SET_USER_AVATAR', value }),
    [dispatch],
  );

  const setSchoolLogo = React.useCallback(
    (value: string) => dispatch({ type: 'SET_SCHOOL_LOGO', value }),
    [dispatch],
  );

  const setHeaderBackground = React.useCallback(
    (value: string) => dispatch({ type: 'SET_HEADER_BACKGROUND', value }),
    [dispatch],
  );

  const value = React.useMemo(
    () => ({
      ...state,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      closeSidebarIfPresent,
      openDropdown,
      closeDropdown,
      openModal,
      closeModal,
      setModalView,
      setUserAvatar,
      setSchoolLogo,
      setHeaderBackground,
    }),
    [state],
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = React.useContext(UIContext);

  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }

  return context;
};

export const ManagedUIContext: React.FC = ({ children }) => (
  <UIProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </UIProvider>
);
