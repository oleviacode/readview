import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';
import {AppDispatch, RootState} from '../store';
import {RecommentState} from './state';

// -------------------------------------------------------------------------------------------------------------------
// fetch recommendations
// -------------------------------------------------------------------------------------------------------------------

export function fetchForYou() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    if (getState().userData.isLoading == true || getState().userData.isLoading == false) {
      return;
    }
    try {
      dispatch(startLoading());
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/user-interaction/recommendation`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const result = await res.json();
      dispatch(finishLoading());
      return result;
    } catch (e) {
      dispatch(failToLoading());
    }
  };
}

// -------------------------------------------------------------------------------------------------------------------
// start loading data function
// -------------------------------------------------------------------------------------------------------------------

export function startLoading() {
  return {
    type: '@@forYou/START_LOADING' as const,
  };
}
export function finishLoading() {
  return {
    type: '@@forYou/FINISH_LOADING' as const,
  };
}
export function failToLoading() {
  return {
    type: '@@forYou/FAIL_LOADING' as const,
  };
}

//export Actions

export type StartLoading = ReturnType<typeof startLoading>;
export type FinishLoading = ReturnType<typeof finishLoading>;
export type FailToLoading = ReturnType<typeof failToLoading>;

export type RecommentActions = StartLoading | FinishLoading | FailToLoading;
