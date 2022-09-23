import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';
import { AppDispatch, RootState } from '../store';
import {SearchState} from './state';


export function saveSearchParams(search: string) {
  return {
    type: '@@search/SAVE_SEARCH' as const,
    search: search,
  };
}

export function saveLastSearch(search: string) {
  return {
    type: '@@search/SAVE_LAST' as const,
    lastSearch: search,
  };
}


//exports
export type SaveLastAction = ReturnType<typeof saveLastSearch>
export type SaveSearchAction = ReturnType<typeof saveSearchParams>;
export type SearchActions = SaveSearchAction | SaveLastAction;
