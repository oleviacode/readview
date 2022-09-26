import React from 'react';
import {Text, View} from 'react-native';
import {VictoryPie} from 'victory-native';
import {useAppSelector} from '../../../../redux/store';
import {styles} from '../../../shared/stylesheet';

export default function GenreRecord() {
  //takeout data
  const genreDatas = useAppSelector(state => state.userData.genre);
  let isShown;
  if (genreDatas.length == 0) {
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
          }}>Genres you have read</Text>
          <VictoryPie
          style={{
          }}
          animate={{
             duration: 2000
          }}
          colorScale={["#F8F7F7", "#C7BE9D", "#7780A4", "#7196E1",
          "#4A649D"]}
            height={300}
            width={500}
            data={genreDatas.map(data => ({x: data.genre_name, y: data.count}))}
          />
        </View>
      ) : (
        <View></View>
      )}
    </>
  );
}
