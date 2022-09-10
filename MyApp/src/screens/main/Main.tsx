import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {logOut} from '../../../redux/auth/action';
import {useAppDispatch} from '../../../redux/store';

export default function Main() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  return (
    <View>
      <Text> I am Homepage Yah</Text>
      <Pressable>
        <Text
          onPress={() => {
            dispatch(logOut());
            navigation.navigate('Cover');
          }}>
          Logout
        </Text>
      </Pressable>
    </View>
  );
}
