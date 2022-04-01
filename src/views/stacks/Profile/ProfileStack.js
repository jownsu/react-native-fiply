import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from './ProfileScreen'
import CommentScreen from '../Home/CommentScreen'
import FollowersScreen from './FollowersScreen'
import FollowingScreen from './FollowingScreen'
import { PostProvider } from '../../../api/context/posts/PostContext'
import { ProfileProvider } from '../../../api/context/profile/ProfileContext'
const Stack = createStackNavigator()

const ProfileStack = ({ route }) => {
    return (
        <PostProvider>
            <ProfileProvider>
                <Stack.Navigator>
                    <Stack.Screen
                        initialParams={route.params}
                        options={{ headerShown: false }}
                        name={'ProfileScreen'}
                        component={ProfileScreen}
                    ></Stack.Screen>
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name={'FollowersScreen'}
                        component={FollowersScreen}
                    ></Stack.Screen>
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name={'FollowingScreen'}
                        component={FollowingScreen}
                    ></Stack.Screen>
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name={'CommentScreen'}
                        component={CommentScreen}
                    ></Stack.Screen>
                </Stack.Navigator>
            </ProfileProvider>
        </PostProvider>
    )
}

export default ProfileStack
