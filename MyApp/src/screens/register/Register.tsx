import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Dropdown} from 'react-native-element-dropdown';
import {SafeAreaView} from 'react-native-safe-area-context';
import DatePicker from 'react-native-datepicker';
import currentDate from '../../shared/currentDate';
import {NaviProps} from '../../model';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginSchema = Yup.object().shape({
  username: Yup.string().trim().lowercase().required('username is Required'),
  email: Yup.string().required('email is Required').email(),
  password: Yup.string().required('password Required').min(3),
  gender: Yup.string(),
  birthday: Yup.string(),
});

const gender = [
  {label: 'Male', value: '1'},
  {label: 'Female', value: '2'},
  {label: 'Other', value: '3'},
];

export default function RegisterPageOne({navigation}: NaviProps) {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [date, setDate] = useState(currentDate());
  console.log('hi');
  return (
    <SafeAreaView>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          gender: '',
          birthday: date,
        }}
        onSubmit={values => {
          LoginSchema.validate(values)
            .then(async () => {
              console.log(values);

              try {
                const userInfo = JSON.stringify(values);
                await AsyncStorage.setItem('@global_userinfo', userInfo);
                console.log('async storage ran');
              } catch (e) {
                console.log('save error');
                console.log(e);
              }

              // ADD FETCH HERE
              navigation.navigate('Register2');
            })
            .catch(err => {
              setErrorMsg(err.errors);
            });
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
          values,
        }) => (
          <View>
            <TextInput
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              placeholder="username"
            />
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder="password"
              secureTextEntry
            />

            <Dropdown
              data={gender}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select gender"
              value={values.gender}
              onChange={item => {
                handleChange('gender')(item.label);
              }}
            />
            <DatePicker
              date={date} //initial date from state
              mode="date" //The enum of date, datetime and time
              placeholder="select date"
              format="DD-MM-YYYY"
              minDate="01-01-1900"
              maxDate="01-01-2022"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  //display: 'none',
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
              }}
              onDateChange={date => {
                setDate(date);
                console.log('date is: ', date);
                handleChange('birthday')(date);
              }}
            />

            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
      <Button title="go back" onPress={() => navigation.goBack()} />
      <Text>{errorMsg}</Text>
    </SafeAreaView>
  );
}
