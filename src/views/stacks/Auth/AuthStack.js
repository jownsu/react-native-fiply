import React, { useState, useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SignInScreen from '../../screens/AuthScreens/SignInScreen'
import SignUpStack from './SignUpStack'
import LandingScreen from '../../screens/LandingScreen'
import AuthContext from '../../../api/context/auth/AuthContext'
const Stack = createStackNavigator()

const AuthStack = () => {
    const { isFirstLaunched } = useContext(AuthContext)

    return (
        <Stack.Navigator>
            {isFirstLaunched && (
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={'LandingScreen'}
                    component={LandingScreen}
                ></Stack.Screen>
            )}
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
