import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {styles} from '../../shared/stylesheet';
import {HStack} from '@react-native-material/core';
import {Button} from '@rneui/themed';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBookmark} from '@fortawesome/free-solid-svg-icons/faBookmark';
import BookProfileCard from './BookProfileCard';
import Ranking from './RankingBox';
import ReviewCard from './ReviewCard';

export type BookProfileProps = {
  bookId: number;
  key: number;
};

export default function BookProfile({route}) {
  const {bookId} = route.params;

  const testBook = {
    bookId: 101,
    bookTitle: 'Harry Potter and the Chamber of Secrets',
    publishDate: '01-01-1997',
    bookPicture: 'default',
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

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* STATUS & RANKING BUTTONS */}
        <HStack
          spacing={120}
          style={[styles.regularBox, {borderRadius: 0, flex: 1, padding: 0}]}>
          <HStack spacing={6}>
            <Button title="rank" color="#7380AA" size="sm" />
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
        <View style={[styles.regularBox, {backgroundColor: '#F7F7F7'}]}>
          <Text style={[styles.titleText]}>Reviews</Text>
          <View style={{marginTop: 30}}>
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
