import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import NotificationScreen from './NotificationScreen'

const Stack = createStackNavigator()

const NotificationStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'NotificationScreen'}
                component={NotificationScreen}
            ></Stack.Screen>
        </Stack.Navigator>
    )
}

export default NotificationStack
