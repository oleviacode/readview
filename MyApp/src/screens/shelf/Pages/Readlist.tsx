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
import {BookInfo, initialBookInfo} from '../../../model';
import Loading from '../../../shared/Loading';
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
  const [page, setPage] = useState(0);
  const [end, setToEnd] = useState(false);

  // -------------------------------------------------------------------------------------------------------------------
  // refrshing
  // -------------------------------------------------------------------------------------------------------------------

  async function refresh() {
    await setPage(0)
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(
      `${Config.REACT_APP_BACKEND_URL}/user-interaction/${props.status}?page=0`,
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
    } else if (result.length < 20) {
      setNobooks(false);
      setBook(result);
      setToEnd(true);
    } else {
      // have books
      setNobooks(false);
      setBook(result);
      setPage(page + 1);
    }
  }

  // callback on fresh
  const onRefresh = useCallback(() => {
    setPage(0);
    setRefreshing(true);
    refresh();
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  // delete an item
  async function deleteItems(bookId: number) {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(
      `${Config.REACT_APP_BACKEND_URL}/book/saveBookStatus/${bookId}/null`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'PATCH',
      },
    );
    const result = await res.json();
    if (result[0].status == 200) {
      setBook(books.filter(item => item.id !== bookId))
    } else {
      console.log('something wrong happens');
    }
  }

  //fetch more books
  async function fetchMore() {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(
      `${Config.REACT_APP_BACKEND_URL}/user-interaction/${props.status}?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const result = await res.json();
    if (result.length == 0) {
      setToEnd(true);
    } else {
      setBook([...books, ...result]);
      setPage(page + 1);
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
        `${Config.REACT_APP_BACKEND_URL}/user-interaction/${props.status}?page=0`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const result = await res.json();
      if (result.length == 0 || result[0].message) {
        //nobooks
        setNobooks(true);
        setLoading(false);
      } else if (result.length > 10) {
        setNobooks(false);
        setBook(result);
        setLoading(false);
        setToEnd(true);
      } else {
        // have books
        setNobooks(false);
        setBook(result);
        setLoading(false);
        setPage(page + 1);
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
      {!isLoading && !nobooks && (
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
          ListFooterComponent={end ? <View></View> : <Loading />}
          onEndReachedThreshold={1}
          onEndReached={() => {
            !end && fetchMore();
          }}></SwipeListView>
      )}

      {/* shown when loading at the first time*/}
      {isLoading && <Loading />}

      {/* nothing in the list */}
      {!isLoading && nobooks ? (
        <>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{paddingBottom: '70%'}}>
            <View
              style={{
                backgroundColor: '#C7BE9D',
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
