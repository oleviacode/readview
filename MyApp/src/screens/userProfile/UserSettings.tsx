import {Text} from '@react-native-material/core';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';
import {logOut} from '../../../redux/auth/action';
import {useNavigation} from '@react-navigation/native';
import {Button} from '@react-native-material/core';
import {styles} from '../../shared/stylesheet';

export default function UserSettings() {
  // settings
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  //method of deleting account
  async function deleteAccount() {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(`${Config.REACT_APP_BACKEND_URL}/user/remove`, {
      method: 'Patch',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    const result = await res.json();
    if (result[0].status == 200) {
      dispatch(logOut());
      AsyncStorage.removeItem('token');
      navigation.navigate('Cover');
    } else {
      setError('please try again');
    }
  }

  //component
  return (
    <>
      <View>
        <View style={styles.container}>
          <Text>{error}</Text>
          <Button
            color='#7380AA'
            style={{marginTop: 10}}
            title={'change username'}
            onPress={() => {
              navigation.navigate('changeUsername');
            }}></Button>
          <Button
          color='#7380AA'
            style={{marginTop: 15}}
            title={'change email'}
            onPress={() => {
              navigation.navigate('changeEmail');
            }}></Button>
          <Button
          color='#7380AA'
            style={{marginTop: 15}}
            title={'change information'}
            onPress={() => {
              navigation.navigate('changeInfo');
            }}></Button>
        </View>
      </View>
      <View style={styles.container}>
        <Button
          style={{marginTop: 25}}
          title={'Logout'}
          onPress={async () => {
            dispatch(logOut());
            AsyncStorage.removeItem('token');
            navigation.navigate('Cover');
          }}></Button>
        <Button
        style={{marginTop: 15}}
          color={'pink'}
          title={'Delete Account'}
          onPress={() => {
            deleteAccount();
          }}></Button>
      </View>
    </>
  );
}
