import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import {AppDispatch} from '../store';

// -------------------------------------------------------------------------------------------------------------------
// Login related
// -------------------------------------------------------------------------------------------------------------------

export function loggedIn(email: string, token: string) {
  return {
    type: '@@auth/LOGGED_IN' as const,
    email: email,
    token: token,
  };
}

export function checkLogin(token:string){
  return async () => {
    const res = await fetch(`${Config.REACT_APP_BACKEND_URL}/auth/check`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const result = await res.json()
    if (result.statusCode == 200){
      return true
    } else {
      return false
    }

  }
  
}

// -------------------------------------------------------------------------------------------------------------------
// Logout related
// -------------------------------------------------------------------------------------------------------------------

export function logOut() {
  return (dispatch: AppDispatch) => {
    AsyncStorage.removeItem('token');
    dispatch(loggedOut());
  };
}

export function loggedOut() {
  return {
    type: '@@auth/LOGGED_OUT' as const,
  };
}

//exports
export type LoggedInAction = ReturnType<typeof loggedIn>;
export type LoggedOutAction = ReturnType<typeof loggedOut>;
export type AuthActions = LoggedInAction | LoggedOutAction;
