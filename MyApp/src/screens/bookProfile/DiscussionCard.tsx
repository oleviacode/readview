import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {HStack, Divider} from '@react-native-material/core';
import {styles} from '../../shared/stylesheet';
import {DiscussionInfo, DiscussionInfoProps} from '../../model';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowUp} from '@fortawesome/free-solid-svg-icons/faArrowUp';
import {faArrowDown} from '@fortawesome/free-solid-svg-icons/faArrowDown';

export default function DiscussionCard(props: DiscussionInfoProps) {
  const card: DiscussionInfo = props['discussionInfo'];
  const navigation = useNavigation();
  console.log(card);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('DiscussionProfileScreen', {
          topicId: card['discussionid'],
        })
      }>
      <View style={[styles.regularBox, {backgroundColor: 'white'}]}>
        <HStack style={{marginTop: 20}}>
          <View style={styles.smallProfilePic} />
          <View style={{marginLeft: 20, flex: 1, justifyContent: 'center'}}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>
              {card['username']}
            </Text>

            <Text style={[styles.smallText, {color: 'grey', marginLeft: 5}]}>
              {card['updated_at'].slice(0, 10)}
            </Text>
          </View>
        </HStack>

        <Text style={[styles.titleText, {marginTop: 15, marginBottom: 20}]}>
          {card['substring']}
        </Text>
        <HStack style={{alignSelf: 'flex-end', alignItems: 'center'}}>
          <FontAwesomeIcon icon={faArrowUp} size={10} color="red" />
          <Text style={[styles.smallText, {marginRight: 200}]}>
            {card['likes']}
          </Text>
          <FontAwesomeIcon icon={faArrowDown} size={10} color="blue" />
          <Text style={[styles.smallText]}>{card['unlikes']}</Text>
        </HStack>

        <Divider />
      </View>
    </TouchableOpacity>
  );
}
