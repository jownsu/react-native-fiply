import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CommunityScreen from './CommunityScreen'

const Stack = createStackNavigator()

const CommunityStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'CommunityScreen'}
                component={CommunityScreen}
            ></Stack.Screen>
        </Stack.Navigator>
    )
}

export default CommunityStack
