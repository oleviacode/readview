import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {styles} from '../../shared/stylesheet';
import {HStack, ActivityIndicator} from '@react-native-material/core';
import {Button, Overlay} from '@rneui/themed';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBookmark} from '@fortawesome/free-solid-svg-icons/faBookmark';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import BookProfileCard from './BookProfileCard';
import Ranking from './RankingBox';
import ReviewCard from './ReviewCard';
import BookRecCard from './bookRecCard';
import DiscussionCard from './DiscussionCard';
import {
  DiscussionInfo,
  RatingInfo,
  initialBookInfo,
  BookInfo,
  initialRatingInfo,
  ReviewCardInfo,
} from '../../model';
import {initialReviewInfo} from '../../model';

import {getMethod, patchMethod} from '../../shared/fetchMethods';
import Config from 'react-native-config';
import {useAppSelector} from '../../../redux/store';

export default function BookProfile({route, navigation}: any) {
  const {bookId} = route.params;

  // USE STATES
  const [activeBook, setActiveBook] = useState<BookInfo>(initialBookInfo);
  const [quotes, setQuotes] = useState(['no quotes']);
  const [ratingInfo, setRatingInfo] = useState<RatingInfo>(initialRatingInfo);
  const [saveButton, setSaveButton] = useState('lightgrey');
  const [readButton, setReadButton] = useState('lightgrey');
  const [readingButton, setReadingButton] = useState('lightgrey');
  const [latestReviews, setLatestReviews] = useState<Array<ReviewCardInfo>>([
    initialReviewInfo,
  ]);
  const [Recommendations, setRecommendations] = useState<BookInfo[]>([
    {
      id: 0,
      title: '',
      author_name: '',
      publisher_name: '',
      publish_date: '',
      book_picture: '',
      genre: [''],
      info: '',
      rating: 0,
      readerstatus: undefined,
      isbn: '',
      pages: 0,
    },
  ]);
  const userId = useAppSelector(state => state.user.id);
  const [isLoading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

  // -------------------------------------------------------------------------------------------------------------------
  // functions on updating the user_reading status
  // -------------------------------------------------------------------------------------------------------------------

  //reading
  async function reading() {
    const patch = await patchMethod();

    const res = await fetch(
      `${Config.REACT_APP_BACKEND_URL}/book/saveBookStatus/${bookId[0]}/reading`,
      patch,
    );

    const test = await res.json();

    setReadingButton('#7380AA');
    setReadButton('lightgrey');
    setSaveButton('lightgrey');
  }

  //read
  async function read() {
    const patch = await patchMethod();

    const res = await fetch(
      `${Config.REACT_APP_BACKEND_URL}/book/saveBookStatus/${bookId[0]}/read`,
      patch,
    );

    const test = await res.json();

    setReadButton('#7380AA');
    setReadingButton('lightgrey');
    setSaveButton('lightgrey');
  }

  //save
  async function save() {
    const patch = await patchMethod();

    const res = await fetch(
      `${Config.REACT_APP_BACKEND_URL}/book/saveBookStatus/${bookId[0]}/save`,
      patch,
    );

    const test = await res.json();

    setSaveButton('#eac645');
    setReadingButton('lightgrey');
    setReadButton('lightgrey');
  }

  // -------------------------------------------------------------------------------------------------------------------
  // useEffect
  // -------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    async function main() {
      //set Loading is true
      setLoading(true);
      let _getMethod = {};
      _getMethod = await getMethod();

      const resBookInfo = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/book/setProfile/${bookId}`,
        _getMethod,
      );
      const resQuotes = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/book/topQuotes/${bookId}/`,
        _getMethod,
      );
      const resRatingInfo = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/book/fullRating/${bookId}/`,
        _getMethod,
      );

      const resReviews = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/reviews/3review/${bookId}/`,
        _getMethod,
      );

      const res = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/user-interaction/recommendation`,
        _getMethod,
      );

      // wait for response
      const threeReviews = await resReviews.json();
      const activeBookInfo = await resBookInfo.json();
      const quotes = await resQuotes.json();
      const rating = await resRatingInfo.json();
      const recommendations = await res.json();

      //set Options
      navigation.setOptions({title: activeBookInfo['title']});

      // set the reading status
      if (activeBookInfo['readerstatus'] == 'want to read') {
        setSaveButton('#eac645');
      } else if (activeBookInfo['readerstatus'] == 'read') {
        setReadButton('#7380AA');
      } else if (activeBookInfo['readerstatus'] == 'reading') {
        setReadingButton('#7380AA');
      }

      // set all the needed information
      setActiveBook(activeBookInfo);
      setQuotes(quotes);
      setRatingInfo(rating);
      setLatestReviews(threeReviews);
      setRecommendations(recommendations);

      //is loading = false
      setLoading(false);
    }

    main();

    // CALL API
  }, [bookId, userId]);

  // TESTING DATA

  const discussionInfo: DiscussionInfo = {
    authorName: 'VoldemortLover123',
    publishDate: '24-05-1990',
    topic: 'guyz Who the hell killed Dumbledore?',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed urna sed massa molestie condimentum. Nam convallis felis non lacus posuere, id lacinia lacus volutpat. Fusce vel dignissim orci, non ullamcorper leo.',
  };

  return (
    <>
      {isLoading || (
        <View style={styles.container}>
          <ScrollView>
            <Text
              style={[
                styles.smallText,
                {marginTop: 10, marginBottom: 0, color: 'grey'},
              ]}>
              Book Id : {bookId}
            </Text>
            {/* STATUS & RANKING BUTTONS */}

            <HStack
              style={[
                styles.regularBox,
                {
                  paddingLeft: 0,
                  paddingRight: 0,
                  justifyContent: 'space-between',
                  marginTop: 0,
                  marginBottom: 0,
                },
              ]}>
              <HStack spacing={5}>
                <Button
                  title="reading"
                  color={readingButton}
                  size="sm"
                  onPress={() => {
                    reading();
                  }}
                />
                <Button
                  title="I've read"
                  color={readButton}
                  size="sm"
                  onPress={() => {
                    read();
                  }}
                />
              </HStack>

              <View>
                <TouchableOpacity
                  onPress={() => {
                    save();
                  }}>
                  <FontAwesomeIcon
                    size={30}
                    icon={faBookmark}
                    color={saveButton}
                  />
                </TouchableOpacity>
              </View>
            </HStack>

            {/* BOOK PROFILE CARD */}
            <BookProfileCard bookInfo={activeBook} />

            {/* RANKING */}
            <Ranking ratingInfo={ratingInfo} />

            {/* SYNOPSIS */}
            <Text style={[styles.titleText, {marginTop: 25}]}>Synopsis</Text>
            <Text style={{fontSize: 16, marginTop: 15, marginBottom: 25}}>
              {activeBook['info']}
            </Text>

            {/* QUOTES */}
            <View style={[styles.regularBox, {backgroundColor: '#CCBD95'}]}>
              <Text style={[styles.titleText]}>Quotes</Text>
              <View style={{marginTop: 10}}>
                {quotes &&
                  quotes.map(quote => {
                    return (
                      <Text style={[styles.quoteText]} key={quote}>
                        "{quote}"
                      </Text>
                    );
                  })}
              </View>
            </View>

            {/* REVIEWS */}
            <View style={[styles.regularBox, {backgroundColor: 'white'}]}>
              <HStack style={{flex: 1, justifyContent: 'space-between'}}>
                <Text style={styles.titleText}>Reviews</Text>
                <Text
                  style={styles.smallText}
                  onPress={() =>
                    navigation.navigate('AllReviews', {bookId: bookId})
                  }>
                  All reviews →{' '}
                </Text>
              </HStack>

              <View style={{marginTop: 30}}>
                {latestReviews.map((review, index) => {
                  return <ReviewCard key={index} reviewInfo={review} />;
                })}
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AddReview', {bookId: bookId});
                }}>
                <HStack
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <Text style={[styles.titleText, {color: '#5699ee'}]}>
                    Add my review{' '}
                  </Text>

                  <FontAwesomeIcon
                    size={20}
                    icon={faPlusCircle}
                    color="#5699ee"
                  />
                </HStack>
              </TouchableOpacity>
            </View>

            {/* DISCUSSIONS */}

            {/* <View style={[styles.regularBox, {backgroundColor: 'white'}]}>
              <HStack style={{flex: 1, justifyContent: 'space-between'}}>
                <Text style={styles.titleText}>Discussion</Text>
                <Text
                  style={styles.smallText}
                  onPress={() =>
                    navigation.navigate('AllReviews', {bookId: [bookId]})
                  }>
                  All discussions →{' '}
                </Text>
              </HStack>

              <View style={{marginTop: 30}}>
                <DiscussionCard />
                <DiscussionCard />
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AddTopic', {bookId: bookId});
                }}>
                <HStack
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <Text style={[styles.titleText, {color: '#5699ee'}]}>
                    Add a topic{' '}
                  </Text>
                  <FontAwesomeIcon
                    size={20}
                    icon={faPlusCircle}
                    color="#5699ee"
                  />
                </HStack>
              </TouchableOpacity>
            </View> */}

            {/* RECOMMENDATION */}
            <Text style={[styles.titleText, {marginTop: 30}]}>
              Similar books
            </Text>
            <View style={{marginTop: 20}}>
              <View
                style={{
                  paddingTop: 15,
                }}>
                <View>
                  {Recommendations.map(book => (
                    <BookRecCard bookInfo={book} key={book.id} />
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
      {isLoading != false && (
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#5699ee" />
        </View>
      )}
    </>
  );
}
