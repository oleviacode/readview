import React from 'react';
import {Text, View} from 'react-native';
import {
  Bar,
  VictoryBar,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
} from 'victory-native';
import {useAppSelector} from '../../../../redux/store';
import {styles} from '../../../shared/stylesheet';

export default function TimelineRecord() {
  //takeout data
  const timelineDatas = useAppSelector(state => state.userData.reading);
  let isShown;
  if (timelineDatas.length == 0) {
    isShown = false;
  } else {
    isShown = true;
  }

  return (
    <>
      {isShown ? (
        <View style={styles.userData}>
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryLine
              style={{
                data: {stroke: '#c43a31'},
                parent: {border: '1px solid #ccc'},
              }}
              data={timelineDatas.map(data => (data.date_trunc == null || {
                x: data.date_trunc.slice(0, 4),
                y: data.count,
              }))}
            />
          </VictoryChart>
        </View>
      ) : (
        <View></View>
      )}
    </>
  );
}
