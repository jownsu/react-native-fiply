import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BottomNavigator from '../views/screens/Employee/BottomNavigator'
import MessageStack from './Message/MessageStack'
import InitialInterviewScreen from '../views/screens/InitialInterviewScreen'

const Stack = createStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name={'BottomNavigator'} component={BottomNavigator}></Stack.Screen>
            <Stack.Screen options={{ headerShown: false }} name={'InitialInterviewScreen'} component={InitialInterviewScreen}></Stack.Screen>
            <Stack.Screen options={{ headerShown: false }} name={'MessageStack'} component={MessageStack}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default AppStack

