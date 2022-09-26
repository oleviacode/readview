import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DiscussionInfo, initialDiscussInfo, NaviProps} from '../../model';
import {styles} from '../../shared/stylesheet';
import {HStack} from '@react-native-material/core';
import DiscussionCard from '../bookProfile/DiscussionCard';
import {FAB} from '@rneui/themed';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import {getMethod} from '../../shared/fetchMethods';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from '../../shared/Loading';

export default function Discussion({navigation}: NaviProps) {
  const [discuss, setDiscuss] = useState<Array<DiscussionInfo>>([
    initialDiscussInfo,
  ]);
  const [pageNo, setPageNo] = useState(0);
  const [end, setToEnd] = useState(false);
  // -------------------------------------------------------------------------------------------------------------------
  // functions
  // -------------------------------------------------------------------------------------------------------------------

  async function fetchMore() {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(
      `${Config.REACT_APP_BACKEND_URL}/discussion/allDiscussion&page=${pageNo}`,
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
      setPageNo(pageNo + 1);
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // useEffect
  // -------------------------------------------------------------------------------------------------------------------
  
  useEffect(() => {
    async function main() {
      setPageNo(0)
      const _getMethod = await getMethod();

      const res = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/discussion/allDiscussion&page=0`,
        _getMethod,
      );
      const result = await res.json();

      setDiscuss(result);
      setPageNo(pageNo + 1)
    }
    main();
  }, []);

  return (
    <View style={[styles.container, {marginTop: 10}]}>
      <FlatList
          contentContainerStyle={{paddingBottom: '50%'}}
          data={discuss}
          renderItem={item => <DiscussionCard discussionInfo={item.item} key={item.item.discussionid}/>}
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
    </View>
  );
}
