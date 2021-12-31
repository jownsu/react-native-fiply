import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SelectUserTypeScreen from '../../views/screens/AuthScreens/Setup/SelectUserTypeScreen'
import JobSeekerSetupStack from './JobSeekerSetupStack'
import EmployerStack from './EmployerStack'

const Stack = createStackNavigator()

const SelectUserTypeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name={'SelectUserTypeScreen'} component={SelectUserTypeScreen} ></Stack.Screen>
            <Stack.Screen options={{ headerShown: false }} name={'JobSeekerSetupStack'} component={JobSeekerSetupStack} ></Stack.Screen>
            <Stack.Screen options={{ headerShown: false }} name={'EmployerStack'} component={EmployerStack} ></Stack.Screen>
        </Stack.Navigator>

    )
}

export default SelectUserTypeStack
