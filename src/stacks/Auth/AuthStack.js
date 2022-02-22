import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SignInScreen from '../../views/screens/AuthScreens/SignInScreen'
import SignupStack from './SignupStack'

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
                name={'SignupStack'}
                component={SignupStack}
            ></Stack.Screen>
        </Stack.Navigator>
    )
}

export default AuthStack
