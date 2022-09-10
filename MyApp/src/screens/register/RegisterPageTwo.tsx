import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, StyleSheet, View, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NaviProps} from '../../model';

export default function RegisterPageTwo({navigation}: NaviProps) {
  const [likedGenre, setLikedGenre] = useState<string[]>([]);

  const ChooseBook = (props: Book) => {
    return (
      <Pressable
        style={styles.btnNormal}
        onPress={() => {
          setLikedGenre([...likedGenre, props.title]);
        }}>
        <Text>{props.title}</Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView>
      <Text>What do you like to read?</Text>
      <Text>I like to read {likedGenre}</Text>
      <View style={styles.container}>
        {listOfGenres.map(genre => {
          return <ChooseBook title={genre} />;
        })}
      </View>
      <Pressable onPress={() => {}}>
        <Text>Next</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'pink',
    width: '100%',
    height: '85%',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  btnNormal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
  btnPress: {
    backgroundColor: 'blue',
    width: 100,
    height: 100,
  },
});

const listOfGenres = [
  'Arts',
  'Fantasy',
  'Graphic Novel',
  'History',
  'Romance',
  'Mystery',
  'Psychology',
  'Sports',
  'Social Science',
  'Self-help',
  'Religion',
  'Science',
  'Health',
  'Political',
  'Science fiction',
];

type Book = {
  title: string;
};
