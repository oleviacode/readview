import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  Button,
  StyleSheet,
  Platform,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {AirbnbRating, Switch} from '@rneui/themed';
import {HStack} from '@react-native-material/core';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';

export default function AddReview({route, navigation}: any) {
  const {bookId} = route.params;
  const [text, setText] = useState<string>('');
  const [rating, setRating] = useState<number>(6);
  const [spoilerSwitch, setSpoilerSwitch] = useState(false);
  const [spoilerMsg, setSpoilerMsg] = useState('Not Spoiler');
  const [fail, setFail] = useState('');

  // function
  async function submitReview() {
    if (text == '') {
      setFail('Please enter a review');
      return;
    }

    const token = await AsyncStorage.getItem('token');
    const reviewDto = {
      book_id: bookId[0],
      content: text,
      privateStatus: false,
      spoiler: spoilerSwitch,
    };
    const resReview = await fetch(`${Config.REACT_APP_BACKEND_URL}/reviews/`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewDto),
    });

    const resRating = await fetch(
      `${Config.REACT_APP_BACKEND_URL}/reviews/rating/${bookId[0]}/${rating}`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      },
    );

    const statusRating = await resRating.json();

    const statusReview = await resReview.json();

    if (statusReview[0]['status'] == 200 && statusRating[0]['status'] == 200) {
      navigation.goBack();
    } else {
      setFail('review submission unsuccessful');
    }
  }

  function spoilerToggle() {
    setSpoilerSwitch(!spoilerSwitch);
    if (spoilerMsg == 'Not Spoiler') {
      setSpoilerMsg('Is spoiler');
    } else if (spoilerMsg == 'Is spoiler') {
      setSpoilerMsg('Not Spoiler');
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text
            style={{
              fontSize: 30,
              marginBottom: 20,
              fontWeight: 'bold',
              color: '#3766a6',
            }}>
            Add your review
          </Text>
          <Text style={{fontWeight: 'bold', marginBottom: 10}}>
            Your rating
          </Text>
          <View style={{marginBottom: 20}}>
            <AirbnbRating
              showRating={false}
              onFinishRating={rating => setRating(rating * 2)}
            />
          </View>

          <Text style={{fontWeight: 'bold', marginBottom: 10}}>
            Full review
          </Text>
          <TextInput
            placeholder="Type here (max 350 characters).."
            style={styles.textInput}
            multiline
            onChangeText={text => setText(text)}
            maxLength={350}
          />

          <HStack
            style={{justifyContent: 'flex-end', alignItems: 'center'}}
            spacing={10}>
            <Text>{spoilerMsg}</Text>
            <Switch value={spoilerSwitch} onValueChange={spoilerToggle} />
          </HStack>

          <TouchableOpacity style={styles.btnContainer} onPress={submitReview}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
              Submit
            </Text>
          </TouchableOpacity>
          <Text>{fail}</Text>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
  },
  header: {
    fontSize: 36,
    marginBottom: 20,
  },
  textInput: {
    height: '35%',

    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  btnContainer: {
    backgroundColor: '#5699EE',
    marginTop: 12,
    color: 'white',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
