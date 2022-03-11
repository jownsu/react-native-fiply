import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { SignUpProvider } from '../../../api/context/auth/SignUpContext'
import SignUpScreen from '../../screens/AuthScreens/SignUpScreen'
import ConfirmEmailScreen from '../../screens/AuthScreens/ConfirmEmailScreen'
import SelectUserTypeScreen from '../../screens/AuthScreens/SelectUserTypeScreen'
import EmployerSetupStack from './EmployerSetupStack'
import JobSeekerSetupStack from './JobSeekerSetupStack'

const Stack = createStackNavigator()

const SignUpStack = () => {
    return (
        <SignUpProvider>
            <Stack.Navigator>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={'SignUpScreen'}
                    component={SignUpScreen}
                ></Stack.Screen>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={'ConfirmEmailScreen'}
                    component={ConfirmEmailScreen}
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
        </SignUpProvider>
    )
}

export default SignUpStack
