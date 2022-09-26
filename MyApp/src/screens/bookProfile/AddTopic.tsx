import AsyncStorage from '@react-native-community/async-storage';
import React, {useState} from 'react';
import {
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
import Config from 'react-native-config';
import {json} from 'stream/consumers';
import {NaviProps} from '../../model';

export default function AddTopic({navigation}: NaviProps) {
  const [topic, setTopic] = useState<string>('');
  const [body, setBody] = useState('');
  const [fail, setFail] = useState('');

  async function submit() {
    if (topic == '' || body == '') {
      setFail('One or more of the above fields are empty');

      if (topic.length > 100) {
        setFail('Topic should be less than 100 chars');
      }
      if (body.length > 350) {
        setFail('Body should be less than 350 chars');
      }
      return;
    }

    const discussionDto = {
      title: topic,
      info: body,
    };

    const token = await AsyncStorage.getItem('token');


    const resTopic = await fetch(
      `${Config.REACT_APP_BACKEND_URL}/discussion/create`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discussionDto),
      },
    );

    const result = await resTopic.json();


    if (result.status == 200) {
      navigation.goBack();
    } else {
      setFail(result.message);
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
            Add a topic
          </Text>
          <Text style={{fontWeight: 'bold', marginBottom: 10}}>Your topic</Text>
          <TextInput
            placeholder="max length 100 chars.."
            style={[styles.textInput, {height: 40}]}
            maxLength={100}
            onChangeText={value => setTopic(value)}
          />

          <Text style={{fontWeight: 'bold', marginBottom: 10}}>Body</Text>
          <TextInput
            placeholder="max length 350 chars.."
            style={styles.textInput}
            multiline
            maxLength={350}
            onChangeText={value => setBody(value)}
          />

          <TouchableOpacity style={styles.btnContainer} onPress={submit}>
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

    marginBottom: 36,
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
