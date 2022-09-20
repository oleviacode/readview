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
  const [error, setError] = useState('search by title, author or ISBN!');
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
      if (search === '' || search.length < 2) {
        setError('Please input at least 3 characters!');
      } else {
        setError('searching...');
        // const result = await dispatch(fetchSearch(search));

        
        if (result == null) {
          setError('search by title, author or ISBN!');
        } else {
          setBook(result);
          setError('search results');
        }
      }
    }
    fetchBook();
  }, [books, error, search]);

  return (
    <>
      <View>
      {/*<HStack spacing={6}>
          <Button>Book</Button>
          <Button style={{backgroundColor: 'pink'}}>Author</Button>
          {/* <Button color="green">User</Button>
          <Button color="red">Booklist</Button>  }
        </HStack> */}
      </View>
      <ScrollView>
        <View>
        <View style={{
          backgroundColor: 'lightblue',
          margin : 10,
          borderRadius : 10,
          padding: 10,
        }}>
          <Text style={{
            fontSize: 15,
            textAlign: 'center'
          }}>{error}</Text>
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
