import React from 'react'
import { PostProvider } from '../../../api/context/posts/PostContext'
import { createStackNavigator } from '@react-navigation/stack'
import HomeSreen from './HomeScreen'
import CommentScreen from './CommentScreen'
import CreatePostScreen from '../../screens/CreatePostScreen'

const Stack = createStackNavigator()

const HomeStack = () => {
    return (
        <PostProvider>
            <Stack.Navigator>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={'HomeSreen'}
                    component={HomeSreen}
                ></Stack.Screen>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={'CommentScreen'}
                    component={CommentScreen}
                ></Stack.Screen>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={'CreatePostScreen'}
                    component={CreatePostScreen}
                ></Stack.Screen>
            </Stack.Navigator>
        </PostProvider>
    )
}

export default HomeStack
