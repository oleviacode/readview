import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import { useDispatch, } from 'react-redux';
import { checkLogin, } from '../../redux/auth/action';
import { useAppDispatch } from '../../redux/store';

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

  const dispatch = useAppDispatch()
  const navigation = useNavigation();

  useEffect(() => {

    async function checkJwt(){
      const token = await AsyncStorage.getItem('token')
      if(token == null){
        navigation.navigate('Cover')
      } else {
        const result = await dispatch(checkLogin(token))
        if (result) {
          navigation.navigate('Main')
        } else {
          navigation.navigate('Cover')
        }
      }
    }

    checkJwt()
  }, [useDispatch])

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
