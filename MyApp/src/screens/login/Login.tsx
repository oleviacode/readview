import React, {useState} from 'react';
import {View, Text, Button, Image} from 'react-native';
import {NaviProps} from '../../model';

export default function Login({navigation}: NaviProps) {
  return (
    <View>
      <Image source={require('MyApp/src/assets/logo.png')} />
      <Button title="Login" />
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
}
