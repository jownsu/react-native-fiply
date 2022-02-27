import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BottomNavigator from './BottomNavigator'
import MessageStack from '../stacks/Message/MessageStack'
import InitialInterviewScreen from '../../views/screens/InitialInterviewScreen'
import CreateJobScreen from '../../views/screens/CreateJobScreen'
import CreateQuestionnaireScreen from '../../views/screens/CreateQuestionnaireScreen'
import MyInterviewScreen from '../../views/screens/MyInterviewScreen'
import EditProfileScreen from '../../views/screens/EditProfileScreen'
import ProfileScreen from '../stacks/Profile/ProfileScreen'
import ProfileStack from './Profile/ProfileStack'

const Stack = createStackNavigator()

const AppStack = () => {
    return (
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
                name={'CreateJobScreen'}
                component={CreateJobScreen}
            ></Stack.Screen>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'MyInterviewScreen'}
                component={MyInterviewScreen}
            ></Stack.Screen>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'CreateQuestionnaireScreen'}
                component={CreateQuestionnaireScreen}
            ></Stack.Screen>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'EditProfileScreen'}
                component={EditProfileScreen}
            ></Stack.Screen>
        </Stack.Navigator>
    )
}

export default AppStack
