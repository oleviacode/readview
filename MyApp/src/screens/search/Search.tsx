import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Button} from '@rneui/themed';
import {HStack} from '@react-native-material/core';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {fetchSearch} from '../../../redux/search/action';
import {BookInfo} from '../../model';
import BookRecCard from '../bookProfile/bookRecCard';

export default function Search() {
  const dispatch = useAppDispatch();
  const search = useAppSelector(state => state.search.search);
  const [error, setError] = useState('');
  const isLoading = useAppSelector(state => state.search.isLoading);
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
      readerstatus: undefined,
      isbn: '',
      pages: 0,
    },
  ]);

  useEffect(() => {
    async function fetchBook() {
      if (search === '' || search.length < 3) {
        setError('please input at least 3 characters');
      } else {
        setError('');
        const result = await dispatch(fetchSearch(search));
        if (result == null) {
          // Do nothing
        } else {
          setBook(result);
        }
      }
    }
    fetchBook();
  }, [books, error, search]);

  return (
    <>
      <View>
        <HStack spacing={6}>
          <Button>Book</Button>
          <Button style={{backgroundColor: 'pink'}}>Author</Button>
          {/* <Button color="green">User</Button>
          <Button color="red">Booklist</Button>  */}
        </HStack>
      </View>
      <ScrollView>
        <View>
          <Text>{error}</Text>
        </View>
        {isLoading === false ? (
          <View>
            {books.map(book => (
              <BookRecCard bookInfo={book} key={book.id} />
            ))}
          </View>
        ) : (
          <View></View>
        )}{isLoading == true ? (
          <View
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 20,
            }}>
            <ActivityIndicator size="large" color="#5699ee" />
          </View>
        ) : (
          <View></View>
        )}
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
