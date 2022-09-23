import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { authReducer } from "./auth/reducer";
import { bookReducer } from "./book/reducer";
import { searchReducer } from "./search/reducer";
import { userDataReducer } from "./user/userData/reducer";
import { userReducer } from "./user/userinfo/reducer";


//combining
const reducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  userData: userDataReducer,
  search: searchReducer,
  book: bookReducer,
});

//exports
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector



//export the configureStore
export const store = configureStore({
  reducer: reducers
});