import {View, Button, Image, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
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
  text: {
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

const CoverPage = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        borderRadius: 30,
      }}>
      <Image style={styles.logo} source={require('MyApp/images/logo.png')} />
      <Text style={styles.title}>Readview</Text>

      <Pressable style={styles.button}>
        <Text style={styles.text}>Login</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={styles.text}>Register</Text>
      </Pressable>
    </View>
  );
};

export default CoverPage;
