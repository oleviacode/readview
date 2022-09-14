import React from 'react';
import {Text} from 'react-native';

export type ProfileRoute = {
  userId: number;
};

export default function UserProfile(route: ProfileRoute) {
  console.log(route.userId);

  return <Text>Hi userprofile {route.userId}</Text>;
}
