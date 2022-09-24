import {Button, HStack} from '@react-native-material/core';
import React, {useCallback, useEffect, useState} from 'react';
import {
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
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function Booklist({route}: any) {
  // -------------------------------------------------------------------------------------------------------------------
  // settings
  // -------------------------------------------------------------------------------------------------------------------

  const {booklistId} = route.params;
  const [books, setBook] = useState<BookInfo[]>([initialBookInfo]);
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [nobooks, setNobooks] = useState(false);
  const [booklist, setBookList] = useState({title: '', booklist_creator_id: 0, username: ''});
  const [saveButton, setSaveButton] = useState('#eac645');
  const userId = useAppSelector(state => state.user.id);
  const navigation = useNavigation();

  // -------------------------------------------------------------------------------------------------------------------
  // refreshing
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

  //save button
  async function save() {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/booklist/followOrUnfollowBooklist/${booklistId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: 'POST',
        },
      );

      const result = await res.json();
      if (result[0].status == 200) {
        if (saveButton == 'lightgrey'){
           setSaveButton('#eac645');
        } else {
          setSaveButton('lightgrey');
        }
       
      } else {
        //do nothing
      }
    }
  

  // delete an item
  async function deleteItems(bookId: number) {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(
      `${Config.REACT_APP_BACKEND_URL}/booklist/removeBookFromBookList/${booklistId}/${bookId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'PATCH',
      },
    );
    const result = await res.json();
    if (result[0].status == 200) {
      onRefresh();
    } else {
      console.log('something wrong happens');
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
      const resCheckStatus = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/booklist/checkbooklist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const check = await resCheckStatus.json();
      if (resultBooks.length == 0) {
        //nobooks
        setNobooks(true);
        setLoading(false);
      } else {
        // have books
        if(check.length != 0){
          setSaveButton('#eac645')
        } else {
          setSaveButton('lightgrey')
        }
        setNobooks(false);
        setBook(resultBooks);
        setLoading(false);
      }
      setBookList(resultBooklist[0]);
    }
    fetchBook();
  }, [booklistId]);

  // -------------------------------------------------------------------------------------------------------------------
  // return
  // -------------------------------------------------------------------------------------------------------------------

  return (
    <>
      {/* LOADING */}
      {isLoading && <Loading />}

      {/* if no books in booklist ----------------------------------------------------------------------------*/}
      {!isLoading && nobooks && (
        <>
          <View style={styles.container}>

            {/* The update button ---------------------------------------------------------------------------- */}
            {userId == booklist.booklist_creator_id ? (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('UpdatebooklistScreen', {
                    booklistId: booklistId,
                  });
                }}>
                <Text
                  style={[
                    styles.titleText,
                    {textAlign: 'center', padding: 10},
                  ]}>
                  {booklist.title}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text
                style={[styles.titleText, {textAlign: 'center', padding: 10}]}>
                {booklist.title}
              </Text>
            )}

            <Divider />

            {/* Message under the booklist ---------------------------------------------------------------------------- */}
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              contentContainerStyle={{paddingBottom:'70%'}}>
              {userId == booklist.booklist_creator_id && (
                <Button
                  style={{marginBottom: 10, marginTop: 10}}
                  color={'navy'}
                  onPress={() => {
                    navigation.navigate('Search');
                  }}
                  title={'Search and Add a New Book!'}></Button>
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
                  }}>{`Nothing here yet :(`}</Text>
              </View>
            </ScrollView>
          </View>
        </>
      )}

      {/* Yes books in booklist ---------------------------------------------------------------------------- */}
      {!isLoading && !nobooks && (
        <>
          <View style={styles.container}>

            {/* the updated button */}
            {userId == booklist.booklist_creator_id ? (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('UpdatebooklistScreen', {
                    booklistId: booklistId,
                  });
                }}>
                <Text
                  style={[
                    styles.titleText,
                    {textAlign: 'center', padding: 10},
                  ]}>
                  {booklist.title}
                </Text>
              </TouchableOpacity>
            ) : (

              // if the user is not the creator
              <>
                <Text
                  style={[
                    styles.titleText,
                    {padding: 10},
                  ]}>
                  {booklist.title}
                </Text>
                <HStack style={{justifyContent: 'space-between', alignItems:'center', paddingBottom: 20}}>
                <Text
                  style={[
                    styles.smallText,
                    {padding: 10},
                  ]}>
                  by {booklist.username}
                </Text>
                <View style={{}}>
                <TouchableOpacity
                  onPress={() => {
                    save();
                  }}>
                  <FontAwesomeIcon
                    size={50}
                    icon={faBookmark}
                    color={saveButton}
                  />
                </TouchableOpacity>
              </View>
                </HStack>
              </>
            )}
            <Divider />

            {/* if the user is the creator ---------------------------------------------------------------------------- */}
            {userId == booklist.booklist_creator_id && (
              <Button
                style={{marginBottom: 10}}
                color={'navy'}
                onPress={() => {
                  navigation.navigate('Search');
                }}
                title={'Search and Add a New Book!'}></Button>
            )}

            {/*  if the user is the owner of the booklist ---------------------------------------------------------------------------- */}
            {userId != booklist.booklist_creator_id ? (
              <ScrollView>
                {books.map(book => (
                  <BookRecCard bookInfo={book} key={book.id} />
                ))}
              </ScrollView>
            ) : (
              <SwipeListView
                contentContainerStyle={{paddingBottom: '30%'}}
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
                      onPress={() => {
                        rowMap[String(data.item.id)].closeRow();
                        deleteItems(data.item.id);
                      }}>
                      <Text>Delete</Text>
                    </TouchableOpacity>
                  </View>
                )}
                leftOpenValue={75}
                rightOpenValue={-75}></SwipeListView>
            )}
          </View>
        </>
      )}
    </>
  );
}
