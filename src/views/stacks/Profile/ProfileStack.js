import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from './ProfileScreen'
import { PostProvider } from '../../../api/context/posts/PostContext'
import { CommentProvider } from '../../../api/context/comments/CommentContext'
const Stack = createStackNavigator()

const ProfileStack = () => {
    return (
        <PostProvider>
            <CommentProvider>
                <Stack.Navigator>
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name={'ProfileScreen'}
                        component={ProfileScreen}
                    ></Stack.Screen>
                </Stack.Navigator>
            </CommentProvider>
        </PostProvider>
    )
}

export default ProfileStack
