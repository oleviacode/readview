import React from 'react';
import {Button, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NaviProps} from '../../model';
import MainScreen from '../main/Main';
import ShelfScreen from '../shelf/Shelf';
import Search from '../search/Search';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons/faHome';
import {faBook} from '@fortawesome/free-solid-svg-icons/faBook';
import {faPerson} from '@fortawesome/free-solid-svg-icons/faPerson';
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';
import UserProfile from '../userProfile/UserProfile';

const Tab = createBottomTabNavigator();
const MainStack = createNativeStackNavigator();
const ShelfStack = createNativeStackNavigator();

export default function DashBoard() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'blue',
        tabBarActiveBackgroundColor: '#5699ee',
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: () => <FontAwesomeIcon icon={faHome} />,
        }}>
        {() => (
          <MainStack.Navigator>
            <MainStack.Screen
              name="Main"
              component={MainScreen}
              options={{headerShown: false}}
            />
          </MainStack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Shelf"
        options={{
          tabBarIcon: () => <FontAwesomeIcon icon={faBook} />,
        }}>
        {() => (
          <ShelfStack.Navigator>
            <ShelfStack.Screen
              name="ShelfScreen"
              component={ShelfScreen}
              options={{headerShown: false}}
            />
          </ShelfStack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Search"
        options={{
          tabBarIcon: () => <FontAwesomeIcon icon={faSearch} />,
        }}>
        {() => (
          <ShelfStack.Navigator>
            <ShelfStack.Screen
              name="SearchScreen"
              component={Search}
              options={{headerShown: false}}
            />
          </ShelfStack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="userProfile"
        options={{
          tabBarIcon: active =>
            active.focused ? (
              <FontAwesomeIcon style={{color: 'blue'}} icon={faPerson} />
            ) : (
              <FontAwesomeIcon style={{color: 'blue'}} icon={faPerson} />
            ),
        }}>
        {() => (
          <ShelfStack.Navigator>
            <ShelfStack.Screen
              name="userProfileScreen"
              component={UserProfile}
              options={{headerShown: false}}
            />
          </ShelfStack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
