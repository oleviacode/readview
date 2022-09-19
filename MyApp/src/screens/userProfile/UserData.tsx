import React, {useEffect, useState} from 'react';
import {useAppSelector} from '../../../redux/store';
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

export default function UserData() {
  //usestate
  const [ratingDatas, setRatingDatas] = useState<
    Array<{rating: number; count: number}>
  >([{rating: 0, count: 0}]);
  const [genreDatas, setGenreDatas] = useState<
    Array<{genre_name: string; count: number}>
  >([{genre_name: '', count: 0}]);
  const [timelineDatas, setTimelineDatas] = useState<
    Array<{date_trunc: string; count: number}>
  >([{date_trunc: '', count: 0}]);
  const [authorDatas, setAuthorDatas] = useState<
    Array<{author_name: string; count: number}>
  >([{author_name: '', count: 0}]);
  const [fictionDatas, setFictionDatas] = useState<
    Array<{x: string; y: number}>
  >([{x: '', y: 0}]);
  const [nonfictionDatas, setNonFictionDatas] = useState<number>(0);
  const [error, setError] = useState('');

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

      const result = await res.json();
      setRatingDatas(result.rating);
      setGenreDatas(result.genre);
      setTimelineDatas(result.readingTimeline);
      setAuthorDatas(result.author);
      const dataA = {
        x: 'fiction & nonfiction',
        y: parseInt(result.fiction[0].fiction, 10),
      };
      const dataB = parseInt(result.fiction[0].nonfiction, 10);
      setFictionDatas([dataA]);
      setNonFictionDatas(dataB);
    }

    fetchdata();
  }, [
    ratingDatas,
    genreDatas,
    timelineDatas,
    authorDatas,
    fictionDatas,
    nonfictionDatas,
    user,
  ]);

  return (
    <>
      <ScrollView>
        {/* User Rating Record */}
        <View>
          <Text
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            User Rating record
          </Text>
          <VictoryChart
            height={400}
            width={400}
            domainPadding={{x: 50, y: [0, 20]}}>
            <VictoryBar
              dataComponent={<Bar />}
              data={ratingDatas.map(data => ({x: data.rating, y: data.count}))}
            />
          </VictoryChart>
        </View>
        {/* User genre record */}
        <View
          style={{
            paddingLeft: 0,
            alignItems: 'center',
          }}>
          <VictoryPie
            height={300}
            width={500}
            data={genreDatas.map(data => ({x: data.genre_name, y: data.count}))}
          />
        </View>
        {/* User time record */}
        <View>
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryLine
              style={{
                data: {stroke: '#c43a31'},
                parent: {border: '1px solid #ccc'},
              }}
              data={timelineDatas.map(data => ({
                x: data.date_trunc.slice(0, 4),
                y: data.count,
              }))}
            />
          </VictoryChart>
        </View>
        {/* user Author Record */}
        <View>
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
        </View>
      </ScrollView>
    </>
  );
}
