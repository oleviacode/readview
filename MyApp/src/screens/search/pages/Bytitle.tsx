import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import Config from 'react-native-config';
import {saveLastSearch} from '../../../../redux/search/action';
import {useAppDispatch, useAppSelector} from '../../../../redux/store';
import {BookInfo, initialBookInfo} from '../../../model';
import Loading from '../../../shared/Loading';
import {styles} from '../../../shared/stylesheet';
import BookRecCard from '../../bookProfile/bookRecCard';

export default function ByTitle() {
  // -------------------------------------------------------------------------------------------------------------------
  // settings
  // -------------------------------------------------------------------------------------------------------------------
  const dispatch = useAppDispatch();
  const search = useAppSelector(state => state.search.search);
  const [error, setError] = useState('search by title, author or ISBN!');
  const [books, setBook] = useState<BookInfo[]>([initialBookInfo]);
  const [isLoading, setLoading] = useState(false);
  const [nobooks, setNobooks] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [end, setToEnd] = useState(false);

  // -------------------------------------------------------------------------------------------------------------------
  // functions
  // -------------------------------------------------------------------------------------------------------------------

  async function fetchMore() {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(
      `${Config.REACT_APP_BACKEND_URL}/search/title?search=${search}&page=${pageNo}`,
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
      setPageNo(pageNo + 1);
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // useEffect
  // -------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    async function fetchBook() {
      let isString = isNaN(parseInt(search));
      if (search === '' || search.length < 3) {
        setNobooks(true);
        setError('Please input at least 3 characters!');
      } else {
        setPageNo(0);
        setNobooks(false);
        setLoading(true);
        setError('searching...');
        const token = await AsyncStorage.getItem('token');
        let result;
        console.log(!isString && search.length > 7)
        if (!isString && search.length > 7) {
          console.log('searching isbn')
          const res = await fetch(
            `${Config.REACT_APP_BACKEND_URL}/search/isbn?search=${search}&page=0`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
           result = await res.json();
        } else {
          const res = await fetch(
            `${Config.REACT_APP_BACKEND_URL}/search/title?search=${search}&page=0`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
           result = await res.json();
        }
        dispatch(saveLastSearch(search));
        if (result.length == 0 || result[0].message) {
          setError('no results :(');
          setNobooks(true);0
          setLoading(false);
          setToEnd(true);
        } else if (result.length < 10) {
          setNobooks(false);
          setBook(result);
          setError('search results');
          setLoading(false);
          setToEnd(true);
        } else {
          setNobooks(false);
          setBook(result);
          setError('search results');
          setLoading(false);
          setPageNo(pageNo + 1);
        }
      }
    }
    fetchBook();
  }, [search]);

  // -------------------------------------------------------------------------------------------------------------------
  // return
  // -------------------------------------------------------------------------------------------------------------------
  return (
    <View>
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
          }}>
          {error}
        </Text>
      </View>
      {!isLoading && !nobooks && (
        <FlatList
          contentContainerStyle={{paddingBottom: '50%'}}
          data={books}
          renderItem={({item}) => <BookRecCard bookInfo={item} key={item.id} />}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            !end && fetchMore();
          }}
          ListFooterComponent={end ? <View></View> : <Loading />}
        />
      )}
      {isLoading == true && <Loading />}
    </View>
  );
}
