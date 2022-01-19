import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MessageScreen from './MessageScreen';
import HomeScreen from './HomeScreen'


const Stack = createStackNavigator();

const MessageStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name='MessageScreen' component={MessageScreen}></Stack.Screen>
            <Stack.Screen options={{ headerShown: false }} name='HomeScreen' component={HomeScreen}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default MessageStack
