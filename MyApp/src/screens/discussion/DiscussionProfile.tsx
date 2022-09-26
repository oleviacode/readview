import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {HStack, Divider} from '@react-native-material/core';
import {styles} from '../../shared/stylesheet';
import {
  DiscussionInfo,
  DiscussionInfoProps,
  initialDiscussInfo,
  initialResponseInfo,
  ResponseInfo,
} from '../../model';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowUp} from '@fortawesome/free-solid-svg-icons/faArrowUp';
import {faArrowDown} from '@fortawesome/free-solid-svg-icons/faArrowDown';
import {getMethod, patchMethod, postMethod} from '../../shared/fetchMethods';
import Config from 'react-native-config';
import ResponseCard from './ResponseCard';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import Loading from '../../shared/Loading';

export default function DiscussionProfile({route, navigation}: any) {
  const discussId = route.params.topicId;

  let _getMethod;
  let _patchMethod;
  let _postMethod;

  // USESTATES

  const [topic, setTopic] = useState<DiscussionInfo>(initialDiscussInfo);
  const [responses, setResponses] = useState<ResponseInfo[]>([
    initialResponseInfo,
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [likeButtonSwitch, setLikeButtonSwitch] = useState(false);
  const [unlikeButtonSwitch, setUnlikeButtonSwitch] = useState(false);
  let [likes, setLikes] = useState(0);
  let [unlikes, setUnlikes] = useState(0);

  const [likeButton, setLikeButton] = useState('grey');
  const [unlikeButton, setUnlikeButton] = useState('grey');
  const [pageLoaded, setPageLoaded] = useState(false);

  // FUNCTIONS

  async function dbRemove() {
    _patchMethod = await patchMethod();

    try {
      await fetch(
        `${Config.REACT_APP_BACKEND_URL}/discussion/removeLikeUnlike/${discussId}`,
        _patchMethod,
      );
      return;
    } catch (e) {
      console.log('dbRemove not working');
    }
  }

  async function dbAddLike() {
    _postMethod = await postMethod();

    console.log(Config.REACT_APP_BACKEND_URL);
    try {
      const res = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/discussion/like/${discussId}`,
        _postMethod,
      );

      return;
    } catch (e) {
      console.log('dbAdd not working');
    }
  }

  async function dbAddUnlike() {
    try {
      _postMethod = await postMethod();
      await fetch(
        `${Config.REACT_APP_BACKEND_URL}/discussion/unlike/${discussId}`,
        _postMethod,
      );
      return;
    } catch (e) {
      console.log('dbAddUnlike not working');
    }
  }

  async function like() {
    setLikeButtonSwitch(!likeButtonSwitch);

    if (unlikeButtonSwitch) {
      dbRemove();
      setUnlikes((unlikes -= 1));
      setUnlikeButtonSwitch(false);
    }

    if (!likeButtonSwitch) {
      dbAddLike();
      setLikes((likes += 1));
    } else {
      dbRemove();
      setLikes((likes -= 1));
    }
  }

  async function unlike() {
    if (likeButtonSwitch) {
      dbRemove();
      setLikes((likes -= 1));
      setLikeButtonSwitch(false);
    }

    setUnlikeButtonSwitch(!unlikeButtonSwitch);
    if (!unlikeButtonSwitch) {
      dbAddUnlike();
      setUnlikes((unlikes += 1));
    } else {
      dbRemove();
      setUnlikes((unlikes -= 1));
    }
  }

  // USE EFFECT

  useEffect(() => {
    async function main() {
      _getMethod = await getMethod();

      try {
        console.log('discussId is :', discussId);
        if (!pageLoaded) {
          setIsLoading(true);
          const resAll = await fetch(
            `${Config.REACT_APP_BACKEND_URL}/discussion/discussionLead/${discussId}`,
            _getMethod,
          );

          const resResponse = await fetch(
            `${Config.REACT_APP_BACKEND_URL}/discussion/discussionComments/${discussId}`,
            _getMethod,
          );

          const topic = await resAll.json();
          const allResponse = await resResponse.json();

          setTopic(topic[0]);
          setResponses(allResponse);
          setIsLoading(false);
          setPageLoaded(true);
          setLikes(topic[0]['likes']);
          setUnlikes(topic[0]['unlikes']);
        }

        if (likeButtonSwitch) {
          setLikeButton('red');
        } else {
          setLikeButton('grey');
        }

        if (unlikeButtonSwitch) {
          setUnlikeButton('lightblue');
        } else {
          setUnlikeButton('grey');
        }

        return;
      } catch (e) {
        console.log('fetch error');
      }
    }

    main();
  }, [likeButtonSwitch, unlikeButtonSwitch]);

  return (
    // ---------------------------------------------------------------
    // TOPIC
    // ---------------------------------------------------------------

    <>
      {isLoading && <Loading />}
      {isLoading || (
        <View style={styles.container}>
          <ScrollView>
            <View style={[styles.regularBox, {backgroundColor: 'white'}]}>
              <HStack style={{marginTop: 20}}>
                <View style={styles.smallProfilePic} />
                <View
                  style={{marginLeft: 20, flex: 1, justifyContent: 'center'}}>
                  <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                    {topic['username']}
                  </Text>

                  <Text
                    style={[styles.smallText, {color: 'grey', marginLeft: 5}]}>
                    {topic['updated_at'].slice(0, 10)}
                  </Text>
                </View>
              </HStack>

              <Text
                style={[styles.titleText, {marginTop: 15, marginBottom: 20}]}>
                {topic['substring']}
              </Text>
              <Text style={[styles.normalText, {marginBottom: 30}]}>
                {topic['info']}
              </Text>
              <HStack style={{marginBottom: 20}}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginRight: 30,

                    alignItems: 'center',
                  }}
                  onPress={like}>
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    size={10}
                    color={likeButton}
                  />
                  <Text style={[styles.smallText]}>{likes}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={unlike}
                  style={{flex: 5, flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    size={10}
                    color={unlikeButton}
                  />
                  <Text style={[styles.smallText]}>{unlikes}</Text>
                </TouchableOpacity>
              </HStack>

              <Divider />

              <Text
                style={[styles.titleText, {marginTop: 20, marginBottom: 20}]}>
                Responses
              </Text>
              {responses.map((response, index) => {
                return <ResponseCard responseInfo={response} key={index} />;
              })}
            </View>
          </ScrollView>
          <TouchableOpacity
            style={{position: 'absolute', bottom: 30, right: 30}}
            onPress={() => navigation.navigate('AddTopic')}>
            <FontAwesomeIcon size={60} icon={faPlusCircle} color="#CCBD95" />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
