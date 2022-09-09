import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {logOut} from '../../redux/auth/action';
import {RootState, useAppDispatch, useAppSelector} from '../../redux/store';

export default function Main() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const user = useAppSelector((state) => state.user.username)

  return (
    <SafeAreaView>
      <View>
        <Text> Hello</Text>
        <Text>{user}</Text>
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
    </SafeAreaView>
  );
}
