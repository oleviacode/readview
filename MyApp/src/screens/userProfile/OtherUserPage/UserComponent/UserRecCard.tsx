import {faHeart, faMars, faMarsAndVenus, faVenus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Divider, HStack} from '@react-native-material/core';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import Config from 'react-native-config';
import {UserInfoProps} from '../../../../model';
import {styles} from '../../../../shared/stylesheet';

export default function UserRecCard(props: UserInfoProps) {
  const userInfo = props.userInfo;
  const navigation = useNavigation();
  return (
    <View style={[styles.container, {backgroundColor: '#F1F0F0'}]}>
      <Pressable
        onPress={() => {
          navigation.navigate('UserScreen', {userId: userInfo.id});
        }}>
        <HStack style={{justifyContent:'space-between'}} >
          <HStack spacing={10}>
          <Image
            style={styles.smallProfilePic}
            source={{
              uri: `${Config.REACT_APP_BACKEND_URL}/uploads/${userInfo.profile_picture}`,
            }}></Image>
            <View>
          <Text style={[styles.titleText, {marginTop: 1}]}>{userInfo.username}
          {userInfo.gender == 'female' && (
                <FontAwesomeIcon
                  icon={faVenus}
                  color={'red'}
                  style={{
                    marginLeft: 10,
                  }}
                />
              )}
              {userInfo.gender == 'male' && (
                <FontAwesomeIcon
                  icon={faMars}
                  color={'blue'}
                  style={{
                    marginLeft: 10,
                  }}
                />
              )}
              {userInfo.gender == 'other' && (
                <FontAwesomeIcon
                  icon={faMarsAndVenus}
                  color={'blue'}
                  style={{
                    marginLeft: 10,
                  }}
                />
              )}
          </Text>
          <Text style={{marginTop:4}}>{userInfo.info}</Text>
          </View>
          </HStack>
          <View style={{justifyContent: 'flex-end', alignItems:'flex-end', padding:10}}>
            <Text style={{color: 'navy', fontWeight:'500'}}>Lv {userInfo.level}</Text>
            <Text><FontAwesomeIcon icon={faHeart} color={'pink'} /> {userInfo.count}</Text>
          </View>
        </HStack>
        <Divider />
      </Pressable>
    </View>
  );
}
