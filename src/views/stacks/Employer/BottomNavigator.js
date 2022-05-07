import React, { useRef, useCallback, useContext } from 'react'
import { StyleSheet, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Text } from '../../components/FiplyComponents'
import { Avatar } from 'react-native-paper'
import AuthContext from '../../../api/context/auth/AuthContext'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import 'react-native-gesture-handler'
import Colors from '../../../utils/Colors'

import { BottomSheetModal } from '../../components/FiplyComponents'

import DashboardStack from './Dashboard/DashboardStack'
import JobStack from './Jobs/JobStack'
import CommunityStack from '../Community/CommunityStack'
import NotificationStack from '../Notification/NotificationStack'
import AccountLevelBar from '../../components/AccountLevelBar'

const Tab = createBottomTabNavigator()

const BottomNavigator = ({ navigation }) => {
    const { logout, user, logoutAsEmployer, hiringManager } = useContext(AuthContext)

    const bottomSheetModalRef = useRef(null)

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present()
    }, [])

    const handleClosePress = () => bottomSheetModalRef.current.close()

    const handleSignoutPress = () => logout()

    const handleSwitchUserPress = () => {
        if (hiringManager.token) {
            logoutAsEmployer('hiring_manager')
        } else {
            logoutAsEmployer('company')
        }
    }

    const handleGoToProfile = () => {
        navigation.navigate('ProfileStack', {
            userId: 'me',
        })
        handleClosePress()
    }

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
                initialRouteName={'DashboardStack'}
            >
                <Tab.Screen
                    name={'DashboardStack'}
                    component={DashboardStack}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialIcons name="dashboard" size={24} color={color} />
                        ),
                        title: 'Dashboard',
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

                <Tab.Screen
                    name={'NoScreen'}
                    component={noScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <View style={styles.profileIconStyle}>
                                {/* <FontAwesome5 name="user-tie" size={38} color={color} /> */}
                                <Avatar.Image
                                    size={55}
                                    source={{ uri: user.avatar }}
                                    backgroundColor={Colors.light}
                                />
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
                    name={'NotificationStack'}
                    component={NotificationStack}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialIcons name="notifications" size={26} color={color} />
                        ),
                        title: 'Notifications',
                    }}
                ></Tab.Screen>
            </Tab.Navigator>

            <BottomSheetModal
                bottomSheetModalRef={bottomSheetModalRef}
                pointsSnap={[hiringManager.token ? 250 : 200]}
            >
                <View style={styles.bottomSheetContainer}>
                    <View style={styles.btmHeaderContainer}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
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
                                        {user.name}
                                    </Text>

                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={handleGoToProfile}
                                    >
                                        <Text weight="medium" color={Colors.secondary}>
                                            See Company profile
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        {hiringManager.token && (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 10,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Avatar.Image
                                        size={50}
                                        source={{ uri: hiringManager.avatar }}
                                        backgroundColor={Colors.light}
                                        style={styles.imgContainer}
                                    />
                                    <View style={{ flex: 1 }}>
                                        <Text>Hiring Manager</Text>
                                        <Text
                                            weight="medium"
                                            size={16}
                                            adjustsFontSizeToFit
                                            numberOfLines={1}
                                        >
                                            {hiringManager.name}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>
                    <View style={styles.btmBodyContainer}>
                        <Text size={11} color={Colors.secondary}>
                            Your profile progress
                        </Text>
                        <AccountLevelBar level={user.account_level} />
                    </View>
                    <View style={styles.btmFooterContainer}>
                        <TouchableOpacity style={styles.footerBtn} onPress={handleSwitchUserPress}>
                            <FontAwesome5
                                name="sign-out-alt"
                                size={24}
                                color={Colors.black}
                                style={{ marginRight: 5 }}
                            />
                            <Text color={Colors.black} weight="medium">
                                Switch User
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.footerBtn} onPress={handleSignoutPress}>
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
    btmBodyContainer: {
        paddingVertical: 7,
    },
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
