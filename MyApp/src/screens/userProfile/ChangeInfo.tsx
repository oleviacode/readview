import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import { Text, TextInput, View} from 'react-native';
import { Button } from '@react-native-material/core';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {updateUserInfo} from '../../../redux/user/userinfo/action';
import { styles } from '../../shared/stylesheet';

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
    <View style={styles.container}>
      <Text>{error}</Text>
      <Text style={{
        fontSize: 30
        
      }}> Update Information</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeInfo}
        placeholder={`${oldInfo as string}`}
        keyboardType={'default'}
        maxLength={50}
        
      />
      <View>
      <Button
      color={'#7196E1'}
      style={{marginTop: 10}}
      title={'Submit'}
      onPress={() => {
        upDateInfo()
      }}>
      </Button>
      <Button
      style={{marginTop: 20}}
      color={'lightgrey'}
      title={'Go back'}
      onPress={() => {
        navigation.goBack()
      }}></Button>
      </View>
    </View>
  );
}
