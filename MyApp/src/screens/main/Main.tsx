import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
  Button,
  ActivityIndicator,
} from 'react-native';
import {logOut} from '../../../redux/auth/action';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {BookInfo, NaviProps} from '../../model';
import {HStack} from '@react-native-material/core';
import DisplayBook, {PreviewBookContents} from '../bookProfile/DisplayBook';
import Config from 'react-native-config';
import {getMethod} from '../../shared/fetchMethods';
import {useState} from 'react';
import {styles} from '../../shared/stylesheet';
import {initialBookPreviewContents} from '../../model';
import {fetchForYou} from '../../../redux/recommendation/action';
import BookRecCard from '../bookProfile/bookRecCard';

export default function MainScreen({navigation}: NaviProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.username);

  const [top3, setTop3] = useState<Array<PreviewBookContents>>([
    initialBookPreviewContents,
  ]);
  const isLoading = useAppSelector(state => state.recommendation.isLoading);

  const [books, setbooks] = useState<BookInfo[]>([
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

  async function fresh(){
    //calling redux
    const result = await dispatch(fetchForYou());
    setbooks(result);
  }

  useEffect(() => {
    //main function
    async function main() {
      const top3Books: PreviewBookContents[] = [];
      const _getMethod = await getMethod();

      // GET LATEST BOOKSs
      try {
        const resLatestBooks = await fetch(
          `${Config.REACT_APP_BACKEND_URL}/book/latest`,
          _getMethod,
        );
        const latestBooks = await resLatestBooks.json();

        setTop3(latestBooks);
      } catch (e) {
        console.log('no books found');
      }

      //calling redux
      const result = await dispatch(fetchForYou());
      setbooks(result);
    }
    main();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.titleText}>Hi {user}</Text>
        <View style={[styles.regularBox, {borderRadius: 0, padding: 0}]}>
          <Text style={styles.titleText}>Latest Books</Text>
          <HStack style={styles.bookStack}>
            {top3!.map(book => {
              return <DisplayBook book={book} key={book['id']} />;
            })}
          </HStack>
        </View>

        {/* {<View style={styles.rankingSection}>
          <Text style={styles.titleText}>Ranking</Text>
          <ScrollView horizontal={true} showsVerticalScrollIndicator={false}>
            <HStack>
              <View style={styles.rankBox} />
              <View style={styles.rankBox} />
              <View style={styles.rankBox} />
            </HStack>
          </ScrollView>
        </View>} */}
        <View
          style={{
            paddingTop: 15,
          }}>
            <HStack style={{
              justifyContent:'space-between'
            }}>
          <Text style={styles.titleText}>Recommendation</Text>
          <Button title={'refresh'} onPress={() => {
            fresh()
          }}></Button>
          </HStack>
          {isLoading ? (
            <View
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 15
              }}>
              <ActivityIndicator size="large" color="#5699ee" />
            </View>
          ) : (
            <View>
              {books.map(book => (
                <BookRecCard bookInfo={book} key={book.id} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
