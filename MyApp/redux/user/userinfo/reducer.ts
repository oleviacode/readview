import { User } from "./state"


export interface usernameState {
    username: User
}

const initialState: usernameState ={
    username: ""
}



export function userInfoReducer(state, action){
    if(action.type === "LOG_NAME"){
        return {
            ...state,
            username: 
        }

    }
}