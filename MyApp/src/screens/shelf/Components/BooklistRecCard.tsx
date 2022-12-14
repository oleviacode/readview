import {faHeart, faHome} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Badge, Divider, HStack} from '@react-native-material/core';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import { BooklistInfoProps} from '../../../model';
import {styles} from '../../../shared/stylesheet';

export default function (props: BooklistInfoProps) {
  const booklist = props['booklist'];
  const navigation = useNavigation();
  return (
    <View style={[styles.container, {backgroundColor:'#F1F0F0'}]}>
      <Pressable
        onPress={() => {
          navigation.navigate('BookListScreen', {
            booklistId: booklist.id,
            booklistTitle: booklist.title,
          });
        }}>
        <HStack style={{justifyContent: 'space-between'}}>
        <Text style={[styles.titleText, {marginTop: 15}]}>
          {booklist.title}
        </Text>
        {booklist.private && <Badge label={'private'} style={{marginTop:20,}} color={'lightblue'}/>}
        </HStack>
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
              {booklist.genre[0] == null ? <Text style={{marginBottom: 20}}>No Books yet</Text>:booklist.genre.slice(0, 3).map(item => (
                <Text key={item}>{item}</Text>
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
              {booklist.book_picture[0] == null ? (
                <></>
              ) : (
                booklist.book_picture.slice(0, 6).map(book_picture => (
                  <Image
                  key={book_picture}
                    style={styles.smallbook}
                    source={{
                      uri: book_picture,
                    }}></Image>
                ))
              )}
            </HStack>
          </View>
        </HStack>
        <Divider />
      </Pressable>
    </View>
  );
}
