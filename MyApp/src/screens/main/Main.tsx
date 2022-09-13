import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {logOut} from '../../../redux/auth/action';
import {useAppDispatch} from '../../../redux/store';
import {NaviProps} from '../../model';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button} from '@rneui/themed';
import {HStack} from '@react-native-material/core';

import Chat from '../chat/Chat';

export default function MainScreen({navigation}: NaviProps) {
  const dispatch = useAppDispatch();

  return (
    <View>
      <Text>hello</Text>
      <HStack m={4} spacing={6}>
        <Button>Primary</Button>
        <Button style={{backgroundColor: 'pink'}}>Secondary</Button>
        <Button color="green">Warning</Button>
        <Button color="red">Error</Button>
      </HStack>

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
