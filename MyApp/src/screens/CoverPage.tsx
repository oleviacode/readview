import {
  View,
  Button,
  Image,
  Text,
  Pressable,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    padding: 10,
  },
  centerBox: {
    width: '70%',
    height: '20%',
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 50,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#7380AA',
    margin: 20,
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  logo: {
    marginBottom: 25,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});

const image = require('MyApp/images/cover-page-bg.jpeg');



const CoverPage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.bgImg}>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            width: '100%',
            height: '60%',
            borderRadius: 30,
            padding: 30,
          }}>
          <Image
            style={styles.logo}
            source={require('../assets/logo.png')}
          />
          <Text style={styles.title}>Readview</Text>

          <Pressable style={styles.button} onPress={() => {navigation.navigate('Login')}}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => {navigation.navigate('Register')}}>
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
        </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default CoverPage;
