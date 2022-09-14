import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export type Book = {
  bookId: number;
};

export default function DisplayBook(props: Book) {
  const navigation = useNavigation();

  const bookId = props.bookId;

  return (
    <TouchableOpacity
      style={styles.book}
      onPress={() => navigation.navigate('BookProfile', {bookId: [bookId]})}
    />
  );
}

const styles = StyleSheet.create({
  book: {width: 100, height: 110, backgroundColor: 'grey'},
});
