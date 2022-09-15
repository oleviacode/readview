import React from 'react';
import {HStack} from '@react-native-material/core';
import DisplayBook from './DisplayBook';
import {View, Text} from 'react-native';
import {styles} from '../../shared/stylesheet';

export interface BookProfileCardProps {
  bookInfo: {
    bookId: number;
    bookTitle: string;
    publishDate: string;
    bookPicture: string;
    genre: string;
  };
  publisher: string;
  author: string;
}

export default function BookProfileCard(props: BookProfileCardProps) {
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
          {props['bookInfo']['bookTitle']}
        </Text>
        <View>
          <Text style={styles.smallText}>{props['author']}</Text>
          <Text style={styles.smallText}>{props['publisher']}</Text>
          <Text style={styles.smallText}>
            {props['bookInfo']['publishDate']}
          </Text>
          <Text style={styles.smallText}>{props['bookInfo']['genre']}</Text>
        </View>
      </View>
    </HStack>
  );
}