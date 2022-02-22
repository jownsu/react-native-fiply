import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import JobSetup from '../../views/screens/AuthScreens/Setup/JobSeeker/JobSetup'
import StepOne from '../../views/screens/AuthScreens/Setup/JobSeeker/StepOne'
import StepTwo from '../../views/screens/AuthScreens/Setup/JobSeeker/StepTwo'
import StepThree from '../../views/screens/AuthScreens/Setup/JobSeeker/StepThree'
import StepFour from '../../views/screens/AuthScreens/Setup/StepFour'
import BasicUser from '../../views/screens/AuthScreens/Setup/BasicUser'
import SemiVerifed from '../../views/screens/AuthScreens/Setup/SemiVerified'
import Done from '../../views/screens/AuthScreens/Setup/Done'

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
