import React, {useState} from 'react';
import {Text, Pressable, TextInput, View} from 'react-native';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {faQrcode} from '@fortawesome/free-solid-svg-icons/faQrcode';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

// TAB BUTTONS

export default function TitleTop() {
  const [search, onChangeSearchParams] = useState('');
  const navigation = useNavigation();
  return (
    <View style={{backgroundColor: 'pink', borderRadius: 5}}>
      <TextInput
        style={{width: 200}}
        onChangeText={onChangeSearchParams}
        placeholder={'search'}
        keyboardType={'default'}
      />
      <Pressable
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Search');
        }}>
        <FontAwesomeIcon icon={faSearch} />
      </Pressable>
    </View>
  );
}

export function MessageTop() {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate('Chat')}>
      <FontAwesomeIcon icon={faEnvelope} />
    </Pressable>
  );
}

export function QRCodeTop() {
  return <FontAwesomeIcon icon={faQrcode} />;
}
