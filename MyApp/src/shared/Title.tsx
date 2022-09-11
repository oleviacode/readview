import React from 'react';
import {Text, Pressable, TextInput, View} from 'react-native';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {faQrcode} from '@fortawesome/free-solid-svg-icons/faQrcode';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {NaviProps} from '../model';

export default function TitleTop() {
  return (
    <View style={{backgroundColor: 'pink', borderRadius: 5}}>
      <TextInput
        style={{width: 200}}
        placeholder="Search.."
        placeholderTextColor="black"
      />
    </View>
  );
}

export function MessageTop({navigation}: NaviProps) {
  return (
    <Pressable onPress={() => navigation.navigate('Chat')}>
      <FontAwesomeIcon icon={faEnvelope} />
    </Pressable>
  );
}

export function QRCodeTop() {
  return <FontAwesomeIcon icon={faQrcode} />;
}
