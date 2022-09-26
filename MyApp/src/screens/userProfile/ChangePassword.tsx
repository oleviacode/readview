import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {Button} from '@react-native-material/core';
import {styles} from '../../shared/stylesheet';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';

export default function ChangePassword() {
  const [oldPassword, onChangeOldPassword] = useState('');
  const [newPassword, onChangeNewPassword] = useState('');
  const [retypePassword, onChangeRetypePassword] = useState('');
  const navigation = useNavigation();
  const [error, setError] = useState('');

  async function upDatePassword() {
    setError('')
    if (newPassword != retypePassword) {
      setError('Password does not match. please retype the password again');
    } else if (newPassword == '' || newPassword.length < 3){
        setError('Password should contains more than 3 characters')
    } else {
      let password = {
        value: {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
      };
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${Config.REACT_APP_BACKEND_URL}/user/password`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(password),
      });
      const result = await res.json();

      if (result[0].status == 200) {
        navigation.goBack();
      } else {
        setError('Incorrect Password');
      }
    }
  }

  return (
    <View style={styles.container}>
        {error == '' ? <View></View> : <View style={{
          backgroundColor: 'pink',
          margin : 10,
          borderRadius : 10,
          padding: 10,
        }}>
          <Text style={{
            fontSize: 15,
            textAlign: 'center'
          }}>{error}</Text>
        </View>}
      <Text
        style={{
          fontSize: 30,
        }}>
        {' '}
        Update Password
      </Text>
      <Text
        style={{
          fontSize: 20,
          marginTop: 10,
        }}>
        {' '}
        Old Password
      </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeOldPassword}
        secureTextEntry={true}
        keyboardType={'default'}
        maxLength={20}
      />
      <Text
        style={{
          fontSize: 20,
        }}>
        {' '}
        New Password
      </Text>
      <TextInput
        style={styles.textInput}
        secureTextEntry={true}
        onChangeText={onChangeNewPassword}
        keyboardType={'default'}
      />
      <Text
        style={{
          fontSize: 20,
        }}>
        {' '}
        Retype Password
      </Text>
      <TextInput
        style={styles.textInput}
        secureTextEntry={true}
        onChangeText={onChangeRetypePassword}
        keyboardType={'default'}
      />

      <View>
        <Button
          style={{marginTop: 10}}
          title={'Submit'}
          onPress={() => {
            upDatePassword();
          }}></Button>
        <Button
          style={{marginTop: 20}}
          color={'lightgrey'}
          title={'Go back'}
          onPress={() => {
            navigation.goBack();
          }}></Button>
      </View>
    </View>
  );
}
