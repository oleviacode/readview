import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {logOut} from '../../../redux/auth/action';
import {useAppDispatch} from '../../../redux/store';
import {NaviProps} from '../../model';

export default function Main({navigation}: NaviProps) {
  const dispatch = useAppDispatch();

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
