import {AuthActions} from './action';
import {AuthState} from './state';

const initialState = {
  username: null,
  email: null,
  gender: 'not provided',
  birthday: null,
  loggedIn: false,
  token: null,
};

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case '@@auth/LOGGED_IN':
      return {
        ...state,
        email: action.email,
        loggedIn: true,
        token: action.token
      };
    case '@@auth/LOGGED_OUT':
      return {
        ...state,
        email: null,
        loggedIn: false
      }
    default: 
      return state;
  }
}
