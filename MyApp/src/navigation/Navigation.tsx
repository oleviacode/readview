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
import Search from '../screens/search/Search';
import ISBNcodeSanner from '../screens/search/ISBNSanner';
import CreateBookList from '../screens/shelf/Pages/CreateBookList';

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Loading">
          <RootStack.Screen
            name="Cover"
            component={CoverPage}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <RootStack.Screen
            name="Loading"
            component={LoadingScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />

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
          <RootStack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <RootStack.Screen name="Chat" component={Chat} />
          <RootStack.Screen
            name="Search"
            component={Search}
            options={{
              headerLeft: () => <MessageTop />,
              // headerRight: () => <QRCodeTop />,
              headerTitle: () => <TitleTop />,
            }}/>
          <RootStack.Screen name="Scanner" component={ISBNcodeSanner} />
          <RootStack.Screen
            name="CreateBookList"
            component={CreateBookList}
            options={{
              headerLeft: () => <MessageTop />,
              // headerRight: () => <QRCodeTop />,
              headerTitle: () => <TitleTop />,
              headerStyle: {backgroundColor: '#3766A6'},
            }}
          />
          <RootStack.Screen
            name="DashBoard"
            component={DashBoard}
            options={{
              headerLeft: () => <MessageTop />,
              // headerRight: () => <QRCodeTop />,
              headerTitle: () => <TitleTop />,
              headerStyle: {backgroundColor: '#3766A6'},
              gestureEnabled: false,
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
