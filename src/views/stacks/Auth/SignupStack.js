import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { SignUpProvider } from '../../../api/context/auth/SignUpContext'
import SelectUserTypeScreen from './SelectUserTypeScreen'
import ConfirmEmailScreen from './ConfirmEmailScreen'
import EmployerSetupStack from './EmployerSetupStack'
import JobSeekerSetupStack from './JobSeekerSetupStack'
import StepTwo from './JobSeekerSetup/StepTwo'
import StepOne from './JobSeekerSetup/StepOne'
import StepThree from './JobSeekerSetup/StepThree'
import StepOneStudent from './JobSeekerSetup/StepOneStudent'

const Stack = createStackNavigator()

const SignUpStack = () => {
    return (
        <SignUpProvider>
            <Stack.Navigator>
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
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={'ConfirmEmailScreen'}
                    component={ConfirmEmailScreen}
                ></Stack.Screen>
            </Stack.Navigator>
        </SignUpProvider>
    )
}

export default SignUpStack
