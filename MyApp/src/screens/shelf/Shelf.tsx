import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button} from '@rneui/themed';
import {HStack} from '@react-native-material/core';
import {useAppDispatch} from '../../../redux/store';
import {fetchUserBookList} from '../../../redux/bookInfo/action';
import {BookInfo} from '../../model';
import BookRecCard from '../bookProfile/bookRecCard';

export default function Search() {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState('readinglist')
  // const {search} = route.params
  const [books, setBook] = useState<BookInfo[]>([
    {
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
    },
  ]);

  useEffect(() => {
    async function fetchBook() {
      const result = await dispatch(fetchUserBookList(status));
      console.log('hi')
      setBook(result);
    }

    fetchBook();
  }, [books, setBook, status]);

  return (
    <>
      <View>
        <Text>{status}</Text>
        <HStack spacing={6} >
          <Button onPress={() => {
            setStatus('readinglist')
          }}>Reading</Button>
          <Button style={{backgroundColor: 'pink'}} onPress={() => {
            setStatus('readlist')
          }}>
            Read
          </Button>
          <Button color="green" onPress={() => {
            setStatus('wantlist')
          }}>Want to read</Button>
          <Button color="red">Booklist</Button>
        </HStack>
      </View>
      <ScrollView>
        <View>
          <Text></Text>
        </View>
        <View>
          {books.map(book => (
            <BookRecCard bookInfo={book} key={book.id}/>
          ))}
        </View>
      </ScrollView>
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
