import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CommunityScreen from './CommunityScreen'
import ScanScreen from './ScanScreen'

import { CommunityProvider } from '../../../api/context/community/CommunityContext'

const Stack = createStackNavigator()

const CommunityStack = () => {
    return (
        <CommunityProvider>
            <Stack.Navigator>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={'CommunityScreen'}
                    component={CommunityScreen}
                ></Stack.Screen>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={'ScanScreen'}
                    component={ScanScreen}
                ></Stack.Screen>
            </Stack.Navigator>
        </CommunityProvider>
    )
}

export default CommunityStack
