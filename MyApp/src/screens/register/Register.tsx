import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import * as Yup from 'yup';

import {SafeAreaView} from 'react-native-safe-area-context';

import {NaviProps, RegInfo} from '../../model';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import {useDispatch} from 'react-redux';
import {loggedIn} from '../../../redux/auth/action';
import {insertUserIntoRedux} from '../../../redux/user/userinfo/action';
import {styles} from '../../shared/stylesheet';
import {HStack} from '@react-native-material/core';
import DatePicker from 'react-native-date-picker';
import {Birthday} from '../../model';

const LoginSchema = Yup.object().shape({
  username: Yup.string().trim().lowercase().required('username is Required'),
  email: Yup.string().required('email is Required').email(),
  password: Yup.string().required('password Required').min(3),
  gender: Yup.string(),
});

export default function RegisterPageOne({navigation}: NaviProps) {
  const [errorMsg, setErrorMsg] = useState<string>('');

  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [gender, setGender] = useState<string>('other');
  const [birthday, setBirthday] = useState<Birthday>(null);
  const [password, setPassword] = useState('');

  async function submit() {
    const regForm = {
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      gender: gender,
      birthday: birthday,
      password: password,
    };

    try {
      const results = await LoginSchema.validate(regForm);
      const res = await fetch(`${Config.REACT_APP_BACKEND_URL}/auth/register`, {
        method: 'POST',
        body: JSON.stringify(regForm),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await res.json();
      if (result.statusCode == 200) {
        await AsyncStorage.setItem('token', result.token);
        dispatch(loggedIn(result.user.email, result.token));
        dispatch(insertUserIntoRedux(result['user'][0]));
        navigation.navigate('DashBoard');
      } else {
        setErrorMsg('Please try again');
      }
    } catch (e) {
      setErrorMsg(e.errors[0]);
    }
  }

  const dispatch = useDispatch();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container, {backgroundColor: '#7380AA'}]}>
        <View style={styles.regularBox}>
          <Text
            style={{
              fontSize: 50,
              fontWeight: 'bold',
              color: '#CCBD95',
              marginBottom: 30,
            }}>
            Register
          </Text>
          <Text style={[styles.titleText]}>Username</Text>
          <TextInput
            onChangeText={value => {
              setUsername(value);
            }}
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 2,
              height: 40,
            }}
          />

          <Text style={[styles.titleText, {marginTop: 20}]}>Email</Text>
          <TextInput
            onChangeText={value => setEmail(value)}
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 2,
              height: 40,
            }}
          />

          <Text style={[styles.titleText, {marginTop: 20}]}>Password</Text>
          <TextInput
            secureTextEntry={true}
            onChangeText={value => setPassword(value)}
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 2,
              height: 40,
            }}
          />

          <Text style={[styles.titleText, {marginTop: 20}]}>Gender</Text>
          <HStack style={{marginTop: 15, marginBottom: 15, borderRadius: 10}}>
            <TouchableOpacity
              onPress={() => setGender('male')}
              style={[regStyles.genderBtn, {backgroundColor: '#3766A6'}]}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setGender('female')}
              style={[regStyles.genderBtn, {backgroundColor: '#3766A6'}]}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                Female
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setGender('other')}
              style={[regStyles.genderBtn, {backgroundColor: '#3766A6'}]}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                Doesn't matter
              </Text>
            </TouchableOpacity>
          </HStack>
          {/* <HStack style={{alignItems: 'center', marginTop: 10}} spacing={20}>
            <Text style={styles.titleText}>Birthday</Text>
            <TouchableOpacity
              style={{backgroundColor: 'white'}}
              onPress={() => setOpen(true)}>
              <Text style={{color: '#3766a6', fontWeight: 'bold'}}>
                Choose date
              </Text>
            </TouchableOpacity>
          </HStack> */}

          <Text style={{color: 'red'}}>{errorMsg}</Text>
          <View style={{alignItems: 'flex-end', marginTop: 30}}>
            <TouchableOpacity onPress={submit}>
              <Text style={{fontSize: 30, fontWeight: 'bold'}}>Next</Text>
            </TouchableOpacity>
          </View>

          <DatePicker
            modal
            open={open}
            date={new Date()}
            mode="date"
            onConfirm={date => {
              setOpen(false);
              setBirthday(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const regStyles = StyleSheet.create({
  genderBtn: {
    backgroundColor: 'pink',
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
