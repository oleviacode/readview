import React, {useEffect} from 'react';
import {HStack, Badge, Divider} from '@react-native-material/core';
import {View, Text, Pressable, Image} from 'react-native';
import {styles} from '../../shared/stylesheet';
import {AirbnbRating} from '@rneui/themed';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBookmark} from '@fortawesome/free-solid-svg-icons/faBookmark';
import {BookProfileProps} from '../../model';
import {useState} from 'react';
import Config from 'react-native-config';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function BookRecCard(props: BookProfileProps) {
  const [saveBook, setSaveBook] = useState('lightgrey');
  const [saveBookSwitch, setSaveBookSwitch] = useState(false);
  const [picture, setPicture] = useState(
    `${Config.REACT_APP_BACKEND_URL}/uploads/default.jpg`,
  );
  const book = props['bookInfo'];
  const navigation = useNavigation()
  const route = useRoute()
  const title = route.name

  useEffect(() => {
    if (book['readerstatus'] == 'want to read' || saveBookSwitch == true) {
      setSaveBook('#eac645');
    } else {
      setSaveBookSwitch(false);
      setSaveBook('lightgrey');
    }
    if (book.book_picture) {
      setPicture(`${book.book_picture}`);
    }
  }, [saveBook, saveBookSwitch, picture,]);

  return (
    <View>
      <Pressable onPress={() => {
        title == 'BookProfile' ? navigation.push('BookProfile', {bookId: [book.id]}) : navigation.navigate('BookProfile', {bookId: [book.id]})
      }}>
        <HStack style={[styles.regularBox, {padding: 0}]}>
          <View>
            <Image style={styles.book} source={{uri: picture}}></Image>
          </View>

          <View
            style={{flex: 1, justifyContent: 'space-between', marginLeft: 10}}>
            <View>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                {book['title']}
              </Text>
              <Text style={[styles.smallText, {marginTop: 8}]}>
                {book['author_name']}
              </Text>
              <Text style={styles.smallText}>{book['genre']}</Text>
            </View>
            <HStack style={{justifyContent: 'space-between'}}>
              <AirbnbRating
                size={15}
                showRating={false}
                defaultRating={book['rating']}
                count={5}
                selectedColor="#eac645"
              />
              <HStack
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <Badge
                  label={book['readerstatus'] ? book['readerstatus'] : 'unread'}
                />

                <Pressable onPress={() => setSaveBookSwitch(!saveBookSwitch)}>
                  <FontAwesomeIcon
                    size={20}
                    icon={faBookmark}
                    color={saveBook}
                    style={{marginLeft: 20}}
                  />
                </Pressable>
              </HStack>
            </HStack>
          </View>
        </HStack>
        <Text style={{marginTop: 15, marginBottom: 20}}>
          {book['info'].slice(0, 150)}...
        </Text>
        <Divider />
      </Pressable>
    </View>
  );
}
