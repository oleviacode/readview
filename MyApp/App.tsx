import React from 'react';
import {ImageBackground, StyleSheet, View, Text} from 'react-native';
import CoverPage from './src/CoverPage';

const image = require('MyApp/images/cover-page-bg.jpeg');

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
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  centerBox: {
    width: '70%',
    height: '60%',
    backgroundColor: 'white',
    borderRadius: 20,
  },
});

const App = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.bgImg}>
        <View style={styles.centerBox}>
          <CoverPage />
        </View>
      </ImageBackground>
    </View>
  );
};
export default App;
