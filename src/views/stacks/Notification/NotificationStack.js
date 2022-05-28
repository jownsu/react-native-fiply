import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import NotificationScreen from './NotificationScreen'
import { NotificationProvider } from '../../../api/context/notifications/NotificationContext'

const Stack = createStackNavigator()

const NotificationStack = () => {
    return (
        <NotificationProvider>
            <Stack.Navigator>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={'NotificationScreen'}
                    component={NotificationScreen}
                ></Stack.Screen>
            </Stack.Navigator>
        </NotificationProvider>
    )
}

export default NotificationStack
