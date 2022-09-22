import {Button, HStack} from '@react-native-material/core';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BookInfo, initialBookInfo} from '../../../model';
import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';
import {SwipeListView} from 'react-native-swipe-list-view';
import BookRecCard from '../../bookProfile/bookRecCard';
import {styles} from '../../../shared/stylesheet';
import {Divider} from 'react-native-flex-layout';
import {useAppSelector} from '../../../../redux/store';
import { useNavigation } from '@react-navigation/native';

export default function Booklist({route}: any) {
  // -------------------------------------------------------------------------------------------------------------------
  // settings
  // -------------------------------------------------------------------------------------------------------------------

  const {booklistId} = route.params;
  const [books, setBook] = useState<BookInfo[]>([initialBookInfo]);
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [nobooks, setNobooks] = useState(false);
  const [booklist, setBookList] = useState({title: '', booklist_creator_id: 0});
  const userId = useAppSelector(state => state.user.id);
  const navigation = useNavigation()

  // -------------------------------------------------------------------------------------------------------------------
  // refrshing
  // -------------------------------------------------------------------------------------------------------------------

  async function refresh() {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(
      `${Config.REACT_APP_BACKEND_URL}/booklist/booksfromBooklist/${booklistId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const result = await res.json();
    const resBooklist = await fetch(
      `${Config.REACT_APP_BACKEND_URL}/booklist/booklistInfo/${booklistId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const resultBooklist = await resBooklist.json();
    if (result.length == 0) {
      //no lists
      setNobooks(true);
    } else {
      // have lists
      setNobooks(false);
      setBook(result);
    }
    setBookList(resultBooklist[0]);
  }

  // callback on fresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refresh();
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  // -------------------------------------------------------------------------------------------------------------------
  // use effect
  // -------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    async function fetchBook() {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const resBooks = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/booklist/booksfromBooklist/${booklistId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const resultBooks = await resBooks.json();
      const resBooklist = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/booklist/booklistInfo/${booklistId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const resultBooklist = await resBooklist.json();

      if (resultBooks.length == 0) {
        //nobooks
        setNobooks(true);
        setLoading(false);
      } else {
        // have books
        setNobooks(false);
        setBook(resultBooks);
        setLoading(false);
      }
      setBookList(resultBooklist[0]);
    }
    fetchBook();
  }, []);

  return (
    <>
      {isLoading && (
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

      {!isLoading && nobooks && (
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
      {!isLoading && !nobooks && (
        <>
          
          <View style={styles.container}>
            <Text
              style={[styles.titleText, {textAlign: 'center', padding: 10}]}>
              {booklist.title}
            </Text>
            <Divider />
            {userId == booklist.booklist_creator_id ? (<Button style={{marginBottom: 10}} color={'navy'} onPress={() => {
                navigation.navigate('Search')
            }} title={'Add New Book To List'}></Button>) : (<View></View>)}
            <SwipeListView
              refreshing={refreshing}
              onRefresh={onRefresh}
              useFlatList={true}
              data={books}
              disableRightSwipe={true}
              swipeToClosePercent={70}
              renderItem={(data, rowMap) => (
                <BookRecCard key={data.item.id} bookInfo={data.item} />
              )}
              renderHiddenItem={(data, rowMap) => (
                <View style={{}}>
                  <TouchableOpacity
                    onPress={() => rowMap[data.item.id].closeRow()}>
                    <Text></Text>
                  </TouchableOpacity>
                </View>
              )}
              leftOpenValue={75}
              rightOpenValue={-75}
              onRowOpen={(rowKey, rowMap) => {
                setTimeout(() => {
                  rowMap[rowKey].closeRow();
                }, 2000);
              }}></SwipeListView>
          </View>
        </>
      )}
    </>
  );
}
