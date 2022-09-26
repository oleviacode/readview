import React, {useEffect, useState} from 'react';
import {useAppSelector} from '../../../redux/store';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button} from '@rneui/themed';
import UserData from './UserData';
import {HStack} from '@react-native-material/core';
import Config from 'react-native-config';
import UserSettings from './UserSettings';
import {styles} from '../../shared/stylesheet';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faMars,
  faMarsAndVenus,
  faVenus,
} from '@fortawesome/free-solid-svg-icons';

export type ProfileRoute = {
  userId: number;
};

export default function UserProfile() {
  const user = useAppSelector(state => state.user.username);
  const img = useAppSelector(state => state.user.profile_picture);
  const info = useAppSelector(state => state.user.info);
  const gender = useAppSelector(state => state.user.gender);
  const userId = useAppSelector(state => state.user.id);
  const [page, setPage] = useState('data');

  return (
    <>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <View>
          <Image
            style={{
              width: 70,
              height: 70,
              backgroundColor: 'gray',
              borderRadius: 100,
            }}
            source={{uri: `${Config.REACT_APP_BACKEND_URL}/uploads/${img}`}}
          />
        </View>
        <View style={{justifyContent:'center', alignItems:'center'}}>
          <HStack >
            <Text style={styles.userProfileText}>{user}
              {gender == 'female' && (
                <FontAwesomeIcon
                  icon={faVenus}
                  color={'red'}
                  style={{
                    marginLeft: 10,
                  }}
                />
              )}
              {gender == 'male' && (
                <FontAwesomeIcon
                  icon={faMars}
                  color={'blue'}
                  style={{
                    marginLeft: 10,
                  }}
                />
              )}
              {gender == 'Other' && (
                <FontAwesomeIcon
                  icon={faMarsAndVenus}
                  color={'blue'}
                  style={{
                    marginLeft: 10,
                  }}
                />
              )}
            </Text>
          </HStack>
          <Text
            style={{
              fontSize: 15,
              paddingTop: 5,
              paddingLeft: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {info}
          </Text>
          <Text style={styles.smallText}> User ID : {userId}</Text>
        </View>
      </View>
      <View>
        <HStack
          spacing={6}
          style={{
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Button onPress={() => setPage('data')}>Data</Button>
          {/* <Button style={{backgroundColor: 'pink'}}>History</Button> */}
          <Button
            color="green"
            onPress={() => {
              setPage('settings');
            }}>
            Settings
          </Button>
        </HStack>
      </View>
      <ScrollView>
        {page == 'data' ? <UserData /> : <UserSettings />}
      </ScrollView>
    </>
  );
}
