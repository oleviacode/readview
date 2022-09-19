import {Text} from '@react-native-material/core';
import React, { useEffect, useState } from 'react';
import {Button, View} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';
import { logOut } from '../../../redux/auth/action';
import { useNavigation } from '@react-navigation/native';

export default function UserSettings() {

  const [error, setError] = useState('');
  const navigation = useNavigation()

  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  async function deleteAccount() {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(`${Config.REACT_APP_BACKEND_URL}/user/remove`, {
      method: 'Patch',
      headers: {
        Authorization: 'Bearer ' + token
      },
    });
    const result = await res.json()
    if (result[0].status == 200){
      dispatch(logOut());
      AsyncStorage.removeItem('token');
      navigation.navigate('Cover');
    } else {
      setError('please try again')
    }
  }

  
  

  return (
    <>
      <View>
        <View>
          <Text>{error}</Text>
          <Button title={'change username'} onPress={() =>{
            navigation.navigate('changeUsername')
          }}></Button>
          <Button title={'change email'} onPress={() =>{
            navigation.navigate('changeEmail')}}></Button>
          <Button title={'change information'} onPress={() =>{
            navigation.navigate('changeInfo')}}></Button>
        </View>
      </View>
      <View>
        {/* <Button 
        color={'red'}
        title={'Delete Account'}
        onPress={() => {
          deleteAccount()
        }}></Button> */}
      </View>
    </>
  );
}

