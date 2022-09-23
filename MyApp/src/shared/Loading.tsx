import React from 'react';
import {ActivityIndicator, View} from 'react-native';

export default function Loading() {
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
      }}>
      <ActivityIndicator size="large" color="#5699ee" />
    </View>
  );
}
