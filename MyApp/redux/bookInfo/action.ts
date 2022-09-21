import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';
import {AppDispatch, RootState} from '../store';



export function fetchUserBookList(type: string) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    if (
      getState().bookinfo.isloading == true ||
      (getState().bookinfo.isloading == false &&
        getState().bookinfo.lastType == type)
    ) {
      return;
    }
    try {
      dispatch(startLoading());
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/user-interaction/${type}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const result = await res.json();
      dispatch(finishLoading());
      dispatch(saveLastType(type));
      return result;
    } catch (e) {
      dispatch(failToLoading());
    }
  };
}

export function startLoading() {
  return {
    type: '@@book_info/START_LOADING' as const,
  };
}
export function finishLoading() {
  return {
    type: '@@book_info/FINISH_LOADING' as const,
  };
}
export function failToLoading() {
  return {
    type: '@@book_info/FAIL_LOADING' as const,
  };
}

export function startLoadingSingleBook() {
  return {
    type: '@@book_info/START_LOADING_SINGLE' as const,
  };
}
export function finishLoadingSingleBook() {
  return {
    type: '@@book_info/FINISH_LOADING_SINGLE' as const,
  };
}
export function failToLoadingSingleBook() {
  return {
    type: '@@book_info/FAIL_LOADING_SINGLE' as const,
  };
}

export function saveLastType(type: string) {
  return {
    type: '@@book_info/SAVE_LAST' as const,
    lastType: type,
  };
}

export function insertBookInfoIntoRedux(bookId: number) {
  return {
    type: '@@book_info/BOOK_ID' as const,
    id: bookId,
  };
}

export type InsertBookInfoIntoReduxAction = ReturnType<
  typeof insertBookInfoIntoRedux
>;
export type StartLoading = ReturnType<typeof startLoading>;
export type FinishLoading = ReturnType<typeof finishLoading>;
export type FailToLoading = ReturnType<typeof failToLoading>;
export type StartLoadingSingleBook = ReturnType<typeof startLoadingSingleBook>;
export type FinishLoadingSingleBook = ReturnType<
  typeof finishLoadingSingleBook
>;
export type FailToLoadingSingleBook = ReturnType<
  typeof failToLoadingSingleBook
>;
export type SaveLastTypeAction = ReturnType<typeof saveLastType>;
export type BookInfoActions =
  | InsertBookInfoIntoReduxAction
  | StartLoading
  | FinishLoading
  | FailToLoading
  | SaveLastTypeAction
  | StartLoadingSingleBook
  | FailToLoadingSingleBook
  | FinishLoadingSingleBook;
