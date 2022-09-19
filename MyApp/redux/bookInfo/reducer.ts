import {BookInfoActions} from './action';
import {BookInfoState} from './state';

const initialState = {
  id: 0,
  isloading: null,
  lastType: '',
  isLoadingSingle: null,
};

export function bookInfoReducer(
  state: BookInfoState = initialState,
  action: BookInfoActions,
): BookInfoState {
  switch (action.type) {
    case '@@book_info/SAVE_LAST':
      return {
        ...state,
        lastType: action.lastType,
      };
    case '@@book_info/START_LOADING':
      return {
        ...state,
        isloading: true,
      };
    case '@@book_info/FINISH_LOADING':
      return {
        ...state,
        isloading: false,
      };
    case '@@book_info/FAIL_LOADING':
      return {
        ...state,
        isloading: null,
      };
    case '@@book_info/BOOK_ID':
      return {
        ...state,
        id: action.id,
      };
    case '@@book_info/START_LOADING_SINGLE':
      return {
        ...state,
        isLoadingSingle: true,
      };
    case '@@book_info/FINISH_LOADING_SINGLE':
      return {
        ...state,
        isLoadingSingle: false,
      };
    case '@@book_info/FAIL_LOADING_SINGLE':
      return {
        ...state,
        isLoadingSingle: null,
      };
    default:
      return state;
  }
}
