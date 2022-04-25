import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ApplicantSetup from './EmployerSetup/ApplicantSetup'
import StepOne from './EmployerSetup/StepOne'
import StepTwo from './EmployerSetup/StepTwo'
import StepThree from './EmployerSetup/StepThree'
import StepFour from './EmployerSetup/StepFour'
import BasicUser from './BasicUser'
import SemiVerified from './SemiVerified'
import Done from './Done'
import SignUpScreen from './SignUpScreen'
import SignUpCompanyScreen from './EmployerSetup/SignUpCompanyScreen'

const Stack = createStackNavigator()

const EmployerSetupStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'SignUpScreen'}
                component={SignUpScreen}
                initialParams={{ usertype: 'employer' }}
            ></Stack.Screen>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'SignUpCompanyScreen'}
                component={SignUpCompanyScreen}
                initialParams={{ usertype: 'employer' }}
            ></Stack.Screen>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'ApplicantSetup'}
                component={ApplicantSetup}
            ></Stack.Screen>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'BasicUser'}
                component={BasicUser}
                initialParams={{ usertype: 'employer' }}
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
                name={'StepThree'}
                component={StepThree}
            ></Stack.Screen>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'SemiVerified'}
                component={SemiVerified}
                initialParams={{ usertype: 'employer' }}
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
                initialParams={{ usertype: 'employer' }}
            ></Stack.Screen>
        </Stack.Navigator>
    )
}

export default EmployerSetupStack
