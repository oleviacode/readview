import {faHeart} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Badge, Divider, HStack} from '@react-native-material/core';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import { AuthorInfoProps} from '../../../model';
import {styles} from '../../../shared/stylesheet';

export default function AuthorRecCard(props: AuthorInfoProps) {
  const authorlist = props['authorlist'];
  const navigation = useNavigation();

  return (
    <View style={[styles.container, {backgroundColor:'#F1F0F0'}]}>
      <Pressable
        onPress={() => {
          navigation.navigate('AuthorScreen', {authorId: authorlist.id});
        }}>
        <HStack style={{justifyContent: 'space-between'}}>
        <Text style={[styles.titleText, {marginTop: 15}]}>
          {authorlist.author_name}
        </Text>
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
                {authorlist.numoffollowers}
              </Text>
            </View>
            <View>
              {authorlist.genres.slice(0, 3).map(item => (
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
              {authorlist.bookpictures[0] == null ? (
                <></>
              ) : (
                authorlist.bookpictures.slice(0, 6).map(book_picture => (
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
