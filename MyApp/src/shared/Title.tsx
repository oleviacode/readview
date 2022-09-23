import React, {useState} from 'react';
import {Text, Pressable, TextInput, View} from 'react-native';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {faQrcode} from '@fortawesome/free-solid-svg-icons/faQrcode';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation, useRoute} from '@react-navigation/native';
import {faBackward, faSearch} from '@fortawesome/free-solid-svg-icons';
import {useAppDispatch} from '../../redux/store';
import {saveSearchParams} from '../../redux/search/action';
import {HStack} from '@react-native-material/core';

// TAB BUTTONS

export default function TitleTop() {
  const dispatch = useAppDispatch();
  const [search, onChangeSearchParams] = useState('');
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View
      style={{
        backgroundColor: 'lightyellow',
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
      }}>
      <HStack>
        <TextInput
          style={{width: 200}}
          onChangeText={onChangeSearchParams}
          placeholder={'search'}
          keyboardType={'default'}
        />
        <Pressable
          onPress={() => {
            dispatch(saveSearchParams(search));
            if (route.name == 'Search') {
              //do nothing
            } else {
              navigation.navigate('Search');
            }
          }}>
          <FontAwesomeIcon icon={faSearch} />
        </Pressable>
      </HStack>
    </View>
  );
}

export function MessageTop() {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('Chat');
      }}>
      <FontAwesomeIcon icon={faEnvelope} size={30} color="#f8f7f7" />
    </Pressable>
  );
}

export function QRCodeTop() {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('Scanner');
      }}>
      <FontAwesomeIcon icon={faQrcode} size={30} color="#f8f7f7" />
    </Pressable>
  );
}
