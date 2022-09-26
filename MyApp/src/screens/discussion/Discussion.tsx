import React, {useEffect, useState} from 'react';
import {
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

export default function Discussion({navigation}: NaviProps) {
  const [discuss, setDiscuss] = useState<Array<DiscussionInfo>>([
    initialDiscussInfo,
  ]);

  useEffect(() => {
    console.log(Config.REACT_APP_BACKEND_URL);
    async function main() {
      const _getMethod = await getMethod();

      const res = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/discussion/allDiscussion`,
        _getMethod,
      );
      const result = await res.json();

      setDiscuss(result);
    }
    main();
  }, []);

  return (
    <View style={[styles.container, {marginTop: 10}]}>
      <ScrollView>
        {discuss &&
          discuss.map(card => (
            <DiscussionCard discussionInfo={card} key={card['discussionid']} />
          ))}
      </ScrollView>
      <TouchableOpacity
        style={{position: 'absolute', bottom: 30, right: 30}}
        onPress={() => navigation.navigate('AddTopic')}>
        <FontAwesomeIcon size={60} icon={faPlusCircle} color="#CCBD95" />
      </TouchableOpacity>
    </View>
    /* <TouchableOpacity
    onPress={() => {
      navigation.navigate('AddTopic', {bookId: bookId});
    }}>
    <HStack
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 20,
      }}>
      <Text style={[styles.titleText, {color: '#5699ee'}]}>
        Add a topic{' '}
      </Text>
      <FontAwesomeIcon
        size={20}
        icon={faPlusCircle}
        color="#5699ee"
      />
    </HStack>
  </TouchableOpacity> */
  );
}
