import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../../shared/stylesheet';
import {HStack} from '@react-native-material/core';

export default function Ranking() {
  return (
    <View style={[styles.regularBox, {backgroundColor: '#3766A6'}]}>
      <HStack
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
          Ranking
        </Text>
        <Text>ratings</Text>
      </HStack>
    </View>
  );
}
