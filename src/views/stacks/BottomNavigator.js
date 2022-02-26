import React, { useRef, useCallback, useContext } from 'react'
import { StyleSheet, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Text } from '../components/FiplyComponents'
import { Avatar } from 'react-native-paper'
import AuthContext from '../../api/context/auth/AuthContext'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import 'react-native-gesture-handler'
import Colors from '../../utils/Colors'

import { BottomSheetModal } from '../components/FiplyComponents'

import HomeStack from './Home/HomeStack'
import CommunityStack from './Community/CommunityStack'
import NotificationStack from './Notification/NotificationStack'
import JobStack from './Job/JobStack'

const Tab = createBottomTabNavigator()

const BottomNavigator = ({ navigation }) => {
    const { logout, user } = useContext(AuthContext)

    const bottomSheetModalRef = useRef(null)

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present()
    }, [])

    const handleClosePress = () => bottomSheetModalRef.current.close()

    const handleSignoutPress = () => logout()

    const noScreen = () => null

    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: styles.tabBarStyle,
                    headerShown: false,
                    tabBarShowLabel: true,
                    tabBarActiveTintColor: Colors.primary,
                    tabBarLabelStyle: {
                        fontFamily: 'EncodeSansExpaded-Medium',
                        fontSize: 11,
                    },
                }}
                initialRouteName={'HomeStack'}
            >
                <Tab.Screen
                    name={'HomeStack'}
                    component={HomeStack}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <FontAwesome5 name="home" size={24} color={color} />
                        ),
                        title: 'Home',
                    }}
                ></Tab.Screen>

                <Tab.Screen
                    name={'CommunityStack'}
                    component={CommunityStack}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <FontAwesome5 name="users" size={24} color={color} />
                        ),
                        title: 'Community',
                    }}
                ></Tab.Screen>

                <Tab.Screen
                    name={'NoScreen'}
                    component={noScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <View style={styles.profileIconStyle}>
                                <FontAwesome5 name="user-tie" size={38} color={color} />
                            </View>
                        ),
                        tabBarButton: (props) => (
                            <TouchableOpacity
                                activeOpacity={0.9}
                                {...props}
                                style={{ top: -15, height: 60, width: 60 }}
                            />
                        ),
                        title: '',
                    }}
                    listeners={() => ({
                        tabPress: (e) => {
                            e.preventDefault()
                            handlePresentModalPress()
                        },
                    })}
                ></Tab.Screen>

                <Tab.Screen
                    name={'NotificationStack'}
                    component={NotificationStack}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialIcons name="notifications" size={26} color={color} />
                        ),
                        title: 'Notification',
                    }}
                ></Tab.Screen>

                <Tab.Screen
                    name={'JobStack'}
                    component={JobStack}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <FontAwesome5 name="briefcase" size={24} color={color} />
                        ),
                        title: 'Jobs',
                    }}
                ></Tab.Screen>
            </Tab.Navigator>
            <BottomSheetModal bottomSheetModalRef={bottomSheetModalRef} pointsSnap={[175]}>
                <View style={styles.bottomSheetContainer}>
                    <View style={styles.btmHeaderContainer}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar.Image
                                size={50}
                                source={{ uri: user.avatar }}
                                backgroundColor={Colors.light}
                                style={styles.imgContainer}
                            />
                            <View style={{ flex: 1 }}>
                                <Text
                                    weight="medium"
                                    size={18}
                                    adjustsFontSizeToFit
                                    numberOfLines={1}
                                >
                                    {user.fullname}
                                </Text>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => {
                                        navigation.navigate('ProfileScreen', {
                                            userId: 'me',
                                        })
                                        handleClosePress()
                                    }}
                                >
                                    <Text color={Colors.secondary}>See your profile</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* <View>
                                <Text color={Colors.secondary} weight='medium' size={16}>Basic User</Text>
                            </View> */}
                    </View>
                    <View style={styles.btmBodyContainer}>
                        <Text color={Colors.primary} center weight="medium">
                            {user.status}
                        </Text>
                        {user.description ? <Text center>{user.description}</Text> : null}
                    </View>
                    <View style={styles.btmFooterContainer}>
                        <TouchableOpacity style={styles.footerBtn}>
                            <FontAwesome5
                                name="user-cog"
                                size={24}
                                color={Colors.black}
                                style={{ marginRight: 5 }}
                            />
                            <Text weight="medium">Settings</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.footerBtn}
                            onPress={() => handleSignoutPress()}
                        >
                            <FontAwesome5
                                name="sign-out-alt"
                                size={24}
                                color={Colors.red}
                                style={{ marginRight: 5 }}
                            />
                            <Text color={Colors.red} weight="medium">
                                Sign out
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </BottomSheetModal>
        </View>
    )
}

export default BottomNavigator

const styles = StyleSheet.create({
    tabBarStyle: {
        borderTopWidth: 1,
        elevation: 0,
    },
    profileIconStyle: {
        borderWidth: 1,
        borderRadius: 100,
        borderColor: Colors.light,
        backgroundColor: Colors.white,
        elevation: 5,
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSheetContainer: {
        paddingHorizontal: 20,
        flex: 1,
        justifyContent: 'space-between',
    },
    btmHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    imgContainer: {
        borderWidth: 1,
        overflow: 'hidden',
        marginRight: 10,
    },
    img: {
        height: 50,
        width: 50,
    },
    btmBodyContainer: {},
    btmFooterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    footerBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})
