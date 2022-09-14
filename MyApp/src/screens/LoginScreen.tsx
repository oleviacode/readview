import React, {useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import Config from 'react-native-config';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {loggedIn} from '../../redux/auth/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {insertUserIntoRedux} from '../../redux/user/userinfo/action';

export default function LoginScreen() {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const login = async () => {
    if (email == '' || password == '') {
      setError('please fill in all the categories');
    } else {
      const res = await fetch(`${Config.REACT_APP_BACKEND_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
          email: email.toLowerCase(),
          password: password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await res.json();

      if (result.statusCode == 200) {
        await AsyncStorage.setItem('token', result.token);
        dispatch(loggedIn(result.user.email, result.token));
        dispatch(insertUserIntoRedux(result.user));
        navigation.navigate('DashBoard');
      } else {
        setError(`please try again`);
      }
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Text
          style={{
            fontSize: 30,
          }}>
          Login
        </Text>
        <Text>{error}</Text>
        <View>
          <Text>Email</Text>
          <TextInput
            onChangeText={onChangeEmail}
            placeholder={'email'}
            keyboardType={'email-address'}
          />
        </View>
        <View>
          <Text>Password</Text>
          <TextInput
            secureTextEntry={true}
            onChangeText={onChangePassword}
            keyboardType={'default'}
          />
        </View>
        <Pressable>
          <Text
            onPress={() => {
              login();
            }}>
            Login
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
