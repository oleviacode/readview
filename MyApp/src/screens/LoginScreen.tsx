import React, {useState} from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Config from 'react-native-config';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {loggedIn} from '../../redux/auth/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {insertUserIntoRedux} from '../../redux/user/userinfo/action';
import {HStack} from '@react-native-material/core';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 20,
    lineHeight: 0,
    fontWeight: 'bold',
    textAlign: 'left',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 0,
  },
  centerBox: {
    width: '70%',
    height: '20%',
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 50,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#7380AA',
    margin: 20,
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  logo: {
    marginBottom: 25,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 15,
    width: 200
  },
});

const image = require('MyApp/images/cover-page-bg.jpeg');

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
      setError('');
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
        setError(`inncorrect password or email, please try again`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.bgImg}>
        <SafeAreaView
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              width: '100%',
              height: '60%',
              borderRadius: 30,
              padding: 40,
            }}>
            <Text style={styles.title}>Login</Text>
            <Text
              style={{
                color: 'red',
                paddingBottom: 20,
              }}>
              {error}
            </Text>
            <View>
              <Text style={styles.text}>Email:</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={onChangeEmail}
                  placeholder={' email'}
                  keyboardType={'email-address'}
                />
                <Text style={styles.text}>Password: </Text>

              <TextInput
                style={styles.textInput}
                secureTextEntry={true}
                onChangeText={onChangePassword}
                keyboardType={'default'}
              />
            </View>

            <HStack></HStack>
            <Pressable
              style={styles.button}
              onPress={() => {
                login();
              }}>
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
