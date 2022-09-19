import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';
import { AppDispatch } from '../../store';
import {UserState} from './state';

export function updateUserInfo(type:string, value:string){
  return async (dispatch: AppDispatch) => {
    const token = await AsyncStorage.getItem('token')
    const res = await fetch(`${Config.REACT_APP_BACKEND_URL}/user/${type}`,{
      method: 'Patch',
      body: JSON.stringify({
        value: value
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    const result = await res.json()

    if (result[0].status == 200){
      if (type == 'username'){
        dispatch(updateUsername(value))
      } else if (type == 'email'){
        dispatch(updateEmail(value))
      } else if (type == 'info'){
        dispatch(updateInfo(value))
      }else if (type == 'profile_picture'){
        dispatch(updatePicture(value))
      }
    }
    return result

  }
}

// -------------------------------------------------------------------------------------------------------------------
// Update User
// -------------------------------------------------------------------------------------------------------------------

export function updateUsername(username:string) {
  return {
    type: '@@user/USER_USERNAME' as const,
    username: username,
  };
}

export function updateEmail(email:string) {
  return {
    type: '@@user/USER_EMAIL' as const,
    email: email,
  };
}

export function updateInfo(info:string) {
  return {
    type: '@@user/USER_INFO' as const,
    info: info,
  };
}

export function updatePicture(file: string) {
  return {
    type: '@@user/USER_PROFILEPICTURE' as const,
    profile_picture: file,
  };
}

// -------------------------------------------------------------------------------------------------------------------
// Insert User
// -------------------------------------------------------------------------------------------------------------------

export function insertUserIntoRedux(user:UserState) {
  return {
    type: '@@user/USER_INSERT' as const,
    id: user.id,
    username: user.username,
    email: user.email,
    gender:  user.gender,
    birthday:  user.birthday,
    profile_picture: user.profile_picture,
    info:  user.info,
    level:  user.level,
  };
}

export type InsertUserIntoReduxAction = ReturnType<typeof insertUserIntoRedux>;
export type UpdateUsernameAction = ReturnType<typeof updateUsername>;
export type UpdateEmailAction = ReturnType<typeof updateEmail>;
export type UpdateInfoAction = ReturnType<typeof updateInfo>;
export type UpdatePictureAction = ReturnType<typeof updatePicture>;
export type UserActions = InsertUserIntoReduxAction | UpdateUsernameAction | UpdateEmailAction | UpdateInfoAction | UpdatePictureAction;