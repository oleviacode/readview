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
import {AirbnbRating} from '@rneui/themed';

export default function AddReview({route}: any) {
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
            Add your review
          </Text>
          <Text style={{fontWeight: 'bold', marginBottom: 10}}>
            Your rating
          </Text>
          <View style={{marginBottom: 20}}>
            <AirbnbRating
              showRating={false}
              onFinishRating={rating => setRating(rating)}
            />
          </View>

          <Text style={{fontWeight: 'bold', marginBottom: 10}}>
            Full review
          </Text>
          <TextInput
            placeholder="Type here.."
            style={styles.textInput}
            multiline
            onChangeText={text => setText(text)}
          />
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => console.log(rating)}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
              Submit
            </Text>
          </TouchableOpacity>
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
