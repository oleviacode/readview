import React from 'react';
import {View, Text} from 'react-native';
import {HStack, Divider} from '@react-native-material/core';
import {styles} from '../../shared/stylesheet';

export default function DiscussionCard() {
  return (
    <View>
      <HStack style={{marginTop: 20}}>
        <View style={styles.smallProfilePic} />
        <View style={{marginLeft: 20, flex: 1, justifyContent: 'center'}}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>Username</Text>

          <Text style={[styles.smallText, {color: 'grey', marginLeft: 5}]}>
            24-05-1990
          </Text>
        </View>
      </HStack>

      <Text style={[styles.titleText, {marginTop: 15, marginBottom: 20}]}>
        What is a beadle and bard? asd asdasdas
      </Text>
      <Divider />
    </View>
  );
}
