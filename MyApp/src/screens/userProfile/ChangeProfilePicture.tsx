import AsyncStorage from '@react-native-community/async-storage';
import {Button} from '@react-native-material/core';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Platform, Text, View} from 'react-native';
import Config from 'react-native-config';
import * as ImagePicker from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { updatePicture } from '../../../redux/user/userinfo/action';
import {styles} from '../../shared/stylesheet';

const createFormData = (photo: any) => {

  const data = new FormData();

  data.append('file', {
    name: photo.assets[0].fileName,
    type: photo.assets[0].type,
    uri: photo.assets[0].uri.replace('file://', ''),
  });

  return data;
};

export default function ChangeProfilePicture() {
  const [photo, setPhoto] = useState<ImagePicker.ImagePickerResponse>();
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const handleChoosePhoto = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        maxHeight: 800,
        maxWidth: 800,
      },
      response => {
        setPhoto(response);
      },
    );
  };

  async function handleUploadPhoto() {
    if (photo?.assets == undefined) {
      setError('Please select a photo');
    } else {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${Config.REACT_APP_BACKEND_URL}/user/image`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
        body: createFormData(photo),
      });

      const result = await res.json();
      if (result[0].status == 200){
          dispatch(updatePicture(result[0].fileName))
          setError('successfully updated')
          setPhoto(undefined)
      }
    }
  }

  return (
    <View style={styles.container}>
      {error == '' ? (
        <View></View>
      ) : (
        <View
          style={{
            backgroundColor: 'pink',
            margin: 10,
            borderRadius: 10,
            padding: 10,
          }}>
          <Text
            style={{
              fontSize: 15,
              textAlign: 'center',
            }}>
            {error}
          </Text>
        </View>
      )}
      {photo?.assets == undefined ? (
        <></>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Image
            source={{uri: photo.assets[0].uri}}
            style={{width: 300, height: 300}}
          />
        </View>
      )}
      <Button
      color={'#7780A4'}
        style={{marginTop: 10}}
        title={'Select Photo'}
        onPress={() => {
          handleChoosePhoto();
        }}></Button>
      <Button
      color={'#7196E1'}
        style={{marginTop: 10}}
        title={'Submit'}
        onPress={() => {
          handleUploadPhoto();
        }}></Button>
      <Button
        style={{marginTop: 20}}
        color={'lightgrey'}
        title={'Go back'}
        onPress={() => {
          navigation.goBack();
        }}></Button>
    </View>
  );
}
