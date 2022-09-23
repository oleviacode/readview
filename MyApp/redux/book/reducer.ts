
import {BookActions} from './action';
import {BookState} from './state';

const initialState = {
  lastBookId:0,
  bookId:0,
};

export function bookReducer(
  state: BookState = initialState,
  action: BookActions,
): BookState {
  switch (action.type) {
    case '@@book/SAVE_LAST':
      return {
        ...state,
        lastBookId: action.lastBookId,
      };
    case '@@book/SAVE_BOOKID':
      return {
        ...state,
        bookId: action.bookId,
      };
    default:
      return state;
  }
}
