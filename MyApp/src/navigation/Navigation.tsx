import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from '../screens/Main';
import Register from '../screens/Register';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import LoadingScreen from '../screens/LoadingScreen';
import CoverPage from '../screens/CoverPage';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Cover" screenOptions={{ headerShown: true }}>
          <Stack.Screen name="Cover" component={CoverPage} />
          <Stack.Screen name="Loading" component={LoadingScreen}/> 
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
