import React from 'react'
import { DashboardProvider } from '../../../../api/context/EMPLOYER/dashboard/DashboardContext'
import { createStackNavigator } from '@react-navigation/stack'
import DashboardScreen from './DashboardScreen'
import AddHiringManagerScreen from './AddHiringManagerScreen'
import HiringManagerListScreen from './HiringManagerListScreen'
import HiringManagerScreen from './HiringManagerScreen'
import CreateJobScreen from './CreateJobScreen'
import CreateQuestionnaireScreen from './CreateQuestionnaireScreen'

const Stack = createStackNavigator()

const DashboardStack = () => {
    return (
        <DashboardProvider>
            <Stack.Navigator>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={'DashboardScreen'}
                    component={DashboardScreen}
                ></Stack.Screen>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={'AddHiringManagerScreen'}
                    component={AddHiringManagerScreen}
                ></Stack.Screen>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={'HiringManagerListScreen'}
                    component={HiringManagerListScreen}
                ></Stack.Screen>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={'HiringManagerScreen'}
                    component={HiringManagerScreen}
                ></Stack.Screen>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={'CreateJobScreen'}
                    component={CreateJobScreen}
                ></Stack.Screen>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={'CreateQuestionnaireScreen'}
                    component={CreateQuestionnaireScreen}
                ></Stack.Screen>
            </Stack.Navigator>
        </DashboardProvider>
    )
}

export default DashboardStack
