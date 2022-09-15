import React from 'react';
import {View, Text} from 'react-native';
import {HStack, Divider} from '@react-native-material/core';
import {styles} from '../../shared/stylesheet';
import {AirbnbRating} from '@rneui/themed';

export interface ReviewCardProps {
  username: string;
  profilePic: string;
  rating: number;
  createdAt: string;
}

export default function ReviewCard() {
  return (
    <View>
      <HStack style={{marginTop: 20}}>
        <View style={styles.smallProfilePic} />
        <View style={{marginLeft: 20, flex: 1, justifyContent: 'center'}}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>Username</Text>
          <HStack>
            <AirbnbRating
              size={12}
              showRating={false}
              defaultRating={5}
              count={5}
              selectedColor="#eac645"
            />
            <Text style={[styles.smallText, {color: 'grey', marginLeft: 5}]}>
              24-05-1990
            </Text>
          </HStack>
        </View>
      </HStack>
      <Text style={[styles.normalText, {marginTop: 15, marginBottom: 20}]}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed urna
        sed massa molestie condimentum. Nam convallis felis non lacus posuere,
        id lacinia lacus volutpat. Fusce vel dignissim orci, non ullamcorper
        leo. Pellentesque sed bibendum nunc. Maecenas molestie ex vitae nisi
        auctor, sed lacinia enim maximus.
      </Text>
      <Divider />
    </View>
  );
}
