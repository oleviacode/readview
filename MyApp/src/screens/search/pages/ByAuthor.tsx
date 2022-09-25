import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import Config from "react-native-config";
import { saveLastSearch } from "../../../../redux/search/action";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { AuthorInfo, initialAuthorInfo } from "../../../model";
import Loading from "../../../shared/Loading";
import AuthorRecCard from "../../shelf/Components/AuthorRecCard";


export default function ByAuthor() {
  // -------------------------------------------------------------------------------------------------------------------
  // settings
  // -------------------------------------------------------------------------------------------------------------------
  const dispatch = useAppDispatch();
  const search = useAppSelector(state => state.search.search);
  const [error, setError] = useState('search by title, author or ISBN!');
  const [author, setAuthor] = useState<AuthorInfo[]>([initialAuthorInfo]);
  const [isLoading, setLoading] = useState(false);
  const [noAuthor, setNoAuthor] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [end, setToEnd] = useState(false);

  // -------------------------------------------------------------------------------------------------------------------
  // functions
  // -------------------------------------------------------------------------------------------------------------------

  async function fetchMore() {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(
      `${Config.REACT_APP_BACKEND_URL}/search/author?search=${search}&page=${pageNo}`,
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

      setPageNo(pageNo + 1);
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // useEffect
  // -------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    async function fetchBook() {
      if (search === '' || search.length < 3) {
        setNoAuthor(true);
        setError('Please input at least 3 characters!');
      } else {
        setPageNo(0);
        setNoAuthor(false);
        setLoading(true);
        setError('searching...');
        const token = await AsyncStorage.getItem('token');
        const res = await fetch(
          `${Config.REACT_APP_BACKEND_URL}/search/author?search=${search}&page=0`,
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
          setNoAuthor(true);
          setLoading(false);
          setToEnd(true);
        } else if (result.length < 10) {
          setNoAuthor(false);
          setAuthor(result)
          setError('search results');
          setLoading(false);
          setToEnd(true);
        } else {
          setNoAuthor(false);
          setAuthor(result)
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
        {!isLoading && !noAuthor && (
          <FlatList
            contentContainerStyle={{paddingBottom: '50%'}}
            data={author}
            renderItem={({item}) => (
              <AuthorRecCard authorlist={item} key={item.id} />
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
