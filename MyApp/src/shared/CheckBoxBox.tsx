import {faCheckSquare, faSquare} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {CheckBox} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import Config from 'react-native-config';
import {removeBooklistId, saveBooklistId} from '../../redux/book/action';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {BooklistInfoProps} from '../model';
import {getMethod} from './fetchMethods';

export default function CheckBoxBox(props: BooklistInfoProps) {
  const booklist = props.booklist;
  const bookId = useAppSelector(state => state.book.bookId)
  const [isSelect, setSelected] = useState(false);
  const [disabled, setDisabled] = useState(false)
  const numArray = useAppSelector(state => state.book.bookListId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getStatus() {
      const _getMethod = await getMethod();
      const res = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/booklist/checkBook/${bookId}/${booklist.id}`,
        _getMethod,
      );
      const result = await res.json()
      if (result[0].result){
        setSelected(true)
        setDisabled(true)
      } else {
        setSelected(false)
      }
    }
    getStatus()
  }, [bookId]);

  return (
    <>
      <CheckBox
        title={`${booklist.title}  ${booklist.private ? '(Private)' : ''}`}
        key={booklist.id}
        checked={isSelect}
        disabled={disabled}
        onPress={() => {
          setSelected(!isSelect);
          if (!isSelect) {
            dispatch(saveBooklistId(numArray, booklist.id));
          } else {
            dispatch(removeBooklistId(numArray, booklist.id));
          }
        }}
        checkedIcon={<FontAwesomeIcon icon={faCheckSquare} />}
        uncheckedIcon={<FontAwesomeIcon icon={faSquare} />}
      />
    </>
  );
}
