import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from '@rneui/themed';
import {HStack} from '@react-native-material/core';
import Config from 'react-native-config';
import {useAppDispatch} from '../../../redux/store';
import {fetchBookInfo} from '../../../redux/bookInfo/action';
import {BookInfo} from '../../model';
import BookRecCard from '../bookProfile/bookRecCard';

export default function Search() {
  const dispatch = useAppDispatch();
  const [book, setBook] = useState<BookInfo>({
    id: 0,
    title: '',
    author_name: '',
    publisher_name: '',
    publish_date: '',
    book_picture: '',
    genre: [''],
    info: '',
    rating: undefined,
    readerStatus: undefined,
    isbn: '',
    page: 0,
  });

  useEffect(() => {
    async function fetchBook() {
      const result = await dispatch(fetchBookInfo(246));
      setBook(result);
    }

    fetchBook();
  }, [setBook]);

  return (
    <>
      <View style={{
        
      }}>
        <HStack spacing={6}>
          <Button>Primary</Button>
          <Button style={{backgroundColor: 'pink'}}>Secondary</Button>
          <Button color="green">Warning</Button>
          <Button color="red">Error</Button>
        </HStack>
      </View>
      <View>
        <BookRecCard bookInfo={book}/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 100,
    height: 100,
  },
});
