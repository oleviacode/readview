import {BookInfoActions} from './action';
import {BookInfoState} from './state';

const initialState = {
  id: 0,
  title: '',
  author_name: '',
  publisher_name: '',
  publish_date: '',
  book_picture: '',
  genre: [''],
  info: '',
  rating: undefined,
  readerStatus:undefined,
  isbn: '',
  page: 0,
};

export function bookInfoReducer(state: BookInfoState = initialState, action: BookInfoActions): BookInfoState {
  switch (action.type) {
    case '@@book_info/BOOK_INFO':
      return {
        ...state,
        id: action.id,
        title: action.title,
        author_name: action.author_name,
        publisher_name: action.publisher_name,
        publish_date: action.publish_date,
        book_picture: action.book_picture,
        genre: action.genre,
        info: action.info,
        rating: action.rating,
        readerStatus: action.readerStatus,
        isbn: action.isbn,
        page: action.page,
      };
    default: 
      return state;
  }
}
