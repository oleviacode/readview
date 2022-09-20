import {UserActions} from './action';
import {UserState} from './state';

const initialState = {
  id: 0,
  username: '',
  email: '',
  gender: '',
  birthday: null,
  profile_picture: '',
  info: '',
  level: 0,
  isLoadingData: null,
};

export function userReducer(
  state: UserState = initialState,
  action: UserActions,
) {
  switch (action.type) {
    case '@@user/USER_INSERT':
      return {
        ...state,
        id: action.id,
        username: action.username,
        email: action.email,
        gender: action.gender,
        birthday: action.birthday,
        profile_picture: action.profile_picture,
        info: action.info,
        level: action.level,
      };
    case '@@user/USER_USERNAME':
      return {
        ...state,
        username: action.username,
      };
    case '@@user/USER_EMAIL':
      return {
        ...state,
        email: action.email,
      };
    case '@@user/USER_INFO':
      return {
        ...state,
        info: action.info,
      };
    case '@@user/USER_PROFILEPICTURE':
      return {
        ...state,
        profile_picture: action.profile_picture,
      };
    default:
      return state;
  }
}
