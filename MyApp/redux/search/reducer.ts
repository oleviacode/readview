import {SearchActions} from './action';
import {SearchState} from './state';

const initialState = {
  search: ''
};

export function searchReducer(state: SearchState = initialState, action: SearchActions): SearchState {
  switch (action.type) {
    case '@@search/SAVE_SEARCH':
      return {
        ...state,
        search: action.search
      };
    default: 
      return state;
  }
}
