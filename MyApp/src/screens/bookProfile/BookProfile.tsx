import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {styles} from '../../shared/stylesheet';
import {HStack} from '@react-native-material/core';
import {Button} from '@rneui/themed';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBookmark} from '@fortawesome/free-solid-svg-icons/faBookmark';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import BookProfileCard from './BookProfileCard';
import Ranking from './RankingBox';
import ReviewCard from './ReviewCard';
import BookRecCard from './bookRecCard';
import DiscussionCard from './DiscussionCard';
import {BookInfo} from '../../model';
import {DiscussionInfo} from '../../model';
import {RatingInfo} from '../../model';
import {getMethod} from '../../shared/fetchMethods';
import Config from 'react-native-config';
import {useAppSelector} from '../../../redux/store';

export default function BookProfile({route, navigation}) {
  const userId = useAppSelector(state => state.user.id);
  const {bookId} = route.params;

  const initialBookInfo = {
    id: 0,
    title: '',
    author_name: '',
    publisher_name: '',
    publish_date: '',
    book_picture: '',
    genre: undefined,
    info: '',
    rating: undefined,
    readerStatus: undefined,
    pages: 0,
    isbn: '',
  };

  // USE STATES
  const [activeBook, setActiveBook] = useState<BookInfo>(initialBookInfo);
  const [quotes, setQuotes] = useState(['no quotes']);

  useEffect(() => {
    async function main() {
      const _getMethod = await getMethod();
      const resBookInfo = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/book/setProfile/${bookId}/${userId}`,
        _getMethod,
      );
      const activeBookInfo = await resBookInfo.json();
      const resQuotes = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/book/topQuotes/${bookId}/`,
        _getMethod,
      );
      const quotes = await resQuotes.json();

      setActiveBook(activeBookInfo);
      setQuotes(quotes);
    }

    main();

    // CALL API
  }, []);

  // TESTING DATA

  const rating: RatingInfo = {
    numOfRatings: 10,
    rating: 4.2,
    fiveStarsNum: 6,
    fourStarsNum: 1,
    threeStarsNum: 2,
    twoStarsNum: 1,
    oneStarNum: 0,
    readNum: 15512,
    readingNum: 514,
    savedNum: 8591,
  };

  const discussionInfo: DiscussionInfo = {
    authorName: 'VoldemortLover123',
    publishDate: '24-05-1990',
    topic: 'guyz Who the hell killed Dumbledore?',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed urna sed massa molestie condimentum. Nam convallis felis non lacus posuere, id lacinia lacus volutpat. Fusce vel dignissim orci, non ullamcorper leo.',
  };

  // TESTING DATA

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* STATUS & RANKING BUTTONS */}
        <HStack
          spacing={170}
          style={[styles.regularBox, {borderRadius: 0, flex: 1, padding: 0}]}>
          <HStack spacing={10}>
            <Button title="reading" color="#7380AA" size="sm" />
            <Button title="I've read" color="#7380AA" size="sm" />
          </HStack>
          <View style={{flex: 1, alignSelf: 'center'}}>
            <FontAwesomeIcon size={30} icon={faBookmark} color="lightgrey" />
          </View>
        </HStack>

        {/* BOOK PROFILE CARD */}
        <BookProfileCard bookInfo={activeBook} />

        {/* RANKING */}
        <Ranking ratingInfo={rating} />

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
            <FontAwesomeIcon size={20} icon={faPlusCircle} color="#5699ee" />
          </HStack>
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
    </View>
  );
}
