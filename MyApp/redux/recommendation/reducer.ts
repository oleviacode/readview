import {RecommentActions} from './action';
import {RecommentState} from './state';

const initialState = {
  isLoading: null,
};

export function recommendationReducer(
  state: RecommentState = initialState,
  action: RecommentActions,
) {
  switch (action.type) {
    case '@@forYou/START_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case '@@forYou/FINISH_LOADING':
      return {
        ...state,
        isLoading: false,
      };
    case '@@forYou/FAIL_LOADING':
      return {
        ...state,
        isLoading: null,
      };
    default:
      return state;
  }
}
