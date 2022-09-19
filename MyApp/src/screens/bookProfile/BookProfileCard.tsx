import React from 'react';
import {HStack} from '@react-native-material/core';
import DisplayBook from './DisplayBook';
import {View, Text, Image} from 'react-native';
import {styles} from '../../shared/stylesheet';
import {BookProfileProps} from '../../model';

export default function BookProfileCard(props: BookProfileProps) {
  const book = props['bookInfo'];
  let genres = '';

  for (let genre of book['genre']!) {
    genres = genres.concat(genre, ' ');
  }

  return (
    <HStack style={[styles.regularBox, {padding: 0}]}>
      <View style={styles.book}>
        <Image
          style={{width: '100%', height: '100%'}}
          source={{uri: book['book_picture']}}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignContent: 'space-between',
          marginLeft: 10,
        }}>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>{book['title']}</Text>
        <View>
          <Text style={styles.smallText}>{book['author_name']}</Text>
          <Text style={styles.smallText}>{book['publisher_name']}</Text>
          <Text style={styles.smallText}>
            {book['publish_date'].slice(0, 10)}
          </Text>
          <Text style={styles.smallText}>{genres}</Text>
        </View>
      </View>
    </HStack>
  );
}
