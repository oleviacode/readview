import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button} from '@rneui/themed';
import {HStack} from '@react-native-material/core';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {fetchUserBookList} from '../../../redux/bookInfo/action';
import {BookInfo} from '../../model';
import BookRecCard from '../bookProfile/bookRecCard';
import {SwipeListView} from 'react-native-swipe-list-view';
import SwipeList from './SwipeList';

export default function Search() {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState('readinglist');
  const isLoading = useAppSelector(state => state.bookinfo.isloading);
  const [nobooks, setNobooks] = useState(false);
  const user = useAppSelector(state => state.user.id);
  const [books, setBook] = useState<BookInfo[]>([
    {
      id: 0,
      title: '',
      author_name: '',
      publisher_name: '',
      publish_date: '',
      book_picture: '',
      genre: [''],
      info: '',
      rating: undefined,
      readerstatus: undefined,
      isbn: '',
      pages: 0,
    },
  ]);

  useEffect(() => {
    async function fetchBook() {
      const result = await dispatch(fetchUserBookList(status));
      if (result == null) {
        // Do nothing
      } else if (result.length == 0) {
        //nobooks
        setNobooks(true);
      } else {
        // have books
        setNobooks(false);
        setBook(result);
      }
    }

    fetchBook();
  }, [status, user]);

  return (
    <>
      <View
        style={{
          padding: 10,
        }}>
        <HStack spacing={6}>
          <Button
            onPress={() => {
              setStatus('readinglist');
            }}>
            Reading
          </Button>
          <Button
            style={{backgroundColor: 'pink'}}
            onPress={() => {
              setStatus('readlist');
            }}>
            Read
          </Button>
          <Button
            color="green"
            onPress={() => {
              setStatus('wantlist');
            }}>
            Want to read
          </Button>
          {/* <Button color="red">Booklist</Button> */}
        </HStack>
      </View>
      <View
        style={{
          paddingHorizontal: 9,
        }}>
        {isLoading === false && nobooks == false ? (
            <SwipeList bookInfo={books}/>
        ) : (
          <View></View>
        )}
        {isLoading ? (
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
        ) : (
          <View></View>
        )}
        {nobooks ? (
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
                }}>{`You haven't added any books yet :(`}</Text>
            </View>
          </View>
        ) : (
          <View></View>
        )}
      </View>
    </>
  );
}
