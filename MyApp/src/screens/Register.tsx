import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Dropdown} from 'react-native-element-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginSchema = Yup.object().shape({
  username: Yup.string().trim().lowercase().required('username is Required'),
  email: Yup.string().required('email is Required').email(),
  password: Yup.string().required('password Required').min(3),
  gender: Yup.object(),
});

const gender = [
  {label: 'Male', value: '1'},
  {label: 'Female', value: '2'},
  {label: 'Other', value: '3'},
];

export default function Register() {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [value, setValue] = useState({label: 'haha', value: '4'});

  return (
    <SafeAreaView>
    <View>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          gender: value,
        }}
        onSubmit={values => {
          LoginSchema.validate(values)
            .then(valid => {
              console.log('valid');
              console.log(values);
            })
            .catch(err => {
              console.log(err.errors);
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
                setValue(item);
                handleChange('gender');
              }}
            />

            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
      <Text>{errorMsg}</Text>
      <Text>{JSON.stringify(value)}</Text>
    </View>
    </SafeAreaView>
  );
}
