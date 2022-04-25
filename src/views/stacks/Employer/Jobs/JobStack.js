import React from 'react'
import { JobProvider } from '../../../../api/context/jobs/JobContext'
import { createStackNavigator } from '@react-navigation/stack'
import JobScreeen from './JobScreeen'

const Stack = createStackNavigator()

const JobStack = () => {
    return (
        <JobProvider>
            <Stack.Navigator>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={'JobScreeen'}
                    component={JobScreeen}
                ></Stack.Screen>
            </Stack.Navigator>
        </JobProvider>
    )
}

export default JobStack
