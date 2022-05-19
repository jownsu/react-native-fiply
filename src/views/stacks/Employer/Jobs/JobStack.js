import React from 'react'
import { JobProvider } from '../../../../api/context/EMPLOYER/job/JobContext'
import { createStackNavigator } from '@react-navigation/stack'
import JobScreen from './JobScreen'
import JobDetailsScreen from './JobDetailsScreen'
import ApplicantScreen from './ApplicantScreen'
import AnswersScreen from './AnswersScreen'
import ResumeScreen from './ResumeScreen'
import ApplicantInterviewListScreen from './ApplicantInterviewListScreen'

const Stack = createStackNavigator()

const JobStack = () => {
    return (
        <JobProvider>
            <Stack.Navigator>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={'JobScreen'}
                    component={JobScreen}
                ></Stack.Screen>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={'JobDetailsScreen'}
                    component={JobDetailsScreen}
                ></Stack.Screen>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={'ApplicantScreen'}
                    component={ApplicantScreen}
                ></Stack.Screen>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={'AnswersScreen'}
                    component={AnswersScreen}
                ></Stack.Screen>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={'ResumeScreen'}
                    component={ResumeScreen}
                ></Stack.Screen>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={'ApplicantInterviewListScreen'}
                    component={ApplicantInterviewListScreen}
                ></Stack.Screen>
            </Stack.Navigator>
        </JobProvider>
    )
}

export default JobStack
