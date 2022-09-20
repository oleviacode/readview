import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export type PreviewBookContents = {
  id: number;
  book_picture: string;
};

export type PreviewBook = {
  book: PreviewBookContents;
};

export default function DisplayBook(props: PreviewBook) {
  const navigation = useNavigation();

  const bookId = props['book']['id'];
  const bookImage = props['book']['book_picture'];

  return (
    <TouchableOpacity
      style={styles.smallBook}
      onPress={() => navigation.navigate('BookProfile', {bookId: [bookId]})}>
      <Image
        style={{width: '100%', height: '100%'}}
        source={{uri: bookImage}}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  smallBook: {
    width: 100,
    height: 110,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
  },
});
