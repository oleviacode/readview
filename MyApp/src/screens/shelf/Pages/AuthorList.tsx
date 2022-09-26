import React, {useCallback, useEffect, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthorInfo, initialAuthorInfo} from '../../../model';
import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';

import Loading from '../../../shared/Loading';
import AuthorRecCard from '../Components/AuthorRecCard';
import {SwipeListView} from 'react-native-swipe-list-view';

export default function AuthorList() {
  // -------------------------------------------------------------------------------------------------------------------
  // settings
  // -------------------------------------------------------------------------------------------------------------------

  const [authors, setAuthor] = useState<AuthorInfo[]>([initialAuthorInfo]);
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [noAuthors, setNoAuthors] = useState(false);

  // -------------------------------------------------------------------------------------------------------------------
  // refrshing
  // -------------------------------------------------------------------------------------------------------------------

  async function refresh() {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(`${Config.REACT_APP_BACKEND_URL}/author/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    if (result.length == 0 || result[0].message) {
      //no lists
      setNoAuthors(true);
    } else {
      // have lists
      setNoAuthors(false);
      setAuthor(result);
    }
  }

  // callback on fresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refresh();
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  // delete an item
  async function deleteItems(authorId: number) {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(
      `${Config.REACT_APP_BACKEND_URL}/author/unfollowAuthor/${authorId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'PATCH',
      },
    );
    const result = await res.json();
    if (result[0].status == 200) {
      setAuthor(authors.filter(author => author.id !== authorId))
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
      const resAuthors = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/author/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const result = await resAuthors.json();
      if (result.length == 0 || result[0].message) {
        //nolist
        setNoAuthors(true);
        setLoading(false);
      } else {
        // have list
        setNoAuthors(false);
        setAuthor(result);
        setLoading(false);
      }
    }
    fetchBook();
  }, []);

  // -------------------------------------------------------------------------------------------------------------------
  // return
  // -------------------------------------------------------------------------------------------------------------------

  return (
    <>
      {/* LOADING */}
      {isLoading ? <Loading /> : <View></View>}

      {/* if no result */}
      {!isLoading && noAuthors && (
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
      )}

      {/* Yes authorlist */}
      {!isLoading && !noAuthors && (
        <>
          <SwipeListView
            contentContainerStyle={{paddingBottom: '30%'}}
            refreshing={refreshing}
            keyExtractor={item => String(item.id)}
            onRefresh={onRefresh}
            useFlatList={true}
            data={authors}
            disableRightSwipe={true}
            swipeToClosePercent={70}
            renderItem={data => (
              <AuthorRecCard key={data.item.id} authorlist={data.item} />
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
        </>
      )}
    </>
  );
}
