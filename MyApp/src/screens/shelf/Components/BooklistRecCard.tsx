import {faHeart, faHome} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Badge, Divider, HStack} from '@react-native-material/core';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {BookListInfo, BooklistInfoProps} from '../../../model';
import {styles} from '../../../shared/stylesheet';

export default function (props: BooklistInfoProps) {
  const booklist = props['booklist'];
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.navigate('BookListScreen', {booklistId : booklist.id, booklistTitle: booklist.title
          })
        }}>
        <Text style={[styles.titleText, {marginTop: 15}]}>
          {booklist.title}
        </Text>
        <HStack
          style={[
            styles.regularBox,
            {padding: 0, justifyContent: 'space-between'},
          ]}>
          <View>
            <View style={{paddingBottom: 10}}>
              <Text>
                <FontAwesomeIcon icon={faHeart} color={'pink'} />{' '}
                {booklist.numoffollowers}
              </Text>
            </View>
            <View>
              {booklist.genre.slice(0, 3).map(item => (
                <Text>{item}</Text>
              ))}
            </View>
          </View>

          <View
            style={{flex: 1, justifyContent: 'space-between', marginLeft: 10}}>
            <HStack
              style={{
                padding: 10,
                justifyContent: 'flex-end',
                flexWrap: 'wrap',
              }}>
              {booklist.book_picture.slice(0, 6).map(book_picture => (
                <Image
                  style={styles.smallbook}
                  source={{
                    uri: book_picture,
                  }}></Image>
              ))}
            </HStack>
          </View>
        </HStack>
        <Divider />
      </Pressable>
    </View>
  );
}
