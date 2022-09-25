import AsyncStorage from '@react-native-community/async-storage';
import {Divider, HStack} from '@react-native-material/core';
import {useNavigation} from '@react-navigation/native';
import {Button} from '@rneui/themed';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Config from 'react-native-config';
import {SwipeListView} from 'react-native-swipe-list-view';
import {BookListInfo, initialBookListInfo} from '../../../model';
import Loading from '../../../shared/Loading';
import BooklistRecCard from '../Components/BooklistRecCard';

export default function BooklistList() {
  // -------------------------------------------------------------------------------------------------------------------
  // settings
  // -------------------------------------------------------------------------------------------------------------------

  const [status, setStatus] = useState('ownerBooklist');
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [booklist, setBookList] = useState<BookListInfo[]>([
    initialBookListInfo,
  ]);
  const [nolist, setNolist] = useState(false);
  const navigation = useNavigation();

  // -------------------------------------------------------------------------------------------------------------------
  // refrshing
  // -------------------------------------------------------------------------------------------------------------------

  async function refresh() {
    const token = await AsyncStorage.getItem('token');
    let result;
    if (status == 'ownerBooklist') {
      const res = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/booklist/ownerBooklist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      result = await res.json();
    } else {
      const res = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/booklist/ownerFollowedBooklist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      result = await res.json();
    }

    if (result.length == 0) {
      //nobooks
      setNolist(true);
    } else {
      // have books
      setNolist(false);
      setBookList(result);
    }
  }

  // callback on fresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refresh();
    setTimeout(() => setRefreshing(false), 2000);
  }, [status]);

  // delete an item
  async function deleteItems(id: number) {
    const token = await AsyncStorage.getItem('token');
    let result;
    if (status == 'ownerBooklist') {
      const res = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/booklist/removeBookList/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: 'PATCH',
        },
      );
     result = await res.json();
    } else {
      const res = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/booklist/followOrUnfollowBooklist/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: 'POST',
        },
      );
     result = await res.json();
    }

    if (result[0].status == 200) {
      setBookList(booklist.filter(item => item.id != id))
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
      //fetch booklists

      let result;
      if (status == 'ownerBooklist') {
        const res = await fetch(
          `${Config.REACT_APP_BACKEND_URL}/booklist/ownerBooklist`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        result = await res.json();
      } else {
        const res = await fetch(
          `${Config.REACT_APP_BACKEND_URL}/booklist/ownerFollowedBooklist`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        result = await res.json();
      }

      if (result.length == 0) {
        //nobooks
        setNolist(true);
        setLoading(false);
      } else {
        // have books
        setNolist(false);
        setBookList(result);
        setLoading(false);
      }
    }
    fetchBook();
  }, [status]);

  return (
    <>
    <HStack style={{justifyContent: 'center'}} spacing={6}>
            <Button
              color={'navy'}
              onPress={() => {
                setStatus('ownerBooklist');
              }}>
              My Booklist
            </Button>
            <Button
              color={'navy'}
              onPress={() => {
                setStatus('ownerFollowedBooklist');
              }}>
              Followed Booklist
            </Button>
          </HStack>
      {/* shown when userid = booklist_create_id */}
      {status == 'ownerBooklist' && (
            <Button
              color={'navy'}
              style={{marginTop: 7}}
              onPress={() => {
                navigation.navigate('CreateBookList');
              }}>
              + Create New Booklist
            </Button>
          )}
      {!isLoading && !nolist && (
        <>
          
          <Divider />
          
          <SwipeListView
            contentContainerStyle={{paddingBottom: '50%'}}
            refreshing={refreshing}
            keyExtractor={(item, index) => String(item.id)}
            onRefresh={onRefresh}
            useFlatList={true}
            data={booklist}
            disableRightSwipe={true}
            swipeToClosePercent={70}
            renderItem={(data, rowMap) => (
              <BooklistRecCard key={data.item.id} booklist={data.item} />
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
            rightOpenValue={-75}
            ></SwipeListView>
        </>
      )}

      {/* shown when loading at the first time*/}
      {isLoading ? <Loading /> : <View></View>}

      {/* nothing in the list */}
      {!isLoading && nolist ? (
        <>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{paddingBottom:'70%'}}
            >
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
        </>
      ) : (
        <View></View>
      )}
    </>
  );
}
