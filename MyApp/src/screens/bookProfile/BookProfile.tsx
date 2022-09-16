import React, {useEffect} from 'react';
import {Text, View, ScrollView} from 'react-native';
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

export type BookProfileProps = {
  bookId: number;
  key: number;
};

export default function BookProfile({route, navigation}) {
  const {bookId} = route.params;

  // TESTING DATA

  const testBook = {
    bookId: 101,
    bookTitle: 'Harry Potter and the Chamber of Secrets',
    publishDate: '01-01-1997',
    bookPicture: 'default',
    genre: 'Fantasy',
  };
  const testAuthor = 'JK. Rowling';
  const testPublisher = 'abc company';
  const testSynopsis =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed urna sed massa molestie condimentum. Nam convallis felis non lacus posuere, id lacinia lacus volutpat. Fusce vel dignissim orci, non ullamcorper leo. Pellentesque sed bibendum nunc. Maecenas molestie ex vitae nisi auctor, sed lacinia enim maximus.';
  const testQuote = [
    "You're a wizard Harry",
    'I solemnly swear I am up to no good.',
    'It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends.',
  ];

  // TESTING DATA

  navigation.setOptions({title: testBook['bookTitle']});

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
        <BookProfileCard
          bookInfo={testBook}
          publisher={testPublisher}
          author={testAuthor}
        />

        {/* RANKING */}
        <Ranking />

        {/* SYNOPSIS */}
        <Text style={[styles.titleText, {marginTop: 25}]}>Synopsis</Text>
        <Text style={{fontSize: 16, marginTop: 15, marginBottom: 25}}>
          {testSynopsis}
        </Text>

        {/* QUOTES */}
        <View style={[styles.regularBox, {backgroundColor: '#CCBD95'}]}>
          <Text style={[styles.titleText]}>Quotes</Text>
          <View style={{marginTop: 10}}>
            {testQuote.map(quote => {
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
                navigation.navigate('AllReviews', {bookId: [bookId]})
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
              Add a topic{' '}
            </Text>
            <FontAwesomeIcon size={20} icon={faPlusCircle} color="#5699ee" />
          </HStack>
        </View>

        {/* RECOMMENDATION */}
        <Text style={[styles.titleText, {marginTop: 30}]}>Similar books</Text>
        <View style={{marginTop: 20}}>
          <BookRecCard />
          <BookRecCard />
        </View>
      </ScrollView>
    </View>
  );
}
