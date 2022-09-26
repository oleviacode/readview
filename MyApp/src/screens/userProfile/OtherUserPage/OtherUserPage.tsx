import {
  faMars,
  faMarsAndVenus,
  faVenus,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {HStack} from '@react-native-material/core';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import Config from 'react-native-config';
import {Bar, VictoryBar, VictoryChart} from 'victory-native';
import {initialUserInfo} from '../../../model';
import {getMethod} from '../../../shared/fetchMethods';
import {styles} from '../../../shared/stylesheet';
import DisplayBook, {PreviewBookContents} from '../../bookProfile/DisplayBook';

export default function OtherUserPage({route}: any) {
  // -------------------------------------------------------------------------------------------------------------------
  // settings
  // -------------------------------------------------------------------------------------------------------------------

  const {userId} = route.params;
  const [user, setUser] = useState(initialUserInfo);
  const [error, setError] = useState('');
  const [recent, setRecent] = useState<PreviewBookContents[]>([
    {id: 0, book_picture: ''},
  ]);
  const [ratingDatas, setRatingDatas] = useState([{rating: 0, count: 0}]);
  const [booklist, setBookList] = useState()
  const navigation = useNavigation();

  // -------------------------------------------------------------------------------------------------------------------
  // useEffects
  // -------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    async function fetchdata() {
      setError(``);
      // fetch User
      const _getmethod = await getMethod();
      const resUser = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/user/${userId}`,
        _getmethod,
      );
      const resultUser = await resUser.json();
      //Fetch Recent
      const resRecent = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/user-interaction/recentRead/${userId}`,
        _getmethod,
      );
      const resultRecent = await resRecent.json();
      //fetch victory
      const res = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/uservictorydata/${userId}`,
        _getmethod,
      );
      const result = await res.json();
      navigation.setOptions({title: resultUser[0].username});
      if (resultUser[0].message) {
        navigation.goBack();
      } else if (resultRecent.length == 0) {
        setError(`This user hasn't read anything yet~`);
        setUser(resultUser[0]);
      } else {
        {
          result.length != 0 && setRatingDatas(result);
        }
        setUser(resultUser[0]);
        setRecent(resultRecent);
      }
    }

    fetchdata();
    return;
  }, [userId]);

  // -------------------------------------------------------------------------------------------------------------------
  // return
  // -------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <View>
          <Image
            style={{
              width: 70,
              height: 70,
              backgroundColor: 'gray',
              borderRadius: 100,
            }}
            source={{
              uri: `${Config.REACT_APP_BACKEND_URL}/uploads/${user.profile_picture}`,
            }}
          />
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <HStack>
            <Text style={styles.userProfileText}>
              {user.username}
              {user.gender == 'female' && (
                <FontAwesomeIcon
                  icon={faVenus}
                  color={'red'}
                  style={{
                    marginLeft: 10,
                  }}
                />
              )}
              {user.gender == 'male' && (
                <FontAwesomeIcon
                  icon={faMars}
                  color={'blue'}
                  style={{
                    marginLeft: 10,
                  }}
                />
              )}
              {user.gender == 'other' && (
                <FontAwesomeIcon
                  icon={faMarsAndVenus}
                  color={'blue'}
                  style={{
                    marginLeft: 10,
                  }}
                />
              )}
            </Text>
          </HStack>
          <Text
            style={{
              fontSize: 15,
              paddingTop: 5,
              paddingLeft: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {user.info}
          </Text>
          <Text style={styles.smallText}> User ID : {userId}</Text>
        </View>
      </View>
      <View>
        <HStack
          spacing={6}
          style={{
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}></HStack>
      </View>
      <View style={styles.container}>
        <ScrollView>
          {/* messages */}
          {error != '' && (
            <View
              style={{
                backgroundColor: 'lightblue',
                margin: 10,
                borderRadius: 10,
                padding: 10,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  textAlign: 'center',
                }}>
                {error}
              </Text>
            </View>
          )}
          {/* recent read */}
          {error == '' && (
            <>
              <Text style={[styles.titleText, {marginBottom: 10}]}>
                Recent Read
              </Text>
              <HStack style={{justifyContent: 'space-between'}}>
                {recent.map(item => (
                  <DisplayBook book={item} key={item.id} />
                ))}
              </HStack>
            </>
          )}
          {/* rating data */}
          {error == '' && (
            <>
              <View style={[styles.userData]}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    marginTop: 15,
                  }}>
                  Rating record
                </Text>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <VictoryChart
                    height={200}
                    width={350}
                    domainPadding={{x: [10, 20], y: [10, 20]}}>
                    <VictoryBar
                      padding={{top: 20, bottom: 60}}
                      style={{data: {fill: '#c43a31'}}}
                      dataComponent={<Bar />}
                      data={ratingDatas.map(data => ({
                        x: Math.round(data.rating / 2),
                        y: data.count,
                      }))}
                    />
                  </VictoryChart>
                </View>
              </View>
            </>
          )}
          {/* Booklists */}
          {error == '' &&(
            <>
              <Text
                style={[styles.titleText, {marginBottom: 10, marginTop: 10}]}>
                BookLists
              </Text>
              <HStack style={{justifyContent: 'space-between'}}></HStack>
            </>
          )}
          
        </ScrollView>
      </View>
    </>
  );
}
