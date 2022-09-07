import React, { useEffect } from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding:10,
  },
  centerBox: {
    width: '70%',
    height: '20%',
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const image = require('MyApp/images/cover-page-bg.jpeg');

const LoadingScreen = () => {

    // const name = useSelector((state: RootState) => state.auth.username)
    // const dispatch = useDispatch()

    // useEffect()

  return (
    <>
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.bgImg}>
          <View style={styles.centerBox}>
            <Text style={styles.text}>meow</Text>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

export default LoadingScreen;
