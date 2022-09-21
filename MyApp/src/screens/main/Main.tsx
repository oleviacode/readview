import React, {useEffect} from 'react';
import {View, Text, ScrollView, Button, ActivityIndicator} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {BookInfo, NaviProps} from '../../model';
import {HStack} from '@react-native-material/core';
import DisplayBook, {PreviewBookContents} from '../bookProfile/DisplayBook';
import Config from 'react-native-config';
import {getMethod} from '../../shared/fetchMethods';
import {useState} from 'react';
import {styles} from '../../shared/stylesheet';
import {initialBookPreviewContents} from '../../model';
import BookRecCard from '../bookProfile/bookRecCard';

export default function MainScreen({navigation}: NaviProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.username);

  const [top3, setTop3] = useState<Array<PreviewBookContents>>([
    initialBookPreviewContents,
  ]);
  const [isLoading, setLoading] = useState(false);

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

  async function fresh() {
    //calling redux
    const _getMethod = await getMethod();
    const res = await fetch(
      `${Config.REACT_APP_BACKEND_URL}/user-interaction/recommendation`,
      _getMethod,
    );
    const result = await res.json();
    setbooks(result);
  }

  useEffect(() => {
    //main function
    async function main() {
      const top3Books: PreviewBookContents[] = [];
      const _getMethod = await getMethod();

      // GET LATEST BOOKS
      try {
        setLoading(true);
        const resLatestBooks = await fetch(
          `${Config.REACT_APP_BACKEND_URL}/book/latest`,
          _getMethod,
        );
        const latestBooks = await resLatestBooks.json();
        const res = await fetch(
          `${Config.REACT_APP_BACKEND_URL}/user-interaction/recommendation`,
          _getMethod,
        );
        const result = await res.json();
        setbooks(result);
        setTop3(latestBooks);
        setLoading(false);
      } catch (e) {
        console.log('no books found');
      }
    }
    main();
  }, [user]);

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
          <HStack
            style={{
              justifyContent: 'space-between',
            }}>
            <Text style={styles.titleText}>Recommendation</Text>
            <Button
              title={'refresh'}
              onPress={() => {
                fresh();
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
                paddingTop: 15,
              }}>
              <ActivityIndicator size="large" color="#5699ee" />
            </View>
          ) : (
            <View>
              {books == undefined ? (
                <View
                  style={{
                    backgroundColor: 'lightblue',
                    margin: 10,
                    borderRadius: 10,
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      textAlign: 'center',
                    }}>{`Click on the refresh and get some recommendations!`}</Text>
                </View>
              ) : (
                books.map(book => <BookRecCard bookInfo={book} key={book.id} />)
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
