
import {SearchActions} from './action';
import {SearchState} from './state';

const initialState = {
  lastSearch:'',
  search: '',
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
    default:
      return state;
  }
}
