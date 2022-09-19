import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button} from '@rneui/themed';
import {HStack} from '@react-native-material/core';
import {useAppDispatch} from '../../../redux/store';
import {fetchBookInfo, fetchSearch} from '../../../redux/bookInfo/action';
import {BookInfo} from '../../model';
import BookRecCard from '../bookProfile/bookRecCard';
import {useRoute } from '@react-navigation/native';

export default function Search({ route, navigation }:any) {
  const dispatch = useAppDispatch();
  // const {search} = route.params
  console.log(route)
  const [books, setBook] = useState<BookInfo[]>([{
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
  }]);
  

  useEffect(() => {
    async function fetchBook() {
      const result = await dispatch(fetchSearch('file'));
      setBook(result);
    }
    fetchBook()
    return () => {;}
    
  }, [books,setBook]);

  return (
    <>
      <View>
        <HStack spacing={6}>
          <Button>Book</Button>
          <Button style={{backgroundColor: 'pink'}}>Author</Button>
          <Button color="green">User</Button>
          <Button color="red">Booklist</Button>
        </HStack>
      </View>
      <ScrollView>
      <View>
        <Text></Text>
      </View>
      <View>
        {books.map(book => <BookRecCard bookInfo={book} key={book.id}/>)}
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
