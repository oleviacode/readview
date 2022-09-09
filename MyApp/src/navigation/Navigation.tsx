import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from '../screens/Main';
import Register from '../screens/register/Register';
import RegisterPageTwo from '../screens/register/RegisterPageTwo';
import {Provider} from 'react-redux';
import {store} from '../../redux/store';
import LoadingScreen from '../screens/LoadingScreen';
import CoverPage from '../screens/CoverPage';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Loading"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Cover" component={CoverPage} />
          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Register2" component={RegisterPageTwo} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
