import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { authReducer } from "./auth/reducer";
import { userReducer } from "./user/userinfo/reducer";


//combining
const reducers = combineReducers({
  auth: authReducer,
  user: userReducer,
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