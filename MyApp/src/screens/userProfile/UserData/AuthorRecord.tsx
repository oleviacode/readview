
import React from 'react';
import {Text, View} from 'react-native';
import {
  Bar,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryTheme,
} from 'victory-native';
import {useAppSelector} from '../../../../redux/store';
import {styles} from '../../../shared/stylesheet';

export default function AuthorRecord() {
  //takeout data
  const authorDatas = useAppSelector(state => state.userData.author);
  let isShown;
  if (authorDatas.length == 0) {
    isShown = false;
  } else {
    isShown = true;
  }

  return (
    <>
      {isShown ? (
        <View style={styles.userData}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              marginTop: 15,
            }}>
            Authors You have read!
          </Text>
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={{x: 10, y: 110}}>
            <VictoryBar
              animate={{
                duration: 2000,
                onLoad: {duration: 1000},
              }}
              horizontal
              style={{
                data: {fill: 'navy'},
              }}
              data={authorDatas.map(data => ({
                x: data.author_name,
                y: data.count,
              }))}
              labels={({ datum }) => `${datum.x}`}
            />
            <VictoryAxis dependentAxis />
          </VictoryChart>
        </View>
      ) : (
        <View></View>
      )}
    </>
  );
}
