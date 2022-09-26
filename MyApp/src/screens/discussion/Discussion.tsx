import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DiscussionInfo, initialDiscussInfo, NaviProps} from '../../model';
import {styles} from '../../shared/stylesheet';
import DiscussionCard from '../bookProfile/DiscussionCard';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import {getMethod} from '../../shared/fetchMethods';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from '../../shared/Loading';

export default function Discussion({navigation}: NaviProps) {
  const [discuss, setDiscuss] = useState<DiscussionInfo[]>([
    initialDiscussInfo,
  ]);
  const [page, setPage] = useState(0);
  const [end, setToEnd] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true)

  // -------------------------------------------------------------------------------------------------------------------
  // refrshing
  // -------------------------------------------------------------------------------------------------------------------

  async function refresh() {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(
      `${Config.REACT_APP_BACKEND_URL}/discussion/allDiscussion?page=0`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const result = await res.json();
      await  setDiscuss(result);
      setPage(page + 1);
    
  }

  // callback on fresh
  const onRefresh = useCallback(() => {
    setPage(0)
    setRefreshing(true);
    refresh();
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  // -------------------------------------------------------------------------------------------------------------------
  // functions
  // -------------------------------------------------------------------------------------------------------------------

  async function fetchMore() {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(
      `${Config.REACT_APP_BACKEND_URL}/discussion/allDiscussion?page=${page}`,
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
      setDiscuss([...discuss, ...result]);
      setPage(page + 1);
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // useEffect
  // -------------------------------------------------------------------------------------------------------------------
  
  useEffect(() => {
    async function main() {
      setLoading(true)
      setPage(0)
      const _getMethod = await getMethod();

      const res = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/discussion/allDiscussion?page=0`,
        _getMethod,
      );
      const result = await res.json();
      await setDiscuss(result);
      setPage(page + 1)
      setLoading(false)
    }
    main();
  }, []);

  return (
    <>
    {isLoading ? <Loading /> : 
    (<View style={[styles.container, {marginTop: 10}]}>
      <FlatList
          contentContainerStyle={{paddingBottom: '50%'}}
          refreshing={refreshing}
          onRefresh={onRefresh}
          data={discuss}
          renderItem={({item})=> <DiscussionCard discussionInfo={item} key={item.discussionid}/>}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            !end && fetchMore();
          }}
          ListFooterComponent={end ? <View></View> : <Loading />}
        />
      <TouchableOpacity
        style={{position: 'absolute', bottom: 30, right: 30}}
        onPress={() => navigation.navigate('AddTopic')}>
        <FontAwesomeIcon size={60} icon={faPlusCircle} color="#CCBD95" />
      </TouchableOpacity>
    </View>)}
    </>
  );
}
