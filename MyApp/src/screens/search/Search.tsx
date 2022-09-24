import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Platform,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {Button} from '@rneui/themed';
import {HStack} from '@react-native-material/core';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {saveLastSearch} from '../../../redux/search/action';
import {BookInfo, initialBookInfo} from '../../model';
import BookRecCard from '../bookProfile/bookRecCard';
import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';
import {styles} from '../../shared/stylesheet';
import Loading from '../../shared/Loading';

export default function Search() {
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
  const [status, setStatus] = useState('book');

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
      setPageNo(pageNo + 1)
    }
    
  }


  // -------------------------------------------------------------------------------------------------------------------
  // useEffect
  // -------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    async function fetchBook() {
      if (search === '' || search.length < 2) {
        setNobooks(true);
        setError('Please input at least 3 characters!');
      } else {
        setPageNo(0)
        setNobooks(false);
        setLoading(true);
        setError('searching...');
        const token = await AsyncStorage.getItem('token');
        const res = await fetch(
          `${Config.REACT_APP_BACKEND_URL}/search/title?search=${search}&page=0`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const result = await res.json();
        dispatch(saveLastSearch(search));
        if (result.length == 0 || result[0].message) {
          setError('no results :(');
          setNobooks(true);
          setLoading(false);
          setToEnd(true)
        } else if (result.length < 10){
          setNobooks(false);
          setBook(result);
          setError('search results');
          setLoading(false);
          setToEnd(true)
        } else{
          setNobooks(false);
          setBook(result);
          setError('search results');
          setLoading(false);
          setPageNo(pageNo + 1)
        }
      }
    }
    fetchBook();
  }, [search]);

  // -------------------------------------------------------------------------------------------------------------------
  // return
  // -------------------------------------------------------------------------------------------------------------------
  return (
    <View style={[styles.container, {marginTop: 10}]}>
      <View>
        <HStack spacing={6} style={{justifyContent: 'center'}}>
          <Button
            onPress={() => {
              setStatus('all');
            }}>
            All
          </Button>
          <Button
            onPress={() => {
              setStatus('book');
            }}>
            Book
          </Button>
          <Button
            color="pink"
            onPress={() => {
              setStatus('author');
            }}>
            Author
          </Button>
          <Button
            color="pink"
            onPress={() => {
              setStatus('booklist');
            }}>
            Booklist
          </Button>
        </HStack>
      </View>

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
            }}>
            {pageNo}
          </Text>
        </View>
        {isLoading === false && !nobooks && (
          <FlatList
            contentContainerStyle={{paddingBottom: '50%'}}
            data={books}
            renderItem={({item}) => (
              <BookRecCard bookInfo={item} key={item.id} />
            )}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              !end && fetchMore();
            }}
            ListFooterComponent={end? <View></View>:<Loading />}
          />
        )}
        {isLoading == true && <Loading />}
      </View>
    </View>
  );
}
