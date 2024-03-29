import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import { Text, SafeAreaView, Container, Dropdown } from '../../../components/FiplyComponents'
import HeaderTitle from '../../../components/headers/HeaderTitle'
import React, { useContext, useEffect } from 'react'
import { FontAwesome5, AntDesign } from '@expo/vector-icons'
import { Snackbar } from 'react-native-paper'
import DashboardContext from '../../../../api/context/EMPLOYER/dashboard/DashboardContext'
import AuthContext from '../../../../api/context/auth/AuthContext'

import Colors from '../../../../utils/Colors'
const DashboardScreen = ({ navigation }, offset) => {
    const {
        getDashboard,
        total_hiring_manager,
        total_job_posts,
        snackBarMessage,
        hideSnackBar,
        hiringManagers,
        getHiringManagers,
    } = useContext(DashboardContext)
    const { hiringManager, user } = useContext(AuthContext)

    const onScroll = (e) => {
        const currentOffset = e.nativeEvent.contentOffset.y
        const dif = currentOffset - (offset || 0)

        if (dif < 0) {
            navigation.getParent().setOptions({
                tabBarStyle: {
                    display: 'flex',
                    borderTopWidth: 1,
                    elevation: 0,
                },
            })
        } else {
            navigation.getParent().setOptions({
                tabBarStyle: { display: 'none' },
            })
        }
        // console.log('dif=',dif);
        offset = currentOffset
    }
    useEffect(() => {
        getDashboard()
    }, [])
    return (
        <SafeAreaView statusBarColor={Colors.white}>
            <ScrollView>
                <HeaderTitle title={'Dashboard'} style={{ backgroundColor: Colors.white }} />
                <Container padding={10}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity
                            style={[
                                styles.headerBtnContainer,
                                { borderBottomWidth: 1, borderColor: Colors.light },
                            ]}
                        >
                            <View>
                                <View style={styles.headerIconContainer}>
                                    <FontAwesome5 name="user-tie" size={24} color={Colors.white} />
                                </View>
                            </View>
                            <View style={styles.headerTextItem}>
                                <Text>
                                    {' '}
                                    <Text weight="medium" size={16}>
                                        4
                                    </Text>{' '}
                                    New applicants to review
                                </Text>
                            </View>
                            <View>
                                <FontAwesome5 name="caret-right" size={24} color={Colors.black} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.headerBtnContainer}>
                            <View>
                                <View style={styles.headerIconContainer}>
                                    <FontAwesome5
                                        name="calendar-alt"
                                        size={24}
                                        color={Colors.white}
                                    />
                                </View>
                            </View>
                            <View style={styles.headerTextItem}>
                                <Text>
                                    {' '}
                                    <Text weight="medium" size={16}>
                                        7
                                    </Text>{' '}
                                    Schedule interview for today
                                </Text>
                            </View>
                            <View>
                                <FontAwesome5 name="caret-right" size={24} color={Colors.black} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeaderContainer}>
                            <Text weight="medium" size={16}>
                                Job Statistics
                            </Text>
                            <Dropdown
                                data={[
                                    {
                                        id: 1,
                                        name: 'This Month',
                                    },
                                    {
                                        id: 2,
                                        name: 'This Year',
                                    },
                                ]}
                                noTextInput
                                dropdownIcon
                                value={'This Month'}
                                textInputStyle={{
                                    height: 25,
                                    fontSize: 11,
                                }}
                                iconStyle={{ marginTop: 15 }}
                                iconSize={24}
                            />
                        </View>

                        <View style={styles.dottedContainer}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    paddingVertical: 15,
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center',
                                }}
                            >
                                <Text size={42} color={Colors.primary} weight="medium">
                                    49
                                </Text>
                                <Text size={16}>Total Applicants</Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    paddingVertical: 15,
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center',
                                }}
                            >
                                <TouchableOpacity>
                                    <Text size={16}>View List</Text>
                                </TouchableOpacity>
                                <View
                                    style={{
                                        backgroundColor: Colors.primaryLight,
                                        paddingHorizontal: 30,
                                        paddingVertical: 10,
                                        borderRadius: 50,
                                    }}
                                >
                                    <Text weight="medium">+5.0%</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeaderContainer}>
                            <Text weight="medium" size={16}>
                                Job Post
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={[
                                    styles.dottedContainer,
                                    { alignItems: 'center', padding: 10 },
                                    {
                                        borderColor: hiringManager.token
                                            ? Colors.primary
                                            : Colors.grey,
                                    },
                                ]}
                                disabled={!hiringManager.token}
                                onPress={() => navigation.navigate('CreateJobScreen')}
                            >
                                <AntDesign
                                    name="pluscircleo"
                                    size={48}
                                    color={hiringManager.token ? Colors.primary : Colors.grey}
                                    style={{ marginBottom: 20 }}
                                />
                                <Text>New Job Post</Text>
                            </TouchableOpacity>

                            <View
                                style={[
                                    styles.dottedContainer,
                                    { alignItems: 'center', padding: 10 },
                                ]}
                            >
                                <Text
                                    weight="medium"
                                    color={Colors.primary}
                                    size={36}
                                    style={{ marginBottom: 20 }}
                                >
                                    {total_job_posts}
                                </Text>
                                <Text>Total Job Posts</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeaderContainer}>
                            <Text weight="medium" size={16}>
                                Hiring Managers
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    if (hiringManagers.length == 0) {
                                        getHiringManagers()
                                    }
                                    navigation.push('HiringManagerListScreen')
                                }}
                                disabled={!user.companyToken}
                            >
                                <Text>View List</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={[
                                    styles.dottedContainer,
                                    { alignItems: 'center', padding: 10 },
                                    {
                                        borderColor: user.companyToken
                                            ? Colors.primary
                                            : Colors.grey,
                                    },
                                ]}
                                disabled={!user.companyToken}
                                onPress={() => navigation.push('AddHiringManagerScreen')}
                            >
                                <AntDesign
                                    name="pluscircleo"
                                    size={48}
                                    color={user.companyToken ? Colors.primary : Colors.grey}
                                    style={{ marginBottom: 20 }}
                                />
                                <Text>New Hiring Manager</Text>
                            </TouchableOpacity>

                            <View
                                style={[
                                    styles.dottedContainer,
                                    { alignItems: 'center', padding: 10 },
                                ]}
                            >
                                <Text
                                    weight="medium"
                                    color={Colors.primary}
                                    size={36}
                                    style={{ marginBottom: 20 }}
                                >
                                    {total_hiring_manager}
                                </Text>
                                <Text>Total Hiring Managers</Text>
                            </View>
                        </View>
                    </View>
                </Container>
            </ScrollView>

            <Snackbar
                visible={snackBarMessage ? true : false}
                onDismiss={() => hideSnackBar()}
                duration={3000}
                style={{ backgroundColor: Colors.black }}
            >
                <Text color={Colors.white}>{snackBarMessage}</Text>
            </Snackbar>
        </SafeAreaView>
    )
}

export default DashboardScreen

const styles = StyleSheet.create({
    sectionContainer: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.light,
        marginTop: 10,
        paddingVertical: 20,
    },
    headerContainer: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.light,
        marginTop: 10,
    },
    sectionHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    headerBtnContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTextItem: {
        flex: 1,
        paddingHorizontal: 5,
    },
    headerIconContainer: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: Colors.primary,
    },
    dottedContainer: {
        flex: 1,
        borderStyle: 'dashed',
        borderWidth: 2,
        marginHorizontal: 20,
        marginBottom: 10,
        borderRadius: 20,
        borderColor: Colors.primary,
    },
})
