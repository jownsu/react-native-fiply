import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SignInScreen from '../../screens/AuthScreens/SignInScreen'
import SignUpScreen from '../../screens/AuthScreens/SignUpScreen'
import SelectUserTypeScreen from '../../screens/AuthScreens/SelectUserTypeScreen'
import EmployerSetupStack from './EmployerSetupStack'
import JobSeekerSetupStack from './JobSeekerSetupStack'

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
                name={'SignUpScreen'}
                component={SignUpScreen}
            ></Stack.Screen>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'SelectUserTypeScreen'}
                component={SelectUserTypeScreen}
            ></Stack.Screen>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'EmployerSetupStack'}
                component={EmployerSetupStack}
            ></Stack.Screen>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'JobSeekerSetupStack'}
                component={JobSeekerSetupStack}
            ></Stack.Screen>
        </Stack.Navigator>
    )
}

export default AuthStack
