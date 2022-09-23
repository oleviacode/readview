import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import {Button} from '@react-native-material/core';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {updateUserInfo} from '../../../redux/user/userinfo/action';
import {styles} from '../../shared/stylesheet';
import {getMethod} from '../../shared/fetchMethods';
import Config from 'react-native-config';
import {initialBookListInfo} from '../../model';
import BooklistRecCard from '../shelf/Components/BooklistRecCard';
import { CheckBox } from '@rneui/base';
import Loading from '../../shared/Loading';

export default function ChangeInfo() {
  const bookId = useAppSelector(state => state.book.bookId);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const [booklists, setBookList] = useState([initialBookListInfo]);
  const [isLoading, setLoading] = useState(false);
  const [isSelected, setSelection] = useState(false)

  async function upDateInfo() {}

  useEffect(() => {
    async function addToBookList() {
      setLoading(true);
      const _getMethod = await getMethod();
      const resBooklist = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/booklist/ownerBooklist`,
        _getMethod,
      );

      const booklist = await resBooklist.json();
      console.log(booklist);
      setBookList(booklist);
      setLoading(false);
    }
    addToBookList();
  }, []);

  //add to booklist
  //   async function addToBookList() {
  //     const patch = await patchMethod();

  //     const res = await fetch(
  //       `${Config.REACT_APP_BACKEND_URL}/book/saveBookStatus/${bookId[0]}/save`,
  //       patch,
  //     );

  //     const test = await res.json();

  //     setSaveButton('#eac645');
  //     setReadingButton('lightgrey');
  //     setReadButton('lightgrey');
  //   }

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
          Select A BookList
        </Text>
        <View>
          {booklists.map(booklist => (
            <CheckBox
            key={booklist.id}
            value={isSelected}
            onValueChange={setSelection}
          />
          ))}
        </View>
        <View>
          <Button
            style={{marginTop: 10}}
            title={'Submit'}
            onPress={() => {
              console.log('I submit jor');
            }}></Button>
            <Button
            style={{marginTop: 10}}
            title={'+ create new Booklist'}
            onPress={() => {
              console.log('I submit jor');
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
