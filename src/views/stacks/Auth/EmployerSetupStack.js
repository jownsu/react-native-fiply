import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ApplicantSetup from './EmployerSetup/ApplicantSetup'
import StepOne from './EmployerSetup/StepOne'
import StepTwo from './EmployerSetup/StepTwo'
import StepThree from './EmployerSetup/StepThree'
import StepFour from './EmployerSetup/StepFour'
import BasicUser from './EmployerSetup/BasicUser'
import SemiVerified from './EmployerSetup/SemiVerified'
import Done from './EmployerSetup/Done'

const Stack = createStackNavigator()

const EmployerSetupStack = () => {
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

export default EmployerSetupStack
