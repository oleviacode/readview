import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import {HStack, Divider, TextInput} from '@react-native-material/core';
import {styles} from '../../shared/stylesheet';
import {
  DiscussionInfo,
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
import Loading from '../../shared/Loading';
import AsyncStorage from '@react-native-community/async-storage';

export default function DiscussionProfile({route}: any) {
  const discussId = route.params.topicId;
  const navigation = useNavigation();

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
  const [text, setText] = useState('');

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
    setUnlikeButtonSwitch(!unlikeButtonSwitch);
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

  async function send() {
    if (text.length == 0) {
      return;
    } else {
      _postMethod = await postMethod();
      const token = await AsyncStorage.getItem('token');
      const content = {
        content: text,
      };

      const resAddComment = await fetch(
        `${Config.REACT_APP_BACKEND_URL}/discussion/addComment/${discussId}`,
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(content),
        },
      );

      const res = await resAddComment.json();

      console.log(res['status']);
      setText('');
      Keyboard.dismiss();
    }
  }
  // USE EFFECT

  useEffect(() => {
    async function main() {
      _getMethod = await getMethod();

      try {
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
          const resCheckStatus = await fetch(
            `${Config.REACT_APP_BACKEND_URL}/discussion/checkStatus/${discussId}`,
            _getMethod,
          );

          const topic = await resAll.json();
          const allResponse = await resResponse.json();
          const checkStatus = await resCheckStatus.json();

          if (checkStatus['status'] == 'liked') {
            setLikeButtonSwitch(true);
          } else if (checkStatus['status'] == 'unliked') {
            setUnlikeButtonSwitch(true);
          }

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
        console.log(e);
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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={130}
          style={[styles.container, {flex: 1}]}>
          {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
          <View>
            <ScrollView 
            contentContainerStyle={{paddingBottom: '40%'}}>
              <View style={styles.container}>
                <View style={[styles.regularBox, {backgroundColor: 'white'}]}>
                  <HStack style={{marginTop: 20}}>
                    <View style={styles.smallProfilePic} />
                    <View
                      style={{
                        marginLeft: 20,
                        flex: 1,
                        justifyContent: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('UserScreen', {
                            userId: topic['userid'],
                          })
                        }>
                        <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                          {topic['username']}
                        </Text>
                      </TouchableOpacity>

                      <Text
                        style={[
                          styles.smallText,
                          {color: 'grey', marginLeft: 5},
                        ]}>
                        {topic['updated_at'].slice(0, 10)}
                      </Text>
                    </View>
                  </HStack>

                  <Text
                    style={[
                      styles.titleText,
                      {marginTop: 15, marginBottom: 20},
                    ]}>
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
                      style={{
                        flex: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
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
                    style={[
                      styles.titleText,
                      {marginTop: 20, marginBottom: 20},
                    ]}>
                    Responses
                  </Text>
                  {responses.map((response, index) => {
                    return <ResponseCard responseInfo={response} key={index} />;
                  })}
                </View>

                {/* <TouchableOpacity
            style={{position: 'absolute', bottom: 30, right: 30}}
            onPress={() => navigation.navigate('AddTopic')}>
            <FontAwesomeIcon size={60} icon={faPlusCircle} color="#CCBD95" />
          </TouchableOpacity> */}
              </View>
            </ScrollView>
            <HStack
              style={{
                height: 40,
                width: '100%',
                bottom: 10,
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextInput
                placeholder="comment here"
                multiline
                style={{flex: 5}}
                onChangeText={value => setText(value)}
                value={text}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#CCBD95',
                  height: 55,
                }}>
                <Pressable onPress={send}>
                  <Text>Send</Text>
                </Pressable>
              </View>
            </HStack>
          </View>
          {/* </TouchableWithoutFeedback> */}
        </KeyboardAvoidingView>
      )}
    </>
  );
}
