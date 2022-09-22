import AsyncStorage from '@react-native-community/async-storage';
import {Divider, HStack} from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
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
import {
  BookListInfo,
  initialBookListInfo,
} from '../../../model';
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
  const navigation = useNavigation()

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
      {/* shown when have booklist list */}
      {!isLoading && !nolist ? (
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
          <Divider />
          {status == 'ownerBooklist' && (
            <Button color={'navy'} style={{marginTop: 7}} onPress={() => {
              
            }}>
              + Create New Booklist
            </Button>
          )}
          <SwipeListView
            refreshing={refreshing}
            onRefresh={onRefresh}
            useFlatList={true}
            data={booklist}
            disableRightSwipe={true}
            swipeToClosePercent={70}
            renderItem={(data, rowMap) => (
              <BooklistRecCard key={data.item.id} booklist={data.item} />
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
        </>
      ) : (
        <View></View>
      )}

      {/* shown when loading at the first time*/}
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

      {/* nothing in the list */}
      {!isLoading && nolist ? (
        <>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
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
