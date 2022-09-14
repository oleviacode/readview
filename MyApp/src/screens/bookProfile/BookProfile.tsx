import React from 'react';
import {Text} from 'react-native';

export type BookProfileProps = {
  bookId: number;
};

export default function BookProfile({route}) {
  const {bookId} = route.params;

  return <Text>Book Profile number {bookId}</Text>;
}
