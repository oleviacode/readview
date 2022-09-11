import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from '../screens/main/Main';
import Register from '../screens/register/Register';
import RegisterPageTwo from '../screens/register/RegisterPageTwo';
import {Provider} from 'react-redux';
import {store} from '../../redux/store';
import LoadingScreen from '../screens/LoadingScreen';
import CoverPage from '../screens/CoverPage';
import LoginScreen from '../screens/LoginScreen';
import TitleTop, {MessageTop, QRCodeTop} from '../shared/Title';
import {NaviProps} from '../model';
import Chat from '../screens/chat/Chat';

const Stack = createNativeStackNavigator();

export default function Navigation({navigation}: NaviProps) {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Cover"
          screenOptions={{
            headerTitle: () => <TitleTop />,
            headerRight: () => <MessageTop />,
          }}>
          <Stack.Screen
            name="Cover"
            component={CoverPage}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              headerLeft: () => <MessageTop />,
              headerRight: () => <QRCodeTop />,
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register2"
            component={RegisterPageTwo}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
