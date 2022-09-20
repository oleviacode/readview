import {UserDataActions} from './action';
import {UserDataState} from './state';

const initialState = {
  rating: [{rating: 0, count: 0}],
  genre: [{genre_name: '', count: 0}],
  reading: [{date_trunc: '', count: 0}],
  author: [{author_name: '', count: 0}],
  fiction: [{nonfiction: 0, fiction: 0}],
  isLoading: null,
  userId: 0,
};

export function userDataReducer(
  state: UserDataState = initialState,
  action: UserDataActions,
) {
  switch (action.type) {
    case '@@data/USER_INSERT':
      return {
        ...state,
        userId: action.id,
      };
    case '@@data/DATA_INSERT':
      return {
        ...state,
        rating: action.rating,
        genre: action.genre,
        reading: action.reading,
        author: action.author,
        fiction: action.fiction,
      };
    case '@@data/START_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case '@@data/FINISH_LOADING':
      return {
        ...state,
        isLoading: false,
      };
    case '@@data/FAIL_LOADING':
      return {
        ...state,
        isLoading: null,
      };
    default:
      return state;
  }
}
