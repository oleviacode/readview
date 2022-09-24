import { Button } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { updateUserInfo } from '../../../redux/user/userinfo/action';
import { styles } from '../../shared/stylesheet';

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
    <View style={styles.container}>
      <Text>{error}</Text>
      <Text style={{
        fontSize: 30
        
      }}> Change Username </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeUsername}
        placeholder={`${oldUsername as string}`}
        keyboardType={'default'}
      />
      <View>
      <Button
      style={{marginTop: 10}}
      title={'Submit'}
      onPress={() => {
        upDateUsername()
      }}>
      </Button>
      <Button
      style={{marginTop: 20}}
      color={'lightgrey'}
      title={'Go back'}
      onPress={() => {
        navigation.goBack()
      }}></Button>
      </View>
    </View>
  );
}
