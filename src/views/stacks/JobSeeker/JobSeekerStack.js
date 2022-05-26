import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BottomNavigator from './BottomNavigator'
import MessageStack from '../../stacks/Message/MessageStack'
import InitialInterviewScreen from '../../../views/screens/InitialInterviewScreen'
import MyInterviewScreen from '../../../views/screens/MyInterviewScreen'
import ProfileScreen from '../../stacks/Profile/ProfileScreen'
import ProfileStack from '../Profile/ProfileStack'
import StepOne from '../Auth/JobSeekerSetup/StepOne'
import StepOneStudent from '../Auth/JobSeekerSetup/StepOneStudent'
import StepTwo from '../Auth/JobSeekerSetup/StepTwo'
import StepThree from '../Auth/JobSeekerSetup/StepThree'
import SemiVerified from '../Auth/SemiVerified'
import Done from '../Auth/Done'
import { SignUpProvider } from '../../../api/context/auth/SignUpContext'

const Stack = createStackNavigator()

const JobSeekerStack = () => {
    return (
        <SignUpProvider>
            <Stack.Navigator>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={'BottomNavigator'}
                    component={BottomNavigator}
                ></Stack.Screen>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={'ProfileStack'}
                    component={ProfileStack}
                ></Stack.Screen>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={'InitialInterviewScreen'}
                    component={InitialInterviewScreen}
                ></Stack.Screen>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={'MessageStack'}
                    component={MessageStack}
                ></Stack.Screen>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={'MyInterviewScreen'}
                    component={MyInterviewScreen}
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
                    name={'StepThree'}
                    component={StepThree}
                ></Stack.Screen>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={'SemiVerified'}
                    component={SemiVerified}
                    initialParams={{ usertype: 'jobseeker' }}
                ></Stack.Screen>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={'Done'}
                    component={Done}
                    initialParams={{ usertype: 'jobseeker' }}
                ></Stack.Screen>
            </Stack.Navigator>
        </SignUpProvider>
    )
}

export default JobSeekerStack
