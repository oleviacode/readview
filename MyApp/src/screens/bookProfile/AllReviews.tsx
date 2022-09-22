import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {styles} from '../../shared/stylesheet';
import {HStack} from '@react-native-material/core';
import ReviewCard from './ReviewCard';
import {initialReviewInfo, NaviProps, ReviewCardProps} from '../../model';
import {getMethod} from '../../shared/fetchMethods';
import Config from 'react-native-config';

export default function AllReviews({route, navigation}: any) {
  console.log('route is ', route);

  let {bookId} = route.params;
  bookId = bookId[0];

  const [allReviews, SetAllReviews] = useState([initialReviewInfo]);

  useEffect(() => {
    async function main() {
      const _getMethod = await getMethod();
      const res = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/reviews/allreview/${bookId}`,
        _getMethod,
      );
      const resAllReviews = await res.json();
      SetAllReviews(resAllReviews);
    }

    main();
  }, []);

  return (
    <ScrollView>
      <View style={[styles.container]}>
        {allReviews.map((review) => {
          return (
            <View
              style={[
                styles.regularBox,
                {backgroundColor: 'white', borderBottomWidth: 0},
              ]}>
              <ReviewCard key={review.id} reviewInfo={review} />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
