import React from 'react';
import {Text, View} from 'react-native';
import {Bar, VictoryBar, VictoryChart} from 'victory-native';
import {useAppSelector} from '../../../../redux/store';
import {styles} from '../../../shared/stylesheet';

export default function RatingRecord() {
  //takeout data
  const ratingDatas = useAppSelector(state => state.userData.rating);

  let isShown;
  if (ratingDatas.length == 0) {
    isShown = false;
  } else {
    isShown = true;
  }

  return (
    <>
      {isShown ? (
        <View style={styles.userData}>
          <Text style={{
            fontSize: 20,
            fontWeight:'700',
            marginTop :15
          }}>Rating record</Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <VictoryChart
              height={400}
              width={400}
              animate={{
                duration: 2000,
                onLoad: {duration: 100},
              }}
              domainPadding={{x: [10, 20], y: [10, 20]}}>
              <VictoryBar
                padding={{ top: 20, bottom: 60 }}
                style={{data: {fill: '#c43a31'}}}
                dataComponent={<Bar/>}
                data={ratingDatas.map(data => ({
                  x: data.rating,
                  y: data.count,
                }))}
              />
            </VictoryChart>
          </View>
        </View>
      ) : (
        <View></View>
      )}
    </>
  );
}
