import AsyncStorage from '@react-native-community/async-storage';
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
  BookInfo,
  initialBookInfo,
} from '../../../model';
import BookRecCard from '../../bookProfile/bookRecCard';

type Props = {
  status: string;
};

export default function Readlist(props: Props) {
  
  // -------------------------------------------------------------------------------------------------------------------
  // settings
  // -------------------------------------------------------------------------------------------------------------------
  const [nobooks, setNobooks] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [books, setBook] = useState<BookInfo[]>([initialBookInfo]);
  const [isLoading, setLoading] = useState(true);

  // -------------------------------------------------------------------------------------------------------------------
  // refrshing
  // -------------------------------------------------------------------------------------------------------------------

  async function refresh() {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(
      `${Config.REACT_APP_BACKEND_URL}/user-interaction/${props.status}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const result = await res.json();
    if (result.length == 0) {
      //nobooks
      setNobooks(true);
    } else {
      // have books
      setNobooks(false);
      setBook(result);
    }
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
      `${Config.REACT_APP_BACKEND_URL}/book/saveBookStatus/${bookId}/unread`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "PATCH"
      },
    );
    const result = await res.json()
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
        //fetch readinglists
        const res = await fetch(
          `${Config.REACT_APP_BACKEND_URL}/user-interaction/${props.status}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const result = await res.json();
        if (result.length == 0) {
          //nobooks
          setNobooks(true);
          setLoading(false);
        } else {
          // have books
          setNobooks(false);
          setBook(result);
          setLoading(false);
        }
    }
    fetchBook();
  }, []);

  // -------------------------------------------------------------------------------------------------------------------
  // component
  // -------------------------------------------------------------------------------------------------------------------

  return (
    <View
      style={{
        paddingHorizontal: 9,
      }}>
      {/* shown when books in list*/}
      {!isLoading &&
      !nobooks ? (
        <SwipeListView
          refreshing={refreshing}
          keyExtractor={(item, index) => String(item.id)}
          onRefresh={onRefresh}
          useFlatList={true}
          data={books}
          disableRightSwipe={true}
          swipeToClosePercent={70}
          renderItem={(data, rowMap) => (
            
            <BookRecCard bookInfo={data.item} key={data.item.id} />
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
      {(!isLoading &&
        nobooks) ? (
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
    </View>
  );
}
