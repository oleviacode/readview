import React from 'react';
import {Text, View} from 'react-native';
import {Bar, VictoryBar, VictoryChart, VictoryTheme} from 'victory-native';
import {useAppSelector} from '../../../../redux/store';
import {styles} from '../../../shared/stylesheet';

export default function AuthorRecord() {
  //takeout data
  const authorDatas = useAppSelector(state => state.userData.author);
  let isShown;
  if(authorDatas.length == 0){
    isShown = false
  } else {
    isShown = true
  }


  return (
    <>
    { isShown ? (<View style={styles.userData}>
      <VictoryChart theme={VictoryTheme.material} domainPadding={{x: 10}}>
        <VictoryBar
          horizontal
          style={{
            data: {fill: '#c43a31'},
          }}
          data={authorDatas.map(data => ({
            x: data.author_name,
            y: data.count,
          }))}
        />
      </VictoryChart>
    </View>) : (<View></View>)}
    </>
  );
}
