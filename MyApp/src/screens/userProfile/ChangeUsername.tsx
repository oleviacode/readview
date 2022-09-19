import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { updateUserInfo } from '../../../redux/user/userinfo/action';

export default function ChangeUsername() {

  const [username, onChangeUsername] = useState('');
  const oldUsername = useAppSelector(state => state.user.username)
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [error, setError] = useState('');

  async function upDateUsername() {
    const result = await dispatch(updateUserInfo('username', username));
    if (result[0].status == 200) {
      navigation.goBack();
    } else {
      setError('Please Try Again')
    }
    
  }
  
  return (
    <View>
      <Text>{error}</Text>
      <Text>Username</Text>
      <TextInput
        onChangeText={onChangeUsername}
        placeholder={oldUsername as string}
        keyboardType={'default'}
      />
      <Pressable onPress={() => {
        upDateUsername()
      }}>
        <Text>Submit</Text>
      </Pressable>
    </View>
  );
}
