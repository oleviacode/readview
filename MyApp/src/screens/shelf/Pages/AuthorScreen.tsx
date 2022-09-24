import {faBookmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-community/async-storage';
import {Divider, HStack, Text} from '@react-native-material/core';
import React, {useCallback, useEffect, useState} from 'react';
import {
  RefreshControlBase,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Config from 'react-native-config';
import {
  AuthorInfo,
  BookInfo,
  initialAuthorInfo,
  initialBookInfo,
} from '../../../model';
import {getMethod, patchMethod} from '../../../shared/fetchMethods';
import Loading from '../../../shared/Loading';
import {styles} from '../../../shared/stylesheet';
import BookRecCard from '../../bookProfile/bookRecCard';

export default function AuthorScreen({route, navigation}: any) {
  // -------------------------------------------------------------------------------------------------------------------
  // settings
  // -------------------------------------------------------------------------------------------------------------------

  const {authorId} = route.params;
  const [isLoading, setLoading] = useState(true);
  const [books, setBook] = useState<BookInfo[]>([initialBookInfo]);
  const [author, setAuthor] = useState<AuthorInfo>(initialAuthorInfo);
  const [saveButton, setSaveButton] = useState('#eac645');

  // -------------------------------------------------------------------------------------------------------------------
  // functions
  // -------------------------------------------------------------------------------------------------------------------
  // follow user
  async function save() {
    if (saveButton == '#eac645') {
      const patch = await patchMethod();

      const res = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/author/unfollowAuthor/${authorId}`,
        patch,
      );

      const result = await res.json();
      if (result[0].status == 200) {
        setSaveButton('lightgrey');
      } else {
        console.log('error occur');
      }
    } else {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/author/followAuthor/${authorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: 'POST',
        },
      );

      const result = await res.json();
      if (result[0].status == 200) {
        setSaveButton('#eac645');
      } else {
        console.log('error occur');
      }
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // use effect
  // -------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    async function fetchBook() {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      //fetch booklists
      const resBooklist = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/author/booklist/${authorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const books = await resBooklist.json();

      //fetch author
      const resAuthor = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/author/author/${authorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const author = await resAuthor.json();

      //fetch status
      const resStatus = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/author/check/${authorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const status = await resStatus.json();

      if (books[0].message || author[0].message) {
        //nobooks
        setLoading(false);
      } else {
        // have books
        setBook(books);
        setAuthor(author[0]);
        if(status.length == 0){
          setSaveButton('lightgrey')
        }else {
          setSaveButton('#eac645')
        }
        setLoading(false);
      }
    }
    fetchBook();
  }, [authorId]);

  // -------------------------------------------------------------------------------------------------------------------
  // return
  // -------------------------------------------------------------------------------------------------------------------

  return (
    <>
      {/* LOADING */}
      {isLoading && <Loading />}

      {/* Yes books in booklist */}
      {!isLoading && (
        <>
          <View style={styles.container}>
            <HStack style={{justifyContent: 'space-between'}}>
              <View >
              <Text
                style={[styles.titleText, {textAlign: 'center', padding: 10}]}>
                {author.author_name}
              </Text>
              {author.genres.slice(0,3).map(genre => <Text key={genre} style={{paddingLeft: 10}}>{genre}</Text>)}
              </View>
              <View style={{marginTop: 25}}>
                <TouchableOpacity
                  onPress={() => {
                    save();
                  }}>
                  <FontAwesomeIcon
                    size={50}
                    icon={faBookmark}
                    color={saveButton}
                  />
                </TouchableOpacity>
              </View>
              
            </HStack>
            
                
            
            <Divider />

            {/* authorlist */}
            <ScrollView>
              {books.map(book => (
                <BookRecCard bookInfo={book} key={book.id} />
              ))}
            </ScrollView>
          </View>
        </>
      )}
    </>
  );
}
