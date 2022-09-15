import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {styles} from '../../shared/stylesheet';
import {HStack} from '@react-native-material/core';
import {Button} from '@rneui/themed';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBookmark} from '@fortawesome/free-solid-svg-icons/faBookmark';
import BookProfileCard from './BookProfileCard';
import Ranking from './RankingBox';

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
      </ScrollView>
    </View>
  );
}
