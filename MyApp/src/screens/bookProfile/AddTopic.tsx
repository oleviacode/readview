import AsyncStorage from '@react-native-community/async-storage';
import {AsyncLocalStorage} from 'async_hooks';
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

export default function AddTopic({route}: any) {
  const {bookId} = route.params;
  const [topic, setTopic] = useState<string>('');
  const [body, setBody] = useState('');
  const [fail, setFail] = useState('');

  async function submit() {
    if (topic == '' || body == '') {
      setFail('One or more of the above fields are empty');
      return;
    }

    const token = await AsyncStorage.getItem('token');

    // MORE CODE HERE
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
