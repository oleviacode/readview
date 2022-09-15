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
import BookProfile from '../screens/bookProfile/BookProfile';
import DashBoard from '../screens/dashboard/DashBoard';
import TitleTop, {MessageTop, QRCodeTop} from '../shared/Title';
import {NaviProps} from '../model';
import Chat from '../screens/chat/Chat';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Cover"
          screenOptions={{
            headerTitle: () => <TitleTop />,
            headerRight: () => <MessageTop />,
          }}>
          <RootStack.Screen
            name="Cover"
            component={CoverPage}
            options={{headerShown: false}}
          />
          <RootStack.Screen name="Loading" component={LoadingScreen} />

          <RootStack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="Register2"
            component={RegisterPageTwo}
            options={{headerShown: false}}
          />
          <RootStack.Screen name="Login" component={LoginScreen} />
          <RootStack.Screen name="Chat" component={Chat} />

          <RootStack.Screen
            name="DashBoard"
            component={DashBoard}
            options={{
              headerLeft: () => <MessageTop />,
              headerRight: () => <QRCodeTop />,
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
