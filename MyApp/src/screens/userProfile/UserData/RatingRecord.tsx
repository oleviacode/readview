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
          <Text style={styles.titleText}>User Rating record</Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <VictoryChart
              height={400}
              width={400}
              domainPadding={{x: 50, y: [0, 20]}}>
              <VictoryBar
                dataComponent={<Bar />}
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
