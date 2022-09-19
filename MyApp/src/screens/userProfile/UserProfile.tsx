import React, {useEffect, useState} from 'react';
import {useAppSelector} from '../../../redux/store';
import { Image, ScrollView, Text, View} from 'react-native';
import {Button} from '@rneui/themed';
import UserData from './UserData';
import { HStack } from '@react-native-material/core';
import Config from 'react-native-config';
import UserSettings from './UserSettings';

export type ProfileRoute = {
  userId: number;
};

export default function UserProfile() {

  const user = useAppSelector(state => state.user.username);
  const img = useAppSelector(state => state.user.profile_picture);
  const info = useAppSelector(state => state.user.info)
  const [page, setPage] = useState('data')

  useEffect(() => {


  }, []);

  return (
    <>
    <View style={{
      justifyContent:'center',
      alignItems:'center',
    }}>
      <Image style={{
        width: 100,
        height: 100,
        backgroundColor: 'gray'
      }} source={{uri:`${Config.REACT_APP_BACKEND_URL}/uploads/${img}`}}/>
      <View><Text>{user}</Text></View>
      <View><Text>{info}</Text></View>
    </View>
    <View>
        <HStack spacing={6} style={{
          padding:10,
          justifyContent:'center',
          alignItems:'center',
        }}>
          <Button onPress={() => setPage('data')}>Data</Button>
          <Button style={{backgroundColor: 'pink'}}>History</Button>
          <Button color="green" onPress={() => {
            setPage('settings')
          }}>Settings</Button>
        </HStack>
      </View>
      <ScrollView>
          {page == 'data'? <UserData/> : <UserSettings/>}
      </ScrollView>
    </>
  )
}
