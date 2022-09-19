import {Text} from '@react-native-material/core';
import React, { useEffect, useState } from 'react';
import {Pressable, TextInput, View} from 'react-native';
import { useAppSelector } from '../../../redux/store';
import { launchImageLibrary } from 'react-native-image-picker'

export default function UserSettings() {
  const [username, onChangeUsername] = useState('');
  const [email, onChangeEmail] = useState('');
  const [info, onChangeInfo] = useState('');
  const [error, setError] = useState('');

  const user = useAppSelector(state => state.user)

  // function updateUserInfo(){
  //     const data = new FormData();
  //     data.append('')
  // }

  
  

  return (
    <>
      <View>
        <Text>UserSettings</Text>
        <Text style={{
              fontSize: 30,
            }}>changeUser Information</Text>
        <View>
          <Text>{error}</Text>
          <View>
            <Text>Username</Text>
            <TextInput
              onChangeText={onChangeUsername}
              value={user.username as string}
              placeholder={'username'}
              keyboardType={'default'}
            />
          </View>
          <View>
            <Text>Email</Text>
            <TextInput
              onChangeText={onChangeEmail}
              value={user.email as string}
              placeholder={'email'}
              keyboardType={'default'}
            />
          </View>
          <View>
            <Text>Info</Text>
            <TextInput
              onChangeText={onChangeInfo}
              value={user.info as string}
              placeholder={'info'}
              keyboardType={'default'}
            />
          </View>
          <Pressable>
            <Text onPress={() => {
                updateUserInfo()
            }}>submit</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

