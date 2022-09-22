// import AsyncStorage from '@react-native-community/async-storage';
// import { Button } from '@react-native-material/core';
// import {useNavigation} from '@react-navigation/native';
// import React, {useState} from 'react';
// import { Text, TextInput, View} from 'react-native';
// import Config from 'react-native-config';

// export default function ChangeEmail() {
//   const [title, onChangeTitle] = useState('');
//   const navigation = useNavigation();
//   const [error, setError] = useState('');

//   async function createNewBooklist() {
//     const token = await AsyncStorage.getItem('token');
//     const res = await fetch(
//         `${Config.REACT_APP_BACKEND_URL}/booklist/ownerBooklist`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       result = await res.json();
//     if (result[0].status == 200) {
//       navigation.goBack();
//     } else {
//       setError('Please Try Again')
//     }
    
//   }

//   return (
//     <View style={styles.container}>
//       <Text>{error}</Text>
//       <Text style={{
//         fontSize: 30
        
//       }}> Change Email</Text>
//       <TextInput
//         style={styles.textInput}
//         onChangeText={onChangeEmail}
//         placeholder={`  ${oldEmail as string}`}
//         keyboardType={'default'}
//       />
//       <View>
//       <Button
//       style={{marginTop: 10}}
//       title={'Submit'}
//       onPress={() => {
//         updateEmail()
//       }}>
//       </Button>
//       <Button
//       style={{marginTop: 20}}
//       color={'lightgrey'}
//       title={'Go back'}
//       onPress={() => {
//         navigation.goBack()
//       }}></Button>
//       </View>
//     </View>
//   );
// }