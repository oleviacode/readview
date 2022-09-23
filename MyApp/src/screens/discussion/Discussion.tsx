import React from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DiscussionInfo, NaviProps} from '../../model';
import {styles} from '../../shared/stylesheet';
import {HStack} from '@react-native-material/core';
import DiscussionCard from '../bookProfile/DiscussionCard';
import {FAB} from '@rneui/themed';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons/faPlusCircle';

const discussionInfo: DiscussionInfo = {
  authorName: 'VoldemortLover123',
  publishDate: '24-05-1990',
  topic: 'guyz Who the hell killed Dumbledore?',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed urna sed massa molestie condimentum. Nam convallis felis non lacus posuere, id lacinia lacus volutpat. Fusce vel dignissim orci, non ullamcorper leo.',
};

export default function Discussion({navigation}: NaviProps) {
  return (
    <View style={[styles.container, {marginTop: 10}]}>
      <ScrollView>
        <DiscussionCard />
        <DiscussionCard />
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
