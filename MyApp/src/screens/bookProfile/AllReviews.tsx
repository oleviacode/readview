import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {styles} from '../../shared/stylesheet';
import {HStack} from '@react-native-material/core';
import ReviewCard from './ReviewCard';

export default function AllReviews({route}: any) {
  const {bookId} = route.params;

  return (
    <ScrollView>
      <View style={[styles.regularBox, {backgroundColor: 'white'}]}>
        <Text style={styles.titleText}>{bookId}</Text>

        <View style={{marginTop: 30}}>
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </View>
      </View>
    </ScrollView>
  );
}
