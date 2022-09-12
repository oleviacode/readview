import React from 'react';
import {Text} from 'react-native';
import {Button} from '@rneui/themed';
import {HStack} from '@react-native-material/core';

export default function Search() {
  return (
    <HStack spacing={6}>
      <Button>Primary</Button>
      <Button style={{backgroundColor: 'pink'}}>Secondary</Button>
      <Button color="green">Warning</Button>
      <Button color="red">Error</Button>
    </HStack>
  );
}
