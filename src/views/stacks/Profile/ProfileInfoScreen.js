import React, { useContext, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'
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
            <ScrollView>
                <Container style={styles.container}>
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
                        headers={['Email', 'Mobile Number', 'Telephone Number', 'Website']}
                        infos={{
                            email: userInfo.email,
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
                        {userInfo.account_level > 0 ? (
                            <TouchableOpacity
                                style={styles.actionBtn}
                                onPress={() => navigation.push('ResumeScreen')}
                            >
                                <Text color={Colors.secondary} weight="medium" size={16}>
                                    See Resume
                                </Text>
                            </TouchableOpacity>
                        ) : null}

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
            </ScrollView>
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
        paddingHorizontal: 20,
    },
    actionBtn: {
        paddingVertical: 10,
    },
})
