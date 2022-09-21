import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';
import {AppDispatch, RootState} from '../../store';
import { UserDataState } from './state';

// -------------------------------------------------------------------------------------------------------------------
// fetch User data
// -------------------------------------------------------------------------------------------------------------------

export function fetchUserData() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const userId = getState().user.id
     if (
      getState().userData.isLoading == true)
     {
      return;
    }

    try {
      dispatch(startLoading());
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/uservictorydata`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ); 
      const result = await res.json();
      dispatch(insertDataIntoRedux(result))
      dispatch(insertUserIntoRedux(userId))
      dispatch(finishLoading());
    } catch (e) {
      dispatch(failToLoading())
    }
  };
}

// -------------------------------------------------------------------------------------------------------------------
// Insert Data
// -------------------------------------------------------------------------------------------------------------------

export function insertDataIntoRedux(data: UserDataState) {
  return {
    type: '@@data/DATA_INSERT' as const,
    rating: data.rating,
    genre: data.genre,
    reading: data.reading,
    author: data.author,
    fiction: data.fiction,
  };
}

export function insertUserIntoRedux(id: number) {
  return {
    type: '@@data/USER_INSERT' as const,
    id: id,
}}

// -------------------------------------------------------------------------------------------------------------------
// start loading data function
// -------------------------------------------------------------------------------------------------------------------

export function startLoading() {
  return {
    type: '@@data/START_LOADING' as const,
  };
}
export function finishLoading() {
  return {
    type: '@@data/FINISH_LOADING' as const,
  };
}
export function failToLoading() {
  return {
    type: '@@data/FAIL_LOADING' as const,
  };
}

//export Actions


export type StartLoading = ReturnType<typeof startLoading>;
export type FinishLoading = ReturnType<typeof finishLoading>;
export type FailToLoading = ReturnType<typeof failToLoading>;
export type DataInsertAction = ReturnType<typeof insertDataIntoRedux>;
export type UserInsertAction = ReturnType<typeof insertUserIntoRedux>;
export type UserDataActions =
  | StartLoading
  | FinishLoading
  | FailToLoading
  | DataInsertAction
  | UserInsertAction;
