import React, {useCallback, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useAppSelector} from '../../../redux/store';
import {BookInfo, initialBookInfo, initialRankingBoxInfo, NaviProps} from '../../model';
import {HStack, Divider} from '@react-native-material/core';
import DisplayBook, {PreviewBookContents} from '../bookProfile/DisplayBook';
import Config from 'react-native-config';
import {getMethod} from '../../shared/fetchMethods';
import {useState} from 'react';
import {styles} from '../../shared/stylesheet';
import {initialBookPreviewContents} from '../../model';
import BookRecCard from '../bookProfile/bookRecCard';
import Loading from '../../shared/Loading';
import RankingBox from './RankingBox';

// CONSTs
const rankingTopics = ['Most Discussed', 'Most read ', 'Most loved'];

export default function MainScreen({navigation}: NaviProps) {
  // CONSTs
  const user = useAppSelector(state => state.user.username);

  // USESTATE
  const [top3, setTop3] = useState<Array<PreviewBookContents>>([
    initialBookPreviewContents,
  ]);
  const [isLoadingLatest3, setLoadingLatest3] = useState(false);
  const [isLoadingRecommendation, setLoadingRecommendation] = useState(false);
  const [isLoadingTop3, setLoadingTop3] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [mostDiscussed, setMostDiscussed] = useState([initialRankingBoxInfo]);
  const [mostRead, setMostRead] = useState([initialRankingBoxInfo]);
  const [mostLoved, setMostLoved] = useState([initialRankingBoxInfo]);

  const [books, setbooks] = useState<BookInfo[]>([initialBookInfo]);

  // FUNCTIONS

  async function fresh() {
    //calling redux
    const _getMethod = await getMethod();
    const res = await fetch(
      `${Config.REACT_APP_BACKEND_URL}/user-interaction/recommendation`,
      _getMethod,
    );
    const result = await res.json();
    setbooks(result);
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fresh();
    setTimeout(() => setRefreshing(false), 5000);
  }, []);

  // USE EFFECT

  useEffect(() => {
    //main function
    async function main() {
      const _getMethod = await getMethod();

      // GET LATEST BOOKS & RECOMMANDATION
      try {
        setLoadingTop3(true);
        setLoadingLatest3(true);
        setLoadingRecommendation(true);
        const resLatestBooks = await fetch(
          `${Config.REACT_APP_BACKEND_URL}/book/latest`,
          _getMethod,
        );

        const latestBooks = await resLatestBooks.json();
        setTop3(latestBooks);
        setLoadingLatest3(false);

        const res = await fetch(
          `${Config.REACT_APP_BACKEND_URL}/user-interaction/recommendation`,
          _getMethod,
        );
        const result = await res.json();
        setbooks(result);
        setLoadingRecommendation(false);
      } catch (e) {
        console.log('no books found');
      }

      // GET RANKING INFO
      try {
        const topRated = [];
        const mostCommented = [];
        const mostReadd = [];
        const resRanking = await fetch(
          `${Config.REACT_APP_BACKEND_URL}/book/getTopBooks`,
          _getMethod,
        );

        const ranking = await resRanking.json();

        for (let book of ranking) {
          if (book['toprated']) {
            topRated.push(book);
            continue;
          }
          if (book['mostread']) {
            mostReadd.push(book);
            continue;
          }
          if (book['mostcomment']) {
            mostCommented.push(book);
          }
        }
        setMostRead(mostReadd);
        setMostDiscussed(mostCommented);
        setMostLoved(topRated);
        setLoadingTop3(false);
      } catch (e) {
        console.log('unable to load ranking info');
      }
    }
    main();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text style={[styles.titleText, {marginTop: 20}]}>Hi {user}!</Text>

        <View
          style={[
            styles.regularBox,
            {borderRadius: 0, padding: 0, marginBottom: 20},
          ]}>
          <Text style={styles.titleText}>Latest Books</Text>
          {isLoadingLatest3 ? (
            <View
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 15,
              }}>
              <ActivityIndicator size="large" color="#5699ee" />
            </View>
          ) : (
            <View>
              <HStack style={styles.bookStack}>
                {top3!.map(book => {
                  return <DisplayBook book={book} key={book['id']} />;
                })}
              </HStack>
            </View>
          )}
        </View>
        <Divider />

        {/* 
        ------------------------------------------------------------------------------------------------------------
        Ranking
        ------------------------------------------------------------------------------------------------------------ */}
        <View style={[styles.rankingSection, {marginBottom: 10}]}>
          <Text style={styles.titleText}>Ranking</Text>
          {isLoadingTop3 ? (
            <Loading />
          ) : (
            <ScrollView horizontal={true} showsVerticalScrollIndicator={false}>
              <HStack>
                <RankingBox boxTitle="Most Loved" importedInfo={mostLoved} />
                <RankingBox
                  boxTitle="Most discussed"
                  importedInfo={mostDiscussed}
                />
                <RankingBox boxTitle="Most read" importedInfo={mostRead} />
              </HStack>
            </ScrollView>
          )}
        </View>
        <Divider />

        <View
          style={{
            paddingTop: 15,
          }}>
          <HStack
            style={{
              justifyContent: 'space-between',
            }}>
            <Text style={styles.titleText}>Recommendation</Text>
          </HStack>
          {isLoadingRecommendation ? (
            <Loading />
          ) : (
            <View>
              {books == undefined ? (
                <View
                  style={{
                    backgroundColor: 'lightblue',
                    margin: 10,
                    borderRadius: 10,
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      textAlign: 'center',
                    }}>{`Click on the refresh and get some recommendations!`}</Text>
                </View>
              ) : (
                books.map(book => <BookRecCard bookInfo={book} key={book.id} />)
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
