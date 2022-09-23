import {Button, HStack} from '@react-native-material/core';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
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
import {useNavigation} from '@react-navigation/native';
import Loading from '../../../shared/Loading';

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
  const navigation = useNavigation();

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

  // delete an item
  async function deleteItems(bookId: number){
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(
      `${Config.REACT_APP_BACKEND_URL}/booklist/removeBookFromBookList/${booklistId}/${bookId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "PATCH"
      },
    );
    const result = await res.json()
    console.log(result)
    if (result[0].status == 200){
      onRefresh()
    } else {
      console.log('something wrong happens')
    }
  }

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
      {isLoading ? <Loading /> : <View></View>}

      {!isLoading && nobooks && (
        <>
          <View style={styles.container}>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              {userId == booklist.booklist_creator_id ? (
                <Button
                  style={{marginBottom: 10, marginTop: 10}}
                  color={'navy'}
                  onPress={() => {
                    navigation.navigate('Search');
                  }}
                  title={'Search and Add a New Book!'}></Button>
              ) : (
                <View></View>
              )}
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
                  }}>{`You haven't added anything yet :(`}</Text>
              </View>
            </ScrollView>
          </View>
        </>
      )}
      {!isLoading && !nobooks && (
        <>
          <View style={styles.container}>
            <Text
              style={[styles.titleText, {textAlign: 'center', padding: 10}]}>
              {booklist.title}
            </Text>
            <Divider />
            {userId == booklist.booklist_creator_id ? (
              <Button
                style={{marginBottom: 10}}
                color={'navy'}
                onPress={() => {
                  navigation.navigate('Search');
                }}
                title={'Search and Add a New Book!'}></Button>
            ) : (
              <View></View>
            )}
            <SwipeListView
              refreshing={refreshing}
              keyExtractor={(item, index) => String(item.id)}
              onRefresh={onRefresh}
              useFlatList={true}
              data={books}
              disableRightSwipe={true}
              swipeToClosePercent={70}
              renderItem={(data, rowMap) => (
                <BookRecCard key={data.item.id} bookInfo={data.item} />
              )}
              renderHiddenItem={(data, rowMap) => (
                <View
                    style={{
                      alignItems: 'center',
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingLeft: 15,
                    }}>
                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        bottom: 0,
                        justifyContent: 'center',
                        position: 'absolute',
                        top: 0,
                        width: 75,
                        backgroundColor: '#CF4714',
                        right: 0,
                      }}
                      onPress={() => 
                      {
                        rowMap[String(data.item.id)].closeRow()
                        deleteItems(data.item.id)
                      }}>
                      <Text>Delete</Text>
                    </TouchableOpacity>
                  </View>
              )}
              leftOpenValue={75}
              rightOpenValue={-75}></SwipeListView>
          </View>
        </>
      )}
    </>
  );
}
