import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import RatingRecord from './UserData/RatingRecord';
import {fetchUserData} from '../../../redux/user/userData/action';
import AuthorRecord from './UserData/AuthorRecord';
import TimelineRecord from './UserData/TimeRecord';
import GenreRecord from './UserData/GenreRecord';
import { useNavigation } from '@react-navigation/native';

export type ProfileRoute = {
  userId: number;
};

export default function UserData() {
  //usestate

  const user = useAppSelector(state => state.user.id);
  const isLoading = useAppSelector(state => state.userData.isLoading);
  const dispatch = useAppDispatch();
  const navigation = useNavigation()

  useEffect(() => {
    async function fetchdata() {
     await dispatch(fetchUserData());
    }

    const focus = navigation.addListener('focus', async () => {
      await dispatch(fetchUserData());
    })

    fetchdata();
    return focus
  }, [user, navigation]);
  return (
    <>
      {isLoading !== false ? (
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
        <ScrollView>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <RatingRecord />
            <GenreRecord />
            {/* <TimelineRecord /> */}
            <AuthorRecord />
          </View>
        </ScrollView>
      )}
    </>
  );
}
