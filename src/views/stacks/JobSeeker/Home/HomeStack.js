import React from 'react'
import { PostProvider } from '../../../../api/context/posts/PostContext'
import { createStackNavigator } from '@react-navigation/stack'
import HomeSreen from './HomeScreen'
import CommentScreen from '../../../screens/CommentScreen'
import CreatePostScreen from '../../../screens/CreatePostScreen'
import UpVotesScreen from '../../../screens/UpVotesScreen'

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
                    initialParams={{ edit: false, data: {} }}
                ></Stack.Screen>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={'UpVotesScreen'}
                    component={UpVotesScreen}
                ></Stack.Screen>
            </Stack.Navigator>
        </PostProvider>
    )
}

export default HomeStack
