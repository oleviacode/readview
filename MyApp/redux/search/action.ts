import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';
import { AppDispatch, RootState } from '../store';
import {SearchState} from './state';


export function saveSearchParams(search: string) {
  return {
    type: '@@search/SAVE_SEARCH' as const,
    search: search,
  };
}

export function saveLastSearch(search: string) {
  return {
    type: '@@search/SAVE_LAST' as const,
    lastSearch: search,
  };
}

export function fetchSearch(search:string){
  return async (dispatch: AppDispatch, getState: () => RootState) => {

    if(getState().bookinfo.isloading == true || (getState().search.lastSearch == search && getState().search.isLoading == false) || search == ''){
      return 
    }
    dispatch(startLoading())
    try{
    const token = await AsyncStorage.getItem('token')
    const res = await fetch(`${Config.REACT_APP_BACKEND_URL}/search/title?search=${search}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const result = await res.json()
    dispatch(finishLoading())
    dispatch(saveLastSearch(search))
    return result
    } catch (e){
      dispatch(failToLoading())
    }
  }
}

export function startLoading(){
  return {
    type: '@@search/START_LOADING' as const
  }
}
export function finishLoading(){
  return {
    type: '@@search/FINISH_LOADING' as const
  }
}
export function failToLoading(){
  return {
    type: '@@search/FAIL_LOADING' as const
  }
}

//exports
export type SaveLastAction = ReturnType<typeof saveLastSearch>
export type SaveSearchAction = ReturnType<typeof saveSearchParams>;
export type StartLoading = ReturnType<typeof startLoading>
export type FinishLoading = ReturnType<typeof finishLoading>
export type FailToLoading = ReturnType<typeof failToLoading>
export type SearchActions = SaveSearchAction | StartLoading | FailToLoading | FinishLoading | SaveLastAction;
