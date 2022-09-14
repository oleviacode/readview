import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Pressable, StyleSheet, ScrollView} from 'react-native';
import {logOut} from '../../../redux/auth/action';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {NaviProps} from '../../model';
import {HStack} from '@react-native-material/core';
import {Button} from '@rneui/themed';

import Chat from '../chat/Chat';

export default function MainScreen({navigation}: NaviProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.username)

  return (
    <View style={styles.container}>
      <ScrollView>
        <View><Text>hi {user}</Text></View>
        <View style={styles.latestBookSection}>
          <Text style={styles.titleText}>Latest Books</Text>
          <HStack style={styles.bookStack}>
            <View style={styles.book} />
            <View style={styles.book} />
            <View style={styles.book} />
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

        <Pressable>
          <Text
            onPress={() => {
              dispatch(logOut());
              navigation.navigate('Cover');
            }}>
            Logout
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  latestBookSection: {
    width: '100%',
    height: 160,
    backgroundColor: 'pink',
    marginTop: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bookStack: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  book: {
    width: 100,
    height: 110,
    backgroundColor: 'grey',
  },
  rankingSection: {
    height: 250,
    backgroundColor: 'pink',
    marginTop: 10,
  },
  rankBox: {
    width: 200,
    height: 210,
    backgroundColor: 'grey',
    margin: 10,
    borderRadius: 10,
  },
});
