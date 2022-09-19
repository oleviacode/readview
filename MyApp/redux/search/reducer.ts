import {SearchActions} from './action';
import {SearchState} from './state';

const initialState = {
  lastSearch:'',
  search: '',
  isLoading: null,
};

export function searchReducer(
  state: SearchState = initialState,
  action: SearchActions,
): SearchState {
  switch (action.type) {
    case '@@search/SAVE_LAST':
      return {
        ...state,
        lastSearch: action.lastSearch,
      };
    case '@@search/SAVE_SEARCH':
      return {
        ...state,
        search: action.search,
      };
    case '@@search/START_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case '@@search/FINISH_LOADING':
      return {
        ...state,
        isLoading: false,
      };
    case '@@search/FAIL_LOADING':
      return {
        ...state,
        isLoading: null,
      };
    default:
      return state;
  }
}
