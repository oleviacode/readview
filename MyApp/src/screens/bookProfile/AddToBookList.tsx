import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import {Button} from '@react-native-material/core';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {styles} from '../../shared/stylesheet';
import {getMethod} from '../../shared/fetchMethods';
import Config from 'react-native-config';
import {initialBookListInfo} from '../../model';
import Loading from '../../shared/Loading';
import CheckBoxBox from '../../shared/CheckBoxBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearBooklistId } from '../../../redux/book/action';

export default function AddToBookList() {
  const bookId = useAppSelector(state => state.book.bookId);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const [booklists, setBookList] = useState([initialBookListInfo]);
  const [isLoading, setLoading] = useState(false);
  const booklistArray = useAppSelector(state => state.book.bookListId)

  
  async function upDateBooklist() {
    const token = await AsyncStorage.getItem('token')
    const res = await fetch(
      `${Config.REACT_APP_BACKEND_URL}/booklist/addBookIntoBooklist`,
      {
        headers:{
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          book_id: bookId,
          booklists: booklistArray
        })
      },
    );

    const result = await res.json()
    if (result[0].status == 200){
      dispatch(clearBooklistId())
      navigation.goBack()
    } else {
      setError('Sorry, Please Try Again :(')
    }
  }

  useEffect(() => {
    async function addToBookList() {
      dispatch(clearBooklistId())
      setLoading(true);
      const _getMethod = await getMethod();
      const resBooklist = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/booklist/ownerBooklist`,
        _getMethod,
      );

      const booklist = await resBooklist.json();
      setBookList(booklist);
      setLoading(false);
    }

    const focus = navigation.addListener('focus', async () => {
        dispatch(clearBooklistId())
        addToBookList()
      })
    addToBookList();
    return focus
  }, []);

  return (
      <>
    {isLoading  && <Loading/>}
    {isLoading || (<View style={styles.container}>
      <ScrollView>
        <Text>{error}</Text>
        <Text
          style={{
            fontSize: 30,
          }}>
          {' '}
          Select BookLists
        </Text>
        <View>
          {booklists.map(booklist => (
              <CheckBoxBox booklist={booklist} key={booklist.id}/>
          ))}
        </View>
        <View>
          <Button
            style={{marginTop: 10}}
            title={'Submit'}
            onPress={() => {
              upDateBooklist()
            }}></Button>
            <Button
            style={{marginTop: 10}}
            title={'+ create new Booklist'}
            onPress={() => {
              navigation.navigate('CreateBookList')
            }}></Button>
          <Button
            style={{marginTop: 20}}
            color={'lightgrey'}
            title={'Go back'}
            onPress={() => {
              navigation.goBack();
            }}></Button>
        </View>
      </ScrollView>
    </View>)}
    </>
  );
}
