import React, {useEffect} from 'react';
import {HStack, Badge, Divider} from '@react-native-material/core';
import DisplayBook from './DisplayBook';
import {View, Text, Pressable} from 'react-native';
import {styles} from '../../shared/stylesheet';
import {AirbnbRating} from '@rneui/themed';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBookmark} from '@fortawesome/free-solid-svg-icons/faBookmark';
import {BookProfileProps} from '../../model';
import {useState} from 'react';

export default function BookRecCard(props: BookProfileProps) {
  try {
    const [saveBook, setSaveBook] = useState('lightgrey');
    const [saveBookSwitch, setSaveBookSwitch] = useState(false);
    const book = props['bookInfo'];

    useEffect(() => {
      if (book['readerStatus'] == 'want to read' || saveBookSwitch == true) {
        setSaveBook('#eac645');
      } else {
        setSaveBookSwitch(false);
        setSaveBook('lightgrey');
      }
    }, [saveBook, saveBookSwitch]);

    return (
      <View>
        <HStack style={[styles.regularBox, {padding: 0}]}>
          <View style={styles.book} />

          <View
            style={{flex: 1, justifyContent: 'space-between', marginLeft: 10}}>
            <View>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                {book['title']}
              </Text>
              <Text style={[styles.smallText, {marginTop: 8}]}>
                {book['author_name']}
              </Text>
              <Text style={styles.smallText}>genre to be fixed</Text>
            </View>
            <HStack style={{justifyContent: 'space-between'}}>
              <AirbnbRating
                size={15}
                showRating={false}
                defaultRating={book['rating'] ? book['rating'] : 0}
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
                  label={book['readerStatus'] ? book['readerStatus'] : 'unread'}
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
          {book['info'].length > 150
            ? book['info'].slice(0, 150)
            : book['info']}
          ...
        </Text>
        <Divider />
      </View>
    );
  } catch (e) {
    return <Text>Internal server error</Text>;
  }
}
