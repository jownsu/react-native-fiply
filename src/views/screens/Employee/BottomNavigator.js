import React, { useRef, useCallback } from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { Text } from '../../components/FiplyComponents'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import 'react-native-gesture-handler'
import Colors from '../../../utils/Colors'

import { BottomSheetModal } from '../../components/FiplyComponents'

import HomeScreen from './HomeScreen'
import CommunityScreen from './CommunityScreen'
import ProfileScreen from './ProfileScreen'
import NotificationScreen from './NotificationScreen'
import JobsScreen from './JobsScreen'


const Tab = createBottomTabNavigator()



const BottomNavigator = ({navigation}) => {

    const bottomSheetModalRef = useRef(null);

    const handlePresentModalPress = useCallback(() => {
      bottomSheetModalRef.current?.present();
    }, []);

    const handleClosePress = () => bottomSheetModalRef.current.close()

    return (
        <View style={{ flex: 1 }}>

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
                        tabBarButton: props => <TouchableOpacity activeOpacity={.9} {...props} style={{top: -15, height: 60, width: 60}} />,
                        title: '',
                    }}
                    listeners={() => ({
                        tabPress: e => {
                            e.preventDefault()
                            handlePresentModalPress()
                        }
                    })}
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
            <BottomSheetModal 
                bottomSheetModalRef={bottomSheetModalRef}
                pointsSnap={[200]}
            >   
                <View style={styles.bottomSheetContainer}>
                    <View style={styles.btmHeaderContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <View style={styles.imgContainer}>
                            <Image style={styles.img} source={require('../../../assets/img/members/digno.jpg')} resizeMode='contain'/>
                        </View>
                        <View>
                            <Text weight='medium' size={18}>Jhones Digno</Text>
                            <TouchableOpacity activeOpacity={.7} onPress={() => { 
                                    navigation.navigate('ProfileScreen')
                                    handleClosePress()
                                    }}>
                                <Text color={Colors.secondary}>See your profile</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                        <View>
                            <Text color={Colors.secondary} weight='medium' size={16}>Basic User</Text>
                        </View>
                    </View>
                    <View style={styles.btmBodyContainer}>
                        <Text color={Colors.primary} center weight='medium'>Ready to Work</Text>
                        <Text center>Laravel Developer | React Native Developer</Text>
                    </View>
                    <View style={styles.btmFooterContainer}>
                        <TouchableOpacity style={styles.footerBtn}>
                            <FontAwesome5 name="user-cog" size={24} color={Colors.black} style={{ marginRight: 5 }}/>
                            <Text weight='medium'>Settings</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.footerBtn}>
                            <FontAwesome5 name="sign-out-alt" size={24} color={Colors.red} style={{ marginRight: 5 }}/>
                            <Text color={Colors.red} weight='medium'>Sign out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
    
            </BottomSheetModal>

        </View>

    )
}

export default BottomNavigator

const styles = StyleSheet.create({
    tabBarStyle:{
        borderTopWidth: 1,
        elevation: 0,
        height: 55,
    },
    profileIconStyle:{
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
    bottomSheetContainer:{
        paddingHorizontal: 20
    },
    btmHeaderContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    imgContainer:{
        borderWidth: 1,
        height: 50,
        width: 50,
        overflow: 'hidden',
        borderRadius: 100,
        marginRight: 10
    },
    img:{
        height: 50,
        width: 50
    },
    btmBodyContainer:{
        marginTop: 25
    },
    btmFooterContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    footerBtn:{
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },

})