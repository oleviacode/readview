import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import {AppDispatch} from '../store';
import { insertUserIntoRedux } from '../user/userinfo/action';

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
  return async (dispatch: AppDispatch) => {
    const res = await fetch(`${Config.REACT_APP_BACKEND_URL}/user`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const result = await res.json()
    if (result[0].statusCode == 200){
      dispatch(loggedIn(result[0].user[0].email,token));
      dispatch(insertUserIntoRedux(result[0].user[0]))
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
  return async (dispatch: AppDispatch) => {
    await AsyncStorage.removeItem('token');
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
