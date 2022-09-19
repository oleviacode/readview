import React, { useState } from 'react';
import {Text, TextInput, View} from 'react-native';
import { useAppSelector } from '../../../redux/store';

export default function ChangeUsername() {

  const [username, onChangeUsername] = useState('');
  const oldUsername = useAppSelector(state => state.user.username)
  
  return (
    <View>
      <Text>Username</Text>
      <TextInput
        onChangeText={onChangeUsername}
        placeholder={oldUsername as string}
        keyboardType={'default'}
      />
    </View>
  );
}
