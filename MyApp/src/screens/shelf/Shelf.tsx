import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Button} from '@rneui/themed';
import {HStack} from '@react-native-material/core';
import Readlist from './Pages/Readlist';
import BooklistList from './Pages/BooklistList';

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
              onPress={() => {
                setStatus('readinglist');
              }}>
              Reading
            </Button>
            <Button
              onPress={() => {
                setStatus('readlist');
              }}>
              Read
            </Button>
            <Button
              onPress={() => {
                setStatus('wantlist');
              }}>
              Want to read
            </Button>
            <Button
              color="pink"
              onPress={() => {
                setStatus('ownerBooklist');
              }}>
              BookList
            </Button>
            <Button
              color="violet"
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
        {status == 'readinglist' && (
          <Readlist status={'readinglist'} />
        )}
        {status == 'readlist' && (
          <Readlist status={'readlist'} />
        )}
        {status == 'wantlist' && (
          <Readlist status={'wantlist'} />
        )}
        {status == 'ownerBooklist' && <BooklistList />}
        {status == 'author' }
      </View>
    </>
  );
}
