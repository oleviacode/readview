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
} from '../../model';

import {getMethod, patchMethod} from '../../shared/fetchMethods';
import Config from 'react-native-config';
import {useAppSelector} from '../../../redux/store';

export default function BookProfile({route, navigation}: any) {
  const userId = useAppSelector(state => state.user.id);
  const {bookId} = route.params;
  let _getMethod = {};

  // USE STATES
  const [activeBook, setActiveBook] = useState<BookInfo>(initialBookInfo);
  const [quotes, setQuotes] = useState(['no quotes']);
  const [ratingInfo, setRatingInfo] = useState<RatingInfo>(initialRatingInfo);
  const [isLoading, setIsLoading] = useState(true);
  const [saveButton, setSaveButton] = useState('lightgrey');
  const [readButton, setReadButton] = useState('lightgrey');
  const [readingButton, setReadingButton] = useState('lightgrey');
  const [visible, setVisible] = useState(false);

  console.log('hi');

  useEffect(() => {
    async function main() {
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

      const activeBookInfo = await resBookInfo.json();
      const quotes = await resQuotes.json();
      const rating = await resRatingInfo.json();

      navigation.setOptions({title: activeBookInfo['title']});

      if (activeBookInfo['readerstatus'] == 'want to read') {
        setSaveButton('#eac645');
      } else if (activeBookInfo['readerstatus'] == 'read') {
        setReadButton('#7380AA');
      } else if (activeBookInfo['readerstatus'] == 'reading') {
        setReadingButton('#7380AA');
      }

      setActiveBook(activeBookInfo);
      setQuotes(quotes);
      setRatingInfo(rating);
      setIsLoading(false);
    }

    main();

    // CALL API
  }, [isLoading, bookId]);

  // TESTING DATA

  const discussionInfo: DiscussionInfo = {
    authorName: 'VoldemortLover123',
    publishDate: '24-05-1990',
    topic: 'guyz Who the hell killed Dumbledore?',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed urna sed massa molestie condimentum. Nam convallis felis non lacus posuere, id lacinia lacus volutpat. Fusce vel dignissim orci, non ullamcorper leo.',
  };

  // TESTING DATA

  if (isLoading) {
    return (
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
    );
  } else {
    return (
      <View style={styles.container}>
        <ScrollView>
          {/* STATUS & RANKING BUTTONS */}
          <HStack
            spacing={170}
            style={[styles.regularBox, {borderRadius: 0, flex: 1, padding: 0}]}>
            <HStack spacing={10}>
              <Button
                title="reading"
                color={readingButton}
                size="sm"
                onPress={() => {
                  async function reading() {
                    const patch = await patchMethod();

                    const res = await fetch(
                      `${Config.REACT_APP_BACKEND_URL}/book/saveBookStatus/${bookId}/reading`,
                      patch,
                    );

                    if (readingButton == 'lightgrey') {
                      setReadingButton('#7380AA');
                    } else {
                      setReadingButton('lightgrey');
                    }
                    setSaveButton('lightgrey');
                    setReadButton('lightgrey');
                  }
                  reading();
                }}
              />
              <Button
                title="I've read"
                color={readButton}
                size="sm"
                onPress={() => {
                  async function read() {
                    const patch = await patchMethod();

                    const res = await fetch(
                      `${Config.REACT_APP_BACKEND_URL}/book/saveBookStatus/${bookId}/read`,
                      patch,
                    );

                    if (readingButton == 'lightgrey') {
                      setReadButton('#7380AA');
                    } else {
                      setReadButton('lightgrey');
                    }

                    setSaveButton('lightgrey');
                    setReadingButton('lightgrey');
                  }
                  read();
                }}
              />
            </HStack>
            <View style={{flex: 1, alignSelf: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  async function save() {
                    const patch = await patchMethod();

                    const res = await fetch(
                      `${Config.REACT_APP_BACKEND_URL}/book/saveBookStatus/${bookId}/save`,
                      patch,
                    );

                    if (saveButton == 'lightgrey') {
                      setSaveButton('#eac645');
                    } else {
                      setSaveButton('lightgrey');
                    }
                    setReadButton('lightgrey');
                    setReadingButton('lightgrey');
                  }
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
              <ReviewCard />
              <ReviewCard />
              <ReviewCard />
            </View>
            <TouchableOpacity onPress={() => setVisible(!visible)}>
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

          <View style={[styles.regularBox, {backgroundColor: 'white'}]}>
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
              <FontAwesomeIcon size={20} icon={faPlusCircle} color="#5699ee" />
            </HStack>
          </View>

          {/* RECOMMENDATION */}
          <Text style={[styles.titleText, {marginTop: 30}]}>Similar books</Text>
          <View style={{marginTop: 20}}>
            <TouchableOpacity
              onPress={() =>
                navigation.push('BookProfile', {bookId: activeBook['id']})
              }>
              <BookRecCard bookInfo={activeBook} />
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* OVER LAY */}

        <Overlay
          isVisible={visible}
          onBackdropPress={() => setVisible(!visible)}>
          <Text style={styles.titleText}>Add my review</Text>
          <Text>Welcome to React Native Elements</Text>
          <Button
            title="Start Building"
            onPress={() => {
              setVisible(!visible);
            }}
          />
        </Overlay>
      </View>
    );
  }
}
