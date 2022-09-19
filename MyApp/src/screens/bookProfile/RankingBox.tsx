import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {styles} from '../../shared/stylesheet';
import {HStack, Divider} from '@react-native-material/core';
import {AirbnbRating, LinearProgress} from '@rneui/themed';
import {RatingCardProps} from '../../model';
import conversion from '../../shared/conversion';

function calculate(
  totalRatingsNum: number,
  numOfCertainRating: number,
): number {
  const res = numOfCertainRating / totalRatingsNum;
  const num = Math.round(res * 10) / 10;
  return num;
}

export default function Ranking(props: RatingCardProps) {
  const book = props.ratingInfo;

  return (
    <View
      style={[styles.regularBox, {backgroundColor: '#3766A6', marginTop: 25}]}>
      <HStack
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
          Ratings
        </Text>
        <Text style={[styles.smallText, {color: 'white'}]}>
          {book['numOfRatings']} ratings
        </Text>
      </HStack>

      <HStack style={{marginTop: 30}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 30, fontWeight: 'bold', color: '#eac645'}}>
            {conversion(book['rating'])}
          </Text>
          <AirbnbRating
            size={10}
            showRating={false}
            defaultRating={Math.round((book['rating'] / 10) * 5)}
          />
        </View>

        <View
          style={{
            flex: 1,

            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <AirbnbRating
            size={6}
            showRating={false}
            defaultRating={5}
            count={5}
          />
          <AirbnbRating
            size={6}
            showRating={false}
            defaultRating={4}
            count={4}
          />
          <AirbnbRating
            size={6}
            showRating={false}
            defaultRating={3}
            count={3}
          />
          <AirbnbRating
            size={6}
            showRating={false}
            defaultRating={2}
            count={2}
          />
          <AirbnbRating
            size={6}
            showRating={false}
            defaultRating={1}
            count={1}
          />
        </View>

        <View
          style={{
            marginLeft: 10,
            height: 52,

            justifyContent: 'space-between',
            marginTop: 5,
          }}>
          <LinearProgress
            style={{width: 130}}
            value={calculate(book['numOfRatings'], book['fiveStarsNum'])}
            variant="determinate"
            animation={{duration: 1000}}
          />
          <LinearProgress
            style={{width: 130}}
            value={calculate(book['numOfRatings'], book['fourStarsNum'])}
            variant="determinate"
            animation={{duration: 1000}}
          />
          <LinearProgress
            style={{width: 130}}
            value={calculate(book['numOfRatings'], book['threeStarsNum'])}
            variant="determinate"
            animation={{duration: 1000}}
          />
          <LinearProgress
            style={{width: 130}}
            value={calculate(book['numOfRatings'], book['twoStarsNum'])}
            variant="determinate"
            animation={{duration: 1000}}
          />
          <LinearProgress
            style={{width: 130}}
            value={calculate(book['numOfRatings'], book['oneStarNum'])}
            variant="determinate"
            animation={{duration: 1000}}
          />
        </View>
      </HStack>
      <Divider style={{backgroundColor: '#ccbd95', marginTop: 30}} />
      <View style={{marginTop: 10}}>
        <HStack spacing={50}>
          <Text style={[styles.smallText, {color: 'white'}]}>
            {book['readNum']} has read this
          </Text>
          <Text style={[styles.smallText, {color: 'white'}]}>
            {book['readingNum']} are reading this
          </Text>
        </HStack>

        <Text style={[styles.smallText, {color: 'white', marginTop: 10}]}>
          {book['savedNum']} has saved this
        </Text>
      </View>
    </View>
  );
}
