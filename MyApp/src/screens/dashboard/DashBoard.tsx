import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainScreen from '../main/Main';
import ShelfScreen from '../shelf/Shelf';
import BookProfile from '../bookProfile/BookProfile';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons/faHome';
import {faBook} from '@fortawesome/free-solid-svg-icons/faBook';
import {faComments} from '@fortawesome/free-solid-svg-icons/faComments';
import {faPerson} from '@fortawesome/free-solid-svg-icons/faPerson';
import UserProfile from '../userProfile/UserProfile';
import AllReviews from '../bookProfile/AllReviews';
import ChangeUsername from '../userProfile/ChangeUsername';
import ChangeEmail from '../userProfile/ChangeEmail';
import ChangeInfo from '../userProfile/ChangeInfo';
import AddReview from '../bookProfile/AddRating';
import AddTopic from '../bookProfile/AddTopic';
import ChangePassword from '../userProfile/ChangePassword';
import ChangeProfilePicture from '../userProfile/ChangeProfilePicture';
import Booklist from '../shelf/Pages/Booklist';
import AddToBookList from '../bookProfile/AddToBookList';
import Discussion from '../discussion/Discussion';
import AuthorScreen from '../shelf/Pages/AuthorScreen';
import UpdateBookList from '../shelf/Pages/UpdateBookList';
import OtherUserPage from '../userProfile/OtherUserPage/OtherUserPage';
import DiscussionProfile from '../discussion/DiscussionProfile';
import PowerBi from '../userProfile/PowerBi';

const Tab = createBottomTabNavigator();
const MainStack = createNativeStackNavigator();
const DiscussionStack = createNativeStackNavigator();
const ShelfStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

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
          tabBarIcon: () => <FontAwesomeIcon icon={faHome} size={25} />,
        }}>
        {() => (
          <MainStack.Navigator>
            <MainStack.Screen
              name="Main"
              component={MainScreen}
              options={{headerShown: false}}
            />

            <MainStack.Screen
              name="AddToBookList"
              component={AddToBookList}
              options={{title: 'Add to Booklist'}}
            />

            <MainStack.Screen
              name="BookProfile"
              component={BookProfile}
              options={{title: 'book'}}
            />

            <MainStack.Screen
              name="AllReviews"
              component={AllReviews}
              options={{title: 'All reviews'}}
            />
            <MainStack.Screen
              name="AddReview"
              component={AddReview}
              options={{title: 'Add your Review'}}
            />
            <MainStack.Screen
              name="AuthorScreen"
              component={AuthorScreen}
              options={{title: 'Author'}}
            />
            <MainStack.Screen
              name="BookListScreen"
              component={Booklist}
              options={{headerShown: false}}
            />
            <MainStack.Screen
              name="UpdatebooklistScreen"
              component={UpdateBookList}
              options={{headerShown: false}}
            />
            <MainStack.Screen
              name="UserScreen"
              component={OtherUserPage}
              options={{headerShown: true}}
            />
          </MainStack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Shelf"
        options={{
          tabBarIcon: () => <FontAwesomeIcon icon={faBook} size={25} />,
        }}>
        {() => (
          <ShelfStack.Navigator>
            <ShelfStack.Screen
              name="ShelfScreen"
              component={ShelfScreen}
              options={{headerShown: false}}
            />
            <ShelfStack.Screen
              name="AuthorScreen"
              component={AuthorScreen}
              options={{headerShown: false}}
            />
            <ShelfStack.Screen
              name="BookListScreen"
              component={Booklist}
              options={{headerShown: false}}
            />
            <ShelfStack.Screen
              name="UpdatebooklistScreen"
              component={UpdateBookList}
              options={{headerShown: false}}
            />
            <ShelfStack.Screen
              name="UserScreen"
              component={OtherUserPage}
              options={{headerShown: false}}
            />
          </ShelfStack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Discussion"
        options={{
          tabBarIcon: () => <FontAwesomeIcon icon={faComments} size={25} />,
        }}>
        {() => (
          <DiscussionStack.Navigator>
            <DiscussionStack.Screen
              name="DiscussionScreen"
              component={Discussion}
              options={{headerShown: false}}
            />
            <DiscussionStack.Screen
              name="UserScreen"
              component={OtherUserPage}
              options={{headerShown: true}}
            />
            <DiscussionStack.Screen
              name="AddTopic"
              component={AddTopic}
              options={{title: 'Add a topic', headerShown: true}}
            />
            <DiscussionStack.Screen
              name="DiscussionProfileScreen"
              component={DiscussionProfile}
              options={{title: 'Topic', headerShown: true}}
            />
          </DiscussionStack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="userProfile"
        options={{
          tabBarIcon: active =>
            active.focused ? (
              <FontAwesomeIcon
                style={{color: 'blue'}}
                icon={faPerson}
                size={25}
              />
            ) : (
              <FontAwesomeIcon
                style={{color: 'blue'}}
                icon={faPerson}
                size={25}
              />
            ),
        }}>
        {() => (
          <ProfileStack.Navigator>
            <ProfileStack.Screen
              name="userProfileScreen"
              component={UserProfile}
              options={{headerShown: false}}
            />

            <ProfileStack.Screen
              name="changeUsername"
              component={ChangeUsername}
              options={{headerShown: false}}
            />

            <ProfileStack.Screen
              name="changeEmail"
              component={ChangeEmail}
              options={{headerShown: false}}
            />

            <ProfileStack.Screen
              name="changeInfo"
              component={ChangeInfo}
              options={{headerShown: false}}
            />

            <ProfileStack.Screen
              name="changePassword"
              component={ChangePassword}
              options={{headerShown: false}}
            />

            <ProfileStack.Screen
              name="changePicture"
              component={ChangeProfilePicture}
              options={{headerShown: false}}
            />
            <ProfileStack.Screen
              name="PowerBi"
              component={PowerBi}
              options={{headerShown: false}}
            />
          </ProfileStack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
