import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {
  Bar,
  VictoryBar,
  VictoryChart,
  VictoryLine,
  VictoryPie,
  VictoryTheme,
} from 'victory-native';
import {ScrollView, Text, View} from 'react-native';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';

export type ProfileRoute = {
  userId: number;
};

export default function UserProfile() {
  const [ratingDatas, setRatingDatas] = useState<Array<{rating: number, count:number}>>([{rating: 0, count: 0}]);
  const [genreDatas, setGenreDatas] = useState<Array<{genre_name: string, count:number}>>([{genre_name: '', count: 0}]);
  const [timelineDatas, setTimelineDatas] = useState<Array<{date_trunc: string, count:number}>>([{date_trunc: '', count: 0}]);
  const user = useAppSelector(state => state.user.username);

  useEffect(() => {
    async function fetchdata() {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/uservictorydata`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await res.json()
      setRatingDatas(result.rating)
      setGenreDatas(result.genre)

    }

    fetchdata()
  }, [setRatingDatas, user]);

  return (
    <>
      <ScrollView>
        <View>
          <Text style={{
            alignItems: 'center',

          }}>User Rating record</Text>
          <VictoryChart
            height={400}
            width={400}
            domainPadding={{x: 50, y: [0, 20]}}>
            <VictoryBar
              dataComponent={<Bar />}
              data={ratingDatas.map(data => ({x :data.rating, y: data.count}))}
            />
          </VictoryChart>
        </View>
        <View style={{
          paddingLeft: 0,
          alignItems:'center',
        }}>
          <VictoryPie
            height={300}
            width={500}
            data={genreDatas.map(data => ({x: data.genre_name, y: data.count}))}
          />
        </View>
        <View>
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryLine
              style={{
                data: {stroke: '#c43a31'},
                parent: {border: '1px solid #ccc'},
              }}
              data={[
                {x: 1, y: 2},
                {x: 2, y: 3},
                {x: 3, y: 5},
                {x: 4, y: 4},
                {x: 5, y: 7},
              ]}
            />
          </VictoryChart>
        </View>
        <View>
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryLine
              style={{
                data: {stroke: '#c43a31'},
                parent: {border: '1px solid #ccc'},
              }}
              data={[
                {x: 1, y: 2},
                {x: 2, y: 3},
                {x: 3, y: 5},
                {x: 4, y: 4},
                {x: 5, y: 7},
              ]}
            />
          </VictoryChart>
        </View>
      </ScrollView>
    </>
  );
}
function userAppSelector() {
  throw new Error('Function not implemented.');
}
