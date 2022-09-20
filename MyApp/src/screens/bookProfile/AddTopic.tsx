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
} from 'react-native';

export default function AddTopic({route}: any) {
  const {bookId} = route.params;
  const [text, setText] = useState<string>('');
  const [rating, setRating] = useState<number>();

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
            placeholder="Type here.."
            style={[styles.textInput, {height: 40}]}
          />

          <Text style={{fontWeight: 'bold', marginBottom: 10}}>Body</Text>
          <TextInput
            placeholder="Type here.."
            style={styles.textInput}
            multiline
          />

          <Pressable style={styles.btnContainer}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
              Submit
            </Text>
          </Pressable>
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
