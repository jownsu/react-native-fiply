import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import JobSetup from './JobSeekerSetup/JobSetup'
import StepOne from './JobSeekerSetup/StepOne'
import StepTwo from './JobSeekerSetup/StepTwo'
import StepThree from './JobSeekerSetup/StepThree'
import StepFour from './JobSeekerSetup/StepFour'
import BasicUser from './BasicUser'
import SemiVerified from './SemiVerified'
import Done from './Done'
import StepOneStudent from './JobSeekerSetup/StepOneStudent'
import SignUpScreen from './SignUpScreen'
import SignUpProfileScreen from './JobSeekerSetup/SignUpProfileScreen'
const Stack = createStackNavigator()

const JobSeekerSetupStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'SignUpScreen'}
                component={SignUpScreen}
                initialParams={{ usertype: 'jobseeker' }}
            ></Stack.Screen>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'SignUpProfileScreen'}
                component={SignUpProfileScreen}
                initialParams={{ usertype: 'jobseeker' }}
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
                initialParams={{ usertype: 'jobseeker' }}
            ></Stack.Screen>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'StepOne'}
                component={StepOne}
            ></Stack.Screen>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'StepOneStudent'}
                component={StepOneStudent}
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
                initialParams={{ usertype: 'jobseeker' }}
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
                initialParams={{ usertype: 'jobseeker' }}
            ></Stack.Screen>
        </Stack.Navigator>
    )
}

export default JobSeekerSetupStack
