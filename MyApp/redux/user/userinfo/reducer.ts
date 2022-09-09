import { UserActions } from "./action";
import { UserState } from "./state"

const initialState ={
  id: null,
  username:  null,
  email: null,
  gender:  null,
  birthday:  null,
  profile_picture: null,
  info:  null,
  level:  null,
}



export function userReducer(state: UserState = initialState , action: UserActions){
    switch (action.type) {
        case '@@user/USER_INFO':
          return {
            ...state,
            id: action.id,
            username:  action.username,
            email: action.email,
            gender:  action.gender,
            birthday:  action.birthday,
            profile_picture: action.profile_picture,
            info:  action.info,
            level:  action.level,
          };
        default: 
          return state;
      }
}