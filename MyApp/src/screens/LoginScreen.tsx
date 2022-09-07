import React, {useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Config from "react-native-config"

export default function LoginScreen() {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [error, setError] = useState('')

  const login = async () => {
    if(email == '' || password == ''){
        setError('please fill in all the categories')
    } else {
        const res = await fetch(`${Config.REACT_APP_BACKEND_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify({
              email: email.toLowerCase(),
              password: password,
            }),
            credentials:'include',
            headers: {
              "Content-Type": "application/json",
            },
        })
        const result = await res.json()
        console.log(result)
    }

  };

  return (
    <SafeAreaView>
      <View>
        <Text style={{
            fontSize:30
        }}>Login</Text>
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
          <Text onPress={() => {login()}}>Login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
