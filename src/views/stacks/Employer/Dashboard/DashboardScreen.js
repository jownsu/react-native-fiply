import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import { Text, SafeAreaView, Container, Dropdown } from '../../../components/FiplyComponents'
import HeaderTitle from '../../../components/headers/HeaderTitle'
import React from 'react'
import { FontAwesome5, AntDesign } from '@expo/vector-icons'

import Colors from '../../../../utils/Colors'
const DashboardScreen = ({ navigation }) => {
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
                                ]}
                            >
                                <AntDesign
                                    name="pluscircleo"
                                    size={48}
                                    color={Colors.primary}
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
                                    10
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
                                onPress={() => navigation.navigate('HiringManagerListScreen')}
                            >
                                <Text>View List</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={[
                                    styles.dottedContainer,
                                    { alignItems: 'center', padding: 10 },
                                ]}
                                onPress={() => navigation.navigate('AddHiringManagerScreen')}
                            >
                                <AntDesign
                                    name="pluscircleo"
                                    size={48}
                                    color={Colors.primary}
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
                                    10
                                </Text>
                                <Text>Total Hiring Managers</Text>
                            </View>
                        </View>
                    </View>
                </Container>
            </ScrollView>
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
