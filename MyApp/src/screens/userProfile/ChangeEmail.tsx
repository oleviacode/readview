import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {updateUserInfo} from '../../../redux/user/userinfo/action';

export default function ChangeEmail() {
  const [email, onChangeEmail] = useState('');
  const oldEmail = useAppSelector(state => state.user.email);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [error, setError] = useState('');

  async function updateEmail() {
    const lowerCased = email.toLowerCase()
    const result = await dispatch(updateUserInfo('email', lowerCased));
    console.log(result[0].status)
    if (result[0].status == 200) {
      navigation.goBack();
    } else {
      setError('Please Try Again')
    }
    
  }

  return (
    <View>
      <Text>{error}</Text>
      <Text>Email</Text>
      <TextInput
        onChangeText={onChangeEmail}
        placeholder={oldEmail as string}
        keyboardType={'default'}
      />
      <Pressable onPress={() => {
        updateEmail()
      }}>
        <Text>Submit</Text>
      </Pressable>
    </View>
  );
}
