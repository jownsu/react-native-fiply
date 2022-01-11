import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import 'react-native-gesture-handler'
import Colors from '../../../utils/Colors'

import HomeScreen from './HomeScreen'
import CommunityScreen from './CommunityScreen'
import ProfileScreen from './ProfileScreen'
import NotificationScreen from './NotificationScreen'
import JobsScreen from './JobsScreen'


const Tab = createBottomTabNavigator()

const BottomNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{ 
                tabBarStyle: styles.tabBarStyle,
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: Colors.primary,
                tabBarLabelStyle: { fontFamily: 'EncodeSansExpaded-Medium', fontSize: 11 }
             }}
             initialRouteName={'HomeScreen'}
        >

            <Tab.Screen
                name={'HomeScreen'}
                component={HomeScreen}
                options={{ 
                    tabBarIcon: ({color}) => <FontAwesome5 name="home" size={24} color={color} />, 
                    title: 'Home' 
                }}
            >
            </Tab.Screen>
            
            <Tab.Screen
                name={'CommunityScreen'}
                component={CommunityScreen}
                options={{ 
                    tabBarIcon: ({color}) => <FontAwesome5 name="users" size={24} color={color} />, 
                    title: 'Community'
                }}
            >
            </Tab.Screen>

            <Tab.Screen
                name={'ProfileScreen'}
                component={ProfileScreen}
                options={{ 
                    tabBarIcon: ({color}) => (
                        <View style={styles.profileIconStyle}>
                            <FontAwesome5 name="user-tie" size={38} color={color} />       
                        </View>
                    ),
                    title: '',
                }}
            >
            </Tab.Screen>

            <Tab.Screen
                name={'NotificationScreen'}
                component={NotificationScreen}
                options={{ 
                    tabBarIcon: ({color}) => <MaterialIcons name="notifications" size={26} color={color} />, 
                    title: 'Notification'
                }}
            >
            </Tab.Screen>

            <Tab.Screen
                name={'JobsScreen'}
                component={JobsScreen}
                options={{ 
                    tabBarIcon: ({color}) => <FontAwesome5 name="briefcase" size={24} color={color} />, 
                    title: 'Jobs'
                }}
            >
            </Tab.Screen>
        </Tab.Navigator>
    )
}

export default BottomNavigator

const styles = StyleSheet.create({
    tabBarStyle:{
        borderTopWidth: 1,
        elevation: 0,
        height: 55
    },
    profileIconStyle:{
        top: -15,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: Colors.light,
        backgroundColor: Colors.white,
        elevation: 7,
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
