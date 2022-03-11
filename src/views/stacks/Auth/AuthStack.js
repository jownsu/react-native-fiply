import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SignInScreen from '../../screens/AuthScreens/SignInScreen'
import SignUpStack from './SignUpStack'

const Stack = createStackNavigator()

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'SignInScreen'}
                component={SignInScreen}
            ></Stack.Screen>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'SignUpStack'}
                component={SignUpStack}
            ></Stack.Screen>
        </Stack.Navigator>
    )
}

export default AuthStack
