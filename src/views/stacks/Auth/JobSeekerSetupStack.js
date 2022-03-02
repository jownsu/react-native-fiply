import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import JobSetup from './JobSeekerSetup/JobSetup'
import StepOne from './JobSeekerSetup/StepOne'
import StepTwo from './JobSeekerSetup/StepTwo'
import StepThree from './JobSeekerSetup/StepThree'
import StepFour from './JobSeekerSetup/StepFour'
import BasicUser from './JobSeekerSetup/BasicUser'
import SemiVerifed from './JobSeekerSetup/SemiVerified'
import Done from './JobSeekerSetup/Done'

const Stack = createStackNavigator()

const JobSeekerSetupStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'JobSetup'}
                component={JobSetup}
            ></Stack.Screen>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'BasicUser'}
                component={BasicUser}
            ></Stack.Screen>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'StepOne'}
                component={StepOne}
            ></Stack.Screen>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'StepTwo'}
                component={StepTwo}
            ></Stack.Screen>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'SemiVerifed'}
                component={SemiVerifed}
            ></Stack.Screen>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'StepThree'}
                component={StepThree}
            ></Stack.Screen>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'StepFour'}
                component={StepFour}
            ></Stack.Screen>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'Done'}
                component={Done}
            ></Stack.Screen>
        </Stack.Navigator>
    )
}

export default JobSeekerSetupStack
