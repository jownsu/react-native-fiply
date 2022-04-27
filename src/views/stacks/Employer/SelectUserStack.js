import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SelectUserScreen from './SelectUserScreen'
import CodeScreen from './CodeScreen'
// import EmployerBott from './BottomNavigator'
// import MessageStack from '../stacks/Message/MessageStack'
// import InitialInterviewScreen from '../../views/screens/InitialInterviewScreen'
// import CreateJobScreen from '../../views/screens/CreateJobScreen'
// import CreateQuestionnaireScreen from '../../views/screens/CreateQuestionnaireScreen'
// import MyInterviewScreen from '../../views/screens/MyInterviewScreen'
// import ProfileScreen from '../stacks/Profile/ProfileScreen'
// import ProfileStack from './Profile/ProfileStack'
import BottomNavigator from './BottomNavigator'

const Stack = createStackNavigator()

const SelectUserStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'SelectUserScreen'}
                component={SelectUserScreen}
            ></Stack.Screen>
            <Stack.Screen
                options={{ headerShown: false }}
                name={'CodeScreen'}
                component={CodeScreen}
                initialParams={{ isEmployerAdmin: false, hiring_manager_id: 0 }}
            ></Stack.Screen>

            {/* <Stack.Screen
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
            ></Stack.Screen> */}
        </Stack.Navigator>
    )
}

export default SelectUserStack
