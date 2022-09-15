import React from 'react';
import {HStack, Badge, Divider} from '@react-native-material/core';
import DisplayBook from './DisplayBook';
import {View, Text} from 'react-native';
import {styles} from '../../shared/stylesheet';
import {AirbnbRating} from '@rneui/themed';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBookmark} from '@fortawesome/free-solid-svg-icons/faBookmark';

export default function BookRecCard() {
  return (
    <View>
      <HStack style={[styles.regularBox, {padding: 0}]}>
        <View style={styles.book} />

        <View
          style={{flex: 1, justifyContent: 'space-between', marginLeft: 10}}>
          <View>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>
              Harry Potter and the Prisoner of Azkaban
            </Text>
            <Text style={[styles.smallText, {marginTop: 8}]}>J.K. Rowling</Text>
            <Text style={styles.smallText}>Fantasy</Text>
          </View>
          <HStack style={{justifyContent: 'space-between'}}>
            <AirbnbRating
              size={15}
              showRating={false}
              defaultRating={5}
              count={5}
              selectedColor="#eac645"
            />
            <HStack
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <Badge label={"I've read"} />
              <FontAwesomeIcon
                size={20}
                icon={faBookmark}
                color="lightgrey"
                style={{marginLeft: 20}}
              />
            </HStack>
          </HStack>
        </View>
      </HStack>
      <Text style={{marginTop: 15, marginBottom: 20}}>
        dolor sit amet, consectetur adipiscing elit. Sed sed urna sed massa
        molestie condimentum. Nam convallis felis non lacus posuere, id lacinia
        lacus volutpat. Fusce vel dignissim orci, non ullamcorper leo.
      </Text>
      <Divider />
    </View>
  );
}
