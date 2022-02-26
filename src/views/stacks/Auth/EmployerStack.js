import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ApplicantSetup from '../../../views/screens/AuthScreens/Setup/Employer/ApplicantSetup'
import StepOne from '../../../views/screens/AuthScreens/Setup/Employer/StepOne'
import StepTwo from '../../../views/screens/AuthScreens/Setup/Employer/StepTwo'
import StepThree from '../../../views/screens/AuthScreens/Setup/Employer/StepThree'
import StepFour from '../../../views/screens/AuthScreens/Setup/StepFour'
import BasicUser from '../../../views/screens/AuthScreens/Setup/BasicUser'
import SemiVerified from '../../../views/screens/AuthScreens/Setup/SemiVerified'
import Done from '../../../views/screens/AuthScreens/Setup/Done'

const Stack = createStackNavigator()

const EmployerStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'ApplicantSetup'}
                component={ApplicantSetup}
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
                name={'SemiVerified'}
                component={SemiVerified}
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

export default EmployerStack
