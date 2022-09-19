import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {logOut} from '../../../redux/auth/action';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {NaviProps} from '../../model';
import {HStack} from '@react-native-material/core';
import DisplayBook from '../bookProfile/DisplayBook';
import Config from 'react-native-config';
import {getMethod} from '../../shared/fetchMethods';
import {useState} from 'react';
import {styles} from '../../shared/stylesheet';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Chat from '../chat/Chat';

export default function MainScreen({navigation}: NaviProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.username);

  const [top3, setTop3] = useState<Array<number>>([]);

  useEffect(() => {
    async function main() {
      const top3Books: number[] = [];
      const _getMethod = await getMethod();

      // GET LATEST BOOKSs
      try {
        const resLatestBooks = await fetch(
          `${Config.REACT_APP_BACKEND_URL}/book/latest`,
          _getMethod,
        );
        const latestBooks = await resLatestBooks.json();
        for (let book of latestBooks) {
          top3Books.push(book['id']);
        }
        setTop3(top3Books);
      } catch (e) {
        console.log('no books found');
      }
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
            <>
              {top3.map(book => {
                return <DisplayBook bookId={book} key={book} />;
              })}
            </>
          </HStack>
        </View>

        <View style={styles.rankingSection}>
          <Text style={styles.titleText}>Ranking</Text>
          <ScrollView horizontal={true} showsVerticalScrollIndicator={false}>
            <HStack>
              <View style={styles.rankBox} />
              <View style={styles.rankBox} />
              <View style={styles.rankBox} />
            </HStack>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
