import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SignupScreen from '../../../views/screens/AuthScreens/SignUp/SignupScreen'
import ConfirmEmailScreen from '../../../views/screens/AuthScreens/ConfirmEmailScreen'
import SelectUserTypeScreen from '../../screens/AuthScreens/Setup/SelectUserTypeScreen'
import JobSetup from '../../screens/AuthScreens/Setup/JobSeeker/JobSetup'
import BasicUser from '../../screens/AuthScreens/Setup/JobSeeker/BasicUser'
import SemiVerified from '../../screens/AuthScreens/Setup/JobSeeker/SemiVerified'
import StepOne from '../../screens/AuthScreens/Setup/JobSeeker/StepOne'
import StepTwo from '../../screens/AuthScreens/Setup/JobSeeker/StepTwo'
import StepThree from '../../screens/AuthScreens/Setup/JobSeeker/StepThree'
import StepFour from '../../screens/AuthScreens/Setup/JobSeeker/StepFour'
import Done from '../../screens/AuthScreens/Setup/JobSeeker/Done'
import ApplicantSetup from '../../screens/AuthScreens/Setup/Employer/ApplicantSetup'
import { default as EStepOne } from '../../screens/AuthScreens/Setup/Employer/StepOne'
import { default as EStepTwo } from '../../screens/AuthScreens/Setup/Employer/StepTwo'
import { default as EStepThree } from '../../screens/AuthScreens/Setup/Employer/StepThree'
import { default as EBasicUser } from '../../screens/AuthScreens/Setup/JobSeeker/BasicUser'
import { default as ESemiVerified } from '../../screens/AuthScreens/Setup/JobSeeker/SemiVerified'
import { default as EStepFour } from '../../screens/AuthScreens/Setup/JobSeeker/StepFour'
import { default as EDone } from '../../screens/AuthScreens/Setup/JobSeeker/Done'

const Stack = createStackNavigator()

const SignupStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'SignupScreen'}
                component={SignupScreen}
            ></Stack.Screen>
            {/* <Stack.Screen options={{ headerShown: false }} name={"ConfirmEmailScreen"} component={ConfirmEmailScreen}></Stack.Screen> */}
            <Stack.Screen
                options={{ headerShown: false }}
                name={'SelectUserTypeScreen'}
                component={SelectUserTypeScreen}
            ></Stack.Screen>
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
                name={'SemiVerified'}
                component={SemiVerified}
            ></Stack.Screen>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'Done'}
                component={Done}
            ></Stack.Screen>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'ApplicantSetup'}
                component={ApplicantSetup}
            ></Stack.Screen>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'EStepOne'}
                component={EStepOne}
            ></Stack.Screen>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'EStepTwo'}
                component={EStepTwo}
            ></Stack.Screen>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'EStepThree'}
                component={EStepThree}
            ></Stack.Screen>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'EBasicUser'}
                component={EBasicUser}
            ></Stack.Screen>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'ESemiVerified'}
                component={ESemiVerified}
            ></Stack.Screen>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'EStepFour'}
                component={EStepFour}
            ></Stack.Screen>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'EDone'}
                component={EDone}
            ></Stack.Screen>
        </Stack.Navigator>
    )
}

export default SignupStack
