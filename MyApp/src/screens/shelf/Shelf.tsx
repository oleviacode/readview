import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Button} from '@rneui/themed';
import {HStack} from '@react-native-material/core';
import Readlist from './Pages/Readlist';
import BooklistList from './Pages/BooklistList';
import AuthorRecCard from './Components/AuthorRecCard';
import AuthorList from './Pages/AuthorList';

export default function Search() {
  // -------------------------------------------------------------------------------------------------------------------
  // settings
  // -------------------------------------------------------------------------------------------------------------------

  const [status, setStatus] = useState('readinglist');

  // -------------------------------------------------------------------------------------------------------------------
  // component
  // -------------------------------------------------------------------------------------------------------------------

  return (
    <>
      {/* The horizontal side Bar*/}
      <View
        style={{
          padding: 10,
        }}>
        <ScrollView
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <HStack spacing={6}>
            <Button
              color={'#4A649D'}
              onPress={() => {
                setStatus('readinglist');
              }}>
              Reading
            </Button>
            <Button
              color={'#4A649D'}
              onPress={() => {
                setStatus('readlist');
              }}>
              Read
            </Button>
            <Button
              color={'#4A649D'}
              onPress={() => {
                setStatus('wantlist');
              }}>
              Want to read
            </Button>
            <Button
              color="#C7BE9D"
              onPress={() => {
                setStatus('ownerBooklist');
              }}>
              BookList
            </Button>
            <Button
              color="#7780A4"
              onPress={() => {
                setStatus('authors');
              }}>
              Authors
            </Button>
          </HStack>
        </ScrollView>
      </View>

      <View
        style={{
          paddingHorizontal: 9,
        }}>
        {status == 'readinglist' && <Readlist status={'readinglist'} />}
        {status == 'readlist' && <Readlist status={'readlist'} />}
        {status == 'wantlist' && <Readlist status={'wantlist'} />}
        {status == 'ownerBooklist' && <BooklistList />}
        {status == 'authors' && <AuthorList />}
      </View>
    </>
  );
}
