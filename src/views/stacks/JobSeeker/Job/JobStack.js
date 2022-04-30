import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import JobScreen from './JobScreen'
import ShowJobScreen from './ShowJobScreen'
import QuestionnaireScreen from './QuestionnaireScreen'
import { JobProvider } from '../../../../api/context/jobs/JobContext'

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
                    options={{ headerShown: false, tabBar: false }}
                    name={'ShowJobScreen'}
                    component={ShowJobScreen}
                ></Stack.Screen>
                <Stack.Screen
                    options={{ headerShown: false, tabBar: false }}
                    name={'QuestionnaireScreen'}
                    component={QuestionnaireScreen}
                ></Stack.Screen>
            </Stack.Navigator>
        </JobProvider>
    )
}

export default JobStack
