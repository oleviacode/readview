import {
  faMars,
  faMarsAndVenus,
  faVenus,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {HStack} from '@react-native-material/core';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, ScrollView, Text, View} from 'react-native';
import Config from 'react-native-config';
import {Bar, VictoryBar, VictoryChart} from 'victory-native';
import {
  BookListInfo,
  initialBookListInfo,
  initialUserInfo,
} from '../../../model';
import {getMethod} from '../../../shared/fetchMethods';
import Loading from '../../../shared/Loading';
import {styles} from '../../../shared/stylesheet';
import DisplayBook, {PreviewBookContents} from '../../bookProfile/DisplayBook';
import BooklistRecCard from '../../shelf/Components/BooklistRecCard';

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
  const [isLoading, setIsLoading] = useState(true);
  const [isBooklistLoading, setBookListLoading] = useState(true);
  const [booklist, setBookList] = useState<BookListInfo[]>([
    initialBookListInfo,
  ]);
  const [noBooklist, setNoBookList] = useState(false);
  const navigation = useNavigation();

  // -------------------------------------------------------------------------------------------------------------------
  // useEffects
  // -------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    async function fetchdata() {
      setError(``);
      setIsLoading(true);
      setNoBookList(false);
      setBookListLoading(true);
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
      const data = result.filter((item: any) => item.rating != null);
      navigation.setOptions({title: resultUser[0].username});
      if (resultUser[0].message) {
        navigation.goBack();
      } else if (resultRecent.length == 0) {
        setError(`This user hasn't read anything yet~`);
        setRatingDatas(data);
        setUser(resultUser[0]);
        setIsLoading(false);
      } else {
        setRatingDatas(data);
        setUser(resultUser[0]);
        setRecent(resultRecent);
        setIsLoading(false);
      }

      //fetch user booklist
      const resBooklist = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/booklist/userbooklist/${userId}`,
        _getmethod,
      );
      const booklist = await resBooklist.json();

      if (booklist.length == 0) {
        setNoBookList(true);
        setBookListLoading(false);
      } else {
        setBookList(booklist);
        setBookListLoading(false);
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
          <Text style={styles.userProfileText}>{user.username}</Text>
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
          {isLoading && <Loading />}
          {/* messages */}
          {error != '' && (
            <View
              style={{
                backgroundColor: '#C7BE9D',
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
          {!isLoading && error != `This user hasn't read anything yet~` && (
            <>
              <Text style={[styles.titleText, {marginBottom: 10}]}>
                Recent Read
              </Text>
              <HStack style={{justifyContent: 'space-evenly'}}>
                {recent.map(item => (
                  <DisplayBook book={item} key={item.id} />
                ))}
              </HStack>
            </>
          )}
          {/* rating data */}
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              marginTop: 15,
            }}>
            Rating record
          </Text>
          {isLoading && <Loading />}
          {!isLoading && ratingDatas.length != 0 && (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View style={[styles.userData]}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <VictoryChart
                    height={200}
                    width={350}
                    domainPadding={{x: [30, 20], y: [10, 20]}}>
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
            </View>
          )}
          {!isLoading && ratingDatas.length == 0 && (
            <View
              style={{
                backgroundColor: '#C7BE9D',
                margin: 10,
                borderRadius: 10,
                padding: 10,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  textAlign: 'center',
                }}>
                {`This user hasn't rate anything yet :(`}
              </Text>
            </View>
          )}
          {/* Booklists */}
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              marginTop: 15,
            }}>
            BookLists
          </Text>

          {isBooklistLoading && <Loading />}
          {!noBooklist && !isBooklistLoading && (
            <>
              {booklist.map(item => (
                <BooklistRecCard booklist={item} key={item.id} />
              ))}
            </>
          )}
          {noBooklist && !isBooklistLoading &&  (
            <View
              style={{
                backgroundColor: '#C7BE9D',
                margin: 10,
                borderRadius: 10,
                padding: 10,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  textAlign: 'center',
                }}>
                {`This user hasn't create any booklist yet :(`}
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
}
