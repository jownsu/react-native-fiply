import React, { useContext, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper'
import {
    Text,
    SafeAreaView,
    Container,
    SecondaryButton,
    TextInput,
} from '../../components/FiplyComponents'
import ProfileContext from '../../../api/context/profile/ProfileContext'
import CardInfo from '../../components/profile/CardInfo'

import Header from '../../components/headers/Header'
import Colors from '../../../utils/Colors'
import { MaterialIcons } from '@expo/vector-icons'

const ProfileInfoScreen = ({ navigation }) => {
    const { userInfo, jobPreference, getJobPreference } = useContext(ProfileContext)

    useEffect(() => {
        getJobPreference(userInfo.id)
    }, [])

    return (
        <SafeAreaView statusBarColor={Colors.white} flex>
            <Header
                title={'More Details'}
                style={{ backgroundColor: Colors.white }}
                onBackPress={() => navigation.pop()}
            />

            <Container style={styles.container}>
                {/* <View>
                    <View style={styles.detailsContainer}>
                        <Text weight="medium" size={18}>
                            Personal Information
                        </Text>
                        <Text weight="medium" size={14}>
                            Gender
                        </Text>
                        <Text>{userInfo.gender}</Text>
                        <Text weight="medium" size={14}>
                            Birthday
                        </Text>
                        <Text>{userInfo.birthday}</Text>
                        <Text weight="medium" size={14}>
                            Language
                        </Text>
                        <Text>{userInfo.language}</Text>
                    </View>

                    <View style={styles.detailsContainer}>
                        <Text weight="medium" size={18}>
                            Contact Information
                        </Text>
                        <Text weight="medium" size={14}>
                            Mobile Number
                        </Text>
                        <Text>{userInfo.mobile_no}</Text>
                        <Text weight="medium" size={14}>
                            Telephone Number
                        </Text>
                        <Text>{userInfo.telephone_no}</Text>
                        <Text weight="medium" size={14}>
                            Website
                        </Text>
                        <Text>{userInfo.website}</Text>
                    </View>
                </View> */}
                <CardInfo
                    style={styles.detailsContainer}
                    title="Personal Information"
                    headers={['Gender', 'Birthday', 'Language']}
                    infos={{
                        gender: userInfo.gender,
                        birthday: userInfo.birthday,
                        language: userInfo.language,
                    }}
                />
                <CardInfo
                    style={styles.detailsContainer}
                    title="Contact Information"
                    headers={['Mobile Number', 'Telephone Number', 'Website']}
                    infos={{
                        mobile_no: userInfo.mobile_no,
                        telephone_no: userInfo.telephone_no,
                        website: userInfo.website,
                    }}
                />

                <CardInfo
                    style={styles.detailsContainer}
                    title="Job Preference"
                    headers={['Job Title', 'Location', 'Employment Type']}
                    infos={{
                        job_title: jobPreference.job_title,
                        location: jobPreference.location,
                        employment_type: jobPreference.employment_type,
                    }}
                />
                <View style={styles.actionContainer}>
                    <TouchableOpacity
                        style={styles.actionBtn}
                        onPress={() => navigation.push('EditEducationalBackgroundScreen')}
                    >
                        <Text color={Colors.secondary} weight="medium" size={16}>
                            Educational Background
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionBtn}
                        onPress={() => navigation.push('EditExperienceScreen')}
                    >
                        <Text color={Colors.secondary} weight="medium" size={16}>
                            Work Experiences
                        </Text>
                    </TouchableOpacity>
                </View>
            </Container>
        </SafeAreaView>
    )
}

export default ProfileInfoScreen

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
    },
    detailsContainer: {
        borderRadius: 0,
    },
    actionContainer: {
        paddingVertical: 10,
    },
    actionBtn: {
        paddingVertical: 10,
    },
})
