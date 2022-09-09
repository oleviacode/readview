import {UserState} from './state';

export function insertUserIntoRedux(user:UserState) {
  return {
    type: '@@user/USER_INFO' as const,
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
export type UserActions = InsertUserIntoReduxAction;
