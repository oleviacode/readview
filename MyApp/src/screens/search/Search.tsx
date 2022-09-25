import React, {useState} from 'react';
import { ScrollView, View} from 'react-native';
import {Button} from '@rneui/themed';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {styles} from '../../shared/stylesheet';

import ByTitle from './pages/ByTitle';
import ByAuthor from './pages/ByAuthor';
import ByBookList from './pages/ByBookList';
import { HStack } from '@react-native-material/core';

export default function Search() {
  // -------------------------------------------------------------------------------------------------------------------
  // settings
  // -------------------------------------------------------------------------------------------------------------------
  const [status, setStatus] = useState('book');

  // -------------------------------------------------------------------------------------------------------------------
  // return
  // -------------------------------------------------------------------------------------------------------------------
  return (
    <View style={[styles.container, {marginTop: 10}]}>
      <View>
        <HStack style={{justifyContent: 'center'}} spacing={10}>
          <Button
            style={{marginRight: 10}}
            onPress={() => {
              setStatus('book')
            }}>
            Book
          </Button>
          <Button
            style={{marginRight: 10}}
            color="pink"
            onPress={() => {
              setStatus('author')
            }}>
            Author
          </Button>
          <Button
            style={{marginRight: 10}}
            color="pink"
            onPress={() => {
              setStatus('booklist')
            }}>
            Booklist
          </Button>
        </HStack>
      </View>

      {status == 'book' && <ByTitle />}
      {status == 'author' && <ByAuthor />}
      {status == 'booklist' && <ByBookList />}
        
    </View>
  );
}
