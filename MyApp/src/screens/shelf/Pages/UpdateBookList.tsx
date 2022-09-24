import AsyncStorage from '@react-native-community/async-storage';
import {Button, HStack} from '@react-native-material/core';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Switch, Text, TextInput, View} from 'react-native';
import Config from 'react-native-config';
import { resourceLimits } from 'worker_threads';
import {styles} from '../../../shared/stylesheet';

export default function UpdateBookList({route}: any) {
  // -------------------------------------------------------------------------------------------------------------------
  // settings
  // -------------------------------------------------------------------------------------------------------------------
  const {booklistId} = route.params;
  const [title, onChangeTitle] = useState('');
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const [privateSwitch, setPrivateSwitch] = useState(false);
  const [privateMsg, setPrivateMsg] = useState('Public');
  const [placeholder, setPlaceholder] = useState('')

  // -------------------------------------------------------------------------------------------------------------------
  // functions
  // -------------------------------------------------------------------------------------------------------------------
  
  async function updateBooklist() {
    if (title.length < 3) {
      setError('Please input at least 3 charaters!');
    } else {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/booklist/updated/${booklistId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          method: 'PATCH',

          body: JSON.stringify({
            title: title,
            privateStatus: privateSwitch,
          }),
        },
      );
      const result = await res.json();
      if (result[0].status == 200) {
        navigation.goBack();
      } else {
        setError('Please Try Again');
      }
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

  // -------------------------------------------------------------------------------------------------------------------
  // use effect
  // -------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    async function fetchBookList(){
      const token = await AsyncStorage.getItem('token');
      //fetch booklists
      const resBooklist = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/booklist/booklistInfo/${booklistId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      );
      const result = await resBooklist.json();

      if(result[0].message){
        navigation.goBack()
      } else {
        setPrivateSwitch(result[0].private)
        if (result[0].private == false) {
          setPrivateMsg('Public');
        } else {
          setPrivateMsg('Private');
        }
        setPlaceholder(result[0].title)
      }
    }
    fetchBookList()
  },[])

  //-------------------------------------------------------------------------------------------------------------------
  // return
  // -------------------------------------------------------------------------------------------------------------------

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
        keyboardType={'default'}
        placeholder={placeholder}
      />
      <View>
        <Button
          style={{marginTop: 10}}
          title={'Submit'}
          onPress={() => {
            updateBooklist();
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
