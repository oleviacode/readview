import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from '../../shared/stylesheet';
import {RankingBoxProps} from '../../model';
import {HStack} from '@react-native-material/core';
import {useNavigation} from '@react-navigation/native';

export default function RankingBox(props: RankingBoxProps) {
  const navigation = useNavigation();
  const books = props['importedInfo'];
  const boxTitle = props['boxTitle'];

  return (
    <View style={styles.rankBox}>
      <Text style={[styles.titleText, {alignSelf: 'center', marginTop: 5}]}>
        {boxTitle}
      </Text>
      <View style={{marginTop: 20}}>
        {books &&
          books.map(book => {
            return (
              <TouchableOpacity
                key={book.id}
                onPress={() =>
                  navigation.navigate('BookProfile', {bookId: [book.id]})
                }>
                <HStack style={{flex: 1, flexWrap: 'wrap'}}>
                  <View style={styles.tinybook}>
                    <Image
                      style={{width: '100%', height: '100%'}}
                      source={{uri: book['book_picture']}}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      flexWrap: 'wrap',
                      marginLeft: 10,
                    }}>
                    <Text style={[styles.tinyText]}>{book['title']}</Text>
                  </View>
                </HStack>
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
}
