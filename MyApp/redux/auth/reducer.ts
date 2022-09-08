import {AuthActions} from './action';
import {AuthState} from './state';

const initialState = {
  username: 'Guest User',
  email: 'user@123.com',
  gender: 'Male',
  birthday: null,
};

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case 'CHANGE_NAME':
      return {
        username: 'haha',
        email: 'haha@123.com',
        gender: 'Male',
        birthday: null,
      };
    
    default:
        return state
  }
}
