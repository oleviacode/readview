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
          {book['title']}
        </Text>
        <View>
          <Text style={styles.smallText}>{book['author_name']}</Text>
          <Text style={styles.smallText}>{book['publisher_name']}</Text>
          <Text style={styles.smallText}>{book['publish_date']}</Text>
          <Text style={styles.smallText}>{book['genre']}</Text>
        </View>
      </View>
    </HStack>
  );
}
