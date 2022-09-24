import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Button} from '@rneui/themed';
import {HStack} from '@react-native-material/core';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {saveLastSearch} from '../../../redux/search/action';
import {BookInfo, initialBookInfo} from '../../model';
import BookRecCard from '../bookProfile/bookRecCard';
import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../../shared/stylesheet';

export default function Search() {
  // -------------------------------------------------------------------------------------------------------------------
  // settings
  // -------------------------------------------------------------------------------------------------------------------
  const dispatch = useAppDispatch();
  const search = useAppSelector(state => state.search.search);
  const [error, setError] = useState('search by title, author or ISBN!');
  const user = useAppSelector(state => state.user.id);
  const [books, setBook] = useState<BookInfo[]>([initialBookInfo]);
  const [isLoading, setLoading] = useState(false);
  const [nobooks, setNobooks] = useState(false);
  const navigation = useNavigation();

  // -------------------------------------------------------------------------------------------------------------------
  // useEffect
  // -------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    async function fetchBook() {
      if (search === '' || search.length < 2) {
        setNobooks(true)
        setError('Please input at least 3 characters!');
      } else {
        setNobooks(false);
        setLoading(true);
        setError('searching...');
        const token = await AsyncStorage.getItem('token');
        const res = await fetch(
          `${Config.REACT_APP_BACKEND_URL}/search/title?search=${search}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const result = await res.json();
        dispatch(saveLastSearch(search));
        if (result.length == 0 || result[0].message) {
          setError('no results :(');
          setNobooks(true);
          setLoading(false);
        } else {
          setNobooks(false);
          setBook(result);
          setError('search results');
          setLoading(false);
        }
      }
    }
    fetchBook();
  }, [search, user]);

  // -------------------------------------------------------------------------------------------------------------------
  // return
  // -------------------------------------------------------------------------------------------------------------------
  return (
    <View style={[styles.container, {marginTop: 10}]}>
      {/* <View>
      <HStack spacing={6}>
          <Button>Book</Button>
          <Button style={{backgroundColor: 'pink'}}>Author</Button>
          <Button color="green">User</Button>
          <Button color="red">Booklist</Button>  
        </HStack>
      </View> */}
      <ScrollView>
        <View>
          <View
            style={{
              backgroundColor: 'lightblue',
              margin: 10,
              borderRadius: 10,
              padding: 10,
            }}>
            <Text
              style={{
                fontSize: 15,
                textAlign: 'center',
              }}>
              {error}
            </Text>
          </View>
          {isLoading === false && !nobooks && (
            <View>
              {books.map(book => (
                <BookRecCard bookInfo={book} key={book.id} />
              ))}
            </View>
          )}
          {isLoading == true && (
            <View
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 20,
              }}>
              <ActivityIndicator size="large" color="#5699ee" />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
