import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {updateUserInfo} from '../../../redux/user/userinfo/action';

export default function ChangeInfo() {
  const [info, onChangeInfo] = useState('');
  const oldInfo = useAppSelector(state => state.user.info);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [error, setError] = useState('');

  async function upDateInfo() {
    const result = await dispatch(updateUserInfo('info', info));
    if (result[0].status == 200) {
      navigation.goBack();
    } else {
      setError('Please Try Again')
    }
    
  }

  return (
    <View>
      <Text>{error}</Text>
      <Text>Info</Text>
      <TextInput
        onChangeText={onChangeInfo}
        placeholder={oldInfo as string}
        keyboardType={'default'}
      />
      <Pressable onPress={() => {
        upDateInfo()
      }}>
        <Text>Submit</Text>
      </Pressable>
    </View>
  );
}
