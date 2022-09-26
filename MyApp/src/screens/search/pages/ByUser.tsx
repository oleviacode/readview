import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import Config from "react-native-config";
import { saveLastSearch } from "../../../../redux/search/action";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { initialUserInfo, UserInfo } from "../../../model";
import Loading from "../../../shared/Loading";
import UserRecCard from "../../userProfile/OtherUserPage/UserComponent/UserRecCard";


export default function ByUser() {
  // -------------------------------------------------------------------------------------------------------------------
  // settings
  // -------------------------------------------------------------------------------------------------------------------
  const dispatch = useAppDispatch();
  const search = useAppSelector(state => state.search.search);
  const userId = useAppSelector(state => state.user.id)
  const [error, setError] = useState('search by title, author or ISBN!');
  const [user, setUser] = useState<UserInfo[]>([initialUserInfo]);
  const [isLoading, setLoading] = useState(false);
  const [noUser, setNoUser] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [end, setToEnd] = useState(false);

  // -------------------------------------------------------------------------------------------------------------------
  // functions
  // -------------------------------------------------------------------------------------------------------------------

  async function fetchMore() {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(
      `${Config.REACT_APP_BACKEND_URL}/search/user?search=${search}&page=${pageNo}`,
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
      setUser([...user, ...result])
      setPageNo(pageNo + 1);
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // useEffect
  // -------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    async function fetchBook() {
      if (search === '' || search.length < 3) {
        setNoUser(true);
        setError('Please input at least 3 characters!');
      } else {
        setPageNo(0);
        setNoUser(false);
        setLoading(true);
        setError('searching...');
        const token = await AsyncStorage.getItem('token');
        const res = await fetch(
          `${Config.REACT_APP_BACKEND_URL}/search/user?search=${search}&page=0`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const result = await res.json();
        dispatch(saveLastSearch(search));
        const users = result.filter((item : UserInfo) => item.id != userId)
        if (users.length == 0 || result[0].message) {
          setError('no results :(');
          setNoUser(true);
          setLoading(false);
          setToEnd(true);
        } else if (result.length < 10) {
          setNoUser(false);
          setUser(users)
          setError('search results');
          setLoading(false);
          setToEnd(true);
        } else {
          setNoUser(false);
          setUser(users)
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
        {!isLoading && !noUser && (
          <FlatList
            contentContainerStyle={{paddingBottom: '50%'}}
            data={user}
            renderItem={({item}) => (
              <UserRecCard userInfo={item} key={item.id} />
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
