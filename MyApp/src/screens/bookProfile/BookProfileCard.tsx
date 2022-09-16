import React from 'react';
import {HStack} from '@react-native-material/core';
import DisplayBook from './DisplayBook';
import {View, Text} from 'react-native';
import {styles} from '../../shared/stylesheet';
import {BookProfileProps} from '../../model';

export default function BookProfileCard(props: BookProfileProps) {
  const book = props['bookInfo'];
  return (
    <HStack style={[styles.regularBox, {padding: 0}]}>
      <View style={styles.book}></View>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignContent: 'space-between',
          marginLeft: 10,
        }}>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>
          {book['bookTitle']}
        </Text>
        <View>
          <Text style={styles.smallText}>{book['author']}</Text>
          <Text style={styles.smallText}>{book['publisher']}</Text>
          <Text style={styles.smallText}>{book['publishDate']}</Text>
          <Text style={styles.smallText}>{book['genre']}</Text>
        </View>
      </View>
    </HStack>
  );
}
