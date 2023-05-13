import React, { createContext, useEffect, useMemo, useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import { StorageService } from '../services/StorageService';
import { IUserData } from '../utils/interfaces';
import getUrlParams from '../helper/routeHelper';

// Define the type for the context state and action
interface UserContextState {
  user: IUserData | null;
}

type UserContextAction = { type: 'SET_USER'; payload: IUserData | null };

// Create the UserContext with an initial state
const initialState: UserContextState = {
  user: null,
};

// Create the UserContext
export const UserContext = createContext<{
  state: UserContextState;
  dispatch: React.Dispatch<UserContextAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

// Create the UserProvider component to wrap your application
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(
    (prevState: UserContextState, action: UserContextAction) => {
      switch (action.type) {
        case 'SET_USER':
          return { ...prevState, user: action.payload };
        default:
          return prevState;
      }
    },
    initialState
  );

  const location = useLocation();

  // Fetch user data from local storage when the component mounts or from URL parameters
  useEffect(() => {
    const params = getUrlParams(location);

    const { guildId, guildName, accessToken, refreshToken } = params;

    if (guildId && guildName) {
      const userInfo: IUserData = {
        guild: {
          guildId,
          guildName,
        },
        token: {
          accessToken,
          refreshToken,
        },
      };
      dispatch({ type: 'SET_USER', payload: userInfo });
    } else {
      const userData = StorageService.readLocalStorage<IUserData>('user');

      if (userData) {
        const parsedIUserData: IUserData = userData;
        dispatch({ type: 'SET_USER', payload: parsedIUserData });
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  // Provide the context value to the wrapped components
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
