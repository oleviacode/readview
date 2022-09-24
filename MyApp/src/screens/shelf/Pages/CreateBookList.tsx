import AsyncStorage from '@react-native-community/async-storage';
import {Button, HStack} from '@react-native-material/core';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Switch, Text, TextInput, View} from 'react-native';
import Config from 'react-native-config';
import {styles} from '../../../shared/stylesheet';

export default function CreateBookList() {
  const [title, onChangeTitle] = useState('');
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const [privateSwitch, setPrivateSwitch] = useState(false);
  const [privateMsg, setPrivateMsg] = useState('Public');

  async function createNewBooklist() {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(
      `${Config.REACT_APP_BACKEND_URL}/booklist/createBooklist`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        
        body: JSON.stringify({
            title: title,
            privateStatus:privateSwitch
        })
      },
    );
    const result = await res.json();
    if (result[0].status == 200) {
      navigation.goBack();
    } else {
      setError('Please Try Again');
    }
  }

  async function privateToggle() {
    if (privateSwitch) {
      setPrivateSwitch(false);
      setPrivateMsg('Public');
    } else {
      setPrivateSwitch(true);
      setPrivateMsg('Private');
    }
  }

  return (
    <View style={styles.container}>
      <Text>{error}</Text>
      <HStack style={{justifyContent: 'space-between'}}>
        <Text style={styles.userProfileText}>Input a title</Text>

        <HStack>
          <Text style={{fontSize: 15, paddingRight: 15, paddingTop: 7}}>
            {privateMsg}
          </Text>
          <Switch value={privateSwitch} onValueChange={privateToggle} />
        </HStack>
      </HStack>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeTitle}
        placeholder={`My bookList`}
        keyboardType={'default'}
      />
      <View>
        <Button
          style={{marginTop: 10}}
          title={'Submit'}
          onPress={() => {
            createNewBooklist();
          }}></Button>
        <Button
          style={{marginTop: 20}}
          color={'lightgrey'}
          title={'Go back'}
          onPress={() => {
            navigation.goBack();
          }}></Button>
      </View>
    </View>
  );
}
