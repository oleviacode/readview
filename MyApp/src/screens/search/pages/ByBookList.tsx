import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import Config from "react-native-config";
import { saveLastSearch } from "../../../../redux/search/action";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { AuthorInfo, BookListInfo, initialAuthorInfo, initialBookListInfo } from "../../../model";
import Loading from "../../../shared/Loading";
import AuthorRecCard from "../../shelf/Components/AuthorRecCard";
import BooklistRecCard from "../../shelf/Components/BooklistRecCard";


export default function ByBookList() {
  // -------------------------------------------------------------------------------------------------------------------
  // settings
  // -------------------------------------------------------------------------------------------------------------------
  const dispatch = useAppDispatch();
  const search = useAppSelector(state => state.search.search);
  const [error, setError] = useState('search by title, author or ISBN!');
  const [bookList, setBookList] = useState<BookListInfo[]>([initialBookListInfo]);
  const [isLoading, setLoading] = useState(false);
  const [noBooklist, setNoBookList] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [end, setToEnd] = useState(false);

  // -------------------------------------------------------------------------------------------------------------------
  // functions
  // -------------------------------------------------------------------------------------------------------------------

  async function fetchMore() {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(
      `${Config.REACT_APP_BACKEND_URL}/search/booklist?search=${search}&page=${pageNo}`,
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
      setBookList([...bookList, ...result])
      setPageNo(pageNo + 1);
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // useEffect
  // -------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    async function fetchBook() {
      if (search === '' || search.length < 3) {
        setNoBookList(true);
        setError('Please input at least 3 characters!');
      } else {
        setPageNo(0);
        setNoBookList(false);
        setLoading(true);
        setError('searching...');
        const token = await AsyncStorage.getItem('token');
        const res = await fetch(
          `${Config.REACT_APP_BACKEND_URL}/search/booklist?search=${search}&page=0`,
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
          setNoBookList(true);
          setLoading(false);
          setToEnd(true);
        } else if (result.length < 10) {
          setNoBookList(false);
          setBookList(result)
          setError('search results');
          setLoading(false);
          setToEnd(true);
        } else {
          setNoBookList(false);
          setBookList(result)
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
            {error}
          </Text>
        </View>
        {!isLoading && !noBooklist && (
          <FlatList
            contentContainerStyle={{paddingBottom: '50%'}}
            data={bookList}
            renderItem={({item}) => (
              <BooklistRecCard booklist={item} key={item.id} />
            )}
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