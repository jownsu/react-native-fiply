import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SelectUserTypeScreen from '../../../views/screens/AuthScreens/Setup/SelectUserTypeScreen'

const Stack = createStackNavigator()

const SetupStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="SelectUserTypeScreen"
                component={SelectUserTypeScreen}
            ></Stack.Screen>
        </Stack.Navigator>
    )
}

export default SetupStack
