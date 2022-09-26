import React from 'react';
import {View, Text} from 'react-native';
import {HStack, Divider} from '@react-native-material/core';
import {styles} from '../../shared/stylesheet';
import {ResponseInfo, ResponseInfoProps} from '../../model';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowUp} from '@fortawesome/free-solid-svg-icons/faArrowUp';
import {faArrowDown} from '@fortawesome/free-solid-svg-icons/faArrowDown';

export default function ResponseCard(props: ResponseInfoProps) {
  const card: ResponseInfo = props['responseInfo'];
  const navigation = useNavigation();

  return (
    <View>
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

      <Text style={[styles.normalText, {marginTop: 15, marginBottom: 20}]}>
        {card['content']}
      </Text>

      <Divider />
    </View>
  );
}
