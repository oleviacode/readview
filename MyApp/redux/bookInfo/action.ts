import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';
import { AppDispatch } from '../store';
import {BookInfoState} from './state';

export function fetchBookInfo(bookId:number){
  return async (dispatch: AppDispatch) => {
    const token = await AsyncStorage.getItem('token')
    const res = await fetch(`${Config.REACT_APP_BACKEND_URL}/book/${bookId}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const result = await res.json()
    dispatch(insertBookInfoIntoRedux(result[0]))
    return result[0]

  }
}

export function fetchSearch(search:string){
  return async (dispatch: AppDispatch) => {
    const token = await AsyncStorage.getItem('token')
    const res = await fetch(`${Config.REACT_APP_BACKEND_URL}/search/title?search=${search}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const result = await res.json()
    return result

  }
}


export function fetchUserBookList(type:string){
  return async (dispatch: AppDispatch) => {
    const token = await AsyncStorage.getItem('token')
    const res = await fetch(`${Config.REACT_APP_BACKEND_URL}/user-interaction/${type}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const result = await res.json()
    return result
  }
}



export function insertBookInfoIntoRedux(bookInfo:BookInfoState) {
  return {
    type: '@@book_info/BOOK_INFO' as const,
    id: bookInfo.id,
    title: bookInfo.title,
    author_name: bookInfo.author_name,
    publisher_name: bookInfo.publisher_name,
    publish_date: bookInfo.publish_date,
    book_picture: bookInfo.book_picture,
    genre: bookInfo.genre,
    info: bookInfo.info,
    rating: bookInfo.rating,
    readerStatus: bookInfo.readerStatus,
    isbn: bookInfo.isbn,
    page: bookInfo.page,
  };
}

export type InsertBookInfoIntoReduxAction = ReturnType<typeof insertBookInfoIntoRedux>;
export type BookInfoActions = InsertBookInfoIntoReduxAction ;