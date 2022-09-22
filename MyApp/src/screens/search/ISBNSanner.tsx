import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {RNCamera, FaceDetector} from 'react-native-camera';
import {styles} from '../../shared/stylesheet';

export default function ISBNcodeSanner() {
  return (
    <View style={styles.container}>
      <RNCamera
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}></RNCamera>
        <Text>Camera</Text>
    </View>
  );
}
