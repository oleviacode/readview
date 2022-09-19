import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button} from '@rneui/themed';
import {HStack} from '@react-native-material/core';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {fetchSearch} from '../../../redux/bookInfo/action';
import {BookInfo} from '../../model';
import BookRecCard from '../bookProfile/bookRecCard';

export default function Search() {
  const dispatch = useAppDispatch();
  const search = useAppSelector(state => state.search.search)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
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
    readerstatus: undefined,
    isbn: '',
    pages: 0,
  }]);
  

  useEffect(() => {
    async function fetchBook() {
      if(search === '' || search.length < 3){
        setError('please input at least 3 characters')
      } else {
        setError('')
        const result = await dispatch(fetchSearch(search));
        setBook(result);
        setIsLoading(false)
      }
    }
    fetchBook()
    return () => {}
    
  }, [books, isLoading, error, search]);

  return (
    <>
      <View>
        <HStack spacing={6}>
          <Button>Book</Button>
          {/* <Button style={{backgroundColor: 'pink'}}>Author</Button>
          <Button color="green">User</Button>
          <Button color="red">Booklist</Button> */}
        </HStack>
      </View>
      <ScrollView>
      <View>
        <Text>{isLoading && 'hahaha'}{error}</Text>
        
      </View>
      {<View>
        {books.map(book => <BookRecCard bookInfo={book} key={book.id}/>)}
      </View>}
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
