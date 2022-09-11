import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {logOut} from '../../../redux/auth/action';
import {useAppDispatch} from '../../../redux/store';
import {NaviProps} from '../../model';
import {SafeAreaView} from 'react-native-safe-area-context';

import Chat from '../chat/Chat';

export default function MainScreen({navigation}: NaviProps) {
  const dispatch = useAppDispatch();

  return (
    <View>
      <Text>hello</Text>

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

const styles = StyleSheet.create({
  container: {},
  topBar: {},
});
